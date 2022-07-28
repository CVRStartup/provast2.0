import React, { useEffect, useState } from 'react';

export const Sort = ({ filteredJobs, sortJobs }) => {
  const [sort, setSort] = useState('');

  useEffect(() => {
    sortJobs(sort);
  }, [sort]);

  return (
    <div className='px-4 flex justify-between items-center'>
      <span className='text-lg font-bold'>
        {filteredJobs?.length} Jobs Found
      </span>
      <div className='flex items-center'>
        <span className='text-sm text-sm font-semibold'>Sort By</span>
        <select
          id='filter'
          name='filter'
          className='mt-1 ml-2 block py-1 text-base border-gray-300 sm:text-sm rounded-md'
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Recent</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>
  );
};
