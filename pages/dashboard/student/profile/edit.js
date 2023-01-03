import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader } from "../../../../src/components/Layout/Loader";
import { countries } from "../../../../src/lib/helper";
import { BsFillCameraFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { usePersonal } from "../../../../src/hooks/usePersonal";

const ProfileEdit = ({ userDetails }) => {
  const user = JSON.parse(userDetails);
  const { personal, isError, isLoading } = usePersonal(user._id);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPasswod: "",
  });
  const [rollNumber, setRollNumber] = useState({
    value: user?.rollNumber?.value,
    verified: false,
    frozen: user?.rollNumber?.frozen,
  });
  const [phone, setPhone] = useState({
    value: user?.phone?.value,
    verified: false,
    frozen: user?.phone?.frozen,
  });
  const [profile, setProfile] = useState({
    firstName: user?.profile?.firstName,
    lastName: user?.profile?.lastName,
    image: user?.profile?.image,
    gender: user?.profile?.gender,
    dob: user?.profile?.dob,
    verified: false,
    frozen: user?.profile?.frozen,
  });
  const [contact, setContact] = useState({
    parents: {
      father: {
        name: personal?.contact?.parents?.father?.name,
        email: personal?.contact?.parents?.father?.email,
        phone: personal?.contact?.parents?.father?.phone,
        occupation: personal?.contact?.parents?.father?.occupation,
      },
      mother: {
        name: personal?.contact?.parents?.mother?.name,
        email: personal?.contact?.parents?.mother?.email,
        phone: personal?.contact?.parents?.mother?.phone,
        occupation: personal?.contact?.parents?.mother?.occupation,
      },
    },
    address: {
      city: personal?.contact?.address?.city,
      country: personal?.contact?.address?.country,
      state: personal?.contact?.address?.state,
    },
    linkedin: personal?.contact?.linkedin,
    website: personal?.contact?.website,
    verified: false,
    frozen: personal?.contact?.frozen,
  });
  const [college, setCollege] = useState({
    name: user?.college?.name,
  });

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
    } catch (error) {
      toast.error(error, { toastId: error });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      data: { message },
    } = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/details?userId=${user._id}`,
      {
        profile,
        phone,
      }
    );
    const {
      data: { message: personalMessage },
    } = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/personal?userId=${user._id}`,
      {
        contact,
      }
    );

    if (message == "Details Updated" && personalMessage == "Personal Details Updated") {
      toast.success(message, { toastId: message });
      router.push("/dashboard/student/profile");
      await mutate("/api/user");
      await mutate(`/api/auth/user/personal?userId=${user?._id}`);
    } else {
      toast.error(message, { toastId: message });
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Provast | Profile Edit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='bg-gray-100 rounded p-5 w-11/12 mx-auto my-24'>
        <div className='mt-10 sm:mt-0'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <div className='px-4 sm:px-0'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Personal Information
                </h3>
                <p className='mt-1 text-sm text-gray-600'>
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div>
                <div className='shadow overflow-hidden sm:rounded-md'>
                  <div className='px-4 py-5 bg-white sm:p-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='first-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First name
                        </label>
                        <input
                          type='text'
                          name='first-name'
                          id='first-name'
                          autoComplete='given-name'
                          value={profile.firstName}
                          disabled={profile.frozen}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              firstName: e.target.value,
                            })
                          }
                          className={`${
                            profile.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='last-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last name
                        </label>
                        <input
                          type='text'
                          name='last-name'
                          id='last-name'
                          autoComplete='family-name'
                          value={profile.lastName}
                          disabled={profile.frozen}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              lastName: e.target.value,
                            })
                          }
                          className={`${
                            profile.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='college'
                          className='block text-sm font-medium text-gray-700'
                        >
                          College
                        </label>
                        <input
                          type='text'
                          name='college'
                          id='college'
                          disabled
                          value={college?.name}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md hover:cursor-not-allowed bg-gray-100'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-3'>
                        <label
                          htmlFor='rollNumber'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Roll Number
                        </label>
                        <input
                          type='text'
                          name='rollNumber'
                          id='rollNumber'
                          disabled
                          value={rollNumber.value}
                          onChnage={(e) => setRollNumber({ ...rollNumber, value: e.target.value })}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md hover:cursor-not-allowed bg-gray-100'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label htmlFor='dob' className='block text-sm font-medium text-gray-700'>
                          Date Of Birth
                        </label>
                        <input
                          type='date'
                          name='dob'
                          id='dob'
                          value={profile?.dob?.substring(0, 10)}
                          disabled={profile.frozen}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              dob: e.target.value,
                            })
                          }
                          className={`mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                          Phone Number
                        </label>
                        <input
                          type='text'
                          name='phone'
                          id='phone'
                          value={phone?.value}
                          disabled={phone.frozen}
                          onChange={(e) => setPhone({ ...phone, value: e.target.value })}
                          className={`${
                            profile.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md hover:cursor-not-allowed bg-gray-100`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='registered-email-address'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Registered Email address
                        </label>
                        <input
                          type='email'
                          name='registered-email-address'
                          id='registered-email-address'
                          disabled
                          value={user?.email}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md hover:cursor-not-allowed bg-gray-100'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='fathers-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Father&apos;s Name
                        </label>
                        <input
                          type='text'
                          name='fathers-name'
                          id='fathers-name'
                          value={contact?.parents?.father?.name}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                father: {
                                  ...contact.parents.father,
                                  name: e.target.value,
                                },
                              },
                            })
                          }
                          className={`${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='mothers-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Mother&apos;s Name
                        </label>
                        <input
                          type='text'
                          name='mothers-name'
                          id='mothers-name'
                          value={contact?.parents?.mother?.name}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                mother: {
                                  ...contact.parents.mother,
                                  name: e.target.value,
                                },
                              },
                            })
                          }
                          className={`${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='fathers-email-address'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Father&apos;s Email address
                        </label>
                        <input
                          type='email'
                          name='fathers-email-address'
                          id='fathers-email-address'
                          value={contact?.parents?.father?.email}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                father: {
                                  ...contact.parents.father,
                                  email: e.target.value,
                                },
                              },
                            })
                          }
                          className={`${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='fathers-phone'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Father&apos;s Phone Number
                        </label>
                        <input
                          type='text'
                          name='fathers-phone'
                          id='fathers-phone'
                          value={contact?.parents?.father?.phone}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                father: {
                                  ...contact.parents.father,
                                  phone: e.target.value,
                                },
                              },
                            })
                          }
                          className={`${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='fathers-occupation'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Father&apos;s Occupation
                        </label>
                        <input
                          type='text'
                          name='fathers-occupation'
                          id='fathers-occupation'
                          value={contact?.parents?.father?.occupation}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                father: {
                                  ...contact.parents.father,
                                  occupation: e.target.value,
                                },
                              },
                            })
                          }
                          className={`${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          } mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='mothers-email-address'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Mother&apos;s Email address
                        </label>
                        <input
                          type='email'
                          name='mothers-email-address'
                          id='mothers-email-address'
                          value={contact?.parents?.mother?.email}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                mother: {
                                  ...contact.parents.mother,
                                  email: e.target.value,
                                },
                              },
                            })
                          }
                          className={`mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='mothers-phone'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Mother&apos;s Phone Number
                        </label>
                        <input
                          type='text'
                          name='mothers-phone'
                          id='mothers-phone'
                          value={contact?.parents?.mother?.phone}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                mother: {
                                  ...contact.parents.mother,
                                  phone: e.target.value,
                                },
                              },
                            })
                          }
                          className={`mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='mothers-occupation'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Mother&apos;s Occupation
                        </label>
                        <input
                          type='text'
                          name='mothers-occupation'
                          id='mothers-occupation'
                          value={contact?.parents?.mother?.occupation}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              parents: {
                                ...contact.parents,
                                mother: {
                                  ...contact.parents.mother,
                                  occupation: e.target.value,
                                },
                              },
                            })
                          }
                          className={`mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='country'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Country
                        </label>
                        <div className='mt-1'>
                          <select
                            id='country'
                            name='country'
                            autoComplete='country-name'
                            className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block text-sm w-full sm:text-md border-gray-300 rounded-md'
                            value={contact.address.country}
                            disabled={contact.frozen}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                address: {
                                  ...contact.address,
                                  country: e.target.value,
                                },
                              })
                            }
                          >
                            <>
                              <option selected disabled>
                                Select A Country
                              </option>
                              {countries?.map((country) => (
                                <option key={country.code}>{country.name}</option>
                              ))}
                            </>
                          </select>
                        </div>
                      </div>

                      <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                        <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                          City
                        </label>
                        <input
                          type='text'
                          name='city'
                          id='city'
                          value={contact.address.city}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              address: {
                                ...contact.address,
                                city: e.target.value,
                              },
                            })
                          }
                          autoComplete='address-level2'
                          className={`mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label htmlFor='region' className='block text-sm font-medium text-gray-700'>
                          State / Province
                        </label>
                        <input
                          type='text'
                          name='region'
                          id='region'
                          value={contact.address.state}
                          disabled={contact.frozen}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              address: {
                                ...contact.address,
                                state: e.target.value,
                              },
                            })
                          }
                          autoComplete='address-level1'
                          className={`mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            contact.frozen ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='hidden sm:block' aria-hidden='true'>
          <div className='py-5'>
            <div className='border-t border-gray-200' />
          </div>
        </div>

        {/* <div className='my-10 sm:mt-0 border-b pb-5'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <div className='px-4 sm:px-0'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Change Password</h3>
                <p className='mt-1 text-sm text-gray-600'>Enter correct information.</p>
              </div>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div>
                <div className='shadow sm:rounded-md sm:overflow-hidden'>
                  <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                    <div className='grid grid-cols-2 gap-6'>
                      <div className=''>
                        <label
                          htmlFor='newPassword'
                          className='block text-sm font-medium text-gray-700'
                        >
                          New Password
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <input
                            type='text'
                            name='newPassword'
                            id='newPassword'
                            className='focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300'
                            value={password.newPassword}
                            onChange={(e) =>
                              setPassword({
                                ...password,
                                newPassword: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className=''>
                        <label
                          htmlFor='confirmNewPassword'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Confirm New Password
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <input
                            type='text'
                            name='confirmNewPassword'
                            id='confirmNewPassword'
                            className='focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300'
                            value={password.confirmNewPasswod}
                            onChange={(e) =>
                              setPassword({
                                ...password,
                                confirmNewPasswod: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className='mt-10 sm:mt-0'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <div className='px-4 sm:px-0'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Profile</h3>
                <p className='mt-1 text-sm text-gray-600'>
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div>
                <div className='shadow sm:rounded-md sm:overflow-hidden'>
                  <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                    <div className='grid grid-cols-3 gap-6'>
                      <div className='col-span-3 sm:col-span-6'>
                        <label
                          htmlFor='company-website'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Website
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <input
                            type='text'
                            name='company-website'
                            id='company-website'
                            className='focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300'
                            value={contact.website}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                website: e.target.value,
                              })
                            }
                            disabled={contact.frozen}
                            placeholder='https://www.example.com'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-3 gap-6'>
                      <div className='col-span-3 sm:col-span-6'>
                        <label
                          htmlFor='linkedin'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Linkedin URL
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <input
                            type='text'
                            name='linkedin'
                            id='linkedin'
                            value={contact.linkedin}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                linkedin: e.target.value,
                              })
                            }
                            disabled={contact.frozen}
                            className='focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300'
                            placeholder='https://www.linkedin.com/in/username/'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='sm:col-span-6 mt-3'>
                      <label
                        htmlFor='profileImg'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Photo
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
                                <div className='relative h-full w-full object-fit hover:bg-gray-800'>
                                  <Image
                                    placeholder='blur'
                                    blurDataURL={profile.image}
                                    layout='fill'
                                    objectFit='contain'
                                    className=''
                                    src={profile.image}
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
                              disabled={profile.frozen}
                              type='file'
                              readOnly={true}
                              onChange={uploadFileHandler}
                            />
                          </div>
                        )}
                        {loading ? (
                          <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed'>
                            <Loader size='8' color='gray' />
                            Please Wait...
                          </div>
                        ) : (
                          <input
                            className='cursor-pointer ml-4 font-semibold h-10 appearance-none block w-full text-gray-500 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                            label='Choose File'
                            type='text'
                            name='image'
                            id='profileImg'
                            readOnly={true}
                            value={profile.image || ""}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='hidden sm:block' aria-hidden='true'>
          <div className='py-5'>
            <div className='border-t border-gray-200' />
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <Link href='/dashboard/student/profile'>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 '
              >
                Cancel
              </button>
            </Link>
            <button
              onClick={submitHandler}
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 '
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* <main className='mt-10'>
        <form
          onSubmit={submitHandler}
          className='max-w-5xl mx-auto space-y-8 divide-y divide-gray-200 px-10'
        >
          <div className='space-y-6 sm:space-y-5'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Personal Information</h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className='space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  First name
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete='given-name'
                    className='max-w-lg block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Last name
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete='family-name'
                    className='max-w-lg block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Mobile Number
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    type='text'
                    name='phone'
                    id='phone'
                    value={details?.phone || ""}
                    disabled={true}
                    autoComplete='tel'
                    className='max-w-lg block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs sm:text-sm border-gray-300 cursor-not-allowed bg-gray-200 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='registered-email'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Registered Email address
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  {status === "loading" ? (
                    <div className='animate-pulse'>
                      <input className='max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 cursor-not-allowed bg-gray-200 rounded-md h-10'></input>
                    </div>
                  ) : (
                    <input
                      id='registered-email'
                      name='registered-email'
                      type='email'
                      value={session?.user?.email || ""}
                      disabled={true}
                      className='max-w-lg block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs sm:text-sm border-gray-300 cursor-not-allowed bg-gray-200 rounded-md'
                    />
                  )}
                </div>
              </div>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='given-email'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Given Email address
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    id='given-email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='max-w-lg block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='pt-8 space-y-8 divide-y divide-gray-200 sm:space-y-5'>
            <div>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>Profile</h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>

              <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
                  <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
                    Photo
                  </label>
                  <div className='mt-1 sm:mt-0 sm:col-span-2 '>
                    {loading ? (
                      <div className='animate-pulse'>
                        <input className='appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10'></input>
                      </div>
                    ) : (
                      <input
                        type='text'
                        value={image}
                        disabled={true}
                        onChange={(e) => setImage(e.target.value)}
                        className='appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                      />
                    )}
                    {loading ? (
                      <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed'>
                        <Loader size='8' color='gray' />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className='mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                        label='Choose File'
                        type='file'
                        name='image'
                        id='profileImg'
                        onChange={uploadFileHandler}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pt-5 pb-20'>
            <div className='flex justify-end'>
              <Link href='/dashboard/student/profile'>
                <button
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 '
                >
                  Cancel
                </button>
              </Link>
              <button
                onClick={submitHandler}
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 '
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </main> */}
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
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (!user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  if (user.category !== "student") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  if (user.category === "student" && !user.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }
  return {
    props: {
      userDetails: JSON.stringify(user),
    },
  };
};

export default ProfileEdit;
