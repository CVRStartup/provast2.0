import React from "react";

export const Career = () => {
  return (
    <div className='flex flex-col align-center lg:justify-evenly lg:flex-row my-10 lg:pb-40'>
      <div className='mt-48 flex flex-col text-center items-center justify-center xl:w-1/2 lg:mt-0 sm:order-2 lg:order-1 lg:items-start lg:text-left'>
        <h1 className='text-xs uppercase text-yellow-400 font-semibold tracking-widest'>
          START BUILDING YOUR CAREER
        </h1>
        <h6 className='text-4xl text-white font-bold my-2 lg:w-3/4'>
          Professional resumes for effective job interviews
        </h6>
        <p className='text-sm text-white font-base xl:w-3/4'>
          A great job application leads to a good interview. An amazing resume is what makes it all
          possible. Start off strong with the hiring manager by creating a positive professional
          image. A job interview can be much easier if they have a favorable view of your CV and
          cover letter.
        </p>
        <div className='flex'>
          <button
            type='submit'
            className='mr-2 my-5 py-4 px-4 bg-orange-500 rounded text-white font-bold text-md tracking-wider hover:bg-orange-600'
          >
            Get Started Now
          </button>
          <button
            type='submit'
            className='my-5 py-4 px-4 border rounded text-white font-bold text-md tracking-wider hover:text-orange-600 hover:border-orange-600'
          >
            Resume Examples
          </button>
        </div>
      </div>
      <div className='w-full flex items-center justify-center lg:w-1/2 sm:order-1 lg:order-2 lg:my-0'>
        <img
          className='relative rounded shadow-2xl left-36 top-0'
          src='/resume/promotions/template-3.png'
          alt=''
        />

        <img
          className='relative rounded shadow-2xl left-0 top-16'
          src='/resume/promotions/template-2.png'
          alt=''
        />
        <img
          className='relative rounded shadow-2xl -left-36 top-40'
          src='/resume/promotions/template-1.png'
          alt=''
        />
      </div>
    </div>
  );
};
