import { JobHeader } from "../../../../src/components/Jobs/JobSlug/JobHeader";
import { JobHero } from "../../../../src/components/Jobs/JobSlug/JobHero";
import { JobInfo } from "../../../../src/components/Jobs/JobSlug/JobInfo";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { useJob } from "../../../../src/hooks/useJob";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { AiFillIdcard } from "react-icons/ai";
import { MdAnalytics } from "react-icons/md";
import { JobResult } from "../../../../src/components/Student/JobResult";
import { useUser } from "../../../../src/lib/hooks";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StudentJobSlug = ({ id }) => {
  const { job } = useJob(id);
  const user = useUser();
  const [tab, setTab] = useState("Job Information");

  if (!job) return <Loading />;

  const tabs = [
    {
      name: "Job Information",
      icon: AiFillIdcard,
      current: tab === "Job Information",
    },
    { name: "Result", icon: MdAnalytics, current: tab === "Result" },
  ];
  return (
    <div className="min-h-full bg-gray-100 pt-[10vh]">
      <JobHeader />
      <main className="py-10">
        {user && <JobHero job={job} user={user} />}
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

        {tab === "Result" && (
          <div data-aos="fade-up">
            <JobResult job={job} email={user?.email} />
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
    props: { id: query.id },
  };
};

export default StudentJobSlug;
