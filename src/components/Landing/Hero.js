import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <div className='overflow-hidden bg-gray-100 flex flex-col justify-center items-center text-center pt-10'>
      <h1 className='text-xs uppercase text-orange-800 font-semibold tracking-widest'>
        Online resume builder
      </h1>
      <h6 className='text-4xl px-10 w-full my-4 lg:font-bold lg:w-1/2 lg:px-0'>
        Only 2% of resumes make it past the first round. Be in the top 2%
      </h6>
      <p className='w-full px-10 text-center lg:px-0 lg:w-1/2'>
        Use professional field-tested resume templates that follow the exact ‘resume rules’employers
        look for. Easy to use and done within minutes - try now for free!
      </p>
      <Link href='/dashboard/student/resumes'>
        <button
          type='submit'
          className='my-5 py-5 px-5 bg-orange-500 rounded text-white font-bold text-xl tracking-wider hover:bg-orange-600'
        >
          Create Resume
        </button>
      </Link>
      <div className='heroImg'>
        <Image
          placeholder='blur'
          className='rounded-t-xl'
          src='/resume/hero-img.png'
          blurDataURL='/resume/hero-img.png'
          alt='Hero Image'
          width={770}
          height={350}
        />
      </div>
      <style jsx>
        {`
          .heroImg {
            position: relative;
            top: 200px;
            animation: animate-hero-image 2s ease-out forwards;
          }

          @keyframes animate-hero-image {
            from {
              opacity: 0;
              top: 200px;
            }
            to {
              opacity: 1;
              top: 0px;
            }
          }
        `}
      </style>
    </div>
  );
};
