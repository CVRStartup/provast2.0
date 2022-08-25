import React from "react";
import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";

const features = [
  "Creating multiple resumes.",
  "Color changing resumes.",
  "Resume based on different categories.",
  "Different fonts.",
  "Download resume in different ways.",
  "Placement Management.",
  "Assessments.",
  "Downloading Students data.",
  "Viewing different test patterns.",
  "Learning modules for knowledge.",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Guide = () => {
  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Pricing section with single price and feature list */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="pb-16 xl:flex xl:items-center xl:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
              <span className="text-gray-900">Everything you need from </span>
              <span className="text-orange-600">Provast</span>
            </h1>
            <p className="mt-5 text-xl text-gray-500">Includes every feature we offer.</p>
          </div>
          <Link href={"/auth/signup"}>
            <a className="mt-8 w-full bg-orange-600 border border-transparent rounded-md py-3 px-5 inline-flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 sm:mt-10 sm:w-auto xl:mt-0">
              Get started today
            </a>
          </Link>
        </div>
        <div className="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
          <div>
            <h2 className="text-base font-semibold text-orange-600 uppercase tracking-wide">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">All-in-one platform</p>
            <p className="mt-4 text-lg text-gray-500">
              Our platform is specifically targeted at students and their colleges to smoothen the
              process of job placements through a seamlessly designed interface.
            </p>
          </div>
          <div className="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
            <ul role="list" className="divide-y divide-gray-200">
              {features.slice(0, 5).map((feature, featureIdx) => (
                <li
                  key={feature}
                  className={classNames(featureIdx === 0 ? "md:py-0 md:pb-4" : "", "py-4 flex")}
                >
                  <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                  <span className="ml-3 text-base text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
            <ul
              role="list"
              className="border-t border-gray-200 divide-y divide-gray-200 md:border-t-0"
            >
              {features.slice(5).map((feature, featureIdx) => (
                <li
                  key={feature}
                  className={classNames(
                    featureIdx === 0 ? "md:border-t-0 md:py-0 md:pb-4" : "",
                    "py-4 flex"
                  )}
                >
                  <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                  <span className="ml-3 text-base text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
