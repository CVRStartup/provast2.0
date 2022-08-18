import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";

const options = [
  { id: 1, name: "Beginner" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Expert" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ExtraOption = ({ skill, setSkill, showLevel }) => {
  const setSelectedOption = (option) => {
    setSkill(skill.id, skill.enabled, option.name);
  };
  return (
    <div key={skill.id} className='mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
      <div
        className='sm:col-span-3 flex items-center text-white'
        onClick={() => setSkill(skill.id, !skill.enabled, skill.level)}
      >
        <span
          className={`border-2 ${skill.enabled ? "border-orange-500" : ""} rounded-full p-2 mr-4`}
        >
          <skill.icon size={24} />
        </span>
        <span className='text-lg'> {skill.name}</span>
      </div>
      <div className='sm:col-span-3'>
        {showLevel && (
          <Listbox
            value={options.filter((x) => x.name === skill.level)[0]}
            onChange={setSelectedOption}
            disabled={!skill.enabled}
          >
            {({ open }) => (
              <>
                <Listbox.Label className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'>
                  Level
                </Listbox.Label>
                <div className='mt-1 relative '>
                  <Listbox.Button className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm '>
                    <span className='block truncate'>
                      {options.filter((x) => x.name === skill.level)[0].name}
                    </span>
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
                      {options.map((option) => (
                        <Listbox.Option
                          key={option.id}
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
                                {option.name}
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
        )}
      </div>
    </div>
  );
};
