import axios from "axios";
import { EligibleTable } from "../../../../../src/components/Jobs/EligibleTable";
import { JobHero } from "../../../../../src/components/Jobs/JobSlug/JobHero";
import { JobInfo } from "../../../../../src/components/Jobs/JobSlug/JobInfo";
import { AiFillIdcard } from "react-icons/ai";
import { MdAnalytics } from "react-icons/md";
import { useEffect, useState } from "react";
import { getLoginSession } from "../../../../../src/lib/auth";
import { findUser } from "../../../../../src/lib/user";
import { JobHeader } from "../../../../../src/components/Jobs/JobSlug/JobHeader";
import { useJob } from "../../../../../src/hooks/useJob";
import { Questionnaire } from "../../../../../src/components/Jobs/Questionnaire";
import { RoundInfo } from "../../../../../src/components/Jobs/RoundInfo";
import { useUser } from "../../../../../src/lib/hooks";
import { useStudents } from "../../../../../src/hooks/useStudents";
import { useModelContext } from "../../../../../src/context/ModalContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CollegeJobSlug = ({ id }) => {
  const { job, isLoading } = useJob(id);
  const { setJobEligibleStudents, jobEligibleStudents } = useModelContext();
  const [tab, setTab] = useState("Job Information");
  const user = useUser();
  const students = useStudents(user);
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const tabs = [
    {
      name: "Job Information",
      icon: AiFillIdcard,
      current: tab === "Job Information",
    },
    { name: "Analytics", icon: MdAnalytics, current: tab === "Analytics" },
    {
      name: "Questionnaire",
      icon: AiFillIdcard,
      current: tab === "Questionnaire",
    },
    { name: "Rounds", icon: MdAnalytics, current: tab === "Rounds" },
  ];
  useEffect(() => {
    if (!job || students.isLoading) return;
    setEligibleStudents(getFileterdEligible(job?.eligible));
    setJobEligibleStudents(getFileterdEligible(job?.eligible));
  }, [job, students.isLoading]);

  console.log(jobEligibleStudents);

  if (isLoading) return <div>Loading</div>;

  const getFileterdEligible = (eligible) => {
    if (students && students.students) {
      let newFilteredStudents = eligible.map((student) => {
        let studentDetails = {};
        students.students.some((studentDetail) => {
          if (studentDetail.email == student.email) {
            studentDetails = {
              name: studentDetail.profile.firstName + " " + studentDetail.profile.lastName,
              email: studentDetail.email,
              phone: studentDetail.phone?.value,
              rollnumber: studentDetail.rollNumber?.value,
              status: student.status,
              resume: student.resume,
              personal: student.personal,
              education: student.education,
            };
            return true;
          }
        });
        return studentDetails;
      });

      newFilteredStudents = newFilteredStudents.filter((x) => x && x.name != null);
      return newFilteredStudents;
    }
    return eligible;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[10vh]">
      <JobHeader />
      <main className="py-10">
        <JobHero job={job} />
        <div className="max-w-7xl mx-auto mt-5">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md"
              value={tabs.find((tab) => tab.current).name}
              onChange={(e) => setTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    onClick={() => setTab(tab.name)}
                    className={classNames(
                      tab.current
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "cursor-pointer group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <tab.icon
                      className={classNames(
                        tab.current ? "text-orange-500" : "text-gray-400 group-hover:text-gray-500",
                        "-ml-0.5 mr-2 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                    <span>{tab.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {tab === "Job Information" && (
          <div data-aos="fade-up">
            <JobInfo job={job} />
          </div>
        )}

        {tab === "Analytics" && (
          <div data-aos="fade-up">
            <EligibleTable
              heading={
                job.typeOfPost === "Shortlisted Students" ? "Eligible Students" : "Applied Students"
              }
              tagline={
                job.typeOfPost === "Shortlisted Students"
                  ? " A list of all the students who are eligible to apply job."
                  : " A list of all the students who have applied for job."
              }
              eligible={eligibleStudents}
            />
          </div>
        )}

        {tab === "Questionnaire" && (
          <div data-aos="fade-up">
            <Questionnaire job={job} />
          </div>
        )}

        {tab === "Rounds" && (
          <div data-aos="fade-up">
            <RoundInfo job={job} />
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
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
    props: {
      id: query.id,
    },
  };
};

export default CollegeJobSlug;
