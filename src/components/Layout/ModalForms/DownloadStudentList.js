import { Dialog } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../lib/hooks";
import { CSVLink } from "react-csv";
import { useAssessmentContext } from "../../../context/AssessmentContext";
import { useModelContext } from "../../../context/ModalContext";
import { Loading } from "../../Reusables/Loading";
import { useRouter } from "next/router";

export const DownloadStudentList = () => {
  const user = useUser();
  const router = useRouter();
  const { closeModal, setLoading, loading } = useModelContext();
  const {
    filteredStudentAssessmentStatuses,
    studentAssessmentStatuses,
    setStudentAssessmentStatuses,
  } = useAssessmentContext();
  const [fileName, setFileName] = useState("StudentList");
  const [finished, setFinished] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [unopened, setUnopened] = useState(false);
  const [useKeyword, setUseKeyword] = useState(false);
  const [statuses, setStatuses] = useState(null);
  const [prevStatuses, setPrevStatuses] = useState(null);
  const [userData, setUserData] = useState([]);

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Marks", key: "marks" },
  ];

  useEffect(async () => {
    let studentStatuses = [];

    const {
      data: { assessmentStatuses },
    } = await axios.get(`/api/assessments/status?assessmentId=${router.query.id}`);

    let statuses = assessmentStatuses.filter((status) => user.college.code === status.college.code);

    const {
      data: { students },
    } = await axios.get(
      `/api/college/students?collegename=${user.college.name}&collegecode=${user.college.code}`
    );

    students.forEach((student) => {
      let name =
        student.profile.firstName +
        " " +
        student.profile.middleName +
        " " +
        student.profile.lastName;
      let email = student.email;
      let status = null;
      let marks = null;

      for (let studentStatus of statuses) {
        if (studentStatus.user == student._id) {
          if (studentStatus.finishedAt != null) {
            status = true;
            marks = studentStatus.marks.scored + "/" + studentStatus.marks.total;
          } else status = false;

          break;
        }
      }

      studentStatuses.push({
        name,
        email,
        status,
        marks,
      });
    });
    setStatuses(studentStatuses);
    setStudentAssessmentStatuses(studentStatuses);
  }, []),
    useEffect(() => {
      if (!statuses) return;
      let newStatuses = prevStatuses ? prevStatuses : statuses;

      setUserData([
        ...newStatuses
          .map((x) => {
            if (
              (!finished && !inProgress && !unopened) ||
              (finished && x.status === true) ||
              (inProgress && x.status === false) ||
              (unopened && x.status === null)
            )
              return {
                ...x,
                status: x.status ? "finished" : x.status === null ? "unopened" : "inProgress",
              };
          })
          .filter((x) => x),
      ]);
    }, [finished, inProgress, unopened]);

  useEffect(() => {
    if (!filteredStudentAssessmentStatuses) return;
    if (useKeyword) {
      setUserData([
        ...filteredStudentAssessmentStatuses
          .map((x) => {
            if (
              (!finished && !inProgress && !unopened) ||
              (finished && x.status === true) ||
              (inProgress && x.status === false) ||
              (unopened && x.status === null)
            )
              return {
                ...x,
                status: x.status ? "finished" : x.status === null ? "unopened" : "inProgress",
              };
          })
          .filter((x) => x),
      ]);
      if (filteredStudentAssessmentStatuses) setPrevStatuses(filteredStudentAssessmentStatuses);
    }
  }, [useKeyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loading />}
      <div className='flex items-center justify-between'>
        <Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-white'>
          Download Student List
        </Dialog.Title>
      </div>
      <div className='mt-5 w-full'>
        <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-6'>
            <label
              htmlFor='name'
              className='block uppercase tracking-wider text-[10px] font-medium text-gray-400'
            >
              File Name
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Ex:- Commonvault Students'
                required
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300'
              />
            </div>
          </div>
        </div>
        <fieldset className='space-y-4 mt-4'>
          <div className='relative flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='comments'
                aria-describedby='comments-description'
                name='comments'
                type='checkbox'
                onChange={(e) => setFinished(!finished)}
                className='h-4 w-4 text-orange-600 border-gray-300 rounded'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label htmlFor='comments' className='font-medium text-white'>
                Students Finished
              </label>
            </div>
          </div>
          <div className='relative flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='candidates'
                aria-describedby='candidates-description'
                name='candidates'
                type='checkbox'
                onChange={(e) => setInProgress(!inProgress)}
                className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label htmlFor='candidates' className='font-medium text-white'>
                Students in progress
              </label>
            </div>
          </div>
          <div className='relative flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='offers'
                aria-describedby='offers-description'
                name='offers'
                type='checkbox'
                onChange={(e) => setUnopened(!unopened)}
                className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label htmlFor='offers' className='font-medium text-white'>
                Unopened Students
              </label>
            </div>
          </div>
          <div className='relative flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='filter'
                aria-describedby='filter-description'
                name='filter'
                type='checkbox'
                onChange={(e) => setUseKeyword((prevState) => !prevState)}
                className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label htmlFor='filters' className='font-medium text-white'>
                Use Keyword to filter
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => {
              setLoading(false);
              closeModal();
            }}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
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
