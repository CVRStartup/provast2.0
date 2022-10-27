import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DropDown } from "../../../src/components/Reusables/Dropdown";
import { Loading } from "../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../src/lib/auth";
import {
  btechBranches,
  academicDegrees,
  typeOfEducation,
  typeOfEducationGrade,
  mbaBranches,
} from "../../../src/lib/helper";
import { useUser } from "../../../src/lib/hooks";
import { findUser } from "../../../src/lib/user";

const Academics = () => {
  const session = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedDegree, setSelectedDegree] = useState(academicDegrees[0]);
  const [selectedBranch, setSelectedBranch] = useState(btechBranches[0]);
  const [selectedTypeOfEducation, setSelectedTypeOfEducation] = useState(typeOfEducation[0]);
  const [selectedTypeOfEducationGrade, setSelectedTypeOfEducationGrade] = useState(
    typeOfEducationGrade[0]
  );

  const [academics, setAcademics] = useState({
    institution: "",
    board: "",
    program: selectedDegree.name,
    branch: selectedBranch.name,
    educationType: selectedTypeOfEducation.name,
    score: {
      typeOfGrade: selectedTypeOfEducationGrade.name,
      grade: 0,
    },
    batch: {
      from: 0,
      to: 0,
    },
    current: true,
    verified: false,
    frozen: false,
  });

  const [contact, setContact] = useState({
    parents: {
      father: {
        name: "",
        email: "",
        phone: "",
        occupation: "",
      },
      mother: {
        name: "",
        email: "",
        phone: "",
        occupation: "",
      },
    },
    address: {
      city: "",
      country: "",
      state: "",
    },
    linkedin: "",
    website: "",
    verified: false,
    frozen: false,
  });

  useEffect(() => {
    setAcademics({
      ...academics,
      program: selectedDegree.name,
      branch: selectedBranch.name,
      educationType: selectedTypeOfEducation.name,
      score: {
        ...academics.score,
        typeOfGrade: selectedTypeOfEducationGrade.name,
      },
    });
  }, [selectedDegree, selectedBranch, selectedTypeOfEducation, selectedTypeOfEducationGrade]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/academics?rollNumber=${session.rollNumber.value}`,
      { education: [academics], rollNumber: session.rollNumber.value }
    );

    const { data: personalDetails } = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/personal?userId=${session._id}`,
      {
        contact,
      }
    );

    const { data: updatedUserData } = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/details?userId=${session._id}`,
      { academicsAvailable: true }
    );

    setLoading(false);
    if (data.message === "Details Created") {
      if (updatedUserData && personalDetails) {
        router.push("/dashboard/student");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Provast | Academics</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='background'>
        {loading && <Loading />}
        <div className='min-h-screen flex flex-col justify-center items-center pb-4 sm:px-6 lg:px-8'>
          <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-3xl'>
            <div className='bg-white pt-1 pb-8 shadow-xl rounded-xl px-10'>
              <div className='my-6 flex justify-between items-center'>
                <div className=''>
                  <span className='text-xs font-semibold'>Signed In As : </span>
                  <span className='text-sm font-bold text-gray-600'>{session?.email}</span>
                </div>
                <button className='font-semibold text-orange-600 text-sm underline hover:text-orange-800'>
                  <a href='/api/auth/logout'>Logout</a>
                </button>
              </div>
              <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-2 text-center text-2xl font-bold  text-gray-900'>
                  Current education details
                </h2>
              </div>
              <form onSubmit={submitHandler}>
                <React.Fragment>
                  <div className='col-span-6 sm:col-span-6 mt-2'>
                    <div className='flex'>
                      <label htmlFor='school' className='block text-sm font-medium text-gray-700'>
                        School / Institution
                      </label>
                      <span className='ml-1 text-red-600 font-semibold'>*</span>
                    </div>
                    <input
                      type='text'
                      name='school'
                      id='school'
                      value={academics.institution}
                      onChange={(e) =>
                        setAcademics({
                          ...academics,
                          institution: e.target.value,
                        })
                      }
                      required
                      className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='grid grid-cols-6 gap-4'>
                    <div className='col-span-6 sm:col-span-3'>
                      <DropDown
                        title={"Program / Degree"}
                        isRequired
                        options={academicDegrees}
                        selectedOption={selectedDegree}
                        setSelectedOption={setSelectedDegree}
                      />
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <DropDown
                        title={"Branch / Specialization"}
                        isRequired
                        options={btechBranches}
                        selectedOption={selectedBranch}
                        setSelectedOption={setSelectedBranch}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-6 gap-4 mt-10'>
                    <div className='col-span-6 sm:col-span-3'>
                      <div className='flex'>
                        <label htmlFor='board' className='block text-sm font-medium text-gray-700'>
                          Board / University
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>
                      <input
                        type='text'
                        name='board'
                        id='board'
                        required
                        value={academics.board}
                        onChange={(e) => setAcademics({ ...academics, board: e.target.value })}
                        className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    <div className='col-span-6 sm:col-span-3 relative -top-[23px]'>
                      <DropDown
                        title={"Education Type"}
                        isRequired
                        options={typeOfEducation}
                        selectedOption={selectedTypeOfEducation}
                        setSelectedOption={setSelectedTypeOfEducation}
                      />
                    </div>
                  </div>

                  <div className='flex mt-4'>
                    <label htmlFor='score' className='block text-sm font-medium text-gray-700'>
                      Score
                    </label>
                    <span className='ml-1 text-red-600 font-semibold'>*</span>
                  </div>
                  <div className='grid grid-cols-6 gap-4'>
                    <div className='col-span-6 sm:col-span-3 '>
                      <input
                        type='text'
                        name='score'
                        id='score'
                        required
                        value={academics.grade}
                        onChange={(e) =>
                          setAcademics({
                            ...academics,
                            score: {
                              ...academics.score,
                              grade: e.target.value,
                            },
                          })
                        }
                        className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    <div className='col-span-6 sm:col-span-3 relative -top-[45px]'>
                      <DropDown
                        title={"Grade"}
                        isRequired
                        options={typeOfEducationGrade}
                        selectedOption={selectedTypeOfEducationGrade}
                        setSelectedOption={setSelectedTypeOfEducationGrade}
                      />
                    </div>
                  </div>

                  <div className='flex'>
                    <label htmlFor='duration' className='block text-sm font-medium text-gray-700'>
                      Duration
                    </label>
                    <span className='ml-1 text-red-600 font-semibold'>*</span>
                  </div>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <input
                        type='number'
                        name='duration'
                        placeholder='YYYY'
                        min='2001'
                        max='2100'
                        id='duration'
                        onChange={(e) =>
                          setAcademics({
                            ...academics,
                            batch: { ...academics.batch, from: e.target.value },
                          })
                        }
                        required
                        className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <input
                        type='number'
                        placeholder='YYYY'
                        min='2001'
                        max='2100'
                        name='duration'
                        id='duration'
                        onChange={(e) =>
                          setAcademics({
                            ...academics,
                            batch: { ...academics.batch, to: e.target.value },
                          })
                        }
                        required
                        className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='mt-4'>
                    <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 '>
                      Submit
                    </button>
                  </div>
                </React.Fragment>
              </form>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async function ({ req, res }) {
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

  if (user.category === "college" || !user?.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  if (user?.academicsAvailable) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Academics;
