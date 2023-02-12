import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Switch } from "@headlessui/react";
import { toast } from "react-toastify";
import { useModelContext } from "../../../src/context/ModalContext";
import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";
import { useColleges } from "../../../src/hooks/useColleges";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminIndex = () => {
  const { loading, setLoading } = useModelContext();
  const { colleges, isLoading, isError } = useColleges();

  const handleChange = async (id, status) => {
    setLoading(true);
    const { data } = await axios.put(`/api/college/details/?id=${id}&status=${!status}`);
    if (data.message === "Status Updated") {
      const college = colleges.filter((college) => college._id === id);
      college[0].approved = !status;
      toast.success(data.message);
    } else {
      toast.success(data.message, {
        toastId: data.message,
      });
    }
    setLoading(false);
  };
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>Users</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto'
          >
            Add user
          </button>
        </div>
      </div>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      Id
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      College Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      College Id
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Phone Number
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Approved
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {colleges?.map((college, collegeIdx) => (
                    <tr
                      key={college._id}
                      className={collegeIdx % 2 === 0 ? undefined : "bg-gray-50"}
                    >
                      <Link href={`/dashboard/admin/colleges/${college.college.code}`}>
                        <td className='hover:underline hover:cursor-pointer whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                          {college._id}
                        </td>
                      </Link>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {college.college.name}
                      </td>
                      <td className='lowercase whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {college.college.code}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {college.college.placement?.phone}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4'>
                        <Switch
                          checked={college.approved}
                          onChange={(e) => handleChange(college._id, college.approved)}
                          className={classNames(
                            college.approved ? "bg-orange-600" : "bg-gray-200",
                            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          )}
                        >
                          <span className='sr-only'>Use setting</span>
                          <span
                            className={classNames(
                              college.approved ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            )}
                          >
                            <span
                              className={classNames(
                                college.approved
                                  ? "opacity-0 ease-out duration-100"
                                  : "opacity-100 ease-in duration-200",
                                "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                              )}
                              aria-hidden='true'
                            >
                              <svg
                                className='h-3 w-3 text-gray-400'
                                fill='none'
                                viewBox='0 0 12 12'
                              >
                                <path
                                  d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                                  stroke='currentColor'
                                  strokeWidth={2}
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </span>
                            <span
                              className={classNames(
                                college.approved
                                  ? "opacity-100 ease-in duration-200"
                                  : "opacity-0 ease-out duration-100",
                                "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                              )}
                              aria-hidden='true'
                            >
                              <svg
                                className='h-3 w-3 text-orange-600'
                                fill='currentColor'
                                viewBox='0 0 12 12'
                              >
                                <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                              </svg>
                            </span>
                          </span>
                        </Switch>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
  if (user.category !== "admin") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default AdminIndex;
