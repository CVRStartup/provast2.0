import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { hobbyoptions, skilloptions } from "../../../lib/helper";
import { ExtraOption } from "../../Resumes/Displays/Shared/ExtraOption";

export const HobbiesForm = () => {
  const { closeModal, isEdit, editId } = useModelContext();
  const { resume, hobbies, setHobbies, debounceUpdateResume } = useResumeContext();
  const [option, setOption] = useState({
    name: "",
    enabled: true,
  });

  const currentSkills = new Set();
  hobbies.forEach((skill) => currentSkills.add(skill.name));

  const [skillOptions, setSkillOptions] = useState(hobbyoptions);
  const [skillName, setSkillName] = useState("");

  const setSkill = (id, enabled, level) => {
    const newstate = skillOptions.map((skill) => {
      if (skill.id === id) {
        return {
          ...skill,
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
        enabled: true,
      },
    ]);
    setSkillName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newstate = hobbies;
    if (isEdit) {
      newstate = newstate.map((x) => {
        if (x._id === editId) return option;
        return x;
      });
    } else {
      skillOptions.forEach((skill) => {
        if (skill.enabled) newstate.push({ name: skill.name, enabled: skill.enabled });
      });
    }
    setHobbies([...newstate]);
    debounceUpdateResume({ ...resume, hobbies: newstate });
    closeModal();
  };
  useEffect(() => {
    if (isEdit) setOption(hobbies.filter((x) => x._id === editId)[0]);
  }, [isEdit, editId, hobbies]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white">
          {isEdit ? "Edit" : "Add"} Hobby
        </Dialog.Title>
      </div>
      {!isEdit &&
        skillOptions.map((skill, index) => {
          if (!currentSkills.has(skill.name))
            return <ExtraOption key={index} skill={skill} setSkill={setSkill} showLevel={false} />;
        })}
      <div className="mt-5 w-full">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6   ">
            <label
              htmlFor="hobby"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="hobby"
                id="hobby"
                placeholder="Fishing"
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
                className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
              />
            </div>
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
