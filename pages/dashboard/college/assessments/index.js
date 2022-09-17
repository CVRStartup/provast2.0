//display all assessments previously posted with "post new assignemnt" button on top right
import axios from "axios";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import Link from "next/link";
import React from "react";
import AssessmentCard from "../../../../src/components/College/Assessments/AssessmentCard";
import { EmptyState } from "../../../../src/components/Layout/EmptyState";

const Index = ({ assessments, user }) => {
  return (
    <div className='mt-[15vh] max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4'>
      <div className='rounded-md h-16 px-10 bg-gray-800 flex items-center justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate'>
            Assessments
          </h2>
        </div>
        <div className='mt-4 flex md:mt-0 md:ml-4'>
          <Link href='/dashboard/college/assessments/add'>
            <a className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500'>
              Publish
            </a>
          </Link>
        </div>
      </div>
      {assessments.length > 0 ? (
        <div className='mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
          {assessments.map((assm, index) => (
            <AssessmentCard assessment={assm} user={user} key={index} />
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
  //console.log(session);
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
  const {
    data: { assessments },
  } = await axios.get(
    `${process.env.HOST_URL}/api/assessments?collegename=${user.college.name}&collegecode=${user.college.code}`
  );
  console.log(assessments);
  return {
    props: {
      assessments,
    },
  };
};
export default Index;
