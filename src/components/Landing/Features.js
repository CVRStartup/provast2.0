import Image from "next/image";
import React from "react";

export const Features = () => {
  return (
    <div>
      <h6 className='w-full text-center text-4xl font-extrabold md:w-3/4 lg:w-1/2 mx-auto px-4 my-10'>
        Features designed to help you win your dream job
      </h6>
      <div className='flex flex-row flex-wrap justify-evenly my-10 px-10'>
        <div className='w-full md:w-96 flex flex-col my-6 md:flex-row'>
          <div className='flex items-center justify-center md:items-start md:justify-start md:w-1/2'>
            <Image
              placeholder='blur'
              src='/resume/guide/guide-2.svg'
              blurDataURL='/resume/guide/guide-2.svg'
              alt='features'
              width={56}
              height={56}
            />
          </div>
          <div className='text-center md:text-left'>
            <h6 className='text-orange-800 font-bold text-lg'>Easy online resume builder</h6>
            <p className='text-md text-gray-600 lg:pr-8 '>
              Create an awesome resume, cover letter or online profile without leaving your web
              browser.
            </p>
          </div>
        </div>
        <div className='w-full md:w-96 flex flex-col my-6 md:flex-row'>
          <div className='flex items-center justify-center md:items-start md:justify-start md:w-1/2'>
            <Image
              placeholder='blur'
              src='/resume/guide/guide-2.svg'
              blurDataURL='/resume/guide/guide-2.svg'
              alt='features'
              width={56}
              height={56}
            />
          </div>
          <div className='text-center md:text-left'>
            <h6 className='text-orange-800 font-bold text-lg'>Easy online resume builder</h6>
            <p className='text-md text-gray-600 lg:pr-8 '>
              Create an awesome resume, cover letter or online profile without leaving your web
              browser.
            </p>
          </div>
        </div>
        <div className='w-full md:w-96 flex flex-col my-6 md:flex-row'>
          <div className='flex items-center justify-center md:items-start md:justify-start md:w-1/2'>
            <Image
              placeholder='blur'
              src='/resume/guide/guide-2.svg'
              blurDataURL='/resume/guide/guide-2.svg'
              alt='features'
              width={56}
              height={56}
            />
          </div>
          <div className='text-center md:text-left'>
            <h6 className='text-orange-800 font-bold text-lg'>Easy online resume builder</h6>
            <p className='text-md text-gray-600 lg:pr-8 '>
              Create an awesome resume, cover letter or online profile without leaving your web
              browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
