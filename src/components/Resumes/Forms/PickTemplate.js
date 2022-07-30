import { Dialog } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { useModelContext } from "../../../context/ModelContext";
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
  // {
  //   name: "stockholm",
  //   category: "creative",
  //   image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1649931161/AlbertDera_3_mwdbnv.jpg",
  //   heading: "Stockholm",
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PickTemplate = () => {
  const { loading, setLoading, closeModal } = useModelContext();
  const [tab, setTab] = useState("All Templates");
  const tabs = [
    { name: "All Templates", current: tab === "All Templates" },
    { name: "Simple", current: tab === "Simple" },
    { name: "Creative", current: tab === "Creative" },
    { name: "Company", current: tab === "Company" },
  ];
  return (
    <div className='w-[95%] mx-auto'>
      <div className='flex items-center justify-center mb-4'>
        <Dialog.Title as='h3' className='text-3xl font-medium leading-6 text-white'>
          Pick Template
        </Dialog.Title>
      </div>
      <div className='w-full'>
        <div className=''>
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
                        ? "border-gray-300 text-gray-300"
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
        <section className='max-h-[62vh] my-5 overflow-auto'>
          {tab === "All Templates" && (
            <div
              data-aos='fade-up'
              className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'
            >
              {templates.map((template, templateIndex) => (
                <div className='relative' key={templateIndex}>
                  <div
                    className='rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer hover:shadow-lg'
                    onClick={() => {
                      setLoading(true);
                      //   handleClick(template.name);
                      setLoading(false);
                    }}
                  >
                    <div className='flex justify-center h-full'>
                      <Image
                        placeholder='blur'
                        height={"700px"}
                        width={"500px"}
                        blurDataURL={template.image}
                        className='mx-auto object-cover'
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
              className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'
            >
              {templates
                .filter((templates) => templates.category === "simple")
                .map((template, templateIndex) => (
                  <div className='relative' key={templateIndex}>
                    <div
                      className='rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer hover:shadow-lg'
                      onClick={() => {
                        setLoading(true);
                        // handleClick(template.name);
                        setLoading(false);
                      }}
                    >
                      <div className='flex justify-center h-full'>
                        <Image
                          placeholder='blur'
                          height={"700px"}
                          width={"500px"}
                          blurDataURL={template.image}
                          className='mx-auto object-cover'
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
              className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'
            >
              {templates
                .filter((templates) => templates.category === "creative")
                .map((template, templateIndex) => (
                  <div className='relative' key={templateIndex}>
                    <div
                      className='rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer hover:shadow-lg'
                      onClick={() => {
                        setLoading(true);
                        // handleClick(template.name);
                        setLoading(false);
                      }}
                    >
                      <div className='flex justify-center h-full'>
                        <Image
                          placeholder='blur'
                          height={"700px"}
                          width={"500px"}
                          blurDataURL={template.image}
                          className='mx-auto object-cover'
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
              className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'
            >
              {templates
                .filter((templates) => templates.category === "company")
                .map((template, templateIndex) => (
                  <div className='relative' key={templateIndex}>
                    <div
                      className='rounded-md bg-gray-100 h-auto p-5 m-5 cursor-pointer hover:shadow-lg'
                      onClick={() => {
                        setLoading(true);
                        // handleClick(template.name);
                        setLoading(false);
                      }}
                    >
                      <div className='flex justify-center h-full'>
                        <Image
                          placeholder='blur'
                          height={"700px"}
                          width={"500px"}
                          blurDataURL={template.image}
                          className='mx-auto object-cover'
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
      </div>

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
      </div>
    </div>
  );
};

export default PickTemplate;
