import Link from "next/link";
import React from "react";
import { formatCurrency, months } from "../../../lib/helper";
import { JobChart } from "../JobChart";

export const JobInfo = ({ job }) => {
  const getDesignations = (designations) => {
    var res = "",
      n = designations.roles.length;
    designations.roles.forEach(
      (d, index) => (res += (index == n - 1 && index > 0 ? " and " : ",") + d)
    );
    return res.substring(1);
  };
  return (
    <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
      <div className="space-y-6 lg:col-start-1 lg:col-span-2">
        {/* Description list*/}
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Job Information
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details posted by{" "}
                <span className="font-semibold">{job?.college?.name}</span>.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-[20px] font-bold text-gray-900">
                    Designation
                  </dt>
                  <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                    {getDesignations(job?.designation)}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-[20px] font-bold text-gray-900">Role</dt>
                  <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                    {job?.role}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-[20px] font-bold text-gray-900">
                    Start Date
                  </dt>
                  <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                    {new Date(job.from).getDate()}{" "}
                    {
                      months[
                        new Date(job.from?.substring(0, 10)).getMonth() + 1
                      ]
                    }{" "}
                    {new Date(job.from?.substring(0, 10)).getFullYear()}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-[20px] font-bold text-gray-900">
                    End Date
                  </dt>
                  <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                    {new Date(job.to?.substring(0, 10)).getDate()}{" "}
                    {months[new Date(job.to?.substring(0, 10)).getMonth() + 1]}{" "}
                    {new Date(job.to?.substring(0, 10)).getFullYear()}
                  </dd>
                </div>
                {job?.stipend && job?.stipend !== 0 ? (
                  <div className="sm:col-span-1">
                    <dt className="text-[20px] font-bold text-gray-900">
                      Stipend
                    </dt>
                    <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                      {formatCurrency(job?.stipend)}
                    </dd>
                  </div>
                ) : (
                  job?.stipendRange && (
                    <div className="sm:col-span-1">
                      <dt className="text-[20px] font-bold text-gray-900">
                        Stipend Range
                      </dt>
                      <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                        {job?.stipendRange}
                      </dd>
                    </div>
                  )
                )}
                {job?.ctc && job?.ctc !== 0 ? (
                  <div className="sm:col-span-1">
                    <dt className="text-[20px] font-bold text-gray-900">CTC</dt>
                    <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                      {formatCurrency(job?.ctc)}
                    </dd>
                  </div>
                ) : (
                  job?.ctcRange && (
                    <div className="sm:col-span-1">
                      <dt className="text-[20px] font-bold text-gray-900">
                        CTC Range
                      </dt>
                      <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                        {job?.ctcRange}
                      </dd>
                    </div>
                  )
                )}
                {job?.academics && (
                  <div className="sm:col-span-1">
                    <dt className="text-[20px] font-bold text-gray-900">
                      Academics
                    </dt>
                    <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                      {job?.academics} Percentage
                    </dd>
                  </div>
                )}

                {job?.jobPostingLocation?.length > 0 && (
                  <div className="sm:col-span-1">
                    <dt className="text-[20px] font-bold text-gray-900">
                      Job Posting Location
                    </dt>
                    {job?.jobPostingLocation?.map((location, index) => (
                      <span
                        key={index}
                        className="mt-1 text-[15px] font-semibold text-gray-700"
                      >
                        {location}
                        {job?.jobPostingLocation?.length === index + 1
                          ? ""
                          : ", "}
                      </span>
                    ))}
                  </div>
                )}
                {job?.yearofPassing?.length > 0 && (
                  <div className="sm:col-span-1">
                    <dt className="text-[20px] font-bold text-gray-900">
                      Year Of Passing
                    </dt>
                    {job?.yearofPassing?.map((year, index) => (
                      <span
                        key={index}
                        className="mt-1 text-[15px] font-semibold text-gray-700"
                      >
                        {year}
                        {job?.yearofPassing?.length === index + 1 ? "" : ", "}
                      </span>
                    ))}
                  </div>
                )}
                {job?.eligibility?.tenth &&
                  (job?.eligibility?.tenth?.typeOfGrade !== "Not Applicable" ||
                    job?.eligibility?.inter?.typeOfGrade !== "Not Applicable" ||
                    job?.eligibility?.undergraduate?.typeOfGrade !==
                      "Not Applicable" ||
                    job?.eligibility?.postgraduate?.typeOfGrade !==
                      "Not Applicable") && (
                    <div className="sm:col-span-2">
                      <dt className="text-[20px] font-bold text-gray-900">
                        Eligibility
                      </dt>
                      <dd className="mt-1   text-[15px] font-semibold text-gray-700">
                        {job?.eligibility?.tenth?.typeOfGrade ===
                        "Not Applicable"
                          ? ""
                          : `Xth ${job?.eligibility?.tenth?.typeOfGrade} - ${job?.eligibility?.tenth?.grade}, `}
                        {job?.eligibility?.inter?.typeOfGrade ===
                        "Not Applicable"
                          ? ""
                          : `XIIth ${job?.eligibility?.inter?.typeOfGrade} - ${job?.eligibility?.inter?.grade}, `}
                        {job?.eligibility?.diploma?.typeOfGrade ===
                        "Not Applicable"
                          ? ""
                          : `Diploma ${job?.eligibility?.diploma?.typeOfGrade} - ${job?.eligibility?.diploma?.grade}, `}
                        {job?.eligibility?.undergraduate?.typeOfGrade ===
                        "Not Applicable"
                          ? ""
                          : `Undergraduate ${job?.eligibility?.undergraduate?.typeOfGrade} - ${job?.eligibility?.undergraduate?.grade}.`}
                        {job?.eligibility?.postgraduate?.typeOfGrade ===
                        "Not Applicable"
                          ? ""
                          : `Postgraduate ${job?.eligibility?.postgraduate?.typeOfGrade} - ${job?.eligibility?.postgraduate?.grade}.`}
                      </dd>
                    </div>
                  )}

                {job?.jobPostingCampus?.length > 0 && (
                  <div className="sm:col-span-2">
                    <ul className="text-[20px] font-bold text-gray-900">
                      Eligible Campuses
                    </ul>
                    {job?.jobPostingCampus?.map((branch, index) => (
                      <li
                        key={index}
                        className="mt-1 text-[15px] font-semibold text-gray-700"
                      >
                        {branch}
                      </li>
                    ))}
                  </div>
                )}
                {job?.branchOptions?.length > 0 && (
                  <div className="sm:col-span-2">
                    <ul className="text-[20px] font-bold text-gray-900">
                      Eligible Branches
                    </ul>
                    {job?.branchOptions?.map((branch, index) => (
                      <li
                        key={index}
                        className="mt-1 text-[15px] font-semibold text-gray-700"
                      >
                        {branch}
                      </li>
                    ))}
                  </div>
                )}
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="notes-title">
          <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="notes-title"
                  className="text-lg font-medium text-gray-900"
                >
                  Banner
                </h2>
              </div>
              {job?.image ? (
                <div className="p-4 flex items-center justify-center">
                  <img src={job?.image} alt="" />
                </div>
              ) : (
                <div className="px-5 py-3">
                  <p className="font-semibold text-gray-700">
                    No banner attached with this job profile.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="timeline-title"
        className="lg:col-start-3 lg:col-span-1"
      >
        {job.typeOfPost === "Shortlisted Students" && (
          <div className="mb-5 rounded-lg shadow bg-white py-2 pt-4">
            <div className="max-h-[305px] w-[305px] mx-auto">
              <JobChart
                counts={[
                  job.eligible.filter((x) => x?.status?.applied === null)
                    .length,
                  job.eligible.filter((x) => x?.status?.applied).length,
                ]}
                labels={["Pending Students", "Applied Students"]}
              />
            </div>
          </div>
        )}
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2
            id="timeline-title"
            className="text-[20px] font-bold text-gray-900"
          >
            About
          </h2>

          {/* Activity Feed */}
          <div className="mt-2">
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
          <div className="mt-6 flex flex-col justify-stretch">
            <Link href={job?.website}>
              <a className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Go To Company&apos;s Website
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
