import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useModelContext } from "../../../context/ModalContext";

export const DeleteJobForm = () => {
  const { closeModal, deleteName } = useModelContext();
  const [jobName, setJobName] = useState("");
  const router = useRouter();

  const handleDelete = async (e) => {
    const {
      data: { message },
    } = await axios.delete(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs?id=${deleteName._id}`);
    if (message == "Job Removed") {
      closeModal();
      toast.success(message, { toastId: message });
      router.push(`/dashboard/college/jobs`);
    } else {
      toast.error(message, { toastId: message });
    }
  };
  return (
    <form>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-medium leading-6 text-white'>Are you absolutely sure?</h3>
      </div>
      <div className='mt-5 w-full'>
        <div className='relative border  rounded-md px-3 py-2 shadow-sm focus-within:ring-1 '>
          <label
            htmlFor='delete'
            className='absolute -top-2 left-2 -mt-px inline-block px-1 text-xs bg-gray-800 font-medium text-white'
          >
            Please type <span className='text-red-500 select-none'>{deleteName.company}</span> to
            confirm
          </label>
          <input
            type='text'
            name='delete'
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            id='delete'
            className='block w-full border-0 p-0 text-gray-100 bg-gray-800 focus:ring-0 sm:text-sm'
          />
        </div>
        <button
          type='button'
          disabled={jobName !== deleteName.company}
          onClick={() => {
            if (jobName === deleteName.company) {
              handleDelete();
            }
          }}
          className={`w-full my-2 block items-center px-4 py-1 border border-transparent text-md font-semibold rounded-md ${
            jobName === deleteName.company
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-red-700 cursor-not-allowed"
          }`}
        >
          I understand the consequences, delete this job
        </button>
      </div>
      {/* <div>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => {
              closeModal();
            }}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              closeModal();
              setDownloadOpen(true);
            }}
            className='ml-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Download
          </button>
        </div>
      </div> */}
    </form>
  );
};
