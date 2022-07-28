import React, { useEffect, Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { rename } from "../../../src/lib/helper";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { JobCardSkeleton } from "../../../src/components/Layout/Skeletons/JobCardSkeleton";
import { JobCard } from "../../../src/components/Jobs/JobCard";
import { Sort } from "../../../src/components/Jobs/Sort";
import { Filter } from "../../../src/components/Jobs/Filter";
import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";

const Index = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    (async () => {
      setJobsLoading(true);
      const {
        data: { jobs },
      } = await axios.get(
        `/api/jobs?collegename=${user?.college?.name}&collegecode=${user?.college?.code}`
      );
      console.log(jobs);
      setJobs(jobs);
      setFilteredJobs(jobs);
      setJobsLoading(false);
      getAllCollegeStudents(user?.college?.code);
    })();
  }, [user]);

  const stats = [
    {
      label: "Total Students",
      value: allUsers.filter((x) => x.category === "student")?.length,
    },
    { label: "Total Jobs Posted", value: jobs?.length },
  ];

  const getAllCompanies = () => {
    return ["All", ...new Set(jobs?.map((job) => job.company))];
  };

  const applyFilters = (filter) => {
    let updatedJobs = jobs;
    console.log(jobs);
    updatedJobs = updatedJobs.filter((job) => {
      if (Number(job.ctc) != NaN) {
        if (job.ctc < filter.minimum_ctc_filter) return false;
      }
      if (Number(job.stipend) != NaN) {
        if (job.stipend < filter.minimum_salary_filter) return false;
      }
      let currDate = new Date();
      currDate = currDate.toISOString();
      let active = job.from <= currDate && job.to >= currDate;
      if (job.from != null && job.to != null) {
        if (filter.allow_active == false) {
          if (active) return false;
        }
        if (filter.allow_inactive == false) {
          if (!active) return false;
        }
      } else {
        // if job from and to is not known
        // treat it as inactive
        if (filter.allow_inactive == false) {
          return false;
        }
      }
      if (filter.role.i == false) {
        if (job.role == "Internship") return false;
      }
      if (filter.role.f == false) {
        if (job.role == "Full Time") return false;
      }
      if (filter.role.iandf == false) {
        if (job.role == "Internship and Full Time") return false;
      }
      let foundInDesig = job.designation.roles.some((ele) =>
        ele.toLowerCase().includes(filter.keyword.toLowerCase())
      );
      let foundInCompany = job.company.toLowerCase().includes(filter.keyword.toLowerCase());
      if (!foundInCompany && !foundInDesig) return false;
      return true;
    });

    console.log(updatedJobs);
    if (filter.sort_by == "created_at") {
      updatedJobs.sort((a, b) => ((a.from ?? "0") < (b.from ?? "0") ? -1 : 1));
    } else if (filter.sort_by == "ending_at") {
      updatedJobs.sort((a, b) => ((a.to ?? "0") < (b.to ?? "0") ? -1 : 1));
    } else if (filter.sort_by == "stipend") {
      updatedJobs.sort((a, b) => ((a.stipend ?? 0) < (b.stipend ?? 0) ? -1 : 1));
    } else if (filter.sort_by == "alphabetical") {
      updatedJobs.sort((a, b) => {
        a.company.toLowerCase() < b.company.toLowerCase() ? -1 : 1;
      });
    }

    if (filter.sort_order == "desc") {
      updatedJobs.reverse();
    }
    setFilteredJobs([...updatedJobs]);
  };

  const sortJobs = (sortName) => {
    let newFilteredJobs = [...jobs];
    if (sortName === "Active") {
      newFilteredJobs = newFilteredJobs.filter(
        (job) => new Date(job.to).getTime() > new Date().getTime()
      );
    }
    if (sortName === "Inactive") {
      newFilteredJobs = newFilteredJobs.filter((job) => new Date(job.to).getTime() < Date.now());
    }
    if (sortName === "Recent") {
      router.reload();
    }
    setFilteredJobs(newFilteredJobs);
  };

  const getAllCollegeStudents = async (collegeCode) => {
    const {
      data: { details },
    } = await axios.get(`/api/auth/user/details?collegeCode=${collegeCode}`);
    setAllUsers(details);
  };

  return (
    <div className='min-h-full mt-[10vh]'>
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
                      <div className='border rounded-md border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x '>
                        {stats.map((stat) => (
                          <div
                            key={stat.label}
                            className='px-6 py-5 text-sm font-medium text-center'
                          >
                            <span className='text-gray-600'>{stat.label}</span>
                            {": "}
                            <span className='text-gray-900'>{stat.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className='mt-5 flex justify-center sm:mt-0'>
                        <a
                          href='#'
                          className='flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                          View profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className='my-4'></div>
                <div className='overflow-hidden divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px'>
                  {jobsLoading ? (
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
                    <Filter companies={getAllCompanies()} applyFilters={applyFilters} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl'>
          <div className='border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left'>
            <span className='block sm:inline'>&copy; 2022 Provast</span>{" "}
            <span className='block sm:inline'>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
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
  if (user.category === "student") {
    return {
      redirect: {
        destination: "/dashbaord/student",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Index;
