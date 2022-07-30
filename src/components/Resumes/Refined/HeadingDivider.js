/* This example requires Tailwind CSS v2.0+ */
export const HeadingDivider = ({ heading }) => {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center' aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
      </div>
      <div className='relative flex justify-center'>
        <span className='px-3 bg-white text-2xl italic font-bold text-gray-700'>{heading}</span>
      </div>
    </div>
  );
};
