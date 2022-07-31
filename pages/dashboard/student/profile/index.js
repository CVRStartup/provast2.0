import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { usePersonal } from "../../../../src/hooks/usePersonal";

const tabs = [{ name: "Profile", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = ({ userDetails }) => {
  const user = JSON.parse(userDetails);
  const { personal, isError, isLoading } = usePersonal(user?._id);

  return (
    <React.Fragment>
      <Head>
        <title>Provast | Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='mt-[5vh]'>
        <div className='flex-1 relative z-0 flex overflow-hidden'>
          <div className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
            <div>
              <div className='relative h-32 w-full lg:h-48'>
                <Image
                  placeholder='blur'
                  blurDataURL='https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                  layout='fill'
                  objectFit='cover'
                  src='https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                  alt='cover-image'
                />
              </div>
              <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='-mt-24 sm:-mt-24 sm:flex sm:items-end sm:space-x-5'>
                  <div className='relative flex h-48 w-48 rounded-full ring-4 ring-white sm:h-48 sm:w-48 overflow-hidden'>
                    <Image
                      placeholder='blur'
                      blurDataURL={user?.profile?.image}
                      layout='fill'
                      objectFit='cover'
                      src={user?.profile?.image}
                      alt='profile-image'
                    />
                  </div>
                  <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                    <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                      <h1 className='text-2xl capitalize font-bold text-gray-900 truncate'>
                        {user?.profile?.firstName} {user?.profile?.lastName}
                      </h1>
                    </div>
                    <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                      <Link href='/dashboard/student/profile/edit'>
                        <button
                          type='button'
                          className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <MdEdit className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                          <span>Edit Profile</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                  <h1 className='text-2xl font-bold text-gray-900 truncate'>
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </h1>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className='max-w-6xl mx-auto mt-6 sm:mt-2 2xl:mt-5'>
              <div className='border-b border-gray-200'>
                <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={classNames(
                          tab.current
                            ? "border-pink-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-md"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        {tab.name}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <div className='my-7 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden'>
              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                <div className='sm:col-span-1'>
                  <dt className='capitalize text-md font-medium text-gray-500'>First Name</dt>
                  <dd className=' text-md font-semibold text-gray-900'>
                    {user?.profile?.firstName}
                  </dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='capitalize text-md font-medium text-gray-500'>Last Name</dt>
                  <dd className=' font-semibold text-md text-gray-900'>
                    {user?.profile?.lastName}
                  </dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-md font-medium text-gray-500'>Registered Email</dt>
                  <dd className=' font-semibold text-md text-gray-900'>{user?.email}</dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-md font-medium text-gray-500'>Mobile Number</dt>
                  <dd className=' font-semibold text-md text-gray-900'>{user?.phone?.value}</dd>
                </div>

                {user?.college?.name && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>College</dt>
                    <dd className=' font-semibold text-md text-gray-900'>{user?.college?.name}</dd>
                  </div>
                )}
                <div className='sm:col-span-1'>
                  <dt className='text-md font-medium text-gray-500'>Roll Number</dt>
                  <dd className=' font-semibold text-md text-gray-900'>
                    {user?.rollNumber?.value}
                  </dd>
                </div>

                {user?.profile?.gender && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Gender</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {user?.profile?.gender}
                    </dd>
                  </div>
                )}
                {user?.profile?.dob && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Date Of Birth</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {user?.profile?.dob?.substring(0, 10)}
                    </dd>
                  </div>
                )}
                {personal?.contact?.linkedin && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Linkedin</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.linkedin}
                    </dd>
                  </div>
                )}
                {personal?.contact?.website && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Website</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.website}
                    </dd>
                  </div>
                )}
                {personal?.contact?.address?.city && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Permanent City</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.address?.city}
                    </dd>
                  </div>
                )}
                {personal?.contact?.address?.state && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Permanent State</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.address?.state}
                    </dd>
                  </div>
                )}
                {personal?.contact?.address?.country && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Permanent Country</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.address?.country}
                    </dd>
                  </div>
                )}
                {personal?.contact?.parents?.father?.name && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Father&apos;s Name</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.father?.name}
                    </dd>
                  </div>
                )}
                {personal?.contact?.parents?.father?.email && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Father&apos;s Email</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.father?.email}
                    </dd>
                  </div>
                )}
                {personal?.contact?.parents?.father?.phone && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Father&apos;s Phone</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.father?.phone}
                    </dd>
                  </div>
                )}
                {personal?.contact?.parents?.father?.occupation && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Father&apos;s Occupation</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.father?.occupation}
                    </dd>
                  </div>
                )}

                {personal?.contact?.parents?.mother?.name && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Mother&apos;s Name</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.mother?.name}
                    </dd>
                  </div>
                )}
                {personal?.contact?.parents?.mother?.email && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Mother&apos;s Email</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.mother?.email}
                    </dd>
                  </div>
                )}
                {personal?.contact?.parents?.mother?.phone && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Mother&apos;s Phone</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.mother?.phone}
                    </dd>
                  </div>
                )}
                {personal?.contact?.parents?.mother?.occupation && (
                  <div className='sm:col-span-1'>
                    <dt className='text-md font-medium text-gray-500'>Mother&apos;s Occupation</dt>
                    <dd className=' font-semibold text-md text-gray-900'>
                      {personal?.contact?.parents?.mother?.occupation}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
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
    props: { userDetails: JSON.stringify(user) },
  };
};
export default Profile;
