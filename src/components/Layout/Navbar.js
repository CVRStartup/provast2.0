import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { LoginDropdown } from "./LoginDropdown";
import { useUser } from "../../lib/hooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const session = useUser();
  const router = useRouter();
  const landingNavigation = [
    { name: "Resumes", href: "/dashboard/student/resumes" },
    {
      name: "Test Patterns",
      href: "/dashboard/student/testpatterns",
    },
    // {
    //   name: "Assessments",
    //   href: "/",
    // },
    {
      name: "Open Jobs",
      href: "/openjobs",
    },
  ];
  const adminNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      name: "Open Jobs",
      href: "/dashboard/admin/openjobs",
    },
  ];
  const collegeNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard/college",
    },
    {
      name: "Notices",
      href: "/dashboard/college/notices",
    },
    {
      name: "Students",
      href: "/dashboard/college/students",
    },
    {
      name: "Jobs",
      href: "/dashboard/college/jobs",
    },
    // {
    //   name: "Assessments",
    //   href: "/dashboard/college/assessments",
    // },
  ];

  const studentNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard/student",
    },
    {
      name: "Notices",
      href: "/dashboard/student/notices",
    },
    {
      name: "Resumes",
      href: "/dashboard/student/resumes",
    },
    // {
    //   name: "Assessments",
    //   href: "/dashboard/student/assessments",
    // },
    {
      name: "Test Patterns",
      href: "/dashboard/student/testpatterns",
    },
    // {
    //   name: "Learn",
    //   href: "/dashboard/student/learn",
    // },
  ];

  const individualNavigation = [
    {
      name: "Resumes",
      href: "/dashboard/individual/resumes",
    },
    {
      name: "Test Patterns",
      href: "/dashboard/student/testpatterns",
    },
    {
      name: "Open Jobs",
      href: "/openjobs",
    },
  ];

  if (session?.college?.name !== "SRM Institute of Science and Technology") {
    collegeNavigation.push({
      name: "Assessments",
      href: "/dashboard/college/assessments",
    });
    studentNavigation.push({
      name: "Assessments",
      href: "/dashboard/student/assessments",
    });
  }
  const [navigation, setNavigation] = useState(landingNavigation);

  useEffect(() => {
    if (!session) setNavigation(landingNavigation);
    else if (session?.category === "college") setNavigation(collegeNavigation);
    else if (session?.category === "student") setNavigation(studentNavigation);
    else if (session?.category === "admin") setNavigation(adminNavigation);
    else if (session?.category === "individual") setNavigation(individualNavigation);
  }, [session]);

  if (
    router.pathname.split("/").indexOf("auth") !== -1 ||
    (router.pathname.split("/")[3] === "resumes" && router.pathname.split("/")[4] === "[id]") ||
    router.pathname.indexOf("approvalpending") !== -1 ||
    router.pathname.indexOf("viewresume") !== -1 ||
    router.pathname.indexOf("checkout") !== -1
  )
    return <></>;

  return (
    <Popover className='fixed top-0 left-0 z-40 w-full bg-gray-100 h-[10vh]'>
      <div className='flex justify-between items-center px-4 sm:px-6 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1 '>
          <Link href={"/"} passHref>
            <div className='w-44 h-[10vh] flex items-center p-2'>
              <div className='relative h-full w-full object-cover rounded-md cursor-pointer'>
                <Image
                  placeholder='blur'
                  blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
                  layout='fill'
                  objectFit='contain'
                  className=''
                  src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
                  alt=''
                />
              </div>
            </div>
          </Link>
        </div>
        <div className='-mr-2 -my-2 md:hidden'>
          <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500'>
            <span className='sr-only'>Open menu</span>
            <MenuIcon className='h-6 w-6' aria-hidden='true' />
          </Popover.Button>
        </div>
        <Popover.Group as='nav' className='hidden md:flex space-x-5'>
          {navigation.map((option, index) => (
            <Link key={index} href={option.href}>
              <a
                key={option.name}
                href={option.href}
                className='text-gray-900 hover:text-orange-400
                  rounded-md py-2 px-3 inline-flex options-center text-[15px] font-medium'
              >
                {option.name}
              </a>
            </Link>
          ))}
        </Popover.Group>
        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
          {session?.college?.name === "SRM Institute of Science and Technology" && (
            <div className='relative h-20 w-20 object-cover rounded-md cursor-pointer'>
              <Image
                placeholder='blur'
                blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1661498646/SRMIST-01_CMYK_tqqfn8.png'
                layout='fill'
                objectFit='contain'
                className=''
                src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1661498646/SRMIST-01_CMYK_tqqfn8.png'
                alt=''
              />
            </div>
          )}
          {session?.profile?.image && (
            <div className='hidden sm:ml-6 sm:flex sm:items-center'>
              <div className='relative h-10 w-10'>
                <Image
                  placeholder='blur'
                  blurDataURL={session?.profile?.image}
                  layout='fill'
                  objectFit='fill'
                  className='rounded-full'
                  src={session?.profile?.image}
                  alt=''
                />
              </div>
            </div>
          )}
          {session ? (
            <>
              <LoginDropdown session={session} />
            </>
          ) : (
            <>
              <Link href='/auth/login' passHref>
                <a className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md font-medium text-gray-900 bg-gray-100 hover:border-gray-400'>
                  Log in
                </a>
              </Link>
              <Link href='/auth/signup' passHref>
                <a className='ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md font-medium text-black bg-gray-200 hover:bg-gray-300'>
                  Sign up
                </a>
              </Link>
            </>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <Link href={"/"} passHref>
                  <div className='w-40 h-[10vh] p-4'>
                    <div className='relative h-full w-full object-cover rounded-md cursor-pointer'>
                      <Image
                        placeholder='blur'
                        blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
                        layout='fill'
                        objectFit='contain'
                        className=''
                        src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
                        alt=''
                      />
                    </div>
                  </div>
                </Link>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500'>
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='py-6 px-5'>
              <div className='grid grid-cols-2 gap-4'>
                {navigation.map((option, index) => (
                  <Link key={index} href={option.href} passHref>
                    <a className='text-base font-medium text-gray-900 hover:text-gray-700'>
                      {option.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className='mt-6'>
                <Link href={"/auth/signup"} passHref>
                  <a className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700'>
                    Sign In
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
