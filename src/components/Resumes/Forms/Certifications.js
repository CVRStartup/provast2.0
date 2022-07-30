import { Dialog } from "@headlessui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useModelContext } from "../../../context/ModelContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { MarkdownSupporter } from "../MarkdownSupporter";
import { Toggle } from "./Shared/Toggle";

export const CertificationsForm = () => {
  const { closeModal, isEdit, editId } = useModelContext();
  const { resume, certifications, setCertifications, debounceUpdateResume } = useResumeContext();
  const [error, setError] = useState({
    from: null,
    to: null,
  });
  const [option, setOption] = useState({
    title: "",
    date: "",
    issuer: "",
    summary: {
      data: "",
      enabled: true,
    },
    enabled: true,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ from: null, to: null });
    const newErrorState = {
      from: null,
      to: null,
    };
    if (moment(new Date(option.date).getTime()).isAfter(Date.now()))
      newErrorState.from = "Start date should be same or before today.";

    setError(newErrorState);

    if (!newErrorState.from) {
      let newstate = certifications;
      if (isEdit) {
        newstate = newstate.map((x) => {
          if (x._id === editId) return option;
          return x;
        });
      } else newstate.push(option);
      setCertifications([...newstate]);
      debounceUpdateResume({ ...resume, certifications: newstate });
      closeModal();
    }
  };
  useEffect(() => {
    if (isEdit) setOption(certifications.filter((x) => x._id === editId)[0]);
  }, [isEdit, editId, certifications]);
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center justify-between'>
        <Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-white'>
          {isEdit ? "Edit" : "Add"} Certification
        </Dialog.Title>
      </div>
      <div className='mt-5 w-full'>
        <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-6   '>
            <label
              htmlFor='title'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Title
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <input
                type='text'
                name='title'
                id='title'
                required
                placeholder={`CCNP`}
                value={option.title}
                onChange={(e) =>
                  setOption({
                    ...option,
                    title: e.target.value,
                  })
                }
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300'
              />
            </div>
          </div>
          <div className='sm:col-span-3'>
            <label
              htmlFor='awarder'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Issuer
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='awarder'
                id='awarder'
                placeholder='Cisco Systems'
                value={option.issuer}
                onChange={(e) =>
                  setOption({
                    ...option,
                    issuer: e.target.value,
                  })
                }
                required
                className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='certificationDate'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Date
            </label>
            <div className='mt-1'>
              <input
                type='date'
                name='certificationDate'
                id='certificationDate'
                required
                value={option.date}
                onChange={(e) =>
                  setOption({
                    ...option,
                    date: e.target.value,
                  })
                }
                className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            {error.from && <p className='text-xs text-red-600 font-bold ml-1 mt-1'>{error.from}</p>}
          </div>
          <div className='sm:col-span-6   '>
            <label
              htmlFor='certificationSummary'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Summary
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <textarea
                type='text'
                rows={4}
                name='certificationSummary'
                id='certificationSummary'
                value={option?.summary?.data}
                onChange={(e) =>
                  setOption({
                    ...option,
                    summary: {
                      ...option.summary,
                      data: e.target.value,
                    },
                  })
                }
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-sm sm:text-sm border-gray-300'
              />
            </div>
            <div className='flex items-center my-3'>
              <Toggle
                enabled={option?.summary?.enabled}
                setEnabled={(val) =>
                  setOption({
                    ...option,
                    summary: {
                      ...option?.summary,
                      enabled: val,
                    },
                  })
                }
              />
              <p className='text-white ml-2 text-sm'>Display summary in resume</p>
            </div>
            <MarkdownSupporter />
          </div>
        </div>
      </div>
      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={closeModal}
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
