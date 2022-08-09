import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineArrowNarrowLeft, HiPlus } from "react-icons/hi";
import { VscLock } from "react-icons/vsc";
import { Heading } from "../../../../src/components/Layout/Heading";
import { ResumeCardSkeleton } from "../../../../src/components/Layout/Skeletons/ResumeCardSkeleton";
import { useModelContext } from "../../../../src/context/ModalContext";
import { useResumeContext } from "../../../../src/context/ResumeContext";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { useResumes } from "../../../../src/hooks/useResumes";
import { usePublicResumes } from "../../../../src/hooks/usePublicResumes";
import { mutate } from "swr";
import { usePlan } from "../../../../src/hooks/usePlan";

const templates = [
  {
    name: "core",
    category: "creative",
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649839906/AlbertDera_1_idlokv.jpg",
    heading: "Core",
  },
  {
    name: "noncore",
    category: "creative",
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649839938/AlbertDera_2_odtnz0.jpg",
    heading: "Non Core",
  },
  {
    name: "onyx",
    category: "simple",
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649839356/Onyx_pmuqae.jpg",
    heading: "Onyx",
  },
  {
    name: "refined",
    category: "simple",
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649839355/Refined_rxujcz.jpg",
    heading: "Refined",
  },
  {
    name: "tadigital",
    category: "company",
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649839355/TAdigital_jfnyrx.jpg",
    heading: "TA Digital",
  },
  {
    name: "dynamic",
    category: "creative",
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649839810/AlbertDera_qupprn.jpg",
    heading: "Dynamic",
  },
  {
    name: "moscow",
    category: "creative",
    image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649931161/AlbertDera_3_mwdbnv.jpg",
    heading: "Moscow",
  },
  {
    name: "ruby",
    category: "mba",
    image: "https://res.cloudinary.com/de9q0s6tt/image/upload/v1655570633/ruby_n4oepn.png",
    heading: "Ruby",
  },
  {
    name: "gengar",
    category: "mba",
    image: "https://res.cloudinary.com/de9q0s6tt/image/upload/v1655569593/VastDemo_kkxprw.png",
    heading: "Gengar",
  },
  // {
  //   name: "harvard",
  //   category: "mba",
  //   image: "https://res.cloudinary.com/de9q0s6tt/image/upload/v1655570468/Harvard_ukuxr5.png",
  //   heading: "Harvard",
  // },
  // {
  //   name: "diamond",
  //   category: "simple",
  //   image: "https://res.cloudinary.com/de9q0s6tt/image/upload/v1655571020/diamond_il8l5t.png",
  //   heading: "Diamond",
  // },
  // {
  //   name: "pro",
  //   category: "creative",
  //   image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649931161/AlbertDera_3_mwdbnv.jpg",
  //   heading: "Professional",
  // },
  {
    name: "stockholm",
    category: "creative",
    image: "https://res.cloudinary.com/de9q0s6tt/image/upload/v1655571130/stockholm_bzrpo0.png",
    heading: "Stockholm",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ResumeIndex = ({ user }) => {
  const [tab, setTab] = useState("All Templates");
  const { payment } = usePlan(user?._id);
  const tabs = [
    { name: "All Templates", current: tab === "All Templates" },
    { name: "Simple", current: tab === "Simple" },
    { name: "Creative", current: tab === "Creative" },
    { name: "Company", current: tab === "Company" },
    { name: "MBA", current: tab === "MBA" },
  ];
  const router = useRouter();
  const { resumes } = useResumes(user);
  const { publicResumes } = usePublicResumes(user);
  const [state, setState] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { setIsOpen, setForm, loading, setLoading } = useModelContext();
  const [resumeFetchLoading, setResumeFetchLoading] = useState(false);
  const { setTemplate } = useResumeContext();

  useEffect(async () => {
    if (!user || !resumes || !publicResumes) return;
    setResumeFetchLoading(true);
    if (publicResumes.length === 0 && resumes.length > 0) {
      await axios.put(`/api/resume/${resumes[0]._id}`, {
        res: {
          ...resumes[0],
          public: true,
        },
      });
      await mutate(`/api/resume/getpublicresume?id=${user._id}`);
      await mutate(`/api/resume/user?userId=${user._id}`);
    }
    if (resumes.length === 0) setState(2);
    setResumeFetchLoading(false);
  }, [publicResumes, resumes, user]);

  const handleClick = async (template) => {
    if (!isEdit) {
      setIsOpen(true);
      setForm("resume");
      setTemplate(template);
    } else {
      await axios.put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/${resume._id}`, {
        res: {
          ...resume,
          layout: {
            ...resume.layout,
            template: template,
          },
        },
      });
      await mutate(`/api/resume/user?userId=${user._id}`);
      router.push(`${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/individual/resumes/${resume._id}`);
    }
  };

  const handleEditTemplate = (resume) => {
    setIsEdit(true);
    setResume(resume);
    setState(2);
  };

  const handleDeleteResume = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/${id}`);
    await mutate(`/api/resume/getpublicresume?id=${user._id}`);
    await mutate(`/api/resume/user?userId=${user._id}`);
  };

  const handleTogglePublic = async (resume, id) => {
    setLoading(true);
    if (!publicResumes) return;
    publicResumes.forEach(async (x) => {
      if (x.public)
        await axios.put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/${x._id}`, {
          res: {
            ...x,
            public: false,
          },
        });
    });
    await axios.put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/${id}`, {
      res: {
        ...resume,
        public: true,
      },
    });
    await mutate(`/api/resume/getpublicresume?id=${user._id}`);
    await mutate(`/api/resume/user?userId=${user._id}`);
    setLoading(false);
  };

  const checkPlan = (template) => {
    if (!payment) return;
    if (template.category === "simple") return true;
    if (payment?.plan === "Basic") return template.category === "creative";
    if (payment?.plan === "Essential") return !(template.category === "company");
    if (payment?.plan === "Premium") return true;
    return false;
  };

  const checkResumeCreation = (count) => {
    if (!payment) return;
    const plan = payment?.plan;
    return (
      (plan === "Basic" && count < 2) || (plan === "Essential" && count < 5) || plan === "Premium"
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>Resume builder</title>
        <meta name='description' content='Get your resume ready for free.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {loading && <Loading />}

      {state == 1 && (
        <div className='min-h-[70vh] py-4 pt-[10vh]'>
          <Heading
            subheading={`Welcome ${user?.profile?.firstName} ${user?.profile?.lastName}!`}
            description={
              "Create a tailored resume for each job application. Double your chances of getting hired!"
            }
          />
          {/* <div className='px-8 mt-6 place-items-center sm:place-items-start grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-auto'> */}
          {resumeFetchLoading ? (
            <ResumeCardSkeleton />
          ) : (
            <>
              <div
                className={` ${
                  resumes?.length < 3
                    ? "flex flex-wrap mx-auto justify-evenly items-center w-1/2"
                    : "w-11/12 mx-auto grid grid-cols-4 gap-4"
                }`}
              >
                <div
                  className='cursor-pointer relative'
                  onClick={() => {
                    if (!checkResumeCreation(resumes?.count)) {
                      setForm("paymentForm");
                      setIsOpen(true);
                      return;
                    }
                  }}
                >
                  {resumes?.length > 0 && (
                    <div
                      onClick={() => setState(2)}
                      className={`box relative ${
                        resumes.length < 3 ? "top-5" : ""
                      } border-4 border-dashed cursor-pointer my-8 hover:bg-gray-50 ${
                        checkResumeCreation(resumes?.count)
                          ? ""
                          : "pointer-events-none bg-gray-200 bg-opacity-30"
                      }`}
                    >
                      <p className='text-gray-900 title-create'>Create</p>
                      <div className='button flex justify-center'>
                        <HiPlus size={50} color='gray' />
                      </div>
                      {!checkResumeCreation(resumes?.count) && (
                        <div className='absolute z-10 top-3 right-3 flex items-center justify-center h-10 w-10 bg-gray-900 bg-opacity-40 rounded-full p-1 '>
                          <VscLock size={19} color='white' />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {resumes?.map((resume) => {
                  return (
                    <div key={resume._id}>
                      <div
                        key={resume._id}
                        className={`relative box ${
                          resume.public ? "border-4 border-orange-500" : ""
                        }`}
                      >
                        {resume.public && (
                          <div className='absolute z-20 -top-7 rounded-t-md right-0 bg-orange-600 px-4 font-semibold text-white'>
                            Public
                          </div>
                        )}
                        <Image
                          placeholder='blur'
                          blurDataURL='https://www.callcentrehelper.com/images/stories/2022/01/hands-holding-cvs.gif'
                          layout='fill'
                          objectFit='cover'
                          className={`box-image ${!resume.public ? "rounded-md" : ""}`}
                          src='https://www.callcentrehelper.com/images/stories/2022/01/hands-holding-cvs.gif'
                          alt=''
                        />
                        <p className='title'>{resume.layout.name}</p>
                        <div className={`overlay ${!resume.public ? "rounded-md" : ""}`} />
                        <div className='button flex items-center justify-between px-10'>
                          <svg
                            onClick={() => {
                              setLoading(true);
                              router.push(`/dashboard/${user?.category}/resumes/${resume._id}`);
                            }}
                            stroke='currentColor'
                            fill='currentColor'
                            strokeWidth={0}
                            viewBox='0 0 24 24'
                            color='#fff'
                            className='cursor-pointer'
                            height={48}
                            width={48}
                            xmlns='http://www.w3.org/2000/svg'
                            style={{ color: "rgb(255, 255, 255)" }}
                          >
                            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                          </svg>
                          <div className=''>
                            <Menu as='div' className='z-40 relative inline-block text-left'>
                              <div className='flex flex-col items-center'>
                                <Menu.Button className='text-white group-hover:text-gray-400 h-10 w-6'>
                                  <div className='flex flex-col items-center'>
                                    <FiMoreVertical size={50} />
                                  </div>
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'
                              >
                                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                  <div className='py-1'>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={() => handleEditTemplate(resume)}
                                          className={classNames(
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full text-left font-semibold"
                                          )}
                                        >
                                          Change Template
                                        </button>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={() => handleDeleteResume(resume._id)}
                                          className={classNames(
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full text-left font-semibold"
                                          )}
                                        >
                                          Delete Resume
                                        </button>
                                      )}
                                    </Menu.Item>
                                    {resume.public === false && (
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={() => handleTogglePublic(resume, resume._id)}
                                            className={classNames(
                                              active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                              "block px-4 py-2 text-sm w-full text-left font-semibold"
                                            )}
                                          >
                                            Make Public
                                          </button>
                                        )}
                                      </Menu.Item>
                                    )}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {resumes && resumes.length === 0 && (
                <div className='pt-5 pb-12 flex flex-col bg-white'>
                  <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
                    <div
                      data-aos='fade-up'
                      className='relative flex-shrink-0 flex justify-center h-60'
                    >
                      <Image
                        placeholder='blur'
                        blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1654716029/MellowPiercingHammerkop-size_restricted_s88exs.gif'
                        layout='fill'
                        objectFit='contain'
                        src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1654716029/MellowPiercingHammerkop-size_restricted_s88exs.gif'
                        alt=''
                      />
                    </div>
                    <div className='py-4'>
                      <div className='text-center'>
                        <p className='mt-2 max-w-2xl mx-auto text-lg text-gray-500'>
                          Placements might be intimidating when you have no formal experience on
                          resume in corporate world. To make it formal, Provast is here to help you.
                        </p>
                        <div className='mt-4'>
                          <button
                            type='button'
                            onClick={() => setState(2)}
                            className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200'
                          >
                            Create Resume
                          </button>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {state == 2 && (
        <main className='px-8 relative pt-[10vh]'>
          <button
            onClick={() => setState(1)}
            className='absolute w-auto top-3 left-3 hover:text-gray-500'
          >
            <HiOutlineArrowNarrowLeft size={40} />
          </button>
          <h1 className='text-center pt-10 text-lg tracking-tight font-bold text-gray-900 sm:text-3xl md:text-4xl'>
            {resumes.length === 0 ? (
              <span>
                Welcome{" "}
                <span className='text-orange-600'>{`${user?.profile?.firstName} ${user?.profile?.lastName}!`}</span>
              </span>
            ) : (
              ""
            )}{" "}
            {`${isEdit ? "Edit" : "Pick"} Your Template`}
          </h1>
          <Heading
            description={`${
              tab === "All Templates"
                ? "Each resume template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates."
                : tab === "Simple"
                ? "Each template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates."
                : tab === "Creative"
                ? "Each template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates."
                : tab === "Company"
                ? "Each template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates."
                : tab === "MBA"
                ? "Each template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates."
                : ""
            } `}
          />
          {/* Tabs */}
          <div className='my-10'>
            <div className='sm:hidden'>
              <label htmlFor='tabs' className='sr-only'>
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id='tabs'
                name='tabs'
                className='block w-full focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md '
                value={tabs.find((tab) => tab.current).name}
                onChange={(e) => setTab(e.target.value)}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className='hidden sm:block'>
              <div className='border-b border-gray-200'>
                <nav className='-mb-px flex' aria-label='Tabs'>
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      onClick={() => setTab(tab.name)}
                      className={classNames(
                        tab.current
                          ? "border-[#ef481d] text-[#ef481d] bg-gray-100 rounded-t-md"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-md cursor-pointer"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <section className='my-10'>
            {tab === "All Templates" && (
              <div
                data-aos='fade-up'
                className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
              >
                {templates.map((template, templateIndex) => (
                  <div className='relative' key={templateIndex}>
                    <div
                      className={`rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer ${
                        checkPlan(template) ? "hover:shadow-lg" : "relative"
                      } `}
                      onClick={() => {
                        if (!checkPlan(template)) {
                          setForm("paymentForm");
                          setIsOpen(true);
                          return;
                        }
                        setLoading(true);
                        handleClick(template.name);
                        setLoading(false);
                      }}
                    >
                      {!checkPlan(template) && (
                        <div className='absolute z-10 top-[43%] right-[43%] flex items-center justify-center h-10 w-10 bg-gray-900 bg-opacity-70 rounded-full p-1 '>
                          <VscLock size={20} color='white' />
                        </div>
                      )}
                      <div className='flex justify-center h-full'>
                        <Image
                          placeholder='blur'
                          height={"700px"}
                          width={"500px"}
                          blurDataURL={template.image}
                          className={`${
                            checkPlan(template) ? "" : "opacity-60 "
                          } mx-auto object-cover`}
                          src={template.image}
                          alt=''
                        />
                      </div>
                      <div>
                        <h6 className='text-xl mt-2 font-bold text-gray-400 text-center'>
                          {template.heading}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "Simple" && (
              <div
                data-aos='fade-up'
                className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
              >
                {templates
                  .filter((templates) => templates.category === "simple")
                  .map((template, templateIndex) => (
                    <div className='relative' key={templateIndex}>
                      <div
                        className={`rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer ${
                          checkPlan(template) ? "hover:shadow-lg" : "relative"
                        } `}
                        onClick={() => {
                          if (!checkPlan(template)) {
                            setForm("paymentForm");
                            setIsOpen(true);
                            return;
                          }
                          setLoading(true);
                          handleClick(template.name);
                          setLoading(false);
                        }}
                      >
                        {!checkPlan(template) && (
                          <div className='absolute z-10 top-[43%] right-[43%] flex items-center justify-center h-10 w-10 bg-gray-900 bg-opacity-70 rounded-full p-1 '>
                            <VscLock size={20} color='white' />
                          </div>
                        )}
                        <div className='flex justify-center h-full'>
                          <Image
                            placeholder='blur'
                            height={"700px"}
                            width={"500px"}
                            blurDataURL={template.image}
                            className={`${
                              checkPlan(template) ? "" : "opacity-60 "
                            } mx-auto object-cover`}
                            src={template.image}
                            alt=''
                          />
                        </div>
                        <div>
                          <h6 className='text-xl mt-2 font-bold text-gray-400 text-center'>
                            {template.heading}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {tab === "Creative" && (
              <div
                data-aos='fade-up'
                className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
              >
                {templates
                  .filter((templates) => templates.category === "creative")
                  .map((template, templateIndex) => (
                    <div className='relative' key={templateIndex}>
                      <div
                        className={`rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer ${
                          checkPlan(template) ? "hover:shadow-lg" : "relative"
                        } `}
                        onClick={() => {
                          if (!checkPlan(template)) {
                            setForm("paymentForm");
                            setIsOpen(true);
                            return;
                          }
                          setLoading(true);
                          handleClick(template.name);
                          setLoading(false);
                        }}
                      >
                        {!checkPlan(template) && (
                          <div className='absolute z-10 top-[43%] right-[43%] flex items-center justify-center h-10 w-10 bg-gray-900 bg-opacity-70 rounded-full p-1 '>
                            <VscLock size={20} color='white' />
                          </div>
                        )}
                        <div className='flex justify-center h-full'>
                          <Image
                            placeholder='blur'
                            height={"700px"}
                            width={"500px"}
                            blurDataURL={template.image}
                            className={`${
                              checkPlan(template) ? "" : "opacity-60 "
                            } mx-auto object-cover`}
                            src={template.image}
                            alt=''
                          />
                        </div>
                        <div>
                          <h6 className='text-xl mt-2 font-bold text-gray-400 text-center'>
                            {template.heading}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {tab === "Company" && (
              <div
                data-aos='fade-up'
                className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
              >
                {templates
                  .filter((templates) => templates.category === "company")
                  .map((template, templateIndex) => (
                    <div className='relative' key={templateIndex}>
                      <div
                        className={`rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer ${
                          checkPlan(template) ? "hover:shadow-lg" : "relative"
                        } `}
                        onClick={() => {
                          if (!checkPlan(template)) {
                            setForm("paymentForm");
                            setIsOpen(true);
                            return;
                          }
                          setLoading(true);
                          handleClick(template.name);
                          setLoading(false);
                        }}
                      >
                        {!checkPlan(template) && (
                          <div className='absolute z-10 top-[43%] right-[43%] flex items-center justify-center h-10 w-10 bg-gray-900 bg-opacity-70 rounded-full p-1 '>
                            <VscLock size={20} color='white' />
                          </div>
                        )}
                        <div className='flex justify-center h-full'>
                          <Image
                            placeholder='blur'
                            height={"700px"}
                            width={"500px"}
                            blurDataURL={template.image}
                            className={`${
                              checkPlan(template) ? "" : "opacity-60 "
                            } mx-auto object-cover`}
                            src={template.image}
                            alt=''
                          />
                        </div>
                        <div>
                          <h6 className='text-xl mt-2 font-bold text-gray-400 text-center'>
                            {template.heading}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {tab === "MBA" && (
              <div
                data-aos='fade-up'
                className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
              >
                {templates
                  .filter((templates) => templates.category === "mba")
                  .map((template, templateIndex) => (
                    <div className='relative' key={templateIndex}>
                      <div
                        className={`rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer ${
                          checkPlan(template) ? "hover:shadow-lg" : "relative"
                        } `}
                        onClick={() => {
                          if (!checkPlan(template)) {
                            setForm("paymentForm");
                            setIsOpen(true);
                            return;
                          }
                          setLoading(true);
                          handleClick(template.name);
                          setLoading(false);
                        }}
                      >
                        {!checkPlan(template) && (
                          <div className='absolute z-10 top-[43%] right-[43%] flex items-center justify-center h-10 w-10 bg-gray-900 bg-opacity-70 rounded-full p-1 '>
                            <VscLock size={20} color='white' />
                          </div>
                        )}
                        <div className='flex justify-center h-full'>
                          <Image
                            placeholder='blur'
                            height={"700px"}
                            width={"500px"}
                            blurDataURL={template.image}
                            className={`${
                              checkPlan(template) ? "" : "opacity-60 "
                            } mx-auto object-cover`}
                            src={template.image}
                            alt=''
                          />
                        </div>
                        <div>
                          <h6 className='text-xl mt-2 font-bold text-gray-400 text-center'>
                            {template.heading}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </main>
      )}
      <style jsx>{`
        .box {
          position: relative;
          border-radius: 5px;
          width: 250px;
          height: 45vh;
          margin-top: 30px;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          transition: background 0.5s ease;
        }

        .box:hover .overlay {
          display: block;
          background: rgba(0, 0, 0, 0.7);
        }

        .box:hover .overlay-create {
          display: block;
          background: rgba(0, 0, 0, 0.7);
        }

        .box-image {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
        }

        .title {
          position: absolute;
          width: 100%;
          left: 0;
          top: 42%;
          font-weight: 700;
          font-size: 30px;
          text-align: center;
          text-transform: uppercase;
          color: white;
          z-index: 1;
          transition: top 0.5s ease;
        }

        .title-create {
          position: absolute;
          width: 100%;
          left: 0;
          top: 42%;
          font-weight: 700;
          font-size: 30px;
          text-align: center;
          text-transform: uppercase;
          color: gray;
          z-index: 1;
          transition: top 0.5s ease;
        }

        .box:hover .title {
          top: 30%;
        }

        .box:hover .title-create {
          top: 30%;
        }

        .button {
          position: absolute;
          width: 100%;
          left: 0;
          top: 60%;
          text-align: center;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .button a {
          width: 70%;
          padding: 12px 48px;
          text-align: center;
          color: white;
          border: solid 2px white;
          z-index: 1;
        }

        .box:hover .button {
          opacity: 1;
        }
      `}</style>
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

  if (user.category !== "individual") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ResumeIndex;
