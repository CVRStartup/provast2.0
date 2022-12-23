import Link from "next/link";
import React from "react";
import { useUser } from "../../src/lib/hooks";
import { FaLock } from "react-icons/fa";
import { useOpenjobs } from "../../src/hooks/useOpenjobs";

const Index = () => {
  const user = useUser();
  const { openjobs, isLoading, isError } = useOpenjobs();
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4 pt-[12vh]">
      <h2 className="text-lg font-bold leading-7 text-gray-800 sm:truncate">
        Open Jobs
      </h2>

      <div className="">
        <div className="mt-2 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Eligible Batch
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last Date To Apply
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {openjobs?.map((job, jobIdx) => (
                      <tr
                        key={job.name}
                        className={jobIdx % 2 === 0 ? undefined : "bg-gray-50"}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {job.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {job?.eligiblityBatch}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(job.lastDate).getDate()}/
                          {new Date(job.lastDate).getMonth()}/
                          {new Date(job.lastDate).getFullYear()}
                        </td>
                        <td
                          className={`relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-orange-600 hover:text-orange-900 `}
                        >
                          <Link
                            href={user ? job?.jobLink : "/auth/login"}
                            passHref
                          >
                            <div>
                              <a className="" target={"_blank"}>
                                Register
                                <span className="sr-only">, {job.name}</span>
                              </a>
                              <span
                                className={`${
                                  user ? "hidden" : "absolute"
                                } top-4 cursor-pointer right-10 animate-pulse text-gray-700`}
                              >
                                <FaLock size={16} />
                              </span>
                            </div>
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

export default Index;
