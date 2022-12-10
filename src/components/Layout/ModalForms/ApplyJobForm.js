import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useModelContext } from "../../../context/ModalContext";
import { Loading } from "../../Reusables/Loading";
import { useUser } from "../../../lib/hooks";
import { handleJobResponse } from "../../../lib/helper";
import { mutate } from "swr";
import JobQuestionInput from "../../Student/JobQuestionInput";

export const ApplyJobForm = () => {
  const user = useUser();
  const { closeModal, modalJob, modalJobResume, modalQues, education, personal } =
    useModelContext();
  const [checkedRoles, setCheckRoles] = useState([]);
  return (
    <form>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium leading-6 text-white">
          For which role do you want to apply?
        </h3>
      </div>
      <div className="mt-5 w-full">
        <fieldset className="space-y-5">
          <div className="relative">
            {modalJob?.designation?.roles?.map((role, index) => {
              return (
                <div key={index} className="mb-2 flex mr-4">
                  <div className="flex items-center h-5 w-6">
                    <input
                      id={role}
                      name={role}
                      type="checkbox"
                      checked={checkedRoles.includes(role)}
                      onChange={(e) => {
                        const id = checkedRoles.indexOf(role);
                        if (id == -1) {
                          if (checkedRoles.length < modalJob?.designation?.max)
                            setCheckRoles([...checkedRoles, role]);
                          else
                            toast.error(
                              "You can not apply to more than " +
                                modalJob?.designation?.max +
                                " roles."
                            );
                        } else {
                          const cat = checkedRoles;
                          cat.splice(id, 1);
                          setCheckRoles([...cat]);
                        }
                      }}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-1 text-sm">
                    <label htmlFor={role} className="font-medium text-white">
                      {role}
                    </label>
                  </div>
                </div>
              );
            })}
            <p className="text-red-500 font-semibold text-sm">
              You can apply to any {modalJob?.designation?.max} of the roles
            </p>
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
            onClick={async () => {
              if (checkedRoles.length > 0) {
                await handleJobResponse(
                  modalJob,
                  user,
                  "Apply",
                  checkedRoles,
                  modalQues,
                  modalJobResume,
                  personal,
                  education
                );
                await mutate(`/api/jobs/${modalJob._id}`);
                closeModal();
              } else {
                toast.error("Please select any one role", {
                  toastId: "Please select any one role",
                });
              }
            }}
            className="ml-3  inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Apply
          </button>
        </div>
      </div>
    </form>
  );
};
