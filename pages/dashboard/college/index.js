import React, { useEffect, useState, Fragment } from "react";
import { applyFilters, rename } from "../../../src/lib/helper";
import Image from "next/image";
import { JobCardSkeleton } from "../../../src/components/Layout/Skeletons/JobCardSkeleton";
import { JobCard } from "../../../src/components/Jobs/JobCard";
import { Filter } from "../../../src/components/Jobs/Filter";
import { XIcon } from "@heroicons/react/outline";
import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";
import { Popover, Transition } from "@headlessui/react";
import { useJobs } from "../../../src/hooks/useJobs";
import { useStudents } from "../../../src/hooks/useStudents";
import axios, { Axios } from "axios";
import Link from "next/link";

const Index = ({ userDetails, crtPayments }) => {
  const user = JSON.parse(userDetails);
  const { jobs, isLoading } = useJobs(user);
  const { students } = useStudents(user);
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);
  const stats = [
    { label: "CRT Paid Students", value: crtPayments?.length },
    { label: "Total Students", value: students?.length },
    { label: "Total Jobs Posted", value: jobs?.length },
  ];
  return (
    <div className='min-h-screen pt-[10vh] bg-gray-50'>
      <Popover as='header' className=' pt-10 pb-24 bg-gradient-to-r from-orange-600 to-orange-500'>
        {({ open }) => (
          <>
            <Transition.Root as={Fragment}>
              <div className='lg:hidden'>
                <Transition.Child
                  as={Fragment}
                  enter='duration-150 ease-out'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='duration-150 ease-in'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Popover.Overlay className='z-20 fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter='duration-150 ease-out'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='duration-150 ease-in'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Popover.Panel
                    focus
                    className='z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top'
                  >
                    <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200'>
                      <div className='pt-3 pb-2'>
                        <div className='flex items-center justify-between px-4'>
                          <div>
                            <img
                              className='h-8 w-auto'
                              src='https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg'
                              alt='Workflow'
                            />
                          </div>
                          <div className='-mr-2'>
                            <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500'>
                              <span className='sr-only'>Close menu</span>
                              <XIcon className='h-6 w-6' aria-hidden='true' />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className='mt-3 px-2 space-y-1'></div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>
      <main className='-mt-20 pb-8'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap justify-between'>
            <div className='w-[78%] grid grid-cols-1 lg:col-span-2'>
              <section aria-labelledby='profile-overview-title'>
                <div className='rounded-lg bg-white overflow-hidden shadow'>
                  <div className='bg-white p-6'>
                    <div className='sm:flex sm:items-center sm:justify-between'>
                      <div className='sm:flex sm:space-x-5'>
                        <div className='flex-shrink-0'>
                          <img
                            className='mx-auto h-20 w-20 rounded-full'
                            src={user?.profile?.image}
                            alt=''
                          />
                        </div>
                        <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
                          <p className='text-sm font-medium text-gray-600'>Welcome back,</p>
                          <p className='text-xl font-bold text-gray-900 sm:text-2xl'>
                            {`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                          </p>
                          <p className='text-sm font-medium text-gray-600'>
                            {rename(user?.college?.designation)}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`border rounded-md border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 ${
                          user.college.name === "CVR College of Engineering"
                            ? "sm:grid-cols-2"
                            : "sm:grid-cols-3"
                        } sm:divide-y-0 sm:divide-x `}
                      >
                        {stats.map((stat, index) => {
                          if (user.college.name === "CVR College of Engineering" && index === 0)
                            return;
                          return (
                            <div
                              key={stat.label}
                              className='px-6 py-5 text-sm font-medium text-center'
                            >
                              <span className='text-gray-600'>{stat.label}</span>
                              {": "}
                              <span className='text-gray-900'>{stat.value}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className='mt-5 flex justify-center sm:mt-0'>
                        <Link href='/dashboard/college/profile'>
                          <a className='flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                            View profile
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className='my-4'></div>
                <div className='overflow-hidden divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px'>
                  {isLoading ? (
                    <JobCardSkeleton />
                  ) : filteredJobs?.length > 0 ? (
                    <div className='flex flex-col'>
                      {filteredJobs?.map((job, index) => (
                        <JobCard key={index} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className='flex mt-10 flex-col justify-center items-center w-full'>
                      <div className='relative flex-shrink-0 flex justify-center h-72 w-full'>
                        <Image
                          placeholder='blur'
                          blurDataURL='/no_results.png'
                          layout='fill'
                          objectFit='contain'
                          src='/no_results.png'
                          alt=''
                        />
                      </div>
                      <h6 className='text-3xl font-semibold text-gray-400'>No Jobs Found</h6>
                    </div>
                  )}
                </div>
              </section>
            </div>
            <div className='w-[20%]'>
              <div className='rounded-lg bg-white overflow-hidden shadow'>
                <div className='p-4'>
                  <div className='flow-root'>
                    <Filter
                      applyFilters={applyFilters}
                      jobs={jobs}
                      setFilteredJobs={setFilteredJobs}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  const {
    data: { crtPayments },
  } = await axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/college/crt`);
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
  return {
    props: { userDetails: JSON.stringify(user), crtPayments },
  };
};
export default Index;
