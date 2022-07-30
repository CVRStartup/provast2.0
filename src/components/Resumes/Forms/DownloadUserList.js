import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useModelContext } from "../../../context/ModelContext";
import { Loading } from "../../Layouts/Loading";

export const DownloadUserList = () => {
  const { closeModal, setLoading, loading } = useModelContext();
  const [fileName, setFileName] = useState("StudentList");
  const [applied, setApplied] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [notResponded, setNotResponded] = useState(false);
  const [userData, setUserData] = useState([]);
  const [job, setJob] = useState(null);
  const router = useRouter();
  const headers = [
    { label: "Roll Number", key: "rollnumber" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Branch", key: "branch" },
    { label: "Applied Role", key: "roles" },
    { label: "Status", key: "status" },
  ];

  const getRoles = (x) => {
    return x?.status?.roles.map(
      (role, index) => role + (index === x?.status.roles.length - 1 ? "" : ", ")
    );
  };

  useEffect(() => {
    (async () => {
      const {
        data: { job },
      } = await axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs/${router.query.id}`);
      setJob(job);
    })();
  }, []);

  useEffect(() => {
    if (!job) return;
    setUserData([
      ...job.eligible
        .map((x) => {
          if (
            (!applied && !rejected && !notResponded) ||
            (applied && x?.status.applied === true) ||
            (rejected && x?.status.applied === false) ||
            (notResponded && x?.status.applied === null)
          )
            return {
              ...x,
              roles: getRoles(x),
              status: x?.status?.applied
                ? "Applied"
                : x?.status.applied === null
                ? "Pending"
                : "Rejected",
            };
        })
        .filter((x) => x),
      ,
    ]);
  }, [applied, rejected, notResponded, job?.eligible]);
  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loading />}
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white">
          Download User List
        </Dialog.Title>
      </div>
      <div className="mt-5 w-full">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="name"
              className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
            >
              File Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ex:- Commonvault Students"
                required
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>
        </div>
        <fieldset className="space-y-4 mt-4">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                onChange={(e) => setApplied(!applied)}
                className="h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-white">
                Applied Students
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
                onChange={(e) => setRejected(!rejected)}
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="candidates" className="font-medium text-white">
                Rejected Students
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
                onChange={(e) => setNotResponded(!notResponded)}
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="offers" className="font-medium text-white">
                Not Responsed Students
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setLoading(false);
              closeModal();
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <CSVLink headers={headers} data={userData} filename={fileName}>
              Save
            </CSVLink>
          </button>
        </div>
      </div>
    </form>
  );
};
