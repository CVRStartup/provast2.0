import React from "react";

export const Heading = ({ subheading, description, heading = "" }) => {
  return (
    <div className='mt-4 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6'>
      <div className='text-center'>
        <h1 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl'>
          {heading && <span className='block'>{heading}</span>}
          {subheading && <span className='block text-orange-600'>{subheading}</span>}
        </h1>
        {description && (
          <p className='mb-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-md md:mt-2 md:text-lg md:max-w-3xl'>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
