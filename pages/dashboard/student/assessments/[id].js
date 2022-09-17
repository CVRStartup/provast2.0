//per assessment page to display all questions of an assessment and answers with assessmentId "[id]".
import axios from "axios";
import moment from "moment";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import NewTimer from "../../../../src/components/NewTimer";
import { AiOutlineClockCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import AssessmentOptions from "../../../../src/components/Student/Assessments/AssessmentOptions";
import Timer from "../../../../src/components/Student/Assessments/Timer";
import { debounce, first } from "lodash";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { AssessmentSection } from "../../../../src/components/Student/Assessments/AssessmentSection";
import { useRouter } from "next/router";

const AssessmentSlug = ({ assessmentDetails, assessmentStatus, user }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [firstWarning, setFirstWarning] = useState(false);
  const [tabChanged, setTabChanged] = useState(false);
  const [assessment, setAssessment] = useState(assessmentDetails);
  const [status, setStatus] = useState(assessmentStatus);
  const [disable, setDisable] = useState(
    assessmentStatus ? assessmentStatus.finishedAt != null : false
  );
  const [responses, setResponses] = useState(assessmentStatus ? assessmentStatus.responses : []);
  const [sectionIndex, setSectionIndex] = useState(0);

  const router = useRouter();

  const handle = useFullScreenHandle();
  const reportChange = useCallback(
    (state, handle) => {
      if (!fullscreen) return;
      if (!state) handleFullscreenInterrupt();
    },
    [handle]
  );
  const handleFullscreenInterrupt = () => {
    if (tabChanged) return;

    setFullscreen(false);
    if (firstWarning) {
      submitHandler(false);
    } else {
      setFirstWarning(true);
    }
  };

  let assessmentSize = assessment?.sections
    ?.map((section) => section.questions.length)
    ?.reduce((a, b) => a + b, 0);

  let prevKeyTime = 0;

  useEffect(() => {
    const getAssessmentStatus = async () => {
      if (!assessmentStatus) {
        const {
          data: { AssessmentStatus },
        } = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments/status`, {
          user: user?._id,
          assessment: assessment._id,
          college: user.college,
          responses: [],
          attemptStatus: getAttemptStatus(assessment),
          marks: {
            total: assessmentSize,
            scored: 0,
          },
          attempts: 0,
          openedAt: new Date(),
          finishedAt: null,
        });
        setStatus(AssessmentStatus);
        return;
      }
      let newStatus = { ...assessmentStatus, openedAt: new Date() };

      setStatus(newStatus);
    };
    if (!status && assessment.mode === "Practice") getAssessmentStatus();
    else if (!status && user && fullscreen && !firstWarning) getAssessmentStatus();
    //fullscreen is true but firstwarning is false implies new test

    const handleWindowChange = (e) => {
      if (!assessment || assessment.mode === "Practice" || !status || !fullscreen) return;
      setTabChanged(!tabChanged);
      setFullscreen(false);
      if (firstWarning) {
        submitHandler(false);
      } else setFirstWarning(true);
    };

    if (fullscreen) window.addEventListener("blur", handleWindowChange);

    if (status && status.finishedAt && !disable) setDisable(true);

    return () => {
      window.removeEventListener("blur", handleWindowChange);
    };
  }, [status, fullscreen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const debounceUpdateStatus = useMemo(() => {
    return debounce(async (newStatus) => {
      const {
        data: { assessmentStatus },
      } = await axios.put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments/status`, {
        ...newStatus,
      });
      setStatus(assessmentStatus);
    }, 100);
  }, [status]);

  const submitHandler = (timer) => {
    //e.preventDefault();
    try {
      // handle.exit();
      if (!status) return;
      if (status.finishedAt != null) return;

      if (window) scrollToTop();

      let score = 0;
      status.responses.forEach((response) => {
        let flag = false;
        assessment.sections.forEach((section) => {
          section.questions.forEach((question) => {
            if (question._id == response.question) {
              question.options.forEach((option) => {
                if (option._id == response.response && question.answer == option.value) {
                  flag = true;
                  return;
                }
              });
            }
          });
        });
        if (flag) score++;
      });

      let finishedAt = status && status.finishedAt ? status.finishedAt : new Date();

      debounceUpdateStatus({
        ...status,
        marks: {
          total: assessmentSize,
          scored: score,
        },
        finishedAt: finishedAt,
        attempts: status.attempts + 1,
      });

      if (!timer) {
        setDisable(true);
        if(assessment.mode==='Practice')
          toast.success(`Submission successful! You scored ${score}/${status.marks.total} marks`, {
            toastId: 1337,
          });
        else toast.success(`Submission successful!`, {
          toastId: 1339,
        });
      } else {
        if(assessment.mode==='Practice')
          toast.success(`You ran out of time! You scored ${score}/${status.marks.total} marks`, {
            toastId: 1337,
          });
      else toast.success(`You ran out of time!`, {
        toastId: 1329,
        });
      }

      if(assessment.mode==='Test') router.push('/dashboard/student/assessments');
    } catch (e) {
      toast.error(`Failed to submit, please try later`, {
        toastId: 1338,
      });
      console.log(e);
    }
  };

  const changeSectionHandler = (e) => {
    if (e.target.id === "prev-section-btn") {
      if (assessment && assessment.sections && sectionIndex == 0) return;
      setSectionIndex(sectionIndex - 1);
    } else {
      if (assessment && assessment.sections && sectionIndex == assessment.sections.length - 1)
        return;
      setSectionIndex(sectionIndex + 1);
    }

    questionAttemptHandler(sectionIndex, 0, "visited");
  };

  const questionAttemptHandler = (sectionIndex, questionIndex, newQuestionStatus) => {
    if (!status || !status.attemptStatus || status.attemptStatus.length == 0) return;

    let newStatus = status;
    if (
      newQuestionStatus ===
      newStatus?.attemptStatus[sectionIndex]?.questions[questionIndex]?.questionStatus
    )
      return;

    newStatus.attemptStatus[sectionIndex].questions[questionIndex].questionStatus =
      newQuestionStatus;
    setStatus(newStatus);
    debounceUpdateStatus(newStatus);
  };

  const getAttemptStatus = (assessment) => {
    let attemptStatus = [];
    assessment.sections?.forEach((section, secIdx) => {
      let questionsArr = [];
      section.questions?.forEach((question, qIdx) => {
        questionsArr.push({
          questionStatus: "not visited",
        });
      });

      let sectionObj = {
        questions: questionsArr,
      };
      attemptStatus.push(sectionObj);
    });
    if (attemptStatus.length > 0 && attemptStatus[0].questions.length > 0)
      attemptStatus[0].questions[0].questionStatus = "visited";
    return attemptStatus;
  };
  const optionSelectHandler = async (optionId, questionId) => {
    let newResponses = [...responses];

    // if the question already exists in the responses array
    const responseExistIndex = newResponses.findIndex(
      (response) => response.question === questionId
    );

    if (responseExistIndex !== -1) newResponses.splice(responseExistIndex, 1);

    //let flag = false;

    newResponses.push({
      question: questionId,
      response: optionId,
      //isCorrect: flag,
    });
    setResponses(newResponses);

    setStatus({
      ...status,
      responses: newResponses,
    });
    debounceUpdateStatus({
      ...status,
      responses: [...newResponses],
    });
  };
  const clearOption = (e, questionId) => {
    e.preventDefault();

    let newResponses = [...responses];

    const findIndex = newResponses.findIndex((a) => a.question === questionId);

    findIndex !== -1 && newResponses.splice(findIndex, 1);

    setResponses(newResponses);

    setStatus({
      ...status,
      responses: newResponses,
    });
    debounceUpdateStatus({
      ...status,
      responses: newResponses,
    });
  };

  const retryAssessment = (e) => {
    e.preventDefault();
    setResponses([]);
    debounceUpdateStatus({
      _id: status._id,
      user: user._id,
      assessment: assessment._id,
      college: user.college,
      responses: [],
      marks: {
        total: assessmentSize,
        scored: 0,
      },
      attemptStatus: getAttemptStatus(assessment),
      attempts: status.attempts,
      openedAt: new Date(),
      finishedAt: null,
    });
    setDisable(false);
  };

  // this is for incrementing timer in Practice mode
  const getStartTime = (start, end) => {
    let seconds = end.diff(start, "seconds");
    let days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds - days * 60 * 60 * 24;

    let hours = Math.floor(seconds / (60 * 60));
    seconds = seconds - hours * 60 * 60;

    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;

    return {
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
    };
  };

  // this is for decrementing timer in test mode.
  const getNewStartTime = (start, end, timePermitted) => {
    let seconds = end.diff(start, "seconds");
    if (seconds >= timePermitted * 60) {
      submitHandler(false);
      return {
        seconds: 0,
        minutes: 0,
        hours: 0,
      };
    }
    let days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds - days * 60 * 60 * 24;

    let hours = Math.floor(seconds / (60 * 60));
    seconds = seconds - hours * 60 * 60;

    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;

    if (seconds === 0 && minutes === 0 && hours === 0)
      return {
        seconds: 59,
        minutes: timePermitted - 1,
        hours: hours,
      };

    return {
      seconds: 59 - seconds,
      minutes: timePermitted - 1 - minutes,
      hours: hours,
    };
  };

  let finish = {};
  if (status && status.finishedAt) {
    finish = getStartTime(moment(status.openedAt), moment(status.finishedAt));
  }
  let flag = false;
  let ans = "";

  return (
    <>
      <FullScreen handle={handle} onChange={reportChange} className='bg-white overflow-y-auto'>
        {assessment?.mode === "Test" && status?.finishedAt == null && fullscreen == false ? (
          <div className='pt-[10vh] p-10 grid grid-cols-6'>
            {firstWarning ? (
              <div className='m-5 col-start-2 col-span-4 flex flex-col items-center'>
                <div className='border rounded bg-red-300 text-red-700 p-10'>
                  Warning! You have tried to switch the tab or change the window. Attempting to do
                  this again will result in auto-submission of the test.
                </div>
                <button
                  onClick={() => {
                    handle.enter();
                    setFullscreen(true);
                  }}
                  className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'
                >
                  Resume Test
                </button>
              </div>
            ) : (
              <div className='m-5 col-start-2 col-span-4 flex flex-col items-center'>
                <div className='border rounded bg-yellow-300 text-orange-700 p-10'>
                  <h3 className='font-bold'>Rules</h3>
                  <ul>
                    <li>• Timer starts as soon as button is clicked</li>
                    <li>
                      • Attempting to exit fullscreen, change tabs or change window will result in
                      auto-submission of test
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    handle.enter();
                    setFullscreen(true);
                  }}
                  className='bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded'
                >
                  Start Test
                </button>
              </div>
            )}
          </div>
        ) : (
          (assessment?.mode == "Practice" || assessment?.mode === "Test" || status?.finishedAt) && (
            <div className='pt-[10vh] p-10 grid grid-cols-6 bg-white'>
              <div className='col-start-2 col-span-4 flex justify-between items-center'>
                {assessment && (
                  <div className=' flex flex-col justify-start text-3xl font-bold  mt-15 ml-10'>
                    {assessment.name}
                    <span
                      className={
                        (assessment.mode === "Practice" ? "text-yellow-600" : "text-red-500") +
                        " text-sm my-2"
                      }
                    >
                      {assessment.mode}
                    </span>
                  </div>
                )}
                {status && status.finishedAt && (
                  <div className='p-2 border rounded text-center text-orange-700 text-xl border-orange-600'>
                    Score : {status.marks?.scored}/{status.marks?.total}
                  </div>
                )}
                {assessment?.mode == "Practice" ? (
                  status && !status.finishedAt ? (
                    <Timer startTime={getStartTime(moment(status.openedAt), moment())} />
                  ) : (
                    <div className='mr-5 flex text-xl border rounded p-2 text-red-700 border-red-500'>
                      <AiOutlineClockCircle size='1.5em' className='mr-1' />
                      {" " +
                        (finish.days < 10 ? "0" + finish.days : finish.days) +
                        ":" +
                        (finish.hours < 10 ? "0" + finish.hours : finish.hours) +
                        ":" +
                        (finish.minutes < 10 ? "0" + finish.minutes : finish.minutes) +
                        ":" +
                        (finish.seconds < 10 ? "0" + finish.seconds : finish.seconds)}
                    </div>
                  )
                ) : (
                  assessment.timePermitted > 0 &&
                  (status && !status.finishedAt ? (
                    <NewTimer
                      startTime={getNewStartTime(
                        moment(status.openedAt),
                        moment(),
                        assessment.timePermitted
                      )}
                      submitAssessmentFromTimer={submitHandler}
                    />
                  ) : (
                    <div className='mr-5 flex text-xl border rounded p-2 text-red-700 border-red-500'>
                      <AiOutlineClockCircle size='1.5em' className='mr-1' />
                      {" " +
                        (finish.days < 10 ? "0" + finish.days : finish.days) +
                        ":" +
                        (finish.hours < 10 ? "0" + finish.hours : finish.hours) +
                        ":" +
                        (finish.minutes < 10 ? "0" + finish.minutes : finish.minutes) +
                        ":" +
                        (finish.seconds < 10 ? "0" + finish.seconds : finish.seconds)}
                    </div>
                  ))
                )}
                {status?.finishedAt != null && (
                  <div
                    onClick={
                      assessment.mode === "Practice"
                        ? (e) => {
                            retryAssessment(e);
                          }
                        : null
                    }
                    className={` mr-2 text-md text-center cursor-pointer bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ${
                      assessment.mode === "Test" ? `cursor-not-allowed` : ``
                    }`}
                  >
                    Retry
                  </div>
                )}
              </div>
              {status?.finishedAt == null ? (
                <div className='col-start-2 col-span-4 ml-10'>Total score: {assessmentSize}</div>
              ) : (
                <div className='col-start-2 col-span-4 ml-10'>
                  No. of attempts: {status.attempts}
                </div>
              )}
              <div className='col-start-1 col-span-6 my-10'>
                {assessment && assessment.sections && (
                  <div>
                    <AssessmentSection
                      section={assessment.sections[sectionIndex]}
                      sectionIndex={sectionIndex}
                      lastSectionIndex={assessment.sections.length - 1}
                      status={status}
                      optionSelectHandler={optionSelectHandler}
                      changeSectionHandler={changeSectionHandler}
                      clearOption={clearOption}
                      questionAttemptHandler={questionAttemptHandler}
                      disable={disable}
                    />
                  </div>
                )}
              </div>

              <div
                onClick={
                  disable
                    ? null
                    : (e) => {
                        handle.exit();
                        submitHandler(false);
                      }
                }
                className={`col-start-3 col-span-2 text-xl text-center cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded ${
                  disable ? `cursor-not-allowed` : ``
                }`}
              >
                Submit
              </div>
            </div>
          )
        )}
      </FullScreen>
      {/* </FullScreen> */}
    </>
  );
};
export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (!user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  if (user.category !== "student") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }
  if (user.category === "student" && !user.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }

  const {
    data: { assessment },
  } = await axios.get(`${process.env.HOST_URL}/api/assessments/${query.id}`);

  if (!assessment) {
    return {
      redirect: {
        destination: `/dashboard/${user.category}/assessments`,
        permanent: false,
      },
    };
  }

  const {
    data: { assessmentStatus },
  } = await axios.get(
    `${process.env.HOST_URL}/api/assessments/status/${assessment._id}?userId=${user._id}&assessmentId=${query.id}`
  );
  
  if(assessment && assessmentStatus && assessment.mode==='Test' && assessmentStatus.finishedAt){
    return {
      redirect: {
        destination: `/dashboard/${user.category}/assessments`,
        permanent: false,
      },
    };
  }


  return {
    props: {
      assessmentDetails: assessment,
      assessmentStatus,
    },
  };
};
export default AssessmentSlug;
