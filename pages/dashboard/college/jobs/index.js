import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { Filter } from "../../../../src/components/Jobs/Filter";
import { JobCard } from "../../../../src/components/Jobs/JobCard";
import { JobCardSkeleton } from "../../../../src/components/Layout/Skeletons/JobCardSkeleton";
import { useJobs } from "../../../../src/hooks/useJobs";
import { getLoginSession } from "../../../../src/lib/auth";
import { applyFilters } from "../../../../src/lib/helper";
import { findUser } from "../../../../src/lib/user";

const Jobs = ({ user }) => {
  const { jobs, isLoading } = useJobs(user);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  return (
    <div className="px-5 overflow-auto w-[100%] pt-[10vh]">
      <div className="rounded-md h-14 px-10 bg-gray-800 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">Jobs</h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link href="/dashboard/college/jobs/add">
            <a className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500">
              Publish
            </a>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-start mt-5">
        <div className="w-[100%] flex">
          <div className=" h-[85vh] bg-gray-50 mr-4 rounded-md sticky top-0 left-0 w-[25%]">
            <Filter applyFilters={applyFilters} jobs={jobs} setFilteredJobs={setFilteredJobs} />
          </div>

          <div className="bg-gray-50 min-h-[85vh] rounded-md p-2 w-full">
            <div className="min-w-0">
              <div className="lg:min-w-0">
                <div className="h-full px-1">
                  <div className="mt-4 relative h-full" style={{ minHeight: "36rem" }}>
                    {isLoading ? (
                      <JobCardSkeleton />
                    ) : filteredJobs?.length > 0 ? (
                      <div className="flex flex-col">
                        {filteredJobs?.map((job) => (
                          <JobCard key={job._id} job={job} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex mt-10 flex-col justify-center items-center w-full">
                        <div className="relative flex-shrink-0 flex justify-center h-72 w-full">
                          <Image
                            placeholder="blur"
                            blurDataURL="/no_results.png"
                            layout="fill"
                            objectFit="contain"
                            src="/no_results.png"
                            alt=""
                          />
                        </div>
                        <h6 className="text-3xl font-semibold text-gray-400">No Jobs Found</h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        iframe {
          height: 150px;
          width: 100%;
          padding: 5px;
          margin: 0px auto;
        }
      `}</style>
    </div>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
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
    props: {},
  };
};
export default Jobs;
