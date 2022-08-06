import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

export const MultiInput = ({ title, extraOptions, handleExtraOptions, deleteOption }) => {
  const [extra, setExtra] = useState("");
  return (
    <div className=''>
      <label htmlFor='extra' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
        {title}
      </label>
      <div>
        <div className='mt-1 flex items-center justify-between'>
          <input
            className='mr-2 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm border-gray-300 rounded-md'
            type='text'
            placeholder='SDE'
            value={extra}
            name='name'
            onChange={(e) => setExtra(e.target.value)}
          />
          <div
            className='py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-orange-500 bg-orange-600 cursor-pointer text-white'
            onClick={(e) => {
              setExtra("");
              handleExtraOptions(extra);
            }}
          >
            Add
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2 w-full'>
          {extraOptions.map((option) => (
            <div
              key={option.text}
              className='flex justify-between items-center border-2 my-1 px-4 py-2 rounded-md'
            >
              <div className='flex items-center'>
                <p className='uppercase text-xs font-semibold tracking-wide'>{option}</p>
              </div>
              <div
                onClick={() => {
                  setExtra("");
                  deleteOption(option);
                }}
                className='text-red-600 hover:text-red-400 text-lg cursor-pointer'
              >
                <RiCloseFill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
