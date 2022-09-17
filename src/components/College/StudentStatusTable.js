import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiFileBlank } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { useAssessmentContext } from "../../context/AssessmentContext";
import { useModelContext } from "../../context/ModalContext";
import Link from "next/link";

const StudentStatusTable = ({ studentStatuses, currentStudentStatuses, assessmentId, user }) => {
  const { setIsOpen, setForm } = useModelContext();
  const { setFilteredStudentAssessmentStatuses } = useAssessmentContext();
  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState(studentStatuses);
  const [filteredStudents, setFilteredStudents] = useState(studentStatuses);
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    const keywords = keyword.split(",").map((x) => x.toUpperCase());
    const newstate = students.filter((x) => {
      const name = x.name.split(" ");
      const firstName = name[0].toUpperCase();
      const lastName = name[1].toUpperCase();
      for (let i = 0; i < keywords.length; i++) {
        if (x.rollNumber.indexOf(keywords[i].trim(" ")) !== -1) return true;
        if (firstName.indexOf(keywords[i].trim(" ")) !== -1) return true;
        if (lastName.indexOf(keywords[i].trim(" ")) !== -1) return true;
      }
      return false;
    });
    setFilteredStudents([...newstate]);
    console.log(filteredStudents);
  }, [keyword, students]);

  const searchHandler = (e) => {
    setKeyword(e.target.value);
    if (e.target.value.length > 0) {
      setSearchMode(true);
    } else {
      setSearchMode(false);
    }
  };

  return (
    <div className='col-start-2 col-span-6'>
      <div className='my-5 w-full sm:flex sm:justify-between sm:items-center '>
        <div className='w-[75%] justify-between'>
          <label htmlFor='search' className='sr-only'>
            Search
          </label>
          <div className='relative rounded-md shadow-sm w-full'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              type='search'
              name='search'
              id='search'
              value={keyword}
              onChange={searchHandler}
              className='focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
              placeholder='Search'
            />
          </div>
        </div>
        <button
          className=' inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 ml-2'
          onClick={() => {
            setIsOpen(true);
            setForm("downloadStudentList");
            setFilteredStudentAssessmentStatuses(filteredStudents);
          }}
        >
          Download
        </button>
      </div>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900 sm:pl-6'
                    >
                      Name
                    </th>
                    {user?.college?.name !== "CORPORATE" && (
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'
                      >
                        Roll Number
                      </th>
                    )}
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'
                    >
                      Email
                    </th>
                    {user?.college?.name !== "CORPORATE" && (
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'
                      >
                        Phone
                      </th>
                    )}
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'
                    >
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {searchMode
                    ? filteredStudents &&
                      filteredStudents.map((option, optionId) => (
                        <tr
                          key={optionId}
                          className={optionId % 2 === 0 ? undefined : "bg-gray-50"}
                        >
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6'>
                            <Link
                              href={`/dashboard/college/assessments/${assessmentId}/report/${option.userID}`}
                            >
                              <div className='hover:text-orange-500 cursor-pointer'>
                                {option.name}
                              </div>
                            </Link>
                          </td>
                          {user?.college?.name !== "CORPORATE" && (
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {option.rollNumber}
                            </td>
                          )}
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {option.email}
                          </td>
                          {user?.college?.name !== "CORPORATE" && (
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {option.phone}
                            </td>
                          )}
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {option.status === null ? (
                              <BiFileBlank size={25} color={"#CB2E0D"} />
                            ) : option.status === false ? (
                              <AiOutlineClockCircle size={28} color={"#F1CE57"} />
                            ) : (
                              <FaCheckCircle size={24} color={"green"} />
                            )}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {option.marks ? option.marks : "-/-"}
                          </td>
                        </tr>
                      ))
                    : currentStudentStatuses &&
                      currentStudentStatuses.map((option, optionId) => (
                        <tr
                          key={optionId}
                          className={optionId % 2 === 0 ? undefined : "bg-gray-50"}
                        >
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6'>
                            <Link
                              href={`/dashboard/college/assessments/${assessmentId}/report/${option.userID}`}
                            >
                              <div className='hover:text-orange-500 cursor-pointer'>
                                {option.name}
                              </div>
                            </Link>
                          </td>
                          {user?.college?.name !== "CORPORATE" && (
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {option.rollNumber}
                            </td>
                          )}
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {option.email}
                          </td>
                          {user?.college?.name !== "CORPORATE" && (
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {option.phone}
                            </td>
                          )}
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {option.status === null ? (
                              <BiFileBlank size={25} color={"#CB2E0D"} />
                            ) : option.status === false ? (
                              <AiOutlineClockCircle size={28} color={"#F1CE57"} />
                            ) : (
                              <FaCheckCircle size={24} color={"green"} />
                            )}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {option.marks ? option.marks : "-/-"}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatusTable;
