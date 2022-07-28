import Link from "next/link";
import React from "react";
import { ArrowNarrowLeftIcon, HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export const JobHeader = () => {
  const router = useRouter();
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard/student" },
    { name: router.query.id, href: `/dashboard/student/jobs/${router.query.id}` },
  ];
  return (
    <header className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='border-t border-gray-200 py-3'>
          <nav className='flex' aria-label='Breadcrumb'>
            <div className='flex sm:hidden'>
              <Link href='/dashboard/student'>
                <a className='group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700'>
                  <ArrowNarrowLeftIcon
                    className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600'
                    aria-hidden='true'
                  />
                  <span>Back to Dashboard</span>
                </a>
              </Link>
            </div>
            <div className='hidden sm:block'>
              <ol role='list' className='flex items-center space-x-4'>
                <li>
                  <div>
                    <Link href='/'>
                      <a className='text-gray-400 hover:text-gray-500'>
                        <HomeIcon className='flex-shrink-0 h-5 w-5' aria-hidden='true' />
                        <span className='sr-only'>Home</span>
                      </a>
                    </Link>
                  </div>
                </li>
                {breadcrumbs.map((item) => (
                  <li key={item.name}>
                    <div className='flex items-center'>
                      <svg
                        className='flex-shrink-0 h-5 w-5 text-gray-300'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                      >
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                      <Link href={item.href} aria-current={item.current ? "page" : undefined}>
                        <a className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
                          {item.name}
                        </a>
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
