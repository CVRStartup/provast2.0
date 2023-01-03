import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useResumeContext } from "../../../context/ResumeContext";
import { Loader } from "../../Layout/Loader";

export const ProfileDisplay = () => {
  const { resume, profile, setProfile, debounceUpdateResume } = useResumeContext();
  const [loading, setLoading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "neujqnla");
    try {
      setLoading(true);
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzn2bzqmt/image/upload",
        formData
      );
      setLoading(false);
      const { url } = uploadRes.data;
      setProfile({ ...profile, image: url });
      debounceUpdateResume({
        ...resume,
        personal: { ...profile, image: url },
      });
    } catch (error) {
      toast.error(error, { toastId: error });
    }
  };
  return (
    <div id='profile' className='pb-10 border-b-2 border-gray-600 mb-12'>
      <h2 className='mb-5 text-white text-2xl'>Profile</h2>
      <div className='sm:col-span-6'>
        <label
          htmlFor='subtitle'
          className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
        >
          Subtitle
        </label>
        <div className='mt-1 flex rounded-md shadow-sm'>
          <input
            type='text'
            name='subtitle'
            id='subtitle'
            required
            value={profile?.role || ""}
            onChange={(e) => {
              setProfile({ ...profile, role: e.target.value });
              debounceUpdateResume({
                ...resume,
                personal: { ...profile, role: e.target.value },
              });
            }}
            placeholder='Full Stack Developer'
            className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300 text-gray-900'
          />
        </div>

        <div className='sm:col-span-6 mt-3'>
          <label
            htmlFor='profileImg'
            className='mb-1 block uppercase tracking-wider text-[10px] font-medium text-gray-400'
          >
            Upload Image
          </label>
          <div className='flex items-center'>
            {loading ? (
              <div className='animate-pulse'>
                <span className='inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100'></span>
              </div>
            ) : (
              <div className='relative box'>
                <button className='overflow-hidden'>
                  <span className='absolute left-0 top-0 pointer-events-none inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100 hover:bg-gray-800'>
                    {/* <img
                      className="h-full w-full object-fit hover:bg-gray-800"
                      src={profile?.image}
                      alt=""
                    /> */}
                    <div className='relative h-full w-full object-fit hover:bg-gray-800'>
                      <Image
                        placeholder='blur'
                        blurDataURL={profile?.image}
                        layout='fill'
                        objectFit='contain'
                        className=''
                        src={profile?.image}
                        alt=''
                      />
                    </div>
                  </span>
                  <div className='overlay flex items-center justify-center pointer-events-none border-2 z-10 top-0 left-0 h-16 rounded-full w-16'>
                    <BsFillCameraFill size={20} color={"white"} />
                  </div>
                </button>
                <input
                  className='cursor-pointer w-16 h-16 left-0 rounded-full -top-0 opacity-1 border-0 outline-none hover:bg-gray-800'
                  label='Choose File'
                  type='file'
                  readOnly={true}
                  onChange={uploadFileHandler}
                />
              </div>
            )}
            {loading ? (
              <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-white cursor-not-allowed'>
                <Loader size='8' color='white' />
                Please Wait...
              </div>
            ) : (
              <input
                className='cursor-pointer ml-4 text-gray-800 font-semibold h-10 appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                label='Choose File'
                type='text'
                name='image'
                id='profileImg'
                readOnly={true}
                value={profile?.image || ""}
              />
            )}
          </div>
        </div>

        <div className='mt-3 text-gray-900 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-3'>
            <label
              htmlFor='first_name'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              First Name
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='first-name'
                id='first-name'
                disabled
                defaultValue={profile?.firstName || ""}
                className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-300 cursor-not-allowed font-bold text-gray-600'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='last-name'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Last name
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='last-name'
                id='last-name'
                defaultValue={profile?.lastName || ""}
                disabled
                className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-300 cursor-not-allowed font-bold text-gray-600'
              />
            </div>
          </div>
        </div>
        <div className='sm:col-span-6 mt-3'>
          <label
            htmlFor='dob'
            className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
          >
            Date Of Birth
          </label>
          <div className='mt-1'>
            <input
              type='date'
              name='dob'
              id='dob'
              required
              value={profile?.dob || ""}
              onChange={(e) => {
                setProfile({ ...profile, dob: e.target.value });
                debounceUpdateResume({
                  ...resume,
                  personal: { ...profile, dob: e.target.value },
                });
              }}
              autoComplete='bday'
              className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
            />
          </div>
        </div>
        <div className='sm:col-span-6 mt-3'>
          <label
            htmlFor='phone'
            className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
          >
            Phone
          </label>
          <div className='mt-1 flex rounded-md shadow-sm'>
            <input
              type='text'
              name='phone'
              id='phone'
              defaultValue={profile?.phone || ""}
              disabled
              autoComplete='tel'
              placeholder='7660028121'
              className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-300 cursor-not-allowed font-bold text-gray-600'
            />
          </div>
        </div>
        <div className='sm:col-span-6 mt-3'>
          <label
            htmlFor='email'
            className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
          >
            Email
          </label>
          <div className='mt-1 flex rounded-md shadow-sm'>
            <input
              type='email'
              name='email'
              id='email'
              disabled
              defaultValue={profile?.email}
              className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-300 cursor-not-allowed font-bold text-gray-600'
            />
          </div>
        </div>
      </div>
      <style>
        {`
        .overlay {
          position: absolute;
          opacity:0;
        }

        .box:hover .overlay {
          background: rgba(0, 0, 0, 0.7);
          opacity: 1;
        }

          ::-webkit-file-upload-button {
            cursor:pointer;
        }
        `}
      </style>
    </div>
  );
};
