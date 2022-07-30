import { Dialog } from "@headlessui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { verifyDates } from "../../../lib/helper";
import { FormToggle } from "../../Resumes/Displays/Shared/FormToggle";
import { Toggle } from "../../Resumes/Displays/Shared/Toggle";
import { MarkdownSupporter } from "../../Resumes/MarkdownSupporter";

export const ProjectForm = () => {
  const { closeModal, isEdit, editId } = useModelContext();
  const { resume, projects, setProjects, debounceUpdateResume } = useResumeContext();
  const [error, setError] = useState({
    from: null,
    to: null,
  });
  const [option, setOption] = useState({
    name: "",
    from: "",
    to: "",
    website: "",
    summary: {
      data: "",
      enabled: true,
    },
    enabled: true,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ from: null, to: null });
    const newErrorState = {
      from: verifyDates(option.from, option.to).from,
      to: verifyDates(option.from, option.to).to,
    };
    setError(newErrorState);

    if (!newErrorState.from && !newErrorState.to) {
      let newstate = projects;
      if (isEdit) {
        newstate = newstate.map((x) => {
          if (x._id === editId) return option;
          return x;
        });
      } else newstate.push(option);
      setProjects([...newstate]);
      debounceUpdateResume({ ...resume, projects: newstate });
      closeModal();
    }
  };
  useEffect(() => {
    if (isEdit) setOption(projects.filter((x) => x._id === editId)[0]);
  }, [isEdit, editId, projects]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white">
          {isEdit ? "Edit" : "Add"} Project
        </Dialog.Title>
      </div>
      <div className="mt-5 w-full">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="title"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Title
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Resume Builder"
                value={option.name}
                onChange={(e) =>
                  setOption({
                    ...option,
                    name: e.target.value,
                  })
                }
                className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="website"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Website
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="website"
                id="website"
                placeholder="https://"
                value={option.website}
                onChange={(e) =>
                  setOption({
                    ...option,
                    website: e.target.value,
                  })
                }
                className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="startDate"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Start Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={option.from?.substring(0, 10)}
                onChange={(e) => {
                  const dateErrors = verifyDates(e.target.value, option.to);
                  setError({ ...error, from: dateErrors.from, to: dateErrors.to });
                  setOption({ ...option, from: e.target.value });
                }}
                required
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              {error.from && (
                <p className="text-xs text-red-600 font-bold ml-1 mt-1">{error.from}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="endDate"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              End Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="endDate"
                id="endDate"
                required
                value={option.to?.substring(0, 10)}
                onChange={(e) => {
                  const dateErrors = verifyDates(option.from, e.target.value);
                  setError({ ...error, from: dateErrors.from, to: dateErrors.to });
                  setOption({ ...option, to: e.target.value });
                }}
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              {error.to && <p className="text-xs text-red-600 font-bold ml-1 mt-1">{error.to}</p>}
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="summary"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Summary
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <textarea
                rows={4}
                type="text"
                name="summary"
                id="summary"
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
                className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="flex items-center my-3">
              <FormToggle
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
              <p className="text-white ml-2 text-sm">Display summary in resume</p>
            </div>
            <MarkdownSupporter />
          </div>
        </div>
      </div>
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
