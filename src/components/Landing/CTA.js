import Link from "next/link";

export const CTA = () => {
  return (
    <div className='max-w-7xl mx-auto bg-gradient-to-r from-cyan-600 to-green-400'>
      <div className='max-w-2xl mx-auto py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
          <span className='block'>Boost your Resume reach and visibility.</span>
          <span className='block text-cyan-900'>Start using Provast today.</span>
        </h2>
        <p className='mt-4 text-lg leading-6 text-cyan-100'>
          Provast aim to provide a platform for those desiring to enter the industry, that keeps in
          mind the various roles, skills, and expertise professionals would require to carve a niche
          for themselves.
        </p>
        <Link href='/auth/signup'>
          <a className='mt-8 w-full bg-white border border-transparent rounded-md py-3 px-5 inline-flex items-center justify-center text-base font-medium text-cyan-700 hover:bg-gray-100 sm:w-auto'>
            Sign up for free
          </a>
        </Link>
      </div>
    </div>
  );
};
