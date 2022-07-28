import React from "react";

export const JobCardSkeleton = () => {
  return (
    <div className='flex flex-col'>
      <div className='shadow mb-5 rounded-md p-4 w-full mx-auto'>
        <div className='animate-pulse flex space-x-4 mt-2'>
          <div className='rounded-sm bg-slate-200 h-16 w-28'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='h-2 bg-slate-200 rounded col-span-2'></div>
                <div className='h-2 bg-slate-200 rounded col-span-1'></div>
                <div className='h-2 bg-slate-200 rounded col-span-1'></div>
              </div>
              <div className='h-2 bg-slate-200 rounded'></div>
            </div>
          </div>
        </div>
        <div className='animate-pulse mt-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-200 rounded col-span-2'></div>
            <div className='h-2 bg-slate-200 rounded col-span-1'></div>
          </div>
          <div className='mt-4 h-2 bg-slate-200 rounded'></div>
        </div>
      </div>
      <div className='shadow mb-5 rounded-md p-4 w-full mx-auto'>
        <div className='animate-pulse flex space-x-4 mt-2'>
          <div className='rounded-sm bg-slate-200 h-16 w-28'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='h-2 bg-slate-200 rounded col-span-2'></div>
                <div className='h-2 bg-slate-200 rounded col-span-1'></div>
                <div className='h-2 bg-slate-200 rounded col-span-1'></div>
              </div>
              <div className='h-2 bg-slate-200 rounded'></div>
            </div>
          </div>
        </div>
        <div className='animate-pulse mt-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-200 rounded col-span-2'></div>
            <div className='h-2 bg-slate-200 rounded col-span-1'></div>
          </div>
          <div className='mt-4 h-2 bg-slate-200 rounded'></div>
        </div>
      </div>
      <div className='shadow mb-5 rounded-md p-4 w-full mx-auto'>
        <div className='animate-pulse flex space-x-4 mt-2'>
          <div className='rounded-sm bg-slate-200 h-16 w-28'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='h-2 bg-slate-200 rounded col-span-2'></div>
                <div className='h-2 bg-slate-200 rounded col-span-1'></div>
                <div className='h-2 bg-slate-200 rounded col-span-1'></div>
              </div>
              <div className='h-2 bg-slate-200 rounded'></div>
            </div>
          </div>
        </div>
        <div className='animate-pulse mt-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-200 rounded col-span-2'></div>
            <div className='h-2 bg-slate-200 rounded col-span-1'></div>
          </div>
          <div className='mt-4 h-2 bg-slate-200 rounded'></div>
        </div>
      </div>
    </div>
  );
};
