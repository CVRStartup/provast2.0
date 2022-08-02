import React, { useState } from "react";
import Image from "next/image";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { MdEdit } from "react-icons/md";
import { StudentResume } from "./StudentResume";
import { rename } from "../../lib/helper";
import { usePersonal } from "../../hooks/usePersonal";
import Link from "next/link";
import { StudentProfileDetails } from "../Student/StudentProfileDetails";
import { StudentAcademicDetails } from "../Student/StudentAcademicDetails";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const StudentProfile = ({ student }) => {
  const [tab, setTab] = useState("Profile");
  const { personal } = usePersonal(student?._id);

  const tabs = [
    { name: "Profile", current: tab === "Profile" },
    { name: "Education", current: tab === "Education" },
    { name: "Resume", current: tab === "Resume" },
  ];
  return (
    <main>
      <div className='flex-1 relative z-0 flex overflow-hidden'>
        <div className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
          <div>
            <div className='relative h-32 w-full object-cover lg:h-48 -z-10 overflow-hidden'>
              <Image
                placeholder='blur'
                blurDataURL='https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
                layout='fill'
                objectFit='cover'
                src='https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
                alt='cover-image'
              />
            </div>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='-mt-24 sm:-mt-24 sm:flex sm:items-end sm:space-x-5'>
                <div className='relative flex h-48 w-48 rounded-full ring-4 ring-white bg-white sm:h-48 sm:w-48 object-cover overflow-hidden'>
                  <Image
                    placeholder='blur'
                    blurDataURL={student.profile?.image}
                    layout='fill'
                    objectFit='contain'
                    src={student.profile?.image}
                    alt='profile-image'
                  />
                </div>
                <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                  <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                    <h1 className='text-2xl capitalize font-bold text-gray-900 truncate'>
                      {rename(student.profile?.firstName)} {rename(student.profile?.lastName)}
                    </h1>
                  </div>
                </div>
                <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                  <a
                    href={`mailto:${student.email}`}
                    target={"_blank"}
                    rel={"noreferrer"}
                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  >
                    <MailIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                    <span>Message</span>
                  </a>
                  <a
                    href={`tel:${student.phone.value}`}
                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  >
                    <PhoneIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                    <span>Call</span>
                  </a>
                  <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                    <Link href={`/dashboard/college/students/profile/edit/${student._id}`}>
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
                  {rename(student.profile?.firstName)} {rename(student.profile?.lastName)}
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
                      onClick={() => setTab(tab.name)}
                      className={classNames(
                        tab.current
                          ? " border-orange-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "cursor-pointer whitespace-nowrap py-2 px-1 border-b-2 font-medium text-md"
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

          {tab === "Profile" && <StudentProfileDetails student={student} personal={personal} />}

          {tab === "Education" && <StudentAcademicDetails student={student} />}

          {tab === "Resume" && <StudentResume userId={student._id} />}

          {/* {tab === "Jobs" && (
            <>
              <h1>Jobs</h1>
            </>
          )} */}
        </div>
      </div>
    </main>
  );
};
