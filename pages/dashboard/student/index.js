import React, { useEffect, useState } from "react";
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
import { useResumes } from "../../../src/hooks/useResumes";
import axios from "axios";
import Link from "next/link";
import { useCrt } from "../../../src/hooks/useCrt";
import { useNotices } from "../../../src/hooks/useNotices";
import { useSingleAcademic } from "../../../src/hooks/useSingleAcademic";

const notEligibleStudents = [
  "RA2152005010007",
  "RA2152001010250",
  "RA2152001010227",
  "RA2152001010236",
  "RA2152001010186",
  "RA2152001010126",
  "RA2152001010097",
  "RA2152001010130",
  "RA2152001020072",
  "RA2152001040180",
  "RA2152001040050",
  "RA2152001040037",
  "RA2152009010008",
  "RA2152007010005",
  "RA2152009010019",
  "RA2152001010127",
  "RA2152006010012",
  "RA2152004010008",
  "RA2152001010180",
  "RA2152001010087",
  "RA2152001010170",
  "RA2152008010018",
  "RA2152009010022",
  "RA2152001010212",
  "RA2152001010248",
  "RA2152007010010",
  "RA2152001010244",
  "RA2152001010184",
  "RA2152001010085",
  "RA2152001010242",
  "RA2152001010230",
  "RA2152001010047",
  "RA2152007010008",
  "RA2152001010105",
  "RA2152001010239",
  "RA2152001010266",
  "RA2152001010120",
  "RA2152008010007",
  "RA2152009010006",
  "RA2152009010003",
  "RA2152001010191",
  "RA2152006010006",
  "RA2152006010011",
  "RA2152001010110",
  "RA2152001010210",
  "RA2152001010009",
  "RA2152008010003",
  "RA2152007010017",
  "RA2152001010132",
  "RA2152001010199",
  "RA2152001010256",
  "RA2152007010007",
  "RA2152001020075",
  "RA2152001020011",
  "RA2152001020048",
  "RA2152001020104",
  "Ra2152001020079",
  "RA2152001020092",
  "RA2152001020110",
  "RA2152001020016",
  "RA2152001020098",
  "RA2152001020030",
  "RA2152001020031",
  "RA2152001020109",
  "RA2152001020094",
  "RA2152001040135",
  "RA2152001010218",
  "RA2152006010009",
  "RA2152001010190",
  "RA2152001010020",
  "RA2152006010003",
  "Ra2152007010004",
  "RA2152001020105",
  "RA2152001020036",
  "RA2152001020099",
  "RA2152001040130",
  "RA2152001040142",
  "RA2152001040107",
  "RA2152001040176",
  "Ra2152007010024",
  "RA2152007010021",
  "RA2152009010016",
  "RA2152001010155",
  "RA2152001010118",
  "RA2152001010086",
  "RA2152001010092",
  "RA2152001010112",
  "RA2152001010126",
  "RA2152001010202",
  "RA2152001010213",
  "RA2152001010216",
  "RA2152001010244",
  "RA2152001010257",
  "Ra2152004010016",
  "RA2152006010007",
  "RA2152001010245",
  "RA2152001010258",
];

const resources = [
  // {
  //   heading: "IBM Preplacement",
  //   image:
  //     "https://webimages.mongodb.com/_com_assets/cms/ibmlogo-s4il2j9lwy.png?auto=format%2Ccompress&ch=DPR",
  //   href: "https://app.altrulabs.com/play/video/zBLZwmFRppKJ/IT8tks3RrgVs",
  // },
  {
    heading: "Epam Resouces for 2023",
    image:
      "https://res.cloudinary.com/crowdicity-us-east-1/image/upload/w_710,h_500,c_fill/epam-anywhere-logo-240x240-png_ehxcx7",
    href: "/resources/epam",
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
  const { oldAcademic } = useSingleAcademic(undefined, user?.rollNumber?.value);
  const [isEligibleToPay, setIsEligibleToPay] = useState(false);
  const { notices } = useNotices(user);
  const { crtPayment } = useCrt(user?._id);
  const [filteredJobs, setFilteredJobs] = useState(null);
  const [counts, setCounts] = useState([]);
  const { resumes } = useResumes(user);
  useEffect(() => {
    if (!jobs || !resumes) return;
    (async () => {
      const dataSet = [0, 7, 0, 0];
      dataSet[0] = resumes.length;
      for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < jobs[i].eligible.length; j++) {
          if (jobs[i].eligible[j]?.email === user?.email) {
            if (jobs[i].eligible[j].status.applied === null) dataSet[2]++;
            if (jobs[i].eligible[j].status.applied === true) dataSet[3]++;
          }
        }
      }
      setFilteredJobs(jobs);
      setCounts(dataSet);
    })();
  }, [jobs]);

  useEffect(() => {
    if (!oldAcademic) return;
    if (oldAcademic.score.grade <= 10) {
      setIsEligibleToPay(oldAcademic.score.grade >= 6);
    } else if (oldAcademic.score.grade <= 100) {
      setIsEligibleToPay(oldAcademic.score.grade >= 60);
    } else {
      setIsEligibleToPay(false);
    }

    if (notEligibleStudents.filter((x) => x === user.rollNumber.value).length > 0)
      setIsEligibleToPay(false);
  }, [oldAcademic]);

  useEffect(() => {
    if (!notices || !user) return;
    let count = 0;
    notices.forEach((x) => {
      if (x.seen.filter((x) => x.email === user.email).length === 0) count++;
    });
    console.log(count);
    if (count > 0) {
      toast.info("You have " + count + " new notice.", { toastId: 1 });
    }
  }, [notices, user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const showPopup = verifyCheckIn();
    if (showPopup && counts[0] === 0) {
      const id = Math.floor(Math.random() * 10) % 3;
      toast.info(createResumeMessages[id], { toastId: id });
    }
  }, []);

  return (
    <div className='px-5 pt-1 overflow-auto w-[100%] mt-[9vh]'>
      <div className='flex justify-between items-start mt-5'>
        <div className='w-[80%] flex'>
          <div className='mr-4 rounded-md sticky top-0 left-0 w-[25%]'>
            <div className='bg-gray-50'>
              <Filter applyFilters={applyFilters} jobs={jobs} setFilteredJobs={setFilteredJobs} />
            </div>

            <h1 className='text-center font-semibold'>Jobs</h1>
            <JobChart counts={[counts[2], counts[3]]} labels={["Pending", "Applied"]} />
            <h1 className='text-center font-semibold mt-2'>Resumes</h1>
            <JobChart counts={[counts[0], counts[1]]} labels={["Created", "Available"]} />
          </div>

          <div className='bg-gray-50 w-[75%] rounded-md p-2'>
            <div className='min-w-0'>
              <div className='lg:min-w-0'>
                <div className='h-full px-1'>
                  {user?.college?.name === "SRM Institute of Science and Technology" &&
                  !crtPayment ? (
                    <div className='flex justify-center'>
                      <div className='w-full p-4 bg-white text-center rounded'>
                        <h1 className='font-semibold'>Jobs</h1>
                        <h1 className='font-normal text-left text-gray-700 my-3'>
                          Dear All,
                          <br />
                          <br /> Greetings from the Career Centre..!!
                          <br />
                          <br /> SRM Career Centre is pleased to welcome you to the 2022-23
                          placement season. We have been striving continuously to extend all
                          possible support to provide the right career opportunities to our students
                          and to achieve the best possible placement outcomes.As we are gearing up
                          for another successful year, we would like to start the Placement
                          enrollment for MBA 2023 graduating class.
                          <br />
                          <br />
                          <strong>
                            Any Queries Regarding Payment please mail to
                            <span className='ml-2 text-orange-500'>
                              placement.helpdesk@srmist.edu.in
                            </span>{" "}
                            only... don't send any mail to any other the mail id which is given in
                            payment gateway interface{" "}
                          </strong>
                          <br />
                          <br /> Note: All the students eligible (10th - 60%, 12th / Dip - 60%, UG /
                          PG-6.0 CGPA, No standing arrear in current degree) and interested in
                          placements can enroll.
                          <br />
                          <br />
                          Enrollment Fee : Rs.7500/-{" "}
                          {isEligibleToPay && (
                            <form>
                              <script
                                src='https://checkout.razorpay.com/v1/payment-button.js'
                                data-payment_button_id='pl_KAYn8wG1FPR3WX'
                                async
                              ></script>
                            </form>
                          )}
                          <br />
                          <br />
                          We look forward to the placement season 2022-23 and wish the students all
                          the best.!! Thanks & Regards.{" "}
                          <strong className='mx-2'>Y C SURESH KUMAR</strong> Deputy Director,Career
                          Centre SRM Institute Of Science and Technology, Kattankulathur-603203.
                          Mobile :{" "}
                          <span className='ml-2 text-orange-500'>8754593528// 6380152693</span>{" "}
                          Direct Line: <span className='ml-2 text-orange-500'>044-274 527 67</span>
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-4 relative h-full' style={{ minHeight: "36rem" }}>
                      {!filteredJobs && isLoading ? (
                        <JobCardSkeleton />
                      ) : filteredJobs?.length > 0 ? (
                        <div className='flex flex-col'>
                          {filteredJobs?.map((job) => (
                            <JobCard key={job._id} job={job} />
                          ))}
                        </div>
                      ) : (
                        <div className='flex mt-10 pt-32 flex-col justify-center items-center w-full'>
                          <div className='relative flex-shrink-0 flex justify-center h-72 w-72'>
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='p-2 w-[20%] min-h-[85vh] bg-gray-50 rounded-md'>
          <h3 className='text-lg font-semibold'>Resources</h3>
          <div className='flex flex-col mt-2'>
            {resources.map((resource) => (
              <div key={resource.heading} className='w-full mb-3 rounded bg-white shadow'>
                {resource.image && (
                  // <div className="relative w-[90%] mx-auto">
                  <div className='relative h-40'>
                    <Image
                      placeholder='blur'
                      blurDataURL={resource.image}
                      layout='fill'
                      objectFit='contain'
                      className=''
                      src={resource.image}
                      alt=''
                    />
                  </div>
                )}
                {resource.video && <div dangerouslySetInnerHTML={{ __html: resource.video }} />}
                <div className='px-2 py-1 text-[13.5px] text-center font-semibold'>
                  {resource.href ? (
                    <a
                      target={"_blank"}
                      className='underline text-orange-700'
                      href={resource.href}
                      rel='noreferrer'
                    >
                      {resource.heading}
                    </a>
                  ) : (
                    <h1 className=''>{resource.heading}</h1>
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

  const {
    data: { payment },
  } = await axios.get(`${process.env.HOST_URL}/api/payment/${user?._id}`);

  if (!payment) {
    var { data } = await axios.post(`${process.env.HOST_URL}/api/payment/${user?._id}`, {
      user: user?._id,
      amount: 0,
      plan: "free",
      modules: ["resumes", "assessments", "jobs", "learning", "testpatterns"],
    });
  }

  return {
    props: {},
  };
};

export default StudentIndex;
