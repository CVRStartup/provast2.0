import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useModelContext } from "../../../../context/ModelContext";

export const DownloadResumeForm = () => {
  const { closeModal, setLoading, setZipFilename } = useModelContext();
  const [fileName, setFileName] = useState("");
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setZipFilename(fileName);
    setLoading(false);
    closeModal();
  };
  return (
    <form onSubmit={handleCreate}>
      <div className='flex items-center justify-between'>
        <Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-white'>
          Download Resumes
        </Dialog.Title>
      </div>
      <div className='mt-5 w-full'>
        <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-6'>
            <label
              htmlFor='hobby'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              File Name
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <input
                type='text'
                name='resume'
                id='resume'
                required
                placeholder='Ex:- Amazon, CRT, etc.'
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => {
              setLoading(false);
              closeModal();
            }}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
