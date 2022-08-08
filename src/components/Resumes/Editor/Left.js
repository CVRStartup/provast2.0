import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { useUser } from "../../../lib/hooks";
import { AwardDisplay } from "../Displays/Awards";
import { CertificateDisplay } from "../Displays/Certification";
import { EducationDisplay } from "../Displays/Education";
import { HobbiesDisplay } from "../Displays/Hobbies";
import { LanguageDisplay } from "../Displays/Languages";
import { ObjectiveDisplay } from "../Displays/Objective";
import { ProfileDisplay } from "../Displays/Profile";
import { ProjectsDisplay } from "../Displays/Projects";
import { SkillDisplay } from "../Displays/Skills";
import { SocialDisplay } from "../Displays/Social";
import { WorkExperienceDisplay } from "../Displays/WorkExperience";
import { Nav } from "./Nav";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Left = ({ resumeDetails }) => {
  const user = useUser();
  const { setSidebarOpen, sidebarOpen } = useModelContext();
  const { setResume, layout, structure } = useResumeContext();
  useEffect(() => {
    setResume(resumeDetails);
  }, [resumeDetails, setResume]);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='w-[100%] fixed inset-0 flex z-40 lg:hidden'
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
            <div className='relative flex-1 flex flex-col max-w-xs w-full bg-gray-800'>
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
                <div className='px-4'>
                  <div className='relative h-12'>
                    <Image
                      placeholder='blur'
                      blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_W_uoqbkv.png'
                      layout='fill'
                      objectFit='contain'
                      className=''
                      src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_W_uoqbkv.png'
                      alt=''
                    />
                  </div>
                </div>
                {structure && layout && (
                  <div className='mt-5 px-4 space-y-1 overflow-auto'>
                    {structure[layout.template]?.includes("profile") && <ProfileDisplay />}
                    {structure[layout.template]?.includes("social") && <SocialDisplay />}
                    {structure[layout.template]?.includes("objective") && <ObjectiveDisplay />}
                    {structure[layout.template]?.includes("work") && <WorkExperienceDisplay />}
                    {structure[layout.template]?.includes("education") && <EducationDisplay />}
                    {structure[layout.template]?.includes("projects") && <ProjectsDisplay />}
                    {structure[layout.template]?.includes("awards") && <AwardDisplay />}
                    {structure[layout.template]?.includes("certifications") && (
                      <CertificateDisplay />
                    )}
                    {structure[layout.template]?.includes("skills") && <SkillDisplay />}
                    {structure[layout.template]?.includes("hobbies") && <HobbiesDisplay />}
                    {structure[layout.template]?.includes("languages") && <LanguageDisplay />}
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className='hidden lg:flex lg:w-[30%] lg:flex-col lg:fixed lg:inset-y-0 '>
        <div className='flex-1 flex flex-col min-h-0 bg-gray-800'>
          <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto scroll-smooth'>
            <div className='px-4'>
              {/* <img
                className="h-12"
                src="https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_W_uoqbkv.png"
                alt=""
              /> */}
              <div className='relative h-12'>
                <Image
                  placeholder='blur'
                  blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_W_uoqbkv.png'
                  layout='fill'
                  objectFit='contain'
                  className=''
                  src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_W_uoqbkv.png'
                  alt=''
                />
              </div>
            </div>
            <Nav />

            {structure && layout && (
              <div className='ml-16 mr-4 mt-5 flex-1 px-2 space-y-1'>
                {structure[layout.template]?.includes("profile") && <ProfileDisplay />}
                {structure[layout.template]?.includes("social") && <SocialDisplay />}
                {structure[layout.template]?.includes("objective") && <ObjectiveDisplay />}
                {structure[layout.template]?.includes("work") && <WorkExperienceDisplay />}
                {structure[layout.template]?.includes("education") && <EducationDisplay />}
                {structure[layout.template]?.includes("projects") && <ProjectsDisplay />}
                {structure[layout.template]?.includes("awards") && <AwardDisplay />}
                {structure[layout.template]?.includes("certifications") && <CertificateDisplay />}
                {structure[layout.template]?.includes("skills") && <SkillDisplay />}
                {structure[layout.template]?.includes("hobbies") && <HobbiesDisplay />}
                {structure[layout.template]?.includes("languages") && <LanguageDisplay />}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='lg:pl-64 flex flex-col flex-1'>
        <div className='sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100'>
          <button
            type='button'
            className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <MenuIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='flex items-center justify-center fixed bottom-[10px] h-10 w-10 rounded-full left-[7px] bg-white cursor-pointer hover:bg-gray-200'>
          <Link
            href={`/dashboard/${user?.category === "student" ? "student" : "individual"}/resumes`}
          >
            <HiOutlineArrowNarrowLeft size={28} color='#404040' />
          </Link>
        </div>
      </div>
      <style>{`
        ::-webkit-scrollbar {
          width: 7px;
          height: 5px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 20px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 20px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .backlinker {
          width: 50px;
        }
        
        #backtext, #backline {
          transition: all .3s;
        }
        
        #backtext {
          opacity: 0;
          transform: translateX(-50px);
        }
        
        #backline {
          transform: translateX(0px);
        }
        
        .backhref:hover #backtext {
          opacity: 1;
          transform: translateX(0px);
        }
        
        .backhref:hover #backline {
          transform: translateX(-50px);
        }
        
        .backhref:hover #backline {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
