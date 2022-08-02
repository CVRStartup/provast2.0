import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdPendingActions } from "react-icons/md";
import { useModelContext } from "../../context/ModalContext";
import { useStudents } from "../../hooks/useStudents";
import { useUser } from "../../lib/hooks";
import Paginate from "../Layout/Paginate";

export const ResultTable = ({ eligible, heading, tagline }) => {
  const { setIsOpen, setForm } = useModelContext();
  const [keyword, setKeyword] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(eligible);
  const [currentFilteredStudents, setCurrentFilteredStudents] =
    useState(eligible);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchMode, setSearchMode] = useState(false);
  let itemsPerPage = 10;

  console.log(currentFilteredStudents);

  useEffect(() => {
    const newSet = [...filteredStudents];
    const endOffset = itemOffset + itemsPerPage;

    setCurrentFilteredStudents(newSet.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(newSet.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredStudents.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const keywords = keyword.split(",").map((x) => x.toUpperCase());
    const newstate = eligible.filter((x) => {
      for (let i = 0; i < keywords.length; i++) {
        if (x?.rollnumber?.indexOf(keywords[i].trim(" ")) !== -1) return true;
        if (x?.name?.indexOf(keywords[i].trim(" ")) !== -1) return true;
        if (x?.email?.indexOf(keywords[i].trim(" ")) !== -1) return true;
        if (x?.phone?.indexOf(keywords[i].trim(" ")) !== -1) return true;
      }
      return false;
    });
    setFilteredStudents([...newstate]);
  }, [keyword, eligible]);

  const searchHandler = (e) => {
    setKeyword(e.target.value);
    if (e.target.value.length > 0) {
      setSearchMode(true);
    } else {
      setSearchMode(false);
    }
  };

  return (
    <div className="w-11/12 mx-auto px-4 my-10 sm:px-6 lg:px-8">
      <div className="sm:flex justify-between sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
          <p className="mt-2 text-sm text-gray-700">{tagline}</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200"
          onClick={() => {
            setIsOpen(true);
            setForm("downloadUserList");
          }}
        >
          Download Student List
        </button>
      </div>
      <div className="my-5">
        <div>
          <input
            type="search"
            name="search"
            id="search"
            value={keyword}
            onChange={searchHandler}
            className="focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-md font-semibold text-gray-900"
                    >
                      Roll Number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-md font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-md font-semibold text-gray-900"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-md font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-md font-semibold text-gray-900"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {searchMode
                    ? filteredStudents?.map((option, optionId) => {
                        if (!option) console.log(option + optionId);
                        return (
                          <tr
                            key={option?._id}
                            className={
                              optionId % 2 === 0 ? undefined : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">
                              {option?.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.rollnumber}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.phone}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.status === null ? (
                                <MdPendingActions size={25} color={"#ff9800"} />
                              ) : option?.status === "Rejected" ? (
                                <MdCancel size={28} color={"red"} />
                              ) : (
                                <FaCheckCircle size={24} color={"green"} />
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.role}
                            </td>
                          </tr>
                        );
                      })
                    : currentFilteredStudents?.map((option, optionId) => {
                        if (!option) console.log(optionId);
                        if (option && option?.rollnumber === "19B81A05D2")
                          console.log(optionId);
                        return (
                          <tr
                            key={option?._id}
                            className={
                              optionId % 2 === 0 ? undefined : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">
                              {option?.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.rollnumber}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.phone}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.status === null ? (
                                <MdPendingActions size={25} color={"#ff9800"} />
                              ) : option?.status === "Rejected" ? (
                                <MdCancel size={28} color={"red"} />
                              ) : (
                                <FaCheckCircle size={24} color={"green"} />
                              )}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {option?.role}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};
