import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const sliderData = [
  {
    id: 1,
    heading: "Online Resume Builder",

    image: "/resume/hero-img.png",
    title: "Only 2% of resumes make it past the first round. Be in the top 2%.",
    description:
      "Use professional field-tested resume templates that follow the exact ‘resume rules’employers look for. Easy to use and done within minutes - try now for free!",
    button: "Create Resume",
    buttonLink: "/dashboard/student/resumes",
  },
  {
    id: 2,
    heading: "Online Job Viewer",

    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1653392484/amazon_wx1wek.webp",
    title: "Find your dream job now on Provast.",
    description: "Be a Priority Applicant & increase your chance of getting a call.",
    button: "Apply Job",
    buttonLink: "/dashboard/student",
  },
];

export const Slider = () => {
  const [blogs, setBlogs] = useState(sliderData);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = blogs.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, blogs]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div>
      <section className='pt-4 relative w-full mx-auto overflow-hidden min-h-screen bg-gray-100'>
        {blogs.map((blog, blogIndex) => {
          const { id, image, description, title, heading, buttonLink, button } = blog;

          let position = "nextSlide";
          if (blogIndex === index) {
            position = "activeSlide";
          }

          if (blogIndex === index - 1 || (index === 0 && blogIndex === blogs.length - 1)) {
            position = "lastSlide";
          }

          return (
            <article
              key={id}
              className={`flex flex-col justify-between items-center absolute w-full activeSlide transition duration-1000 ease-in-out ${position} `}
            >
              <div className='overflow-hidden w-full bg-gray-100 flex flex-col justify-center items-center text-center'>
                <h1 className='text-xs uppercase text-orange-800 font-semibold tracking-widest'>
                  {heading}
                </h1>
                <h6 className='text-2xl lg:text-4xl px-10 w-full my-4 font-bold lg:w-1/2 lg:px-0'>
                  {title}
                </h6>
                <p className='w-full px-10 text-center lg:px-0 lg:w-1/2'>{description}</p>
                <Link href={buttonLink} passHref>
                  <button className='p-3 my-5 lg:p-5 bg-orange-500 rounded text-white font-bold text-xl tracking-wider hover:bg-orange-600'>
                    {button}
                  </button>
                </Link>
                <div className='heroImg'>
                  <Image
                    className='rounded-t-xl'
                    src={image}
                    alt='Hero Image'
                    width={770}
                    height={350}
                  />
                </div>
              </div>
            </article>
          );
        })}
        <div className='absolute top-[50%] md:top-[40%] left-0'>
          <button
            onClick={() => setIndex(index - 1)}
            className='text-4xl md:text-[100px] text-gray-500 hover:text-gray-700'
          >
            <FiChevronLeft />
          </button>
        </div>
        <div className='absolute top-[50%] md:top-[40%] right-0'>
          <button
            onClick={() => setIndex(index + 1)}
            className='text-4xl md:text-[100px] text-gray-500 hover:text-gray-700'
          >
            <FiChevronRight />
          </button>
        </div>
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
