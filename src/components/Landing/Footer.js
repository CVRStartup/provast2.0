import React from "react";

export const Footer = () => {
  return (
    <footer className='max-w-7xl mx-auto bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pb-10 lg:px-8'>
        <h2 className='sr-only'>Footer</h2>
        <div className='border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between'>
          <p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>
            &copy; 2022 Provast, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
