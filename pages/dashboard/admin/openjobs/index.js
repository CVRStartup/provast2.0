import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useOpenjobs } from "../../../../src/hooks/useOpenjobs";

const Index = () => {
  const {openjobs, isLoading, isError} = useOpenjobs();

  const onDeleteHandler = async(id) => {
    const { data } = await axios.delete(`/api/openjobs?id=${id}`);
    if (data.message === "Openjob Removed") {
      await mutate(`/api/openjobs`);
      toast.success(data.message, {
        toastId: data.message,
      });
    }
  }
  return (
    <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4 pt-[12vh]'>
      <div className="flex justify-between">
      <h2 className='text-lg font-bold leading-7 text-gray-800 sm:truncate'>Open Jobs</h2>
      <Link href="/dashboard/admin/openjobs/add">Post New Open Job</Link>
      </div>

      <div className=''>
        <div className='mt-2 flex flex-col'>
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
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Link
                      </th>
                      <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                        <span className='sr-only'>Edit</span>
                      </th>
                      <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {openjobs?.map((job, jobIdx) => (
                      <tr key={job.name} className={jobIdx % 2 === 0 ? undefined : "bg-gray-50"}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                          {job?.name}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {job?.eligiblityBatch}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {new Date(job.lastDate).getDate()}/{new Date(job.lastDate).getMonth()}/{new Date(job.lastDate).getFullYear()}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          <Link href={job?.jobLink} passHref>
                            <a target={"_blank"} className="text-orange-600 hover:text-orange-700 cursor-pointer">Register</a>
                          </Link>
                        </td>
                        <td
                          className={`relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-orange-600 hover:text-orange-700 cursor-pointer`}
                        >
                          <Link href={`/dashboard/admin/openjobs/${job._id}/edit`}>Edit</Link>
                        </td>
                        <td
                          className={`relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-red-600 hover:text-red-900 cursor-pointer`}
                        >
                          <button onClick={() => onDeleteHandler(job?._id)}>Delete</button>
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
