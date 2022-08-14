import React from "react";
const people = [
  {
    name: "Thushar KE",
    role: "Director",
    imageUrl:
      "https://res.cloudinary.com/dj7nomqfd/image/upload/v1659940128/1629926488607_kaipmb.jpg",
  },
  {
    name: "Adil Shaik",
    role: "Director",
    imageUrl: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1656491326/adil_vhelan.jpg",
  },
];

export const Testimonials = () => {
  return (
    <div className='bg-white'>
      <div className='mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8'>
          <div className='space-y-5 sm:space-y-4'>
            <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
              Meet our leadership
            </h2>
            <p className='text-xl text-gray-500'>
              Teamwork is the ability to work together toward a common vision. The ability to direct
              individual accomplishments toward organizational objectives. It is the fuel that
              allows common people to attain uncommon results.
            </p>
          </div>
          <div className='lg:col-span-2'>
            <ul
              role='list'
              className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8'
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className='flex items-center space-x-4 lg:space-x-6'>
                    <img
                      className='object-cover w-16 h-16 rounded-full lg:w-20 lg:h-20'
                      src={person.imageUrl}
                      alt=''
                    />
                    <div className='font-medium text-lg leading-6 space-y-1'>
                      <h3>{person.name}</h3>
                      <p className='text-orange-600'>{person.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
