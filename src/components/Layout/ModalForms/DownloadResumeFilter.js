import React from "react";
import { useDownloadResumeFilterContext } from "../../../context/DownloadResumeFilterContext";
import { useModelContext } from "../../../context/ModalContext";

export const DownloadResumeFilter = () => {
  const { closeModal } = useModelContext();
  const { filter, setFilter, setDownloadOpen } = useDownloadResumeFilterContext();
  return (
    <form>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium leading-6 text-white">
          Download Student Resumes Using Filter
        </h3>
      </div>
      <div className="mt-5 w-full">
        <fieldset className="space-y-4 mt-4">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                onChange={(e) =>
                  setFilter({ ...filter, removeCollegeName: !filter.removeCollegeName })
                }
                className="h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-white">
                Remove College Name
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                type="checkbox"
                onChange={(e) => setFilter({ ...filter, removeEmail: !filter.removeEmail })}
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="candidates" className="font-medium text-white">
                Remove Email
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="offers"
                aria-describedby="offers-description"
                name="offers"
                type="checkbox"
                onChange={(e) =>
                  setFilter({ ...filter, removePhoneNumber: !filter.removePhoneNumber })
                }
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="offers" className="font-medium text-white">
                Remove Phone Number
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              closeModal();
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              closeModal();
              setDownloadOpen(true);
            }}
            className="ml-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Download
          </button>
        </div>
      </div>
    </form>
  );
};
