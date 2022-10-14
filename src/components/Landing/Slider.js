import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const sliderData = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1665769905/resume_dapoq9.jpg",
    title:
      "With PROVAST Top Resume Templates be among every chance for getting shortlisted for every hiring",
    description:
      "Use professional field-tested resume templates that follow the exact ‘resume rules’employers look for. Easy to use and done within minutes - try now for free!",
    button: "Create Resume",
    buttonLink: "/dashboard/student/resumes",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1665769905/8460510_1_xauyvl.jpg",
    title: "Find your dream job now on Provast.",
    description: "Be a Priority Applicant & increase your chance of getting a call.",
    button: "Apply Job",
    buttonLink: "/dashboard/student",
  },
];

export const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = sliderData.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, sliderData]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 10000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div>
      <section className='relative w-full mx-auto overflow-hidden h-screen lg:h-96 mb-5'>
        {sliderData.map((blog, blogIndex) => {
          const { id, image, description, title, button, buttonLink } = blog;

          let position = "nextSlide";
          if (blogIndex === index) {
            position = "activeSlide";
          }

          if (blogIndex === index - 1 || (index === 0 && blogIndex === sliderData.length - 1)) {
            position = "lastSlide";
          }

          return (
            <article
              key={id}
              className={`flex flex-col h-full justify-between items-center absolute w-full activeSlide transition duration-1000 ease-in-out ${position} lg:flex-row`}
            >
              <div className='text-center grid content-between h-full order-2 md:order-1  md:text-left lg:w-[50%]'>
                <div className='md:p-5'>
                  {/* <div className='my-6 flex items-end justify-center font-semibold text-gray-500 w-full md:justify-start md:my-0'>
                    <span className='text-4xl'>0{id}</span>
                    <span className='mx-1 text-lg'>/</span>
                    <span className='text-xl'>0{sliderData.length}</span>
                  </div> */}

                  <h1 className='text-2xl font-semibold my-4'>{title}</h1>

                  <p className='mb-4 text-gray-500'>{description}</p>
                  <Link href={buttonLink}>
                    <button
                      type='button'
                      className='inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                    >
                      {button}
                    </button>
                  </Link>
                </div>
                <div className='flex items-end justify-between'>
                  <button
                    onClick={() => setIndex(index - 1)}
                    className='text-5xl text-gray-500 hover:text-gray-700'
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={() => setIndex(index + 1)}
                    className='text-5xl text-gray-500 hover:text-gray-700'
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
              <div className='relative w-full lg:w-[50%] h-full'>
                <Image
                  placeholder='blur'
                  blurDataURL={image}
                  layout='fill'
                  objectFit='contain'
                  src={image}
                  alt=''
                />
              </div>
            </article>
          );
        })}
      </section>

      <style jsx>{`
        .activeSlide {
          opacity: 1;
          transform: translateX(0);
        }
        .lastSlide {
          opacity: 0;
          transform: translateX(-100%);
        }
        .nextSlide {
          opacity: 0;
          transform: translateX(100%);
        }
      `}</style>
    </div>
  );
};
