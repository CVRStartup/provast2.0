import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Editor from "../../../../../src/components/Jobs/Editor";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { Loader } from "../../../../../src/components/Layout/Loader";
import {
  branches,
  ctcRange,
  generateYearsBetween,
  jobPostingLocationOptions,
  role,
  status,
  stipendRange,
  typeOfPosting,
  typeOfGrade,
  Percentages,
  CGPAs,
  typeOfPlacedStatus,
} from "../../../../../src/lib/helper";

import Link from "next/link";
import { DropDown } from "../../../../../src/components/Reusables/Dropdown";
import { MultiInput } from "../../../../../src/components/Jobs/MultiInput";
import { CheckBox } from "../../../../../src/components/Reusables/CheckBox";
import { Loading } from "../../../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../../../src/lib/auth";
import { findUser } from "../../../../../src/lib/user";
import { Round } from "../../../../../src/components/Jobs/Round";
import { Question } from "../../../../../src/components/Jobs/Question";

const getSelected = (options, value) => {
  if (!value) return options[0];
  return options.filter((x) => x.name === value).length > 0
    ? options.filter((x) => x.name === value)[0]
    : options[0];
};

const getSelectedGrade = (type, value) => {
  if (!value) return CGPAs[0];
  if (type === "Not Applicable") return { id: 11, name: 0 };
  else if (type === "CGPA") return CGPAs.filter((x) => x.name === value)[0];
  else return Percentages.filter((x) => x.name === value)[0];
};

const JobAdd = ({ job, user }) => {
  const router = useRouter();
  const [name, setName] = useState(job?.company);
  const [website, setWebsite] = useState(job?.website);
  const [designation, setDesignation] = useState(job?.designation);
  const [stipend, setStipend] = useState(job?.stipend);
  const [ctc, setCtc] = useState(job?.ctc);
  const [description, setDescription] = useState(job?.description);
  const [from, setFrom] = useState(job?.from || new Date().toISOString());
  const [to, setTo] = useState(job?.to || new Date().toISOString());
  const [image, setImage] = useState(job?.image);
  const [logo, setLogo] = useState(job?.logo);
  const [jobPostingLocation, setJobPostingLocation] = useState(
    job?.jobPostingLocation
  );
  const [yearofPassing, setYearofPassing] = useState(job?.yearofPassing);
  const [branchOptions, setBranchOptions] = useState(job?.branchOptions);
  const [typeOfPost, setTypeOfPost] = useState(job?.typeOfPost);
  const [loading, setLoading] = useState({ type: null, status: false });
  const [eligible, setEligible] = useState(job?.eligible);
  const [selectedRole, setSelectedRole] = useState(
    getSelected(role, job?.role)
  );

  const [selectedStatus, setSelectedStatus] = useState(
    getSelected(status, job?.status)
  );
  const [selectedStipendRange, setSelectedStipendRange] = useState(
    getSelected(stipendRange, job?.stipendRange)
  );
  const [selectedCTCRange, setSelectedCTCRange] = useState(
    getSelected(ctcRange, job?.ctcRange)
  );

  const [placed, setPlaced] = useState(job?.eligibility?.placed);
  const [salary, setSalary] = useState(job?.eligibility?.salary || 0);

  const [selectedXthTypeOfGrade, setSelectedXthTypeOfGrade] = useState(
    getSelected(typeOfGrade, job?.eligibility?.tenth?.typeOfGrade)
  );
  const [selectedXIIthTypeOfGrade, setSelectedXIIthTypeOfGrade] = useState(
    getSelected(typeOfGrade, job?.eligibility?.inter?.typeOfGrade)
  );
  const [selectedBtechTypeOfGrade, setSelectedBtechTypeOfGrade] = useState(
    getSelected(typeOfGrade, job?.eligibility?.btech?.typeOfGrade)
  );

  const [selectedXthGrade, setSelectedXthGrade] = useState(
    getSelectedGrade(Percentages, job?.eligibility?.tenth?.grade)
  );
  const [selectedXIIthGrade, setSelectedXIIthGrade] = useState(
    getSelectedGrade(Percentages, job?.eligibility?.inter?.grade)
  );
  const [selectedBtechGrade, setSelectedBtechGrade] = useState(
    getSelectedGrade(Percentages, job?.eligibility?.btech?.grade)
  );

  const [rounds, setRounds] = useState(job?.rounds);
  const [questionnaire, setQuestionnaire] = useState(job?.questionnaire);

  useEffect(() => {
    if (selectedXthTypeOfGrade.name === "CGPA")
      setSelectedXthGrade(
        getSelectedGrade(CGPAs, job?.eligibility?.tenth?.grade)
      );
    else if (selectedXthTypeOfGrade.name === "Percentage")
      setSelectedXthGrade(
        getSelectedGrade(Percentages, job?.eligibility?.tenth?.grade)
      );
    else setSelectedXthGrade({ id: 11, name: 0 });
  }, [selectedXthTypeOfGrade]);

  useEffect(() => {
    if (selectedXIIthTypeOfGrade.name === "CGPA")
      setSelectedXthGrade(
        getSelectedGrade(CGPAs, job?.eligibility?.inter?.grade)
      );
    else if (selectedXIIthTypeOfGrade.name === "Percentage")
      setSelectedXthGrade(
        getSelectedGrade(Percentages, job?.eligibility?.inter?.grade)
      );
    else setSelectedXIIthGrade({ id: 11, name: 0 });
  }, [selectedXIIthTypeOfGrade]);

  useEffect(() => {
    if (selectedBtechTypeOfGrade.name === "CGPA")
      setSelectedXthGrade(
        getSelectedGrade(CGPAs, job?.eligibility?.btech?.grade)
      );
    else if (selectedBtechTypeOfGrade.name === "Percentage")
      setSelectedXthGrade(
        getSelectedGrade(Percentages, job?.eligibility?.btech?.grade)
      );
    else setSelectedBtechGrade({ id: 11, name: 0 });
  }, [selectedBtechTypeOfGrade]);

  const [excelFileError, setExcelFileError] = useState(null);
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          if (e.target.result !== null) {
            const workbook = XLSX.read(e.target.result, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            const existingStudents = new Set();
            eligible.forEach((student) => {
              if (student) existingStudents.add(student.rollnumber);
            });
            var res = [];
            let studentList = [];
            data.forEach((x) => {
              if (
                x &&
                x["Roll Number"] &&
                !existingStudents.has(x["Roll Number"])
              )
                res.push({
                  name: x["Name"] ? x["Name"] : "N/A",
                  branch: x["Branch"] ? x["Branch"] : "N/A",
                  rollnumber: x["Roll Number"] ? x["Roll Number"] : "N/A",
                  email: x["Email"] ? x["Email"] : "N/A",
                  phone: x["Phone"] ? x["Phone"] : "N/A",
                  status: {
                    applied: null,
                    roles: [],
                  },
                });
            });
            const newEligible = [...eligible, ...res].filter((x) => x !== null);
            setEligible(newEligible);
          } else {
            setEligible([]);
          }
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleCallBack = (data) => {
    setDescription(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading({ type: "edit", status: true });

    const {
      data: { message },
    } = await axios.put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs`, {
      ...job,
      user: user._id,
      college: {
        name: user.college.name,
        code: user.college.code,
      },
      company: name,
      website,
      eligibility: {
        tenth: {
          typeOfGrade: selectedXthTypeOfGrade.name,
          grade: selectedXthGrade.name,
        },
        inter: {
          typeOfGrade: selectedXIIthTypeOfGrade.name,
          grade: selectedXIIthGrade.name,
        },
        btech: {
          typeOfGrade: selectedBtechTypeOfGrade.name,
          grade: selectedBtechGrade.name,
        },
        placed: placed,
        salary: salary,
      },
      role: selectedRole.name,
      designation,
      jobPostingLocation,
      yearofPassing,
      branchOptions,
      status: selectedStatus.name,
      typeOfPost,
      stipend,
      stipendRange: selectedStipendRange.name,
      ctc,
      ctcRange: selectedCTCRange.name,
      description,
      image,
      logo,
      from,
      to,
      eligible,
      rounds,
      questionnaire,
    });

    setLoading({ type: "edit", status: false });

    if (message == "Job Updated") {
      toast.success(message, { toastId: message });
      router.push("/dashboard/college/jobs");
    } else {
      toast.error(message, { toastId: message });
    }
  };

  const uploadFileHandler = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploads");
    try {
      setLoading({ type: type, status: true });
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dj7nomqfd/image/upload",
        formData
      );
      setLoading({ type: type, status: false });
      const { url } = uploadRes.data;
      if (type === "banner") setImage(url);
      if (type === "logo") setLogo(url);
    } catch (error) {
      toast.error(error, { toastId: error });
    }
  };
  const addNewRound = (num) => {
    if (num < rounds.length) {
      let newRounds = [...rounds];
      for (let i = rounds.length - num; i > 0; i--) newRounds.pop();
      setRounds([...newRounds]);
    } else {
      let number = num - rounds.length;
      let newRound = {
        name: "",
        description: "",
        completed: false,
        date: {
          from: null,
          to: null,
        },
        attendees: [],
        shortlisted: [],
        result: [],
      };
      let newRounds = [...rounds];
      for (let i = 0; i < number; i++) newRounds.push(newRound);
      setRounds([...newRounds]);
    }
  };

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
  const handleRoundChange = (fieldName, updatedValue, index) => {
    let newRounds = [...rounds];
    if (fieldName == "date-from" || fieldName == "date-to") {
      if (fieldName == "date-from")
        newRounds[index]["date"]["from"] = updatedValue;
      else newRounds[index]["date"]["to"] = updatedValue;
    } else {
      newRounds[index][fieldName] = updatedValue;
    }

    if (fieldName == "completed") newRounds[index].shortlisted = [];
    setRounds([...newRounds]);
  };

  const handleShortlistFile = (e, field, index) => {
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

            let studentList = [];
            if (field === "results") {
              studentList = data.map((student) => {
                return {
                  rollNumber: student["Roll Number"],
                  role: student["Role"],
                  result: student["Result"],
                };
              });
            } else {
              studentList = data.map((student) => {
                return {
                  rollNumber: student["Roll Number"],
                  role: student["Role"],
                };
              });
            }

            let newRounds = [...rounds];
            newRounds[index][field].push(...studentList);
            setRounds([...newRounds]);
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

  const addNewQuestion = () => {
    let newQuestions = [...questionnaire];
    newQuestions.push({
      question: {
        questionName: "",
        required: false,
        options: [],
      },
    });
    setQuestionnaire([...newQuestions]);
  };

  const handleQuestionChange = (fieldName, updatedValue, index) => {
    let newQuestions = [...questionnaire];
    if (newQuestions.length == 0) return;
    newQuestions[index].question[fieldName] = updatedValue;
    setQuestionnaire([...newQuestions]);
  };

  const clearOptions = (index) => {
    let newQuestions = [...questionnaire];
    if (newQuestions.length == 0) return;
    newQuestions[index].question.options = [];
    setQuestionnaire([...newQuestions]);
  };

  const handleOptionChange = (value, optionIndex, index) => {
    let newQuestions = [...questionnaire];
    if (newQuestions.length == 0) return;
    newQuestions[index].question.options[optionIndex] = value;
    setQuestionnaire([...newQuestions]);
  };

  const removeOption = (index, optionIndex) => {
    let newQuestions = [...questionnaire];
    if (newQuestions.length == 0) return;
    newQuestions[index].question.options.splice(optionIndex, 1);
    setQuestionnaire([...newQuestions]);
  };

  const addOption = (index) => {
    let newQuestions = [...questionnaire];
    if (newQuestions.length == 0) return;
    newQuestions[index].question.options.push("");
    setQuestionnaire([...newQuestions]);
  };

  const removeQuestion = (index) => {
    let newQuestions = [...questionnaire];
    if (newQuestions.length == 0) return;
    newQuestions.splice(index, 1);
    setQuestionnaire([...newQuestions]);
  };

  return (
    <main className="bg-gray-50 mt-[10vh]">
      {loading.type === "edit" && loading.status === true ? <Loading /> : ""}
      <div className="space-y-6 max-w-6xl mx-auto py-8">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="mb-5 md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Job Infomation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div>
            <form
              className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
              method="POST"
            >
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="off"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="purpose"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Editor input={description} dataCallBack={handleCallBack} />
                <p className="mt-2 text-sm text-gray-500">
                  Few lines to describe the job role.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Logo
                </label>
                <div className="mt-1">
                  <div className="sm:mt-0 sm:col-span-2">
                    {loading.type === "logo" && loading.status ? (
                      <div className="animate-pulse">
                        <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10"></input>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={logo}
                        disabled={true}
                        onChange={(e) => setLogo(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    )}
                    {loading.type === "logo" && loading.status ? (
                      <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed">
                        <Loader size={8} color="gray" />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        label="Choose File"
                        type="file"
                        name="image"
                        id="profileImg"
                        onChange={(e) => uploadFileHandler(e, "logo")}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banner
                </label>
                <div className="mt-1">
                  <div className="sm:mt-0 sm:col-span-2">
                    {loading.type === "banner" && loading.status ? (
                      <div className="animate-pulse">
                        <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10"></input>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={image}
                        disabled={true}
                        onChange={(e) => setImage(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    )}
                    {loading.type === "banner" && loading.status ? (
                      <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed">
                        <Loader size={8} color="gray" />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        label="Choose File"
                        type="file"
                        name="image"
                        id="profileImg"
                        onChange={(e) => uploadFileHandler(e, "banner")}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    value={from?.substring(0, 16)}
                    onChange={(e) => {
                      setFrom(e.target.value);
                    }}
                    required
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    required
                    value={to?.substring(0, 16)}
                    onChange={(e) => setTo(e.target.value)}
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="roundNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter number of rounds
                </label>
                <input
                  type="number"
                  name="roundNumber"
                  id="roundNumber"
                  min="1"
                  value={rounds.length}
                  onChange={(e) => addNewRound(e.target.value)}
                  autoComplete="off"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="sm:col-span-6 relative -top-[22px]">
                <DropDown
                  title={"Role"}
                  options={role}
                  selectedOption={selectedRole}
                  setSelectedOption={setSelectedRole}
                />
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-start justify-between">
                  <div className="w-[49%]">
                    <MultiInput
                      title="Designation"
                      handleExtraOptions={(extra) =>
                        setDesignation({
                          ...designation,
                          roles: [...designation.roles, extra],
                        })
                      }
                      deleteOption={(option) =>
                        setDesignation({
                          ...designation,
                          roles: [
                            ...designation.roles.filter((x) => x !== option),
                          ],
                        })
                      }
                      extraOptions={designation.roles}
                    />
                  </div>

                  <div className="w-[49%]">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Max Roles That can be applied
                    </label>
                    <input
                      type="number"
                      name="name"
                      id="name"
                      value={designation.max}
                      onChange={(e) =>
                        setDesignation({
                          ...designation,
                          max: parseInt(e.target.value),
                        })
                      }
                      autoComplete="off"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                {selectedRole.name === "Internship" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative -top-[22px]">
                      <DropDown
                        title={"Stipend Range"}
                        options={stipendRange}
                        selectedOption={selectedStipendRange}
                        setSelectedOption={setSelectedStipendRange}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Exact Stipend
                      </label>
                      <input
                        type="number"
                        name="name"
                        id="name"
                        value={stipend}
                        onChange={(e) => setStipend(e.target.value)}
                        autoComplete="off"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ) : selectedRole.name === "Full Time" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative -top-[22px]">
                      <DropDown
                        title={"CTC Range"}
                        options={ctcRange}
                        selectedOption={selectedCTCRange}
                        setSelectedOption={setSelectedCTCRange}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Exact CTC
                      </label>
                      <input
                        type="number"
                        name="name"
                        id="name"
                        value={ctc}
                        onChange={(e) => setCtc(e.target.value)}
                        autoComplete="off"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ) : selectedRole.name === "Internship and Full Time" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative -top-[22px]">
                        <DropDown
                          title={"Stipend Range"}
                          options={stipendRange}
                          selectedOption={selectedStipendRange}
                          setSelectedOption={setSelectedStipendRange}
                        />
                      </div>
                      <div className="">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Exact Stipend
                        </label>
                        <input
                          type="number"
                          name="name"
                          id="name"
                          value={stipend}
                          onChange={(e) => setStipend(e.target.value)}
                          autoComplete="off"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative -top-[22px]">
                        <DropDown
                          title={"CTC Range"}
                          options={ctcRange}
                          selectedOption={selectedCTCRange}
                          setSelectedOption={setSelectedCTCRange}
                        />
                      </div>
                      <div className="">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Exact CTC
                        </label>
                        <input
                          type="number"
                          name="name"
                          id="name"
                          value={ctc}
                          onChange={(e) => setCtc(e.target.value)}
                          autoComplete="off"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="sm:col-span-6 rounded border">
                <CheckBox
                  title={"Job Posting Location"}
                  options={jobPostingLocationOptions}
                  setCheckedOptions={setJobPostingLocation}
                  checkedOptions={jobPostingLocation}
                />
              </div>
              <div className="sm:col-span-6 rounded border">
                <CheckBox
                  title={"Year Of Passing"}
                  options={generateYearsBetween()}
                  setCheckedOptions={setYearofPassing}
                  checkedOptions={yearofPassing}
                />
              </div>
              <div className="sm:col-span-6 rounded border">
                <CheckBox
                  title={"Eligible Branches"}
                  options={branches}
                  setCheckedOptions={setBranchOptions}
                  checkedOptions={branchOptions}
                />
              </div>
              <div className="sm:col-span-6 rounded border bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div>
                  {rounds &&
                    rounds.map((round, roundIndex) => {
                      return (
                        <Round
                          type={"edit"}
                          round={round}
                          roundIndex={roundIndex}
                          from={job?.from}
                          to={job?.to}
                          handleRoundChange={handleRoundChange}
                          handleShortlistFile={handleShortlistFile}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="sm:col-span-3 relative -top-[22px]">
                <DropDown
                  title={"Xth Type Of Grade"}
                  options={typeOfGrade}
                  selectedOption={selectedXthTypeOfGrade}
                  setSelectedOption={setSelectedXthTypeOfGrade}
                />
              </div>
              <div className="sm:col-span-3 relative -top-[22px]">
                {selectedXthTypeOfGrade.name !== "Not Applicable" && (
                  <DropDown
                    title={"Xth Grade"}
                    options={
                      selectedXthTypeOfGrade.name === "CGPA"
                        ? CGPAs
                        : Percentages
                    }
                    selectedOption={selectedXthGrade}
                    setSelectedOption={setSelectedXthGrade}
                  />
                )}
              </div>
              <div className="sm:col-span-3 relative -top-[22px]">
                <DropDown
                  title={"XIIth Type Of Grade"}
                  options={typeOfGrade}
                  selectedOption={selectedXIIthTypeOfGrade}
                  setSelectedOption={setSelectedXIIthTypeOfGrade}
                />
              </div>
              <div className="sm:col-span-3 relative -top-[22px]">
                {selectedXIIthTypeOfGrade.name !== "Not Applicable" && (
                  <DropDown
                    title={"XIIth Grade"}
                    options={
                      selectedXIIthTypeOfGrade.name === "CGPA"
                        ? CGPAs
                        : Percentages
                    }
                    selectedOption={selectedXIIthGrade}
                    setSelectedOption={setSelectedXIIthGrade}
                  />
                )}
              </div>
              <div className="sm:col-span-3 relative -top-[22px]">
                <DropDown
                  title={"Btech Type Of Grade"}
                  options={typeOfGrade}
                  selectedOption={selectedBtechTypeOfGrade}
                  setSelectedOption={setSelectedBtechTypeOfGrade}
                />
              </div>
              <div className="sm:col-span-3 relative -top-[22px]">
                {selectedBtechTypeOfGrade.name !== "Not Applicable" && (
                  <DropDown
                    title={"Btech Grade"}
                    options={
                      selectedBtechTypeOfGrade.name === "CGPA"
                        ? CGPAs
                        : Percentages
                    }
                    selectedOption={selectedBtechGrade}
                    setSelectedOption={setSelectedBtechGrade}
                  />
                )}
              </div>
              <div className="sm:col-span-3">
                <label className="text-base font-medium text-gray-900">
                  What students are eligible ?
                </label>
                <p className="text-sm leading-5 text-gray-500">
                  Who should be able to apply to this job ?
                </p>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {typeOfPlacedStatus.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="placed"
                          type="radio"
                          value={option.name}
                          defaultChecked={option.id === "everyone"}
                          onChange={(e) =>
                            setPlaced(
                              e.target.value === "Everyone"
                                ? null
                                : e.target.value === "Placed"
                            )
                          }
                          className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="sm:col-span-3 relative -top-[22px]">
                {placed && (
                  <div className="flex flex-col mt-5">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900">
                        Maximum salary ?
                      </p>
                      <p className="text-sm font-light">
                        {"₹" + Number(salary).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="p-1 mt-1">
                      <input
                        type="range"
                        min={0}
                        max={500000}
                        step={5000}
                        className="w-full "
                        value={salary}
                        onInput={(ev) => {
                          setSalary(ev.target.value);
                        }}
                        style={{
                          accentColor: "orange",
                        }}
                      ></input>
                    </div>
                  </div>
                )}
              </div>
              <div className="sm:col-span-3">
                <label className="text-base font-medium text-gray-900">
                  Type Of Job Posting
                </label>
                <p className="text-sm leading-5 text-gray-500">
                  How would you like to show this job posting?
                </p>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {typeOfPosting.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="notification-method"
                          type="radio"
                          value={option.name}
                          defaultChecked={option.id === "shortlisted"}
                          onChange={(e) => setTypeOfPost(e.target.value)}
                          className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <div className="pt-4">
                  <DropDown
                    title={"Status"}
                    options={status}
                    selectedOption={selectedStatus}
                    setSelectedOption={setSelectedStatus}
                  />
                </div>
              </div>

              {typeOfPost === "Shortlisted Students" && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Spreadsheet
                  </label>

                  <input
                    className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    label="Choose File"
                    type="file"
                    name="image"
                    id="profileImg"
                    onChange={handleFile}
                  />
                  {excelFileError &&
                    toast.error(excelFileError, {
                      toastId: excelFileError,
                    })}
                </div>
              )}
              <div className="sm:col-span-6 rounded border bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <h3>Questionnaire</h3>

                {questionnaire &&
                  questionnaire.map((questionObj, questionIndex) => {
                    return (
                      <Question
                        question={questionObj.question}
                        type={
                          questionObj.question.options &&
                          questionObj.question.options.length > 0
                        }
                        index={questionIndex}
                        handleQuestionChange={handleQuestionChange}
                        clearOptions={clearOptions}
                        handleOptionChange={handleOptionChange}
                        removeOption={removeOption}
                        addOption={addOption}
                        removeQuestion={removeQuestion}
                      />
                    );
                  })}
                <div onClick={addNewQuestion}>Add question</div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href={`/dashboard/college/jobs/${router.query.id}`}>
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </Link>
          <button
            disabled={loading.status}
            onClick={onSubmitHandler}
            className={`${
              loading.status ? "cursor-not-allowed" : "hover:bg-blue-700 "
            } ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600`}
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};
export const getServerSideProps = async ({ req, res, query }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
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
  if (user.category === "student") {
    return {
      redirect: {
        destination: "/dashbaord/student",
        permanent: false,
      },
    };
  }
  const {
    data: { job },
  } = await axios.get(`${process.env.HOST_URL}/api/jobs/${query.id}`);
  return {
    props: {
      job,
    },
  };
};

export default JobAdd;
