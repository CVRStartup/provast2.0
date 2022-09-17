//per assessment page to display all questions of an assessment and answers with assessmentId "[id]".
import axios from "axios";
import { useRouter } from "next/router";
import { getLoginSession } from "../../../../../src/lib/auth";
import { findUser } from "../../../../../src/lib/user";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import StudentStatusTable from "../../../../../src/components/College/StudentStatusTable";
import Paginate from "../../../../../src/components/Layout/Paginate";
import { useModelContext } from "../../../../../src/context/ModalContext";
import { useAssessmentContext } from "../../../../../src/context/AssessmentContext";

const AssessmentSlug = ({ assessmentDetails, studentStatuses, user }) => {
  const [tab, setTab] = useState(false);
  const { setForm, setIsOpen } = useModelContext();
  const { setQuestion, assessment, setAssessment } = useAssessmentContext();
  // const [studentStatuses, setStudentStatuses] = useState([]);
  const [currentStatuses, setCurrentStatuses] = useState(null);
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 10;

  useEffect(() => {
    const newStatuses = [...studentStatuses];
    const endOffset = itemOffset + itemsPerPage;

    setCurrentStatuses(newStatuses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(newStatuses.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % studentStatuses.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const router = useRouter();
  const { query } = useRouter();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    setAssessment(assessmentDetails);
  }, []);

  const deleteAssessment = (e) => {
    try {
      const data = axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments?id=${assessment["_id"]}`
      );
      toast.success("Assessment deleted!", {
        toastId: 122,
      });
      router.push("/dashboard/college/assessments");
    } catch {
      toast.error("Failed to delete", {
        toastId: 233,
      });
    }
  };

  let dataArr;

  if (assessment) dataArr = assessment.sections;

  const editButtonClickHandler = (e, question, questionIndex, sectionIndex) => {
    const questionInfo = {
      question: JSON.parse(JSON.stringify(question)),
      questionIndex,
      sectionIndex,
    };
    setQuestion(questionInfo);
    setForm("questionModal");
    setIsOpen(true);
  };

  return tab ? (
    // grid grid-cols-8
    <div className='pt-[10vh] p-10 flex flex-col justify-center item-center w-full'>
      {assessment && (
        <div className=' flex flex-col justify-start text-3xl font-bold my-15 ml-10 col-start-2'>
          {assessment.name}
          <span
            className={
              (assessment.mode === "Practice" ? "text-yellow-600" : "text-red-500") +
              " text-md my-2"
            }
          >
            {assessment.mode}
          </span>
        </div>
      )}
      <div className='col-start-3 col-span-4 max-w-6xl mx-auto mt-6 sm:mt-2 2xl:mt-5'>
        <div className='border-b border-gray-200'>
          <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
            <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
              <div
                className={classNames(
                  !tab
                    ? "border-orange-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-md cursor-pointer"
                )}
                aria-current='page'
                onClick={() => setTab(false)}
              >
                Questions
              </div>
              <div
                className={classNames(
                  tab
                    ? "border-orange-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-md cursor-pointer"
                )}
                aria-current='page'
                onClick={() => setTab(true)}
              >
                Results
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* {studentStatuses?.length > 0 && currentStatuses ? ( */}
      <div>
        <StudentStatusTable
          currentStudentStatuses={currentStatuses}
          studentStatuses={studentStatuses}
          assessmentId={assessment["_id"]}
          user={user}
        />
        <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
      {/* ) : (
        <Loading />
      )} */}
    </div>
  ) : (
    <>
      {/* <Timer /> */}
      {/* grid grid-cols-6 */}
      <div className='pt-[10vh] p-10 flex flex-col justify-center items-center w-full'>
        {assessment && (
          <div className=' flex flex-col justify-start items-start w-full text-3xl font-bold my-15 ml-20 col-start-2'>
            {assessment.name}
            <span
              className={
                (assessment.mode === "Practice" ? "text-yellow-600" : "text-red-500") +
                " text-md my-2"
              }
            >
              {assessment.mode}
            </span>
          </div>
        )}

        {/* Tabs */}
        <div className='col-start-3 col-span-2 max-w-6xl mx-auto mt-6 sm:mt-2 2xl:mt-5'>
          <div className='border-b border-gray-200'>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
              <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
                <div
                  onClick={() => setTab(false)}
                  className={classNames(
                    !tab
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-md cursor-pointer"
                  )}
                  aria-current='page'
                >
                  Questions
                </div>
                <div
                  onClick={() => setTab(true)}
                  className={classNames(
                    tab
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-md  cursor-pointer"
                  )}
                  aria-current='page'
                >
                  Results
                </div>
              </nav>
            </div>
          </div>
        </div>

        {assessment &&
          dataArr &&
          dataArr.map((section, oldIndex) => {
            return (
              <div key={oldIndex} className='w-[65%]'>
                <div className='border-2 shadow border-orange-400 flex items-center justify-center rounded p-2 my-4 font-semibold'>
                  {section.name}
                </div>
                {section.questions.map((item, index) => (
                  <div
                    key={item["_id"]}
                    className='rounded-lg shadow border hover:shadow-md p-3 group relative m-5 col-start-2 col-span-4'
                  >
                    <div className='flex justify-between items-center'>
                      <div className='text-xl flex gap-2'>
                        <div className='font-semibold'>{index + 1}. </div>{" "}
                        <div>
                          {item.question.data.split("\n").map((line, index) => {
                            return line.length > 0 && line.substring(0, 4) === "http" ? (
                              <div key={index}>
                                <img src={line} className='max-h-96 max-w-96'></img>
                              </div>
                            ) : (
                              <div key={index}>{line}</div>
                            );
                          })}
                        </div>
                      </div>
                      <div className='flex items-center justify-center ml-5'>
                        <div
                          className=' hover:cursor-pointer '
                          onClick={(e) => editButtonClickHandler(e, item, index, oldIndex)}
                        >
                          {<FaEdit size='20' />}
                        </div>
                        {item.difficulty &&
                          (item.difficulty.charAt(0) == "E" ||
                            item.difficulty.charAt(0) == "e") && (
                            <div className='w-20 text-center rounded-lg text-green-600 border border-green-300 text-l ml-5 p-2'>
                              Easy
                            </div>
                          )}
                        {item.difficulty &&
                          (item.difficulty.charAt(0) == "M" ||
                            item.difficulty.charAt(0) == "m") && (
                            <div className='w-20 text-center rounded-lg text-amber-500 border text-l ml-5 p-2 border-amber-400'>
                              Medium
                            </div>
                          )}
                        {item.difficulty &&
                          (item.difficulty.charAt(0) == "H" ||
                            item.difficulty.charAt(0) == "h") && (
                            <div className='w-20 text-center rounded-lg text-red-600  border text-l ml-5  p-2 border-red-300'>
                              Hard
                            </div>
                          )}
                      </div>
                    </div>

                    <div className=' text-xl mt-10'>
                      {item.options.map((option, index) => {
                        return (
                          <div key={index} className='m-2'>
                            {/* <input
                          type="radio"
                          id={curr + option.key}
                          name={"Q" + curr}
                        /> */}
                            {/* <div className=""> */}
                            {option.key + ". " + option.value} {/* </div> */}
                          </div>
                        );
                      })}
                    </div>

                    <div className='border border-green-600 font-semibold p-2 text-green-600 rounded m-2 mt-4'>
                      Correct answer:{" " + item.answer}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        <div
          onClick={deleteAssessment}
          className='col-start-3 col-span-2 text-xl text-center cursor-pointer bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
        >
          Delete Assessment
        </div>
      </div>
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
  if (user.category !== "college") {
    return {
      redirect: {
        destination: "/dashbaord/" + user.category,
        permanent: false,
      },
    };
  }

  if (!user.approved) {
    return {
      redirect: {
        destination: "/approvalpending",
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
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }
  const {
    data: { assessmentStatuses },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments/status?assessmentId=${query.id}`
  );
  if (!assessmentStatuses) {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  //code property on status.college was undefined, check later
  let statuses = assessmentStatuses.filter((status) => user.college.code === status?.college?.code);

  const {
    data: { students },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/college/students?collegename=${user.college.name}&collegecode=${user.college.code}`
  );
  if (!students) {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  let studentStatuses = [];
  students.forEach((student) => {
    let name = student.profile?.firstName + " " + student.profile?.lastName;
    let rollNumber = student?.rollNumber.value;
    let email = student.email;
    let phone = student.phone?.value;
    let userID = student._id;

    let status = null;
    let marks = null;

    for (let studentStatus of statuses) {
      if (studentStatus.user == student._id) {
        if (studentStatus.finishedAt != null) {
          status = true;
          marks = studentStatus.marks.scored + "/" + studentStatus.marks.total;
        } else status = false;

        break;
      }
    }

    if (status !== null) {
      studentStatuses.push({
        name,
        rollNumber,
        email,
        phone,
        status,
        marks,
        userID,
      });
    }
  });

  // filtering on the server side for student whose assessment status is 'not yet opened' for now, later we can filter on the client side if any error comes

  return {
    props: {
      assessmentDetails: assessment,
      studentStatuses,
    },
  };
};
export default AssessmentSlug;
