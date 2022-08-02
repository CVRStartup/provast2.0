import React from "react";

export const EducationCard = ({ education }) => {
  return (
    <div className='my-4 px-4 border-l-2 border-gray-200'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-2xl text-gray-500 font-semibold'>{education.program}</h3>
          {education.board && <p className='text-sm mb-2'>Board: {education.board},</p>}
          Type: {education.educationType}
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='text-2xl font-semibold text-gray-500'>{education.score.grade}</h3>
          <p className='text-md text-orange-500'>{education.score.typeOfGrade}</p>
        </div>
      </div>

      <h3 className='flex items-center mt-4'>
        <span className='text-gray-400 text-sm font-semibold'>{education.institution} </span>
        {"  "}
        {education?.batch?.from && education?.batch?.to && (
          <span className='text-xs text-gray-400 ml-2'>
            &middot; ({education.batch.from} - {education.batch.to})
          </span>
        )}
      </h3>
      <div className='flex justify-between'>
        <div className='italic'>
          <h3>{education.branch}</h3>
        </div>
        <div className='grid text-sm grid-cols-2 gap-4'>
          <button
            type='button'
            className={`${
              education.verified ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100 "
            } inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded`}
          >
            Verified
          </button>
          <button
            type='button'
            className={`${
              education.frozen ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100 "
            } inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded`}
          >
            Frozen
          </button>
        </div>
      </div>
    </div>
  );
};
