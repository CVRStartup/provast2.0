import Image from "next/image";
import React from "react";
import { getLoginSession } from "../src/lib/auth";
import { findUser } from "../src/lib/user";
const index = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <span className='relative inline-flex'>
        <div className='inline-flex items-center px-4 py-2 text-center font-bold leading-6 text-lg md:text-4xl rounded-md text-gray-500 bg-white transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20'>
          You&apos;ve been registerd, Our team will contact you soon.
        </div>
        <span className='flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
          <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500' />
        </span>
      </span>
      <div className='relative w-4/12 mx-auto h-96'>
        <Image
          placeholder='blur'
          blurDataURL='/loading.gif'
          layout='fill'
          objectFit='contain'
          src='/loading.gif'
          alt='loading'
        />
      </div>
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
  if (user.approved) {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }
  if (user.category !== "college") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default index;
