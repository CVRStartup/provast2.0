import Image from "next/image";
import Link from "next/link";
import React from "react";
const Custom404 = () => {
  return (
    <>
      <div className="min-h-full pt-32 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Image
              placeholder="blur"
              blurDataURL="https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png"
              height={"70px"}
              width={"200px"}
              className="object-cover rounded-md cursor-pointer"
              src="https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png"
              alt=""
            />
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-base font-medium text-orange-600 hover:text-orange-500"
                >
                  <a>
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Contact Support
            </a>
            <span className="inline-block border-l border-gray-300" aria-hidden="true" />
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Status
            </a>
            <span className="inline-block border-l border-gray-300" aria-hidden="true" />
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Twitter
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Custom404;
