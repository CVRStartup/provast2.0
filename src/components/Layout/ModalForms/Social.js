import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";

export const SocialForm = () => {
  const { closeModal, isEdit, editId } = useModelContext();
  const { resume, social, setSocial, debounceUpdateResume } = useResumeContext();
  const [option, setOption] = useState({
    network: "",
    username: "",
    url: "",
    enabled: true,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let newstate = social;
    if (isEdit) {
      newstate = newstate.map((x) => {
        if (x._id === editId) return option;
        return x;
      });
    } else newstate.push(option);
    setSocial([...newstate]);
    debounceUpdateResume({ ...resume, social: newstate });
    closeModal();
  };
  useEffect(() => {
    if (isEdit) setOption(social.filter((x) => x._id === editId)[0]);
  }, [isEdit, editId, social]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white">
          {isEdit ? "Edit" : "Add"} Social Network
        </Dialog.Title>
      </div>
      <div className="mt-5 w-full">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="network"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Network
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="network"
                id="network"
                value={option.network}
                onChange={(e) => {
                  setOption({
                    ...option,
                    network: e.target.value,
                  });
                }}
                required
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="username"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="username"
                id="username"
                required
                value={option.username}
                onChange={(e) => {
                  setOption({
                    ...option,
                    username: e.target.value,
                  });
                }}
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-6   ">
            <label
              htmlFor="url"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="url"
                id="url"
                required
                value={option.url}
                onChange={(e) => {
                  setOption({
                    ...option,
                    url: e.target.value,
                  });
                }}
                className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
              />
            </div>
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
