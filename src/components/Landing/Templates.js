import Image from "next/image";
import React from "react";

export const Templates = () => {
  return (
    <div className='flex justify-around bg-orange-800 py-20 h-screen overflow-x-hidden'>
      <div className='w-1/4 flex flex-wrap content-between h-full text-white'>
        <div className=''>
          <h6 className='text-4xl font-black'>Beautiful ready-to-use resume templates</h6>
          <p className='my-4'>
            Win over employers and recruiters by using one of our 18 elegant,
            professionally-designed resume templates. Download to word or PDF.
          </p>
          <button
            type='submit'
            className='mb-5 py-4 px-4 bg-orange-500 rounded font-bold text-md tracking-wider hover:bg-orange-600'
          >
            Select Template
          </button>
        </div>
        <div className=''>
          <div className='flex my-2'>
            <div className='relative w-8'>
              <Image
                placeholder='blur'
                blurDataURL='/resume/promotions/star-full.svg'
                layout='fill'
                objectFit='contain'
                className=''
                src='/resume/promotions/star-full.svg'
                alt=''
              />
            </div>
            <div className='relative w-8'>
              <Image
                placeholder='blur'
                blurDataURL='/resume/promotions/star-full.svg'
                layout='fill'
                objectFit='contain'
                className=''
                src='/resume/promotions/star-full.svg'
                alt=''
              />
            </div>
            <div className='relative w-8'>
              <Image
                placeholder='blur'
                blurDataURL='/resume/promotions/star-full.svg'
                layout='fill'
                objectFit='contain'
                className=''
                src='/resume/promotions/star-full.svg'
                alt=''
              />
            </div>
            <div className='relative w-8'>
              <Image
                placeholder='blur'
                blurDataURL='/resume/promotions/star-full.svg'
                layout='fill'
                objectFit='contain'
                className=''
                src='/resume/promotions/star-full.svg'
                alt=''
              />
            </div>
            <div>
              <img src='/resume/promotions/star-half.svg' alt='' />
            </div>
          </div>
          <p>4.5 out of 5</p>
          <p className='text-xs'>
            based on 36,238 reviews on <a className='underline'>Trustpilot</a>
          </p>
        </div>
      </div>
      <div className='w-1/2 relative'>
        <div className='mx-2 absolute -left-32 top-0'>
          <Image
            placeholder='blur'
            src='/resume/promotions/template-7.png'
            blurDataURL='/resume/promotions/template-7.png'
            alt=''
            width={400}
            height={550}
          />
        </div>
        <div className='mx-4 absolute right-10 top-0'>
          <Image
            placeholder='blur'
            src='/resume/promotions/template-8.png'
            blurDataURL='/resume/promotions/template-8.png'
            alt=''
            width={400}
            height={550}
          />
        </div>
        <div className='mx-4 absolute -right-96 top-0'>
          <Image
            placeholder='blur'
            src='/resume/promotions/template-9.png'
            blurDataURL='/resume/promotions/template-9.png'
            alt=''
            width={400}
            height={550}
          />
        </div>
      </div>
    </div>
  );
};
