import Image from "next/image";
import React from "react";

export const Promotion = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center pt-10 mb-20'>
      <Image
        placeholder='blur'
        src='/resume/promotions/Promotion.svg'
        blurDataURL='/resume/promotions/Promotion.svg'
        alt='promotion'
        width={75}
        height={75}
      />
      <h6 className='text-4xl px-10 w-full my-4 lg:font-bold lg:w-2/5 lg:px-0'>
        Create perfect resumes for the modern job market
      </h6>
      <p className='w-full px-10 text-center lg:px-0 lg:w-2/5'>
        Creating a resume or cover letter has never been this easy! In three simple steps, create
        the perfect document to impress hiring managers and employers. Minimum time, maximum
        professional quality.
      </p>

      <button
        type='submit'
        className='my-5 py-4 px-5 bg-orange-500 rounded text-white font-bold text-md tracking-wider hover:bg-orange-600'
      >
        Create My Resume
      </button>
    </div>
  );
};
