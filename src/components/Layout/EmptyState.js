import { useUser } from "../../lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const EmptyState = ({
  description,
  heading,
  href,
  image,
  buttonText,
}) => {
  const session = useUser();
  return (
    <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="flex-shrink-0 flex justify-center">
          <div className="relative h-52 w-52">
            <Image
              placeholder="blur"
              blurDataURL={image}
              layout="fill"
              objectFit="contain"
              className=""
              src={image}
              alt=""
            />
          </div>
        </div>
        <div className="py-4">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-2 text-base text-gray-500">{description}</p>
            {session && session.category === "college" && (
              <div className="mt-6">
                <Link href={href}>
                  <a className="text-base font-medium text-orange-600 hover:text-orange-500">
                    {buttonText}
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Contact Support
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Status
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Twitter
          </a>
        </nav>
      </footer>
    </div>
  );
};
