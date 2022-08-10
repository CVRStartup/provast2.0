import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { intialResume } from "../../../data/initalResume";
import { useUser } from "../../../lib/hooks";

export const ResumeForm = () => {
  const user = useUser();
  const router = useRouter();
  const { closeModal, setLoading } = useModelContext();
  const { template } = useResumeContext();
  const [name, setName] = useState("");
  const [hasPublicResume, setHasPublicResume] = useState(false);
  const [importFromPublicResume, setImportFromPublicResume] = useState(false);
  const [publicResume, setPublicResume] = useState(intialResume);

  const handleCreate = async (e) => {
    if (!user) return;
    setLoading(true);
    e.preventDefault();
    const currResume = importFromPublicResume ? publicResume : intialResume;
    delete currResume._id;
    const {
      data: { message, resume },
    } = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/resume`, {
      userId: user._id,
      resume: {
        ...currResume,
        public: false,
        personal: {
          firstName: user?.profile?.firstName,
          lastName: user?.profile?.lastName,
          image: user?.profile?.image,
          email: user?.email,
          phone: user?.phone?.value?.toString(),
        },
        layout: {
          color: {
            r: "245",
            g: "166",
            b: "35",
            a: "100",
          },
          name: name,
          template: template,
        },
      },
    });
    await mutate(`/api/resume/user?userId=${user?._id}`);
    if (message === "Success! Resumes Created") {
      router.push(`/dashboard/${user?.category}/resumes/${resume._id}`);
    }
    closeModal();
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      const {
        data: { resumes },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/getpublicresume?id=${user._id}`
      );
      if (resumes.length > 0) {
        setHasPublicResume(true);
        setPublicResume(resumes[0]);
      }
    })();
  }, [user]);

  return (
    <form onSubmit={handleCreate}>
      <div className='flex items-center justify-between'>
        <Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-white'>
          Create Resume
        </Dialog.Title>
      </div>
      <div className='mt-5 w-full'>
        <div className='mt-6 grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-6'>
            <label
              htmlFor='hobby'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Name
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <input
                type='text'
                name='resume'
                id='resume'
                required
                placeholder='Ex:- Full Stack Developer'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300'
              />
            </div>
          </div>
          {hasPublicResume && (
            <div className='sm:col-span-6 flex items-center'>
              <div className='mt-1 flex rounded-md shadow-sm mr-2'>
                <input
                  type='checkbox'
                  name='import'
                  id='import'
                  onChange={(e) => setImportFromPublicResume(!importFromPublicResume)}
                  className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded'
                />
              </div>
              <label htmlFor='import' className='block text-[13px] text-white mt-1'>
                Import resume data from your public resume
              </label>
            </div>
          )}
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
