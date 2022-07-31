import React from "react";

export const Footer = () => {
  return (
    <footer className='max-w-7xl mx-auto bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pb-10 lg:px-8'>
        <h2 className='sr-only'>Footer</h2>
        <div className='border-t border-gray-700 pt-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between xl:mt-0'>
          <div className='space-y-2'>
            <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
              Subscribe to our newsletter
            </h3>
            <p className='text-base text-gray-300'>
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
          </div>
          <form className='sm:flex sm:max-w-md'>
            <label htmlFor='email-address' className='sr-only'>
              Email address
            </label>
            <input
              type='email'
              name='email-address'
              id='email-address'
              autoComplete='email'
              required
              className='min-w-0 w-full bg-white border border-transparent py-2 px-4 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white focus:border-white focus:placeholder-gray-400 sm:max-w-xs rounded-md'
              placeholder='Enter your email'
            />
            <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
              <button
                type='submit'
                className='w-full bg-gray-700 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white'
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className='mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between'>
          <p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>
            &copy; 2022 Provast, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
