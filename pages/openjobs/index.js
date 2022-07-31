import Link from "next/link";
import React from "react";

const openjobs = [
  {
    name: "AMAZON WOW",
    eligible: "2023 / 2024 Girls Only",
    lastDate: "16th July 2022",
    href: "https://amazonwowindia.splashthat.com/",
  },
  {
    name: "TCS NQT FY'23",
    eligible: "2023",
    lastDate: "18th July 2022",
    href: "https://on.tcs.com/3xNXEdv",
  },
];

const index = () => {
  return (
    <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4'>
      <h2 className='text-2xl font-bold leading-7 text-gray-800 text-center sm:text-4xl sm:truncate'>
        Open Jobs
      </h2>

      <div className=''>
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
                        Company Name
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Eligible Batch
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Last Date To Apply
                      </th>
                      <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {openjobs.map((job, jobIdx) => (
                      <tr key={job.name} className={jobIdx % 2 === 0 ? undefined : "bg-gray-50"}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                          {job.name}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {job.eligible}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {job.lastDate}
                        </td>
                        <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                          <Link href={job.href}>
                            <a className='text-indigo-600 hover:text-indigo-900'>
                              Register<span className='sr-only'>, {job.name}</span>
                            </a>
                          </Link>
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
    </div>
  );
};

export default index;
