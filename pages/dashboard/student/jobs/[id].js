import { JobHeader } from "../../../../src/components/Jobs/JobSlug/JobHeader";
import { JobHero } from "../../../../src/components/Jobs/JobSlug/JobHero";
import { JobInfo } from "../../../../src/components/Jobs/JobSlug/JobInfo";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { useJob } from "../../../../src/hooks/useJob";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";

const StudentJobSlug = ({ id }) => {
  const { job } = useJob(id);

  if (!job) return <Loading />;

  return (
    <div className="min-h-full bg-gray-100 mt-[10vh]">
      <JobHeader />
      <main className="py-10">
        <JobHero job={job} />
        <JobInfo job={job} />
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
