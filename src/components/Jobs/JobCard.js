import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiRupee } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { formatCurrency } from "../../lib/helper";

export const JobCard = ({ job }) => {
  const { data: session } = useSession();
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
        session?.userDetails?.category === "college"
          ? `/dashboard/college/jobs/${job._id}`
          : `/dashboard/student/jobs/${job._id}`
      }
    >
      <a className="bg-white mb-4 rounded-lg shadow p-3 group relative cursor-pointer  overflow-hidden">
        <div className="flex items-center">
          <div className="w-32 h-12 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
            <div className="relative w-full h-full object-center lg:w-full lg:h-full object-fill">
              <Image
                placeholder="blur"
                blurDataURL={job.logo}
                layout="fill"
                objectFit="contain"
                className=""
                src={job.logo}
                alt=""
              />
            </div>
          </div>
          <div className="ml-4 w-[90%]">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold text-black">
                <span>{getDesignations(job.designation)}</span> at {job.company}
              </h3>
              <div>
                {new Date().toISOString() > job.to ? (
                  <div className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-semibold rounded text-red-600 bg-red-100 ">
                    Inactive
                  </div>
                ) : (
                  <div className="text-sm flex font-semibold text-black items-center">
                    Last date to apply:{" "}
                    {` ${[new Date(job.to).getDate()]}/${[
                      new Date(job.to).getMonth() + 1,
                    ]}/${new Date(job.to).getFullYear()} `}
                  </div>
                )}
              </div>
            </div>
            {job.typeOfPost === "Shortlisted Students" ? (
              <>
                <div className="mb-1 text-sm flex font-semibold text-black items-center">
                  <BiRupee size={20} color="" />
                  <span className="">
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
                <div className="grid grid-cols-4">
                  <div className="my-1 text-sm flex font-semibold text-gray-600 items-center">
                    <span className="font-semibold text-black mr-1">Eligible:</span>
                    <span className="italic">{job?.eligible?.length}</span>
                  </div>
                  <div className="text-sm flex font-semibold text-gray-600 items-center">
                    <span className="font-semibold text-black mr-1">Applied:</span>{" "}
                    <span className="italic">
                      {job.eligible.filter((x) => x?.status?.applied).length}
                    </span>
                  </div>
                  <div className="text-sm flex font-semibold text-gray-600 items-center">
                    <span className="font-semibold text-black mr-1">Not Interested:</span>
                    <span className="italic">
                      {new Date().toISOString() < job.to
                        ? job.eligible.filter((x) => x?.status?.applied == false).length
                        : job.eligible.filter((x) => x?.status?.applied == false).length +
                          job.eligible.filter((x) => x?.status?.applied == null).length}
                    </span>
                  </div>
                  {new Date().toISOString() < job.to && (
                    <div className="text-sm flex font-semibold text-gray-600 items-center">
                      <span className="font-semibold text-black mr-1">Pending:</span>{" "}
                      <span className="italic">
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
        <div className="mt-1">
          <div className="flex justify-between items-center">
            <div className="flex font-semibold text-gray-500 items-center mr-4">
              {job?.jobPostingLocation?.length > 0 && (
                <div className="flex font-semibold text-gray-500 items-center">
                  <MdOutlineLocationOn size={20} color="" />

                  {job?.jobPostingLocation?.map((location, index) => (
                    <span key={index} className="text-sm ml-1">
                      {location}
                      {job?.jobPostingLocation?.length === index + 1 ? "" : ", "}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-semibold rounded text-red-600 bg-orange-100 ">
              {job.role}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="mt-1 text-xs font-semibold text-gray-400">
              Posted {moment(new Date(job.createdAt)).startOf("hour").fromNow()}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};
