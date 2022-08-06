import React from "react";

export const ResumeBuilder = () => {
  return (
    <div className='flex flex-col align-center lg:justify-evenly lg:flex-row my-10 lg:pb-40'>
      <div className='mt-48 flex flex-col text-center items-center justify-center xl:w-1/2 lg:mt-0 sm:order-1 lg:order-2 lg:items-start lg:text-left'>
        <h6 className='text-4xl font-bold my-2 lg:w-3/4'>
          Try our professional Resume builder now!
        </h6>
        <p className='text-sm font-base xl:w-3/4'>
          Try our professional Resume builder now! Save time with our easy 3-step resume builder. No
          more writer’s block or formatting difficulties in Word. Rapidly make a perfect resume
          employers love.
        </p>
        <div className='flex'>
          <button
            type='submit'
            className='text-white mr-2 my-5 py-4 px-4 bg-orange-500 rounded font-bold text-md tracking-wider hover:bg-orange-600'
          >
            Create My Resume
          </button>
          <button
            type='submit'
            className='my-5 py-4 px-4 border rounded font-bold text-md tracking-wider hover:text-orange-500  hover:text-orange-600 hover:border-orange-600'
          >
            Resume Examples
          </button>
        </div>
      </div>
      <div className='w-full flex items-center justify-center lg:w-1/2 sm:order-2 lg:order-1 lg:my-0'>
        <img
          className='relative rounded shadow-2xl left-36 top-0 transform -rotate-12'
          src='/resume/promotions/builder/template-4.png'
          alt=''
        />

        <img
          className='relative rounded shadow-2xl -left-16 -top-5 transform -rotate-2'
          src='/resume/promotions/builder/template-5.png'
          alt=''
        />
        <img
          className='relative rounded shadow-2xl -left-72 top-2 transform rotate-12'
          src='/resume/promotions/builder/template-6.png'
          alt=''
        />
      </div>
    </div>
  );
};
