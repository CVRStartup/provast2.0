import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { Filter } from "../../../src/components/Jobs/Filter";
import { createResumeMessages, verifyCheckIn, applyFilters } from "../../../src/lib/helper";
import { JobCardSkeleton } from "../../../src/components/Layout/Skeletons/JobCardSkeleton";
import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";
import { useJobs } from "../../../src/hooks/useJobs";
import { JobCard } from "../../../src/components/Jobs/JobCard";
import { JobChart } from "../../../src/components/Jobs/JobChart";

const resources = [
  {
    heading: "Epam Resouces for 2023",
    image:
      "https://res.cloudinary.com/crowdicity-us-east-1/image/upload/w_710,h_500,c_fill/epam-anywhere-logo-240x240-png_ehxcx7",
    href: "/dashboard/student/resources/epam",
  },
  {
    heading: "What it takes to be an SDET @Commvault?",
    video: `<iframe src="https://www.youtube.com/embed/2tY_VoACte0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
  },
  {
    heading: "Accolite",
    image:
      "https://res.cloudinary.com/dj7nomqfd/image/upload/v1651482750/Accolite_Digital_Logo_jlrxfj.jpg",
    href: "https://www.linkedin.com/events/campusconnect-jumpstartyourcare6919521526669070336/",
  },
];

const StudentIndex = ({ user }) => {
  const { jobs, isLoading } = useJobs(user);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jobs) return;
    (async () => {
      const dataSet = [0, 7, 0, 0];
      setLoading(true);
      //   //resumes created
      //   const { data } = await axios.get(`/api/resume/user?userId=${user?._id}`);
      //   dataSet[0] = data.resumes.length;
      for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < jobs[i].eligible.length; j++) {
          if (jobs[i].eligible[j]?.rollnumber === user?.rollNumber?.value) {
            if (jobs[i].eligible[j].status.applied === null) dataSet[2]++;
            if (jobs[i].eligible[j].status.applied === true) dataSet[3]++;
          }
        }
      }
      setFilteredJobs(jobs);
      setCounts(dataSet);
      setLoading(false);
    })();
  }, [jobs]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const showPopup = verifyCheckIn();
    if (showPopup && counts[0] === 0) {
      const id = Math.floor(Math.random() * 10) % 3;
      toast.info(createResumeMessages[id], { toastId: id });
    }
  }, []);

  return (
    <div className="px-5 pt-1 overflow-auto w-[100%] mt-[10vh]">
      <div className="flex justify-between items-start mt-5">
        <div className="w-[79%] flex">
          <div className="  bg-gray-50 mr-4 rounded-md sticky top-0 left-0 w-[25%]">
            <Filter applyFilters={applyFilters} jobs={jobs} setFilteredJobs={setFilteredJobs} />
            <h1 className="text-center font-semibold">Jobs</h1>
            <JobChart counts={[counts[2], counts[3]]} labels={["Pending", "Applied"]} />
            <h1 className="text-center font-semibold">Resumes</h1>
            <JobChart counts={[counts[0], counts[1]]} labels={["Created", "Available"]} />
          </div>

          <div className="bg-gray-50 w-[75%] rounded-md p-2 w-full">
            <div className="min-w-0">
              <div className="lg:min-w-0">
                <div className="h-full px-1">
                  <div className="mt-4 relative h-full" style={{ minHeight: "36rem" }}>
                    {loading ? (
                      <JobCardSkeleton />
                    ) : filteredJobs?.length > 0 ? (
                      <div className="flex flex-col">
                        {filteredJobs?.map((job) => (
                          <JobCard key={job._id} job={job} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex mt-10 flex-col justify-center items-center w-full">
                        <div className="relative flex-shrink-0 flex justify-center h-72 w-72">
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
        <div className="p-2 w-[20%] min-h-[85vh] bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold">Resources</h3>
          <div className="flex flex-col mt-2">
            {resources.map((resource) => (
              <div key={resource.heading} className="w-full mb-3 rounded bg-white shadow">
                {resource.image && (
                  // <div className="relative w-[90%] mx-auto">
                  <div className="relative h-40">
                    <Image
                      placeholder="blur"
                      blurDataURL={resource.image}
                      layout="fill"
                      objectFit="contain"
                      className=""
                      src={resource.image}
                      alt=""
                    />
                  </div>
                )}
                {resource.video && <div dangerouslySetInnerHTML={{ __html: resource.video }} />}
                <div className="px-2 py-1 text-[13.5px] text-center font-semibold">
                  {resource.href ? (
                    <a
                      target={"_blank"}
                      className="underline text-orange-700"
                      href={resource.href}
                      rel="noreferrer"
                    >
                      {resource.heading}
                    </a>
                  ) : (
                    <h1 className="">{resource.heading}</h1>
                  )}
                </div>
              </div>
            ))}
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

  if (user.category !== "student") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  if (user.category === "student" && !user.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default StudentIndex;
