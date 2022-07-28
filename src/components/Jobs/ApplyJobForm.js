import React, { useState } from "react";
import { useModelContext } from "../../context/ModelContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { Loading } from "../Layouts/Loading";

export const ApplyJobForm = () => {
  const { closeModal, roles, modalJob, loading, setLoading } = useModelContext();
  const [checkedRoles, setCheckRoles] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = async (op, roles) => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    setLoading(true);
    if (modalJob.typeOfPost === "Shortlisted Students") {
      let newstatus = [];
      modalJob.eligible.forEach((x) => {
        if (x && x.rollnumber === session?.userDetails?.rollNumber)
          newstatus.push({
            ...x,
            status: {
              applied: op === "Apply",
              roles: roles,
              updatedAt: new Date(),
            },
          });
      });
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs/status?id=${modalJob._id}&roll=${session?.userDetails?.rollNumber}`,
        {
          newstatus: newstatus[0],
        }
      );
      setLoading(false);
      if (data.message == "Job Updated") {
        toast.success(op === "Apply" ? "Job Applied" : "Captured response", {
          toastId: "Job Updated",
        });
        router.reload();
      } else {
        toast.error(data.message, { toastId: data.message });
      }
    } else {
      let newstate = [...modalJob.eligible];
      newstate.push({
        name: session?.userDetails?.firstName + " " + session?.userDetails?.lastName,
        branch: session?.userDetails?.branch.code,
        rollnumber: session?.userDetails?.rollNumber,
        email: session?.userDetails?.emailList[0],
        phone: session?.userDetails?.phone?.toString(),
        status: {
          applied: op === "Apply",
          roles: roles,
          updatedAt: new Date(),
        },
      });

      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs`, {
        ...modalJob,
        eligible: newstate,
      });

      setLoading(false);

      if (data.message == "Job Updated") {
        toast.success(op === "Apply" ? "Job Applied" : "Captured response", {
          toastId: "Job Updated",
        });
        router.reload();
      } else {
        toast.error(data.message, { toastId: data.message });
      }
    }
  };
  return (
    <form>
      {loading && <Loading />}
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-medium leading-6 text-white'>
          For which role do you want to apply?
        </h3>
      </div>
      <div className='mt-5 w-full'>
        <fieldset className='space-y-5'>
          <div className='relative'>
            {modalJob?.designation?.roles?.map((role, index) => {
              return (
                <div key={index} className='mb-2 flex mr-4'>
                  <div className='flex items-center h-5 w-6'>
                    <input
                      id={role}
                      name={role}
                      type='checkbox'
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
                      className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                    />
                  </div>
                  <div className='ml-1 text-sm'>
                    <label htmlFor={role} className='font-medium text-white'>
                      {role}
                    </label>
                  </div>
                </div>
              );
            })}
            <p className='text-red-500 font-semibold text-sm'>
              You can apply to any {modalJob?.designation?.max} of the roles
            </p>
          </div>
        </fieldset>
      </div>
      <div>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => {
              closeModal();
            }}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              if (checkedRoles.length > 0) {
                handleClick("Apply", checkedRoles);
                closeModal();
              } else {
                toast.error("Please select any one role", {
                  toastId: "Please select any one role",
                });
              }
            }}
            className='ml-3  inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Apply
          </button>
        </div>
      </div>
    </form>
  );
};
