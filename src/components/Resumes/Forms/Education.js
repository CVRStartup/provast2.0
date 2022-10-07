import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useModelContext } from "../../../context/ModelContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { degrees, validate, verifyDates } from "../../../lib/helper";
import { MarkdownSupporter } from "../MarkdownSupporter";
import { Toggle } from "./Shared/Toggle";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EducationForm = () => {
  const { closeModal, isEdit, editId } = useModelContext();
  const { resume, education, setEducation, debounceUpdateResume } = useResumeContext();
  const [error, setError] = useState({
    from: null,
    to: null,
  });
  const [selected, setSelected] = useState(degrees[0]);
  const [collegeList, setCollegeList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [option, setOption] = useState({
    institution: "",
    fieldOfStudy: "",
    typeOfDegree: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    gpa: "",
    summary: {
      data: "",
      enabled: true,
    },
    enabled: true,
  });

  useEffect(() => {
    if (isEdit) setOption(education.filter((x) => x._id === editId)[0]);
  }, [isEdit, editId, education]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ from: null, to: null, grade: null });
    const newErrorState = {
      from: verifyDates(option.startDate, option.endDate).from,
      to: verifyDates(option.startDate, option.endDate).to,
      grade: validate(option.gpa) === "Accepted" ? null : validate(option.gpa),
    };
    setError(newErrorState);
    if (!newErrorState.from && !newErrorState.to && !newErrorState.grade) {
      let newstate = education;
      if (isEdit) {
        newstate = newstate.map((x) => {
          if (x._id === editId) return { ...option, typeOfDegree: selected };
          return x;
        });
      } else newstate.push({ ...option, typeOfDegree: selected });
      setEducation([...newstate]);
      console.log(newstate);
      console.log({ ...resume, education: newstate });
      debounceUpdateResume({ ...resume, education: newstate });
      closeModal();
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      collegeSearchHandler();
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, []);

  const collegeSearchHandler = async () => {
    if (selected === "School / Intermediate" || selected === "None") return;
    if (option.institution === "") return;
    const {
      data: { colleges },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/college/list?search=${option.institution}`
    );
    setCollegeList(colleges);
    if (!dropDownState) setShowDropDown(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center justify-between'>
        <Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-white'>
          Add Education
        </Dialog.Title>
      </div>
      <div className='mt-5 w-full'>
        <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-6'>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'>
                    Type Of Degree
                  </Listbox.Label>
                  <div className='mt-1 relative'>
                    <Listbox.Button className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm'>
                      <span className='block truncate'>{selected}</span>
                      <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                        <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        {degrees.map((option, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active ? "text-white bg-orange-600" : "text-gray-900",
                                "cursor-default select-none relative py-2 pl-3 pr-9"
                              )
                            }
                            value={option}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {option}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-orange-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
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

          <div className='sm:col-span-6'>
            <label
              htmlFor='institution'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              School
            </label>
            <div className='mt-1 flex rounded-md shadow-sm relative'>
              <input
                type='text'
                name='institution'
                id='institution'
                required
                autoComplete='offv'
                placeholder='CVR College Of Engineering'
                value={option.institution}
                onChange={(e) => {
                  setDropDownState(false);
                  setOption({
                    ...option,
                    institution: e.target.value,
                  });
                }}
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300'
              />
              {showDropDown && collegeList.length > 0 && (
                <ul className='w-full absolute -bottom-1 left-0 translate-y-full overflow-y-scroll max-h-40 rounded border-1 border-gray-400 bg-white shadow-md z-20'>
                  {collegeList.map((college) => (
                    <li
                      key={college._id}
                      className='px-2 py-3 z-100 hover:bg-orange-600 hover:text-white border-b-gray-50 cursor-pointer'
                      onClick={() => {
                        setOption({
                          ...option,
                          institution: college.collegeName,
                        });

                        setShowDropDown(false);
                        setDropDownState(true);
                      }}
                    >
                      {console.log("from li")}
                      {college.collegeName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='fieldOfStudy'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Field Of Study
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <input
                type='text'
                name='fieldOfStudy'
                id='fieldOfStudy'
                required
                placeholder='Computer Science And Technology'
                value={option.fieldOfStudy}
                onChange={(e) =>
                  setOption({
                    ...option,
                    fieldOfStudy: e.target.value,
                  })
                }
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='grade'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              grade
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='grade'
                id='grade'
                placeholder='8.8 CGPA or 88%'
                required
                value={option.gpa}
                onChange={(e) =>
                  setOption({
                    ...option,
                    gpa: e.target.value.toUpperCase(),
                  })
                }
                className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            {error.grade && (
              <p className='text-xs text-red-600 font-bold ml-1 mt-1'>{error.grade}</p>
            )}
          </div>
          <div className='sm:col-span-3'>
            <label
              htmlFor='startDate'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Start Date
            </label>
            <div className='mt-1'>
              <input
                type='date'
                name='startDate'
                id='startDate'
                value={option.startDate?.substring(0, 10)}
                onChange={(e) => {
                  const dateErrors = verifyDates(e.target.value, option.endDate);
                  setError({ ...error, from: dateErrors.from, to: dateErrors.to });
                  setOption({ ...option, startDate: e.target.value });
                }}
                required
                className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
              />
              {error.from && (
                <p className='text-xs text-red-600 font-bold ml-1 mt-1'>{error.from}</p>
              )}
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='endDate'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              End Date (Or expected)
            </label>
            <div className='mt-1'>
              <input
                type='date'
                name='endDate'
                id='endDate'
                required
                value={option.endDate?.substring(0, 10)}
                onChange={(e) => {
                  const dateErrors = verifyDates(option.startDate, e.target.value);
                  setError({ ...error, from: dateErrors.from, to: dateErrors.to });
                  setOption({ ...option, endDate: e.target.value });
                }}
                className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
              />
              {error.to && <p className='text-xs text-red-600 font-bold ml-1 mt-1'>{error.to}</p>}
            </div>
          </div>
          <div className='sm:col-span-6'>
            <label
              htmlFor='summary'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              Summary
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <textarea
                rows={4}
                type='text'
                name='summary'
                id='summary'
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
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300'
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
