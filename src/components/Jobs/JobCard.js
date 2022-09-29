import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiRupee } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { formatCurrency } from "../../lib/helper";
import { useUser } from "../../lib/hooks";

export const JobCard = ({ job }) => {
  const user = useUser();
  const getDesignations = (designations) => {
    var res = "",
      n = designations.roles.length;
    designations.roles.forEach(
      (d, index) => (res += (index == n - 1 && index > 0 ? " and " : ",") + d)
    );
    return res.substring(1);
  };

  return (
    <Link
      href={
        user?.category === "college"
          ? `/dashboard/college/jobs/${job._id}`
          : `/dashboard/student/jobs/${job._id}`
      }
    >
      <a className='bg-white mb-4 rounded-lg shadow p-5 group relative cursor-pointer  overflow-hidden'>
        <div className='flex items-center'>
          <div className='w-32 h-12 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none'>
            <div className='relative w-full h-full object-center lg:w-full lg:h-full object-fill'>
              <Image
                placeholder='blur'
                blurDataURL={job.logo}
                layout='fill'
                objectFit='contain'
                className=''
                src={job.logo}
                alt=''
              />
            </div>
          </div>
          <div className='ml-4 w-[90%]'>
            <div className='flex justify-between items-start'>
              <h3 className='text-lg font-bold text-black w-[78%]'>
                <span>{getDesignations(job.designation)}</span> at {job.company}
              </h3>
              <div className='w-[22%] flex justify-end items-start'>
                {new Date(Date.now()) > new Date(job.to.substring(0, 16)) ? (
                  <div className='inline-flex items-start px-2.5 py-1.5 border border-transparent text-xs rounded text-red-600 bg-red-100 '>
                    Inactive
                  </div>
                ) : (
                  <div className='text-sm flex text-black items-start'>
                    Deadline:{" "}
                    {` ${[new Date(job.to.substring(0, 16)).getDate()]}/${[
                      new Date(job.to.substring(0, 16)).getMonth() + 1,
                    ]}/${new Date(job.to.substring(0, 16)).getFullYear()}  
                    ${job.to.substring(11, 16)}
                    `}
                  </div>
                )}
              </div>
            </div>
            {job.typeOfPost === "Shortlisted Students" ? (
              <>
                <div className='mb-1 text-sm flex font-semibold text-black items-center'>
                  <BiRupee size={20} color='' />
                  <span className=''>
                    {job.role === "Internship" || job.role === "Internship and Full Time"
                      ? job?.stipend && job?.stipend !== 0
                        ? `Stipend: ${formatCurrency(job.stipend)}`
                        : job?.stipendRange && `Stipend: ${job?.stipendRange}`
                      : ""}
                    {job.role === "Internship and Full Time" ? " and " : ""}
                    {job?.ctc && job?.ctc !== 0
                      ? `CTC: ${formatCurrency(job.ctc)}`
                      : job?.ctcRange && `CTC: ${job?.ctcRange}`}
                  </span>
                </div>
                <div className='flex justify-start'>
                  <div className='my-1 text-sm font-semibold text-gray-600 border border-orange-400 rounded-md flex justify-center items-center px-2 py-1 mr-3'>
                    <span className='font-semibold text-gray-900 mr-1'>Eligible{" : "}</span>
                    <span className=''>{job?.eligible?.length}</span>
                  </div>
                  <div className='my-1 text-sm font-semibold text-gray-600 border border-orange-400 rounded-md flex justify-center items-center px-2 py-1 mr-3'>
                    <span className='font-semibold text-gray-700 mr-1'>Applied{" : "}</span>
                    <span className=''>
                      {job.eligible.filter((x) => x?.status?.applied).length}
                    </span>
                  </div>
                  <div className='my-1 text-sm font-semibold text-gray-600 border border-orange-400 rounded-md flex justify-center items-center px-2 py-1 mr-3'>
                    <span className='font-semibold text-gray-700 mr-1'>Not Interested : </span>
                    <span className=''>
                      {new Date().toISOString() < job.to
                        ? job.eligible.filter((x) => x?.status?.applied == false).length
                        : job.eligible.filter((x) => x?.status?.applied == false).length +
                          job.eligible.filter((x) => x?.status?.applied == null).length}
                    </span>
                  </div>
                  {new Date().toISOString() < job.to && (
                    <div className='my-1 text-sm font-semibold text-gray-600 border border-orange-400 rounded-md flex justify-center items-center px-2 py-1 mr-3'>
                      <span className='font-semibold text-gray-700 mr-1'>Pending : </span>{" "}
                      <span className=''>
                        {job.eligible.filter((x) => x?.status?.applied == null).length}
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className='mt-1'>
          <div className='flex justify-between items-center'>
            <div className='flex font-semibold text-gray-500 items-center mr-4'>
              {job?.jobPostingLocation?.length > 0 && (
                <div className='flex font-semibold text-gray-500 items-center'>
                  <MdOutlineLocationOn size={20} color='' />

                  {job?.jobPostingLocation?.map((location, index) => (
                    <span key={index} className='text-sm ml-1'>
                      {location}
                      {job?.jobPostingLocation?.length === index + 1 ? "" : ", "}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center w-full'>
            <div className='mt-1 text-xs font-semibold text-gray-400'>
              Posted {moment(new Date(job.createdAt)).startOf("hour").fromNow()}
            </div>
            <div className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs rounded text-red-600 bg-orange-100 '>
              {job.role}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
