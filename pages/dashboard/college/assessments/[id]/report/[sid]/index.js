import axios from "axios";
import { getLoginSession } from "../../../../../../../src/lib/auth";
import { findUser } from "../../../../../../../src/lib/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { binarySearch } from "../../../../../../../src/lib/helper";
import { MdDoubleArrow } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// import { Chart } from "react-chartjs-2";
// import { CategoryRounded } from "@material-ui/icons";

function diff_minutes(dt2, dt1) {
  let diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

const ReportSlug = ({ assessmentStatuses, assessmentDetails, studentDetails, user }) => {
  const { query } = useRouter();

  let currentAssessmentStatus;

  let assessmentMarks = assessmentStatuses.map((assessmentStatus) => assessmentStatus.marks.scored);

  currentAssessmentStatus = assessmentStatuses.find(
    (assessmentStatus) => assessmentStatus.user === query.sid
  );

  assessmentMarks.sort((a, b) => b - a);

  const assessmentStatusSet = new Set(assessmentMarks);

  const marksIndex = binarySearch(
    Array.from(assessmentStatusSet),
    currentAssessmentStatus.marks.scored
  );

  const rank = marksIndex + 1;

  if (!currentAssessmentStatus) {
    return <div>Not Found</div>;
  }

  const {
    marks: { total: totalMarks, scored },
    college: { name: collegeName },
    attempts,
    updatedAt,
    createdAt,
    finishedAt,
    responses,
  } = currentAssessmentStatus;

  const { sections } = assessmentDetails;

  // const { firstName, lastName, phone, email, designation, category } =
  //   studentDetails;
  const firstName = studentDetails?.profile?.firstName;
  const lastName = studentDetails?.profile?.lastName;
  const email = studentDetails?.email;
  const phone = studentDetails?.phone?.value;

  const percentage = Math.ceil((scored / totalMarks) * 100);

  const totalAttemptedQuestions = responses.length;

  const timeSpentInMinutes = finishedAt
    ? diff_minutes(new Date(finishedAt), new Date(createdAt))
    : diff_minutes(new Date(updatedAt), new Date(createdAt));

  const sectionLables = sections.map((section) => section.name);
  let sectionWiseAttemptedQuestions = [];

  // change later from brute force approach
  let response_question_ids = new Set(responses.map((response) => response.question));
  sections.forEach((section) => {
    let attemptedQuestions = 0;
    section.questions.forEach((question) => {
      if (response_question_ids.has(question._id)) {
        attemptedQuestions++;
      }
    });
    sectionWiseAttemptedQuestions.push({
      sectionName: section.name,
      attemptedQuestions,
    });
  });

  // sections.forEach((section) => {
  //   let attemptedQuestions = 0;
  //   section.questions.forEach((question) => {
  //     responses.forEach((response) => {
  //       if (response.question === question._id) {
  //         attemptedQuestions++;
  //       }
  //     });
  //   });

  // });

  let max_len = sections.reduce((accum, x) => Math.max(accum, x.questions.length), 0);
  let totalQuestions = 0;
  const data = {
    labels: ["Correct", "Incorrect", "Attempted"],
    datasets: [
      {
        label: "# No. of questions",
        data: [scored, totalAttemptedQuestions - scored, totalAttemptedQuestions],
        backgroundColor: ["green", "red", "blue"],
        borderColor: ["green", "red", "blue"],
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    labels: sectionLables,
    datasets: [
      {
        label: "number of questions Attempted",
        data: sectionWiseAttemptedQuestions.map((section) => section.attemptedQuestions),
        backgroundColor: ["pink"],
        borderColor: ["pink"],
        borderWidth: 1,
      },
    ],
  };
  console.log(studentDetails);
  return (
    <div className='pt-[10vh]'>
      <div>
        <div className='flex flex-row flex-wrap w-full bg-orange-100 min-h-[300px] border-2 border-solid border-orange-200'>
          <div className='md:w-1/2 w-full m-5 md:m-0 flex flex-col items-center justify-center'>
            <div className='text-lg font-bold my-2'>{firstName + " " + lastName}</div>
            <div className='text-base flex justify-between items-center md:w-1/2 py-1'>
              {" "}
              <span>Email :</span> {email}{" "}
            </div>
            <div className='text-base flex justify-between items-center md:w-1/2 py-1'>
              {" "}
              <span>Phone :</span> {phone}{" "}
            </div>
            <div className='text-base flex justify-between items-center md:w-1/2 py-1'>
              {" "}
              <span>College:</span> {collegeName}{" "}
            </div>
            <Link
              href={`/dashboard/college/assessments/${assessmentDetails["_id"]}/report/${studentDetails["_id"]}/responses`}
            >
              <div className='text-orange-500 cursor-pointer md:w-1/2 my-2 hover:text-orange-400 '>
                View Responses
              </div>
            </Link>
          </div>
          <div className='md:w-1/2 flex flex-row items-center justify-center flex-wrap w-full'>
            <div className=' bg-green-100 flex flex-col justify-center items-center p-2 m-2 w-[150px] h-[150px] border-2 border-solid border-green-300 rounded shadow'>
              <div className='text-lg font-semibold m-1'>Score secured</div>
              <div className='text-4xl  text-green-900 m-1 font-light'>{scored}</div>
              <div className='text-lg font-light m-1'> Out of {totalMarks} </div>
            </div>
            <div className='bg-yellow-100 flex flex-col justify-center items-center p-2 m-2 w-[150px] h-[150px] border-yellow-200 border-solid rounded shadow'>
              <div className='text-lg font-semibold m-1 '>Percentage </div>
              <div className='text-4xl  text-orange-900 m-1 font-light'>{percentage}% </div>
              <div className='text-lg font-light m-1'> Out of 100 </div>
            </div>
            <div className='bg-red-200 flex flex-col justify-center items-center p-2 m-2 w-[150px] h-[150px] border-2 border-red-300 border-solid rounded shadow'>
              <div className='text-lg font-semibold m-1'> Rank </div>
              <div className='text-4xl  text-orange-900 m-1 font-light'>#{rank}</div>
              <div className='text-lg font-light m-1'> Out of {assessmentStatusSet.size} </div>
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-wrap justify-around items-start'>
            <div className='md:w-1/2 flex flex-wrap items-center justify-center w-full'>
              <h1 className='text-xl font-bold flex items-center  m-5 w-full'>
                <span className='inline pt-1'>
                  <MdDoubleArrow />
                </span>
                Test details{" "}
              </h1>
              <div className=' flex flex-row flex-wrap w-full md:items-start items-center md:justify-start justify-center'>
                <div className='m-5 w-[200px]   flex flex-col border-2 border-solid border-gray-200 rounded shadow px-3 pb-3'>
                  <div className='text-lg flex items-center ml-2 font-sm mt-3'>
                    <span className='font-bold'>
                      <BiTimeFive />
                    </span>
                    Time Spent
                  </div>
                  <div className='bg-gray-300 h-[3px] w-[75px] ml-3 mt-2'></div>
                  <div className='flex items-end'>
                    <div className='text-orange-500 text-5xl font-light mx-3 my-2'>
                      {timeSpentInMinutes}
                    </div>
                    <div className='text-orange-500 text-sm font-bold mx-2 my-2'>min</div>
                  </div>
                </div>

                <div className='m-5 w-[200px]  flex flex-col border-2 border-solid border-gray-200 rounded shadow px-3 pb-3'>
                  <div className='text-lg flex items-center ml-2 font-sm mt-3'>
                    {" "}
                    <span className='font-bold'>
                      {" "}
                      <BiTimeFive />
                    </span>{" "}
                    Attempted{" "}
                  </div>
                  <div className='bg-gray-300 h-[3px] w-[75px] ml-3 mt-2'></div>
                  <div className='flex items-end'>
                    <div className='text-orange-500 text-5xl font-light mx-3 my-2'>
                      {totalAttemptedQuestions}
                    </div>
                    <div className='text-orange-500 text-sm font-bold mx-2 my-2'>
                      / {totalMarks}
                    </div>
                  </div>
                </div>
              </div>

              <div className=' flex flex-row flex-wrap w-full md:items-start items-center  md:justify-start justify-center'>
                <div className='m-5 w-[200px]  flex flex-col border-2 border-solid border-gray-200 rounded shadow px-3 pb-3'>
                  <div className='text-lg flex items-center ml-2 font-sm mt-3'>
                    {" "}
                    <span className='font-bold'>
                      {" "}
                      <BiTimeFive />
                    </span>{" "}
                    Correct{" "}
                  </div>
                  <div className='bg-gray-300 h-[3px] w-[75px] ml-3 mt-2'></div>
                  <div className='flex items-end'>
                    <div className='text-orange-500 text-5xl font-light mx-3 my-2'>{scored}</div>
                    <div className='text-orange-500 text-sm font-bold mx-2 my-2'>
                      / {totalMarks}
                    </div>
                  </div>
                </div>
                <div className='m-5 w-[200px]  flex flex-col border-2 border-solid border-gray-200 rounded shadow px-3 pb-3'>
                  <div className='text-lg flex items-center ml-2 font-sm mt-3'>
                    {" "}
                    <span className='font-bold'>
                      {" "}
                      <BiTimeFive />
                    </span>{" "}
                    Incorrect{" "}
                  </div>
                  <div className='bg-gray-300 h-[3px] w-[75px] ml-3 mt-2'></div>
                  <div className='flex items-end'>
                    <div className='text-orange-500 text-5xl font-light mx-3 my-2'>
                      {totalAttemptedQuestions - scored}
                    </div>
                    <div className='text-orange-500 text-sm font-bold mx-2 my-2'>
                      / {totalMarks}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:w-1/3 flex flex-wrap items-center justify-center w-full'>
              <h1 className='text-xl font-bold flex items-center  m-5 w-full'>
                <span className='inline pt-1'>
                  <MdDoubleArrow />
                </span>
                Report
              </h1>

              <div className='max-h-[400px] p-5 flex flex-row flex-wrap w-full md:items-start items-center '>
                <Bar
                  data={data}
                  width={100}
                  height={400}
                  options={{
                    scales: {
                      yAxis: {
                        min: 0,
                        max: totalMarks,
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className='font-lg font-bold  text-center'>Sectional Report</h2>
        <div className='w-3/4  mx-auto mt-5'>
          <Bar
            data={categoryData}
            width={600}
            height={300}
            options={{
              indexAxis: "y",
              scales: {
                xAxis: {
                  min: 0,
                  max: max_len,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
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
    data: { assessmentStatuses },
  } = await axios.get(`${process.env.HOST_URL}/api/assessments/status?assessmentId=${query.id}`);
  if (!assessmentStatuses) {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }
  console.log(assessmentStatuses);
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
    data: { student },
  } = await axios.get(`${process.env.HOST_URL}/api/college/students/${query.sid}`);

  if (!student) {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      assessmentStatuses,
      assessmentDetails: assessment,
      studentDetails: student,
    },
  };
};
export default ReportSlug;
