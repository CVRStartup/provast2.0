//display all assessments previously posted with "post new assignemnt" button on top right
import axios from "axios";
import React from "react";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { EmptyState } from "../../../../src/components/Layout/EmptyState";
import { AssessmentCard } from "../../../../src/components/Student/Assessments/AssessmentCard";
const Index = ({ assessments, academics, user }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4">
      <h2 className="text-center text-2xl font-bold leading-7 text-gray-800 sm:text-4xl sm:truncate">
        Assessments
      </h2>

      {assessments.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {assessments.map((assessment, index) => (
            <AssessmentCard
              assessment={assessment}
              key={index}
              studentDetails={academics ? academics.education[0] : null}
              rollNumber={user ? user.rollNumber : null}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          heading={"Assessments not found."}
          description={"There are no assessments to find."}
          image={`/no_results.png`}
          href={"/dashboard/college/assessments/add"}
          buttonText={"Add New Assessment"}
        />
      )}
    </div>
  );
};
export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  console.log(user);
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
  if (user.category === "college") {
    return {
      redirect: {
        destination: "/dashboard/college",
        permanent: false,
      },
    };
  }

  const {
    data: { assessments },
  } = await axios.get(
    `${process.env.HOST_URL}/api/assessments?collegename=${user.college.name}&collegecode=${user.college.code}`
  );

  const {
    data: { academics },
  } = await axios.get(
    `${process.env.HOST_URL}/api/auth/user/academics?user=${user._id}`
  );

  return {
    props: {
      assessments,
      academics: academics ? academics : null,
    },
  };
};
export default Index;
