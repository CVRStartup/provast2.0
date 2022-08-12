import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { FilterIcon, SearchIcon } from "@heroicons/react/solid";
import { DownloadResumes } from "../../../../src/components/Resumes/DownloadResume";
// import { EmptyState } from "../../../src/components/Layouts/EmptyState";
import { useDownloadResumeFilterContext } from "../../../../src/context/DownloadResumeFilterContext";
import { useModelContext } from "../../../../src/context/ModalContext";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { useStudents } from "../../../../src/hooks/useStudents";
import { StudentProfile } from "../../../../src/components/Resumes/StudentProfile";

const Students = ({ user }) => {
  const { students } = useStudents(user);
  const { setIsOpen, setForm } = useModelContext();
  const { downloadOpen, setDownloadOpen, setFilter } = useDownloadResumeFilterContext();
  const [profile, setProfile] = useState(null);
  const [directory, setDirectory] = useState({});
  const [keyword, setKeyword] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (!students) return;
    setProfile(students[0]);
    const newstate = {};
    students.forEach((student) => {
      const key = student.profile.firstName[0]?.toUpperCase();
      if (!newstate[key]) newstate[key] = [];
      newstate[key].push(student);
    });
    setFilteredStudents(students);
    setDirectory(newstate);
  }, [students]);
  useEffect(() => {
    if (!students) return;
    const keywords = keyword.split(",").map((x) => x.toUpperCase());
    const match = (s, p) => {
      if (!s || !p) return false;
      return s?.toUpperCase().indexOf(p) !== -1;
    };
    const newstate = students.filter((x) => {
      for (let i = 0; i < keywords.length; i++) {
        let p = keywords[i].trim(" ");
        if (
          match(x?.rollNumber?.value, p) ||
          match(x?.profile?.firstName, p) ||
          match(x?.profile?.lastName, p) ||
          match(x?.email, p) ||
          match(x?.phone?.value?.toString(), p)
        )
          return true;
      }
      return false;
    });
    setFilteredStudents([...newstate]);
  }, [keyword, students]);

  const handleClickFilter = () => {
    setFilter({
      removeCollegeName: false,
      removePhoneNumber: false,
      removeEmail: false,
      removeImage: false,
    });
    setIsOpen(true);
    setForm("downloadResumeFilter");
  };
  return (
    <>
      {students && profile ? (
        <div className={`relative flex sm:pt-[10vh] lg:mt-0`}>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as='div'
              className='w-96 fixed inset-0 flex z-40 lg:hidden'
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <div className='relative flex-1 flex flex-col max-w-96 w-full bg-white focus:outline-none'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                    <nav aria-label='Sidebar' className='mt-5'>
                      <aside className='md:order-first md:flex md:flex-col flex-shrink-0 w-full border-r border-gray-200'>
                        <div className='px-6 pt-6 pb-4'>
                          <h2 className='text-lg font-medium text-gray-900'>Students List</h2>
                          <p className='mt-1 text-sm text-gray-600'>
                            Search directory of {students.length} students.
                          </p>
                          <div className='mt-6 flex space-x-4' action='#'>
                            <div className='flex-1 min-w-0'>
                              <label htmlFor='search' className='sr-only'>
                                Search
                              </label>
                              <div className='relative rounded-md shadow-sm'>
                                <div
                                  onClick={handleClickFilter}
                                  className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
                                >
                                  <SearchIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </div>
                                <input
                                  type='search'
                                  name='search'
                                  id='search'
                                  value={keyword}
                                  onChange={(e) => setKeyword(e.target.value)}
                                  className='focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                                  placeholder='Search'
                                />
                              </div>
                            </div>
                            <button
                              onClick={handleClickFilter}
                              disabled={filteredStudents.length === 0}
                              className={
                                filteredStudents.length === 0
                                  ? "cursor-not-allowed inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                  : "inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                              }
                            >
                              <FilterIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                              <span className='sr-only'>Search</span>
                            </button>
                          </div>
                        </div>
                        {/* Directory list */}
                        <nav className='flex-1 min-h-0 overflow-y-auto' aria-label='Directory'>
                          {keyword === "" &&
                            Object.keys(directory)
                              .sort()
                              .map((letter) => (
                                <div key={letter} className='relative'>
                                  <div className='z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500'>
                                    <h3>{letter}</h3>
                                  </div>
                                  <ul role='list' className='relative z-0 divide-y divide-gray-200'>
                                    {directory[letter].map((student) => (
                                      <li key={student._id}>
                                        <div
                                          onClick={() => setProfile(student)}
                                          className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500'
                                        >
                                          <div className='relative flex-shrink-0 h-10 w-10 rounded-full'>
                                            <Image
                                              placeholder='blur'
                                              blurDataURL={student?.profile?.image}
                                              layout='fill'
                                              objectFit='contain'
                                              src={student?.profile.image}
                                              alt=''
                                            />
                                          </div>
                                          <div className='flex-1 min-w-0'>
                                            <a href='#' className='focus:outline-none'>
                                              {/* Extend touch target to entire panel */}
                                              <span
                                                className='absolute inset-0'
                                                aria-hidden='true'
                                              />
                                              <p className='text-sm font-medium text-gray-900'>
                                                {student?.profile.firstName +
                                                  " " +
                                                  student?.profile.lastName}
                                              </p>
                                              <p className='text-sm text-gray-500 truncate'>
                                                {student.rollNumber.value}
                                              </p>
                                            </a>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                          {keyword !== "" && (
                            <div>
                              {filteredStudents.map((student) => (
                                <div key={student._id}>
                                  <div
                                    onClick={() => setProfile(student)}
                                    className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500'
                                  >
                                    <div className='relative flex-shrink-0 h-10 w-10 rounded-full'>
                                      <Image
                                        placeholder='blur'
                                        blurDataURL={student?.profile.image}
                                        layout='fill'
                                        objectFit='contain'
                                        src={student?.profile.image}
                                        alt=''
                                      />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                      <a href='#' className='focus:outline-none'>
                                        {/* Extend touch target to entire panel */}
                                        <span className='absolute inset-0' aria-hidden='true' />
                                        <p className='text-sm font-medium text-gray-900'>
                                          {student?.profile.firstName +
                                            " " +
                                            student?.profile.lastName}
                                        </p>
                                        <p className='text-sm text-gray-500 truncate'>
                                          {student.rollNumber.value}
                                        </p>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {filteredStudents.length === 0 && (
                                <div className='flex mt-5 flex-col justify-center items-center'>
                                  <div className='flex-shrink-0 flex justify-center'>
                                    <Image
                                      placeholder='blur'
                                      blurDataURL='/no_results.png'
                                      layout='fill'
                                      objectFit='contain'
                                      className='h-52 w-auto'
                                      src='/no_results.png'
                                      alt=''
                                    />
                                  </div>
                                  <h6 className='text-2xl font-semibold text-gray-400'>
                                    No Results Found
                                  </h6>
                                </div>
                              )}
                            </div>
                          )}
                        </nav>
                      </aside>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 w-14' aria-hidden='true'>
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className='hidden lg:flex md:flex-shrink-0 h-screen overflow-y-auto'>
            <div className='flex flex-col w-96'>
              <div className='flex-1 w-full flex flex-col max-h-[100vh] border-r border-gray-200'>
                <aside className='hidden lg:order-first lg:flex lg:flex-col flex-shrink-0 w-96 border-r border-gray-200'>
                  <div className='px-6 pt-6 pb-4'>
                    <h2 className='text-lg font-medium text-gray-900'>Students List</h2>
                    <p className='mt-1 text-sm text-gray-600'>
                      Search directory of {students.length} students.
                    </p>
                    <div className='mt-6 flex space-x-4'>
                      <div className='flex-1 min-w-0'>
                        <label htmlFor='search' className='sr-only'>
                          Search
                        </label>
                        <div className='relative rounded-md shadow-sm'>
                          <div
                            onClick={handleClickFilter}
                            className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
                          >
                            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                          </div>
                          <input
                            type='search'
                            name='search'
                            id='search'
                            autoComplete='off'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className='focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                            placeholder='Search'
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleClickFilter}
                        disabled={filteredStudents.length === 0}
                        className={
                          filteredStudents.length === 0
                            ? "cursor-not-allowed inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            : "inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        }
                      >
                        <FilterIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        <span className='sr-only'>Search</span>
                      </button>
                    </div>
                  </div>
                  {/* Directory list */}
                  <nav className='flex-1 min-h-0 overflow-y-auto' aria-label='Directory'>
                    {keyword === "" &&
                      Object.keys(directory)
                        .sort()
                        .map((letter) => (
                          <div key={letter} className='relative'>
                            <div className='z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500'>
                              <h3>{letter}</h3>
                            </div>
                            <ul role='list' className='relative z-0 divide-y divide-gray-200'>
                              {directory[letter].map((student) => (
                                <li key={student._id}>
                                  <div
                                    onClick={() => setProfile(student)}
                                    className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500'
                                  >
                                    <div className='flex-shrink-0 relative h-10 w-10 rounded-full overflow-hidden'>
                                      <Image
                                        placeholder='blur'
                                        blurDataURL={student.profile.image}
                                        layout='fill'
                                        objectFit='contain'
                                        src={student.profile.image}
                                        alt=''
                                      />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                      <a href='#' className='focus:outline-none'>
                                        {/* Extend touch target to entire panel */}
                                        <span className='absolute inset-0' aria-hidden='true' />
                                        <p className='text-sm font-medium text-gray-900'>
                                          {student.profile.firstName +
                                            " " +
                                            student.profile.lastName}
                                        </p>
                                        <p className='text-sm text-gray-500 truncate'>
                                          {student.rollNumber.value}
                                        </p>
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    {keyword !== "" && (
                      <div>
                        {filteredStudents.map((student) => (
                          <div key={student._id}>
                            <div
                              onClick={() => setProfile(student)}
                              className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500'
                            >
                              <div className='flex-shrink-0 relative h-10 w-10 rounded-full overflow-hidden'>
                                <Image
                                  placeholder='blur'
                                  blurDataURL={student?.profile?.image}
                                  layout='fill'
                                  objectFit='contain'
                                  src={student?.profile?.image}
                                  alt=''
                                />
                              </div>
                              <div className='flex-1 min-w-0'>
                                <a href='#' className='focus:outline-none'>
                                  {/* Extend touch target to entire panel */}
                                  <span className='absolute inset-0' aria-hidden='true' />
                                  <p className='text-sm font-medium text-gray-900'>
                                    {student?.profile?.firstName + " " + student?.profile?.lastName}
                                  </p>
                                  <p className='text-sm text-gray-500 truncate'>
                                    {student.rollNumber.value}
                                  </p>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredStudents.length === 0 && (
                          <div className='flex mt-5 flex-col justify-center items-center'>
                            <div className='relative flex-shrink-0 flex justify-center h-52 w-full'>
                              <Image
                                placeholder='blur'
                                blurDataURL='/no_results.png'
                                layout='fill'
                                objectFit='contain'
                                src='/no_results.png'
                                alt=''
                              />
                            </div>
                            <h6 className='text-2xl font-semibold text-gray-400'>
                              No Results Found
                            </h6>
                          </div>
                        )}
                      </div>
                    )}
                  </nav>
                </aside>
              </div>
            </div>
          </div>
          <div className='flex flex-col min-w-0 flex-1 overflow-hidden'>
            <div className='lg:hidden'>
              <div className='flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5'>
                <div>
                  <h1 className='text-2xl font-bold text-gray-700'>Student</h1>
                </div>
                <div>
                  <button
                    type='button'
                    className='-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600'
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className='sr-only'>Open sidebar</span>
                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex-1 relative z-0 flex overflow-hidden'>
              <main className='flex-1 relative z-0 focus:outline-none xl:order-last h-screen overflow-y-auto'>
                {/* Breadcrumb */}
                <StudentProfile student={profile} />
              </main>
            </div>
          </div>
        </div>
      ) : (
        ""
        // <EmptyState
        //   heading={"Students not found."}
        //   description={"There are no students to find from your college."}
        //   image={`/no_student_state.svg`}
        //   href={"/college/dashboard"}
        //   buttonText={"Go to dashboard"}
        // />
      )}
      {downloadOpen && (
        <div className='absolute w-full -top-[1000%]' style={{ zIndex: "-1000" }}>
          <DownloadResumes students={filteredStudents} setDownloadOpen={setDownloadOpen} />
        </div>
      )}
    </>
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
    props: {},
  };
};

export default Students;
