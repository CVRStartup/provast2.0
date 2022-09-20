//interface to upload assignemt and redirect back to index once uploaded
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import axios from "axios";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import Router from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { DropDown } from "../../../../src/components/Reusables/Dropdown";
import { generateYearsBetween, status } from "../../../../src/lib/helper";
import { btechBranches as oldBranches } from "../../../../src/lib/helper";

const AssessmentAdd = ({ user }) => {
  const mode = [
    { id: 1, name: "Test" },
    { id: 2, name: "Practice" },
  ];

  const typeOfTest = [
    { id: 3, name: "Normal" },
    { id: 4, name: "Timed" },
  ];

  const branches = oldBranches.map((branch) => branch.code);

  const years = generateYearsBetween();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [selectedMode, setSelectedMode] = useState(mode[1]);
  const [selectedType, setSelectedType] = useState(typeOfTest[0]);
  const [selectedStatus, setSelectedStatus] = useState(status[0]);
  const [assessment, setassessment] = useState({
    name: "",
    sections: [],
    expectedTime: 0,
    difficulty: "",
    company: "",
    mode: selectedMode.name,
    timePermitted: 0,
    allowedBatches: [],
  });
  const [fileError, setFileError] = useState("");

  const [checkedBranch, setCheckedBranch] = useState(new Array(branches.length).fill(false));
  const [checkAllBranches, setCheckAllBranches] = useState(false);
  const [checkAllBatches, setCheckAllBatches] = useState(false);

  // it will contain array of objects

  // handle File
  //const fileType = ["application/vnd.ms-excel"];
  const checkFileType = (filename) => {
    let parts = filename.split(".");
    let extension = parts[parts.length - 1];
    switch (extension) {
      case "xls":
      case "xlsx":
      case "csv":
        return true;
      default:
        return false;
    }
  };

  const handleStudentFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (checkFileType(selectedFile.name)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          if (e.target.result !== null) {
            const workbook = XLSX.read(e.target.result, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            toast.success("File uploaded successfully!", {
              toastId: 21,
            });

            let rollNumbers = data.map((student) => student["Roll Number"]);

            setassessment({
              ...assessment,
              shortlistedStudents: rollNumbers,
            });
          }
        };
      } else {
        setFileError("Upload Failed: Please select only Excel files!");
        toast.error("Upload Failed: Please select only Excel files!", {
          toastId: 23,
        });
      }
    } else {
      toast.error("Upload Failed: No file selected", {
        toastId: 22,
      });
    }
  };

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (checkFileType(selectedFile.name)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          if (e.target.result !== null) {
            const workbook = XLSX.read(e.target.result, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            toast.success("File uploaded successfully!", {
              toastId: 21,
            });
            let questions = [];
            let sections = [];
            let section = {};

            for (let i = 0; i < data.length; i++) {
              let obj = data[i];

              if (typeof obj["S.No."] != "number") {
                section.questions = questions;
                sections.push(section);
                section = {};
                section.name = obj["S.No."];
                questions = [];
              }
              let question = {
                data: "",
                image: "",
              };
              if (obj["Question"]) question.data = obj["Question"];

              if (question.data.trim() === "") continue;

              let options = [];
              let max;
              for (let x = 65; x <= 75; x++) {
                if (obj.hasOwnProperty(String.fromCharCode(x))) max = x;
              }
              for (let x = 65; x <= max; x++) {
                if (obj.hasOwnProperty(String.fromCharCode(x))) {
                  options.push({
                    key: String.fromCharCode(x),
                    value: obj[String.fromCharCode(x)],
                  });
                } else {
                  options.push({
                    key: String.fromCharCode(x),
                    value: "N/A",
                  });
                }
              }

              questions.push({
                //ID: i + 1,
                question: question,
                options: options,
                answer: obj["ANSWER"] ? obj["ANSWER"] : "N/A",
                difficulty: obj["DIFFICULTY"],
              });
            }
            section.questions = questions;
            sections.push(section);
            sections.shift();

            setassessment({
              ...assessment,
              sections: [...sections],
            });
          }
        };
      } else {
        setFileError("Upload Failed: Please select only Excel files!");
        toast.error("Upload Failed: Please select only Excel files!", {
          toastId: 23,
        });
      }
    } else {
      toast.error("Upload Failed: No file selected", {
        toastId: 22,
      });
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (fileError !== "") {
        toast.error(fileError, {
          toastId: 223,
        });
        return;
      }
      const data = axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments`, {
        ...assessment,
        mode: selectedMode.name,
        user: user._id,
        public: selectedStatus.name === "Draft" ? false : true,
        college: {
          name: user.college.name,
          code: user.college.code,
        },
      });

      toast.success("Assessment created", {
        toastId: 1,
      });
      Router.push("/dashboard/college/assessments");
    } catch {
      toast.error("Failed", {
        toastId: 2,
      });
    }
  };

  let batchesEndingYear = years.map((year) => parseInt(year.name));
  const [checkedState, setCheckedState] = useState(new Array(batchesEndingYear.length).fill(false));
  useEffect(() => {
    let tickedBatches = [];
    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i] === true) tickedBatches.push(batchesEndingYear[i]);
    }
    setassessment({ ...assessment, allowedBatches: tickedBatches });
  }, [checkedState]);

  const handleOnBatchChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  const handleOnAllBatchChange = (e) => {
    let updatedCheckedBatch = checkedState.slice();
    if (e.target.checked) {
      setCheckAllBatches(true);
      for (let i = 0; i < updatedCheckedBatch.length; i++) updatedCheckedBatch[i] = true;
    } else {
      setCheckAllBatches(false);
      for (let i = 0; i < updatedCheckedBatch.length; i++) updatedCheckedBatch[i] = false;
    }
    setCheckedState(updatedCheckedBatch);
  };
  useEffect(() => {
    let tickedBatches = [];
    for (let i = 0; i < checkedBranch.length; i++) {
      if (checkedBranch[i] === true) tickedBatches.push(branches[i]);
    }
    setassessment({ ...assessment, allowedBranches: tickedBatches });
  }, [checkedBranch]);

  const handleOnBranchChange = (position) => {
    const updatedCheckedState = checkedBranch.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedBranch(updatedCheckedState);
  };

  const handleOnAllBranchChange = (e) => {
    let updatedCheckedBranch = checkedBranch.slice();
    if (e.target.checked) {
      setCheckAllBranches(true);
      for (let i = 0; i < updatedCheckedBranch.length; i++) updatedCheckedBranch[i] = true;
    } else {
      setCheckAllBranches(false);
      for (let i = 0; i < updatedCheckedBranch.length; i++) updatedCheckedBranch[i] = false;
    }
    setCheckedBranch(updatedCheckedBranch);
  };

  return (
    <div className="mt-[15vh] grid grid-cols-4 gap-4">
      <form className="col-start-2 col-span-2" autoComplete="off" onSubmit={handleSubmit}>
        <h1 className="text-start my-10 text-3xl font-bold text-gray-600">
          Publish new assessment
        </h1>
        <div className="col-span-6 sm:col-span-4 m-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Assessment Name:{" "}
          </label>
          <input
            type="text"
            name="name"
            value={assessment.name}
            onChange={(e) => {
              setassessment({
                ...assessment,
                name: e.target.value,
              });
            }}
            autoComplete="off"
            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-4 m-3">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company:
          </label>
          <input
            type="text"
            id="company"
            value={assessment.company}
            onChange={(e) => {
              setassessment({
                ...assessment,
                company: e.target.value,
              });
            }}
            autoComplete="off"
            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-4 m-3">
          <label htmlFor="expectedTime" className="block text-sm font-medium text-gray-700">
            Expected Time:
          </label>
          <input
            type="number"
            name="expectedTime"
            value={assessment.expectedTime}
            onChange={(e) => {
              setassessment({
                ...assessment,
                expectedTime: e.target.value,
              });
            }}
            autoComplete="off"
            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="relative top-2 left-3 mb-5">
          <Listbox value={selectedMode} onChange={setSelectedMode}>
            {({ open }) => (
              <>
                <Listbox.Label className="mb-2 flex items-center h-full text-sm font-medium text-gray-700">
                  Mode
                </Listbox.Label>
                <div className="relative left-0">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                    <span className="block truncate">{selectedMode.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {mode.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active ? "text-white bg-orange-600" : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selectedMode, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selectedMode ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {person.name}
                              </span>

                              {selectedMode ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-orange-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        {selectedMode.name === "Test" && (
          <div className="relative top-2 left-3 mb-5">
            <Listbox value={selectedType} onChange={setSelectedType}>
              {({ open }) => (
                <>
                  <Listbox.Label className="mb-2 flex items-center h-full text-sm font-medium text-gray-700">
                    Type of Test
                  </Listbox.Label>
                  <div className="relative left-0">
                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                      <span className="block truncate">{selectedType.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {typeOfTest.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active ? "text-white bg-orange-600" : "text-gray-900",
                                "cursor-default select-none relative py-2 pl-3 pr-9"
                              )
                            }
                            value={person}
                          >
                            {({ selectedMode, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selectedMode ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {person.name}
                                </span>

                                {selectedMode ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-orange-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        )}
        {selectedType.name === "Timed" && (
          <div className="col-span-6 sm:col-span-4 m-3">
            <label htmlFor="expectedTime" className="block text-sm font-medium text-gray-700">
              Enter The Time: ( in mins )
            </label>
            <input
              type="number"
              name="timeOfTest"
              value={assessment.timePermitted}
              onChange={(e) => {
                setassessment({
                  ...assessment,
                  timePermitted: e.target.value,
                });
              }}
              autoComplete="off"
              className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        )}
        {user?.college?.name!=='CORPORATE' && 
          <div className="col-span-6 sm:col-span-4 m-3">
            <label htmlFor="allowedBatches" className="block text-sm font-medium text-gray-700">
              Allowed Batches
            </label>
            <input
              id="custom-checkbox-batch-all"
              className="my-1"
              type="checkbox"
              value="ALL"
              onChange={(e) => handleOnAllBatchChange(e)}
            />
            <label htmlFor="custom-checkbox-batch-all" className="mx-1">
              ALL
            </label>
            <div className="flex flex-wrap">
              {batchesEndingYear.map((batch, index) => {
                return (
                  <div className="w-[25%]" key={index}>
                    <div className="mr-1">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={batch}
                        value={batch}
                        checked={checkedState[index]}
                        className={checkAllBatches ? "cursor-not-allowed" : ""}
                        disabled={checkAllBatches}
                        onChange={() => handleOnBatchChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`} className="mx-1 ">
                        {batch}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> 
        }
        {user?.college?.name!=='CORPORATE' && 
          <div className="col-span-6 sm:col-span-4 m-3">
            <label htmlFor="allowedBranches" className="block text-sm font-medium text-gray-700">
              Allowed Branches
            </label>
            <input
              id="custom-checkbox-branch-all"
              className="my-1"
              type="checkbox"
              value="ALL"
              onChange={(e) => handleOnAllBranchChange(e)}
            />
            <label htmlFor="custom-checkbox-branch-all" className="mx-1">
              ALL
            </label>
            <div className="flex flex-wrap">
              {branches.map((branch, index) => {
                return (
                  <div className="w-[25%]" key={branch}>
                    <div className="mr-1">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-branch-${index}`}
                        name={branch}
                        value={branch}
                        checked={checkedBranch[index]}
                        className={checkAllBranches ? "cursor-not-allowed" : ""}
                        disabled={checkAllBranches}
                        onChange={() => handleOnBranchChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-branch-${index}`} className="mx-1">
                        {branch}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> 
          }
        <div className="pt-4">
          <DropDown
            title={"Status"}
            options={status}
            selectedOption={selectedStatus}
            setSelectedOption={setSelectedStatus}
          />
        </div>
        <div className="m-3 mt-7">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Upload Spreadsheet
          </label>

          <input
            className="mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            label="Choose File"
            type="file"
            name="excelFile"
            id="excelFile"
            onChange={handleFile}
            required
          />
        </div>
        <div className="m-3 mt-7">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Upload List of Shortlisted Students
          </label>

          <input
            className={`mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
              checkAllBranches || checkAllBatches ? "cursor-not-allowed" : ""
            }`}
            label="Choose File"
            type="file"
            name="excelFile"
            id="excelFile"
            disabled={checkAllBranches || checkAllBatches}
            onChange={handleStudentFile}
          />
          {(checkAllBranches || checkAllBatches) && (
            <div className="block text-sm font-medium text-gray-700">
              Disabled due to All Branches / All Batches being selected.
            </div>
          )}
        </div>

        <div className="flex justify-center m-5">
          <button
            type="submit"
            className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (!user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  if (user.category !== "college") {
    return {
      redirect: {
        destination: "/dashbaord/" + user.category,
        permanent: false,
      },
    };
  }
  if (!user.approved) {
    return {
      redirect: {
        destination: "/approvalpending",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default AssessmentAdd;
