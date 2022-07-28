import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { branches, rename } from "../../../src/lib/helper";
import { useUser } from "../../../src/lib/hooks";

const typeOfCategory = [
  { id: "individual", name: "individual" },
  { id: "student", name: "student" },
  { id: "college", name: "college" },
];

const Details = ({ colleges }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [rollNumber, setRollNumber] = useState(null);
  const [collegeName, setCollegeName] = useState(null);
  const [collegeCode, setCollegeCode] = useState(null);
  const [batch, setBatch] = useState({ from: "", to: "" });
  const [category, setCategory] = useState("student");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeSearchValue, setCollegeSearchValue] = useState("");
  const [collegeList, setCollegeList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [branch, setBranch] = useState(branches[0]);
  const [address, setAddress] = useState({
    city: "",
    state: "",
  });
  const [principal, setPrincipal] = useState({
    email: "",
    phone: "",
  });
  const [website, setWebsite] = useState("");
  const session = useUser();

  const router = useRouter();
  //   useEffect(() => {
  //     if (session !== undefined) {
  //       router.push(`/dashboard/${session.userDetails.category}`);
  //     }
  //   }, [session.userDetails, router]);

  const submitHandler = async (e) => {};

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     try {
  //       await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/users`, {
  //         userId: session.userId,
  //         image:
  //           session?.user?.image.indexOf("googleusercontent.com") !== -1
  //             ? "http://res.cloudinary.com/dj7nomqfd/image/upload/v1647117869/uploads/bphhxvmlcyyu2pntbikm.png"
  //             : session?.user?.image,
  //         firstName: rename(firstName),
  //         lastName: rename(lastName),
  //         rollNumber: category === "student" ? rollNumber.toUpperCase() : "",
  //         category,
  //         email,
  //         phone,
  //         college: {
  //           name: collegeName || selected.name,
  //           code: collegeCode || selected.code,
  //         },
  //         city: category === "student" ? "" : address.city,
  //         state: category === "student" ? "" : address.state,
  //         branch: {
  //           name: category === "student" ? branch.name : "",
  //           code: category === "student" ? branch.code : "",
  //         },
  //         batch: {
  //           start: category === "student" ? batch.from : 0,
  //           end: category === "student" ? batch.to : 0,
  //         },
  //         principal: {
  //           email: category === "student" ? "" : principal.email,
  //           phone: category === "student" ? "" : principal.phone,
  //         },
  //         website: category === "student" ? "" : website,
  //         designation,
  //         approved: category === "student" ? true : false,
  //       });

  //       reloadSession();
  //       router.push("/auth/signin");
  //     } catch (error) {
  //       setLoading(false);
  //       toast.error(error.response.data.message);
  //     }
  //   };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <React.Fragment>
      <Head>
        <title>Provast | Details</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='background'>
        <div className='min-h-screen flex flex-col justify-center items-center pb-4 sm:px-6 lg:px-8'>
          <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-lg'>
            <div className='bg-white pt-1 pb-8 shadow-xl rounded-xl px-10'>
              <div className='my-6 flex justify-between items-center'>
                <div className=''>
                  <span className='text-xs font-semibold'>Signed In As : </span>
                  <span className='text-sm font-bold text-gray-600'>{session?.email}</span>
                </div>
                <button className='font-semibold text-blue-600 text-sm underline hover:text-blue-800'>
                  Logout
                </button>
              </div>
              <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-2 text-center text-3xl font-extrabold text-gray-900'>
                  Fill in your details
                </h2>
              </div>
              <form onSubmit={submitHandler}>
                <fieldset className='mt-4'>
                  <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                    {typeOfCategory.map((option) => (
                      <div key={option.id} className='flex items-center'>
                        <input
                          id={option.id}
                          name='notification-method'
                          type='radio'
                          value={option.name}
                          defaultChecked={option.id === "individual"}
                          onChange={(e) => setCategory(e.target.value)}
                          className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300'
                        />
                        <label
                          htmlFor={option.id}
                          className='ml-3 block text-sm font-medium capitalize text-gray-700'
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <React.Fragment>
                  {category === "student" && (
                    <div className='col-span-6 sm:col-span-4 mt-4'>
                      <div className='flex'>
                        <label
                          htmlFor='paraphase'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Paraphase
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>

                      <input
                        type='text'
                        name='rollnumber'
                        id='rollnumber'
                        autoComplete='roll-number'
                        required
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                      <p
                        className='mt-1 text-xs tracking-wide text-gray-500'
                        id='pharaphase-description'
                      >
                        Enter a passphrase that associates with your college placement cell.
                      </p>
                    </div>
                  )}

                  <div className='grid grid-cols-6 gap-6 mt-4'>
                    <div className='col-span-6 sm:col-span-3'>
                      <div className='flex'>
                        <label
                          htmlFor='firstName'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First Name
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        autoComplete='given-name'
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <div className='flex'>
                        <label
                          htmlFor='lastName'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last name
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        autoComplete='family-name'
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  {category === "college" && (
                    <>
                      <div className='col-span-6 sm:col-span-4 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='designation'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Designation
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>
                        <input
                          type='text'
                          name='designation'
                          id='designation'
                          required
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </>
                  )}

                  {category === "student" && (
                    <div>
                      <div className='grid grid-cols-6 gap-6 mt-5'>
                        <div className='col-span-6 sm:col-span-3'>
                          <div className='flex'>
                            <label
                              htmlFor='from'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Batch From
                            </label>
                            <span className='ml-1 text-red-600 font-semibold'>*</span>
                          </div>
                          <input
                            type='number'
                            min='1900'
                            max='2099'
                            step='1'
                            name='from'
                            id='from'
                            required
                            placeholder='2019'
                            value={batch.from}
                            onChange={(e) => setBatch({ ...batch, from: e.target.value })}
                            className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                          />
                        </div>

                        <div className='col-span-6 sm:col-span-3'>
                          <div className='flex'>
                            <label htmlFor='to' className='block text-sm font-medium text-gray-700'>
                              Batch To
                            </label>
                            <span className='ml-1 text-red-600 font-semibold'>*</span>
                          </div>
                          <input
                            type='number'
                            min='1900'
                            max='2099'
                            step='1'
                            name='to'
                            id='to'
                            placeholder='2023'
                            required
                            value={batch.to}
                            onChange={(e) => setBatch({ ...batch, to: e.target.value })}
                            className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {category === "student" && (
                    <div className='col-span-6 sm:col-span-4 mt-4'>
                      <div className='flex'>
                        <label
                          htmlFor='rollnumber'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Roll Number
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>

                      <input
                        type='text'
                        name='rollnumber'
                        id='rollnumber'
                        autoComplete='roll-number'
                        required
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />

                      <Listbox value={branch} onChange={setBranch}>
                        {({ open }) => (
                          <>
                            <div className='flex'>
                              <Listbox.Label className='mt-4 mb-2 block text-sm font-medium text-gray-700'>
                                Branch
                              </Listbox.Label>
                              <span className='relative top-4 ml-1 text-red-600 font-semibold'>
                                *
                              </span>
                            </div>
                            <div className='relative'>
                              <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm'>
                                <span className='block truncate'>{branch.name}</span>
                                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'></span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                  {branches.map((branch) => (
                                    <Listbox.Option
                                      key={branch.code}
                                      className={({ active }) =>
                                        classNames(
                                          active ? "text-white bg-orange-600" : "text-gray-900",
                                          "cursor-default select-none relative py-2 pl-8 pr-4"
                                        )
                                      }
                                      value={branch}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected ? "font-semibold" : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {branch.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active ? "text-white" : "text-orange-600",
                                                "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                              )}
                                            >
                                              <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  )}

                  {/* {colleges && (
                    <div className='relative'>
                      <div className='flex'>
                        <label className='mt-4 mb-2 block text-sm font-medium text-gray-700'>
                          College
                        </label>
                        <span className='relative top-4 ml-1 text-red-600 font-semibold'>*</span>
                      </div>
                      <div className='relative'>
                        <input
                          type='text'
                          required
                          value={collegeSearchValue}
                          onChange={(e) => {
                            setDropDownState(false);
                            setCollegeSearchValue(e.target.value);
                          }}
                          className='w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                        />
                      </div>
                      {console.log(showDropDown)}
                      {showDropDown && collegeList.length > 0 && (
                        <ul className='w-full absolute -bottom-1 left-0 translate-y-full overflow-y-scroll max-h-40 rounded border-1 border-gray-400 bg-white shadow-md'>
                          {collegeList.map((college) => (
                            <li
                              key={college._id}
                              className='px-2 py-3 hover:bg-orange-600 hover:text-white border-b-gray-50 cursor-pointer'
                              onClick={() => {
                                setCollegeSearchValue(college.collegeName);
                                setShowDropDown(false);
                                setDropDownState(true);
                                setSelected(college);
                                setCollegeName(college.collegeName);
                                setCollegeCode(college._id);
                              }}
                            >
                              {college.collegeName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )} */}

                  {category === "college" && (
                    <div className='grid grid-cols-6 gap-6 mt-5'>
                      <div className='col-span-6 sm:col-span-3'>
                        <div className='flex'>
                          <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                            College City
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='city'
                            id='city'
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            autoComplete='address-level2'
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                          />
                        </div>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <div className='flex'>
                          <label
                            htmlFor='region'
                            className='block text-sm font-medium text-gray-700'
                          >
                            College State
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='region'
                            id='region'
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            autoComplete='address-level1'
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='col-span-6 sm:col-span-4 mt-4'>
                    <div className='flex'>
                      <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        {category === "student" && category === "individual"
                          ? "Email address"
                          : "Placement Email address"}
                      </label>
                      <span className='ml-1 text-red-600 font-semibold'>*</span>
                    </div>

                    <input
                      type='email'
                      name='email'
                      id='email'
                      autoComplete='email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-4 mt-4'>
                    <div className='flex'>
                      <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                        {category === "student" && category === "individual"
                          ? "Phone Number"
                          : "Placement Phone Number"}
                      </label>
                      <span className='ml-1 text-red-600 font-semibold'>*</span>
                    </div>

                    <input
                      type='tel'
                      name='phone'
                      id='phone'
                      autoComplete='tel'
                      required
                      value={phone}
                      pattern='[6789][0-9]{9}'
                      onChange={(e) => setPhone(e.target.value)}
                      className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  {category === "college" && (
                    <>
                      <div className='col-span-6 sm:col-span-4 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Principal Email address
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='email'
                          name='email'
                          id='email'
                          autoComplete='email'
                          required
                          value={principal.email}
                          onChange={(e) => setPrincipal({ ...principal, email: e.target.value })}
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-4 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Principal Phone Number
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='tel'
                          name='phone'
                          id='phone'
                          autoComplete='tel'
                          required
                          value={principal.phone}
                          pattern='[6789][0-9]{9}'
                          onChange={(e) => setPrincipal({ ...principal, phone: e.target.value })}
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-4 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='website'
                            className='block text-sm font-medium text-gray-700'
                          >
                            College Website
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='text'
                          name='website'
                          id='website'
                          required
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </>
                  )}
                  <div className='mt-4'>
                    <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 '>
                      Submit
                    </button>
                  </div>
                </React.Fragment>
              </form>
            </div>
          </div>
        </div>

        <style jsx>{`
          .background {
            background-image: url("https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.home_page_bg_desktop.png-26-4770753d59b970e1.png");
            width: 100%;
            position: absolute;
            min-height: 100%;
            box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px inset;
            transition-property: background-image;
            transition-duration: 180ms;
            transition-timing-function: ease-in-out;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}</style>
      </main>
    </React.Fragment>
  );
};

export default Details;
