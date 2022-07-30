import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { skilloptions } from "../../../lib/helper";
import { ExtraOption } from "../../Resumes/Displays/Shared/ExtraOption";

const options = [
  { id: 1, name: "Beginner" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Expert" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SkillForm = () => {
  const { closeModal, isEdit, editId } = useModelContext();
  const { resume, skills, setSkills, debounceUpdateResume } = useResumeContext();

  const [selected, setSelected] = useState(options[0]);
  const [option, setOption] = useState({
    name: "",
    level: "",
    enabled: true,
  });

  const currentSkills = new Set();
  skills.forEach((skill) => currentSkills.add(skill.name));

  const [skillOptions, setSkillOptions] = useState(skilloptions);
  const [skillName, setSkillName] = useState("");

  const setSkill = (id, enabled, level) => {
    const newstate = skillOptions.map((skill) => {
      if (skill.id === id) {
        return {
          ...skill,
          level: level,
          enabled: enabled,
        };
      } else return skill;
    });
    setSkillOptions([...newstate]);
  };

  const handleSkillOptionAdd = () => {
    setSkillOptions([
      ...skillOptions,
      {
        id: skillOptions.length + 1,
        name: skillName,
        icon: AiFillStar,
        level: selected.name,
        enabled: true,
      },
    ]);
    setSkillName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newstate = skills;
    if (isEdit) {
      newstate = newstate.map((x) => {
        if (x._id === editId) return { ...option, level: selected.name };
        return x;
      });
    } else {
      skillOptions.forEach((skill) => {
        if (skill.enabled)
          newstate.push({ name: skill.name, level: skill.level, enabled: skill.enabled });
      });
    }
    setSkills([...newstate]);
    debounceUpdateResume({ ...resume, skills: newstate });
    closeModal();
  };

  useEffect(() => {
    if (isEdit) {
      setOption(skills.filter((x) => x._id === editId)[0]);
      setSelected(
        options.filter((x) => x.name === skills.filter((x) => x._id === editId)[0].level)[0]
      );
    }
  }, [isEdit, editId, skills]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white">
          {isEdit ? "Edit Skill" : "Add Skills"}
        </Dialog.Title>
      </div>
      {!isEdit &&
        skillOptions.map((skill, index) => {
          if (!currentSkills.has(skill.name))
            return <ExtraOption key={index} skill={skill} setSkill={setSkill} showLevel={true} />;
        })}
      <div className="mt-5 w-full">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="ReactJS"
                value={isEdit ? option.name : skillName}
                onChange={(e) => {
                  if (isEdit)
                    setOption({
                      ...option,
                      name: e.target.value,
                    });
                  else setSkillName(e.target.value);
                }}
                required={isEdit}
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block uppercase tracking-wider text-[10px] font-medium text-gray-400">
                    Level
                  </Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                      <span className="block truncate">{selected.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
        </div>
      </div>
      {!isEdit && (
        <div className="pt-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSkillOptionAdd}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Add
            </button>
          </div>
        </div>
      )}
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
