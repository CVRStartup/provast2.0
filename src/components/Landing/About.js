import React from "react";
const stats = [
  { label: "Founded", value: "2022" },
  { label: "Employees", value: "5" },
];
export const About = () => {
  return (
    <div id="about-us" className="relative mx-auto max-w-md px-4 sm:max-w-7xl sm:px-6 lg:px-9">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <h2 className="text-3xl text-gray-900 font-bold tracking-tight sm:text-4xl sm:tracking-tight">
          On a mission to empower teams
        </h2>
        <div className="mt-6 text-gray-500 space-y-6">
          <p className="text-lg">
            At PROVAST, we aim to provide a platform for those desiring to present themselves to a
            recruiter, with a resume that reaches and creates an impact to ensure qualitative
            engagement during the recruitment process.
          </p>
          <p className="text-base leading-7">
            Our platform is specifically designed for students and institutions to build resumes of
            choice for targeted recruiters and smoothen the entire cycle of campus recruitment
            process, for institutions.
          </p>
        </div>
      </div>

      {/* <div className='mt-10'>
        <dl className='grid grid-cols-2 gap-x-4 gap-y-8'>
          {stats.map((stat) => (
            <div key={stat.label} className='border-t-2 border-gray-100 pt-6'>
              <dt className='text-base font-medium text-gray-500'>{stat.label}</dt>
              <dd className='text-3xl font-bold tracking-tight text-gray-900'>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div> */}
    </div>
  );
};
