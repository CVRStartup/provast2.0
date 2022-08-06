import axios from "axios";
import { getLoginSession } from "../../../../../../../../src/lib/auth";
import { findUser } from "../../../../../../../../src/lib/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AssessmentOptions from "../../../../../../../../src/components/Student/Assessments/AssessmentOptions";

const Responses = ({ status, assessment, studentDetails, user }) => {
  console.log(status);
  let flag = false;
  let ans = "";
  return (
    <div className='p-10 grid grid-cols-6 bg-white'>
      <div className='col-start-2 col-span-4 my-20'>
        {assessment &&
          assessment.sections.map((section, oldIndex) => {
            return (
              <div key={oldIndex} className='col-start-2 col-span-4'>
                <div className='border-2 shadow border-orange-400 flex items-center justify-center rounded p-2 my-4 font-semibold'>
                  {section.name}
                </div>
                {section.questions.map((item, index) => {
                  flag = false;
                  return (
                    <div
                      key={index}
                      className='rounded-lg shadow border hover:shadow-md p-3 group relative m-5 '
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
                      {status && (
                        <div>
                          <AssessmentOptions
                            question={item}
                            responses={status ? status.responses : []}
                            disable={true}
                          />
                        </div>
                      )}
                      <div>
                        {status.responses?.length == 0 ? (
                          <div className='border border-red-600 p-2 text-red-600 rounded m-2 mt-4'>
                            ❌ Correct Answer: {item.answer}
                          </div>
                        ) : (
                          status.responses?.map((response, index) => {
                            if (!flag && response.question == item._id) {
                              item.options.forEach((option) => {
                                if (option.value == item.answer) {
                                  ans = option._id;
                                  return;
                                }
                              });
                              flag = response.response == ans;
                            }
                            if (status.responses.length == index + 1) {
                              return flag ? (
                                <div
                                  key={index}
                                  className='border border-green-600 font-semibold p-2 text-green-600 rounded m-2 mt-4'
                                >
                                  ✅ Correct Answer: {item.answer}
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className='border border-red-600 p-2 text-red-600 rounded m-2 mt-4'
                                >
                                  ❌ Correct Answer: {item.answer}
                                </div>
                              );
                            }
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
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
    data: { assessmentStatus },
  } = await axios.get(
    `${process.env.HOST_URL}/api/assessments/status/${query.id}?userId=${query.sid}`
  );

  if (!assessmentStatus) {
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
      status: assessmentStatus,
      assessment,
      studentDetails: student,
    },
  };
};

export default Responses;
