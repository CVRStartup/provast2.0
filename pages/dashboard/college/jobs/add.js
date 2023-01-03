import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Editor from "../../../../src/components/Jobs/Editor";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { Loader } from "../../../../src/components/Layout/Loader";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
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
  typeOfJobProgram,
  btechBranches,
  mtechBranches,
  mbaBranches,
  degreeBranches,
  jobPostingCampuses,
} from "../../../../src/lib/helper";
import { DropDown } from "../../../../src/components/Reusables/Dropdown";
import { CheckBox } from "../../../../src/components/Reusables/CheckBox";
import { MultiInput } from "../../../../src/components/Jobs/MultiInput";
import Link from "next/link";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { Round } from "../../../../src/components/Jobs/Round";
import { Question } from "../../../../src/components/Jobs/Question";
import { round } from "lodash";
const JobAdd = ({ user }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [designation, setDesignation] = useState({ roles: [], max: 0 });
  const [stipend, setStipend] = useState(0);
  const [ctc, setCtc] = useState(0);
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState(new Date().toISOString());
  const [to, setTo] = useState(new Date().toISOString());
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [jobPostingLocation, setJobPostingLocation] = useState([]);
  const [jobPostingCampus, setJobPostingCampus] = useState([]);
  const [yearofPassing, setYearofPassing] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [typeOfPost, setTypeOfPost] = useState("Shortlisted Students");
  const [typeOfProgram, setTypeOfProgram] = useState("B.Tech");
  const [loading, setLoading] = useState({ type: null, status: false });
  const [eligible, setEligible] = useState([]);

  const [placed, setPlaced] = useState(null);
  const [salary, setSalary] = useState(0);
  const [allowPlaced, setAllowPlaced] = useState(false);

  const [selectedRole, setSelectedRole] = useState(role[0]);
  const [selectedStatus, setSelectedStatus] = useState(status[0]);
  const [selectedStipendRange, setSelectedStipendRange] = useState(stipendRange[0]);
  const [selectedCTCRange, setSelectedCTCRange] = useState(ctcRange[0]);

  const [selectedXthTypeOfGrade, setSelectedXthTypeOfGrade] = useState(typeOfGrade[0]);
  const [selectedXIIthTypeOfGrade, setSelectedXIIthTypeOfGrade] = useState(typeOfGrade[0]);
  const [selectedDiplomaTypeOfGrade, setSelectedDiplomaTypeOfGrade] = useState(typeOfGrade[0]);
  const [selectedUndergraduateTypeOfGrade, setSelectedUndergraduateTypeOfGrade] = useState(
    typeOfGrade[0]
  );
  const [selectedPostgraduateTypeOfGrade, setSelectedPostgraduateTypeOfGrade] = useState(
    typeOfGrade[0]
  );

  const [owner, setOwner] = useState({
    name: "",
    signature: "",
  });
  const [team, setTeam] = useState({
    placementOfficer: "",
    dataTeamLead: "",
    processTeamLead: "",
  });

  const [selectedXthGrade, setSelectedXthGrade] = useState(CGPAs[0]);
  const [selectedXIIthGrade, setSelectedXIIthGrade] = useState(CGPAs[0]);
  const [selectedDiplomaGrade, setSelectedDiplomaGrade] = useState(CGPAs[0]);
  const [selectedUndergraduateGrade, setSelectedUndergraduateGrade] = useState(CGPAs[0]);
  const [selectedPostgraduateGrade, setSelectedPostgraduateGrade] = useState(CGPAs[0]);

  console.log(selectedUndergraduateGrade, selectedUndergraduateTypeOfGrade);

  const [rounds, setRounds] = useState([
    {
      name: "",
      description: "",
      completed: false,
      date: {
        from: from ? from : null,
        to: to ? to : null,
      },
      attendees: [],
      shortlisted: [],
      result: [],
    },
  ]);
  const [questionnaire, setQuestionnaire] = useState([]);

  useEffect(() => {
    if (selectedXthTypeOfGrade.name === "CGPA") setSelectedXthGrade(CGPAs[0]);
    else if (selectedXthTypeOfGrade.name === "Percentage") setSelectedXthGrade(Percentages[0]);
    else setSelectedXthGrade({ id: 11, name: 0 });
  }, [selectedXthTypeOfGrade]);

  useEffect(() => {
    if (selectedXIIthTypeOfGrade.name === "CGPA") setSelectedXIIthGrade(CGPAs[0]);
    else if (selectedXIIthTypeOfGrade.name === "Percentage") setSelectedXIIthGrade(Percentages[0]);
    else setSelectedXIIthGrade({ id: 11, name: 0 });
  }, [selectedXIIthTypeOfGrade]);

  useEffect(() => {
    if (selectedDiplomaTypeOfGrade.name === "CGPA") setSelectedDiplomaGrade(CGPAs[0]);
    else if (selectedDiplomaTypeOfGrade.name === "Percentage")
      setSelectedDiplomaGrade(Percentages[0]);
    else setSelectedDiplomaGrade({ id: 11, name: 0 });
  }, [selectedDiplomaTypeOfGrade]);

  useEffect(() => {
    if (selectedUndergraduateTypeOfGrade.name === "CGPA") setSelectedUndergraduateGrade(CGPAs[0]);
    else if (selectedUndergraduateTypeOfGrade.name === "Percentage")
      setSelectedUndergraduateGrade(Percentages[0]);
    else setSelectedUndergraduateGrade({ id: 11, name: 0 });
  }, [selectedUndergraduateTypeOfGrade]);

  useEffect(() => {
    if (selectedPostgraduateTypeOfGrade.name === "CGPA") setSelectedPostgraduateGrade(CGPAs[0]);
    else if (selectedPostgraduateTypeOfGrade.name === "Percentage")
      setSelectedPostgraduateGrade(Percentages[0]);
    else setSelectedPostgraduateGrade({ id: 11, name: 0 });
  }, [selectedPostgraduateTypeOfGrade]);

  const [excelFileError, setExcelFileError] = useState(null);

  const handleCallBack = (data) => {
    setDescription(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(eligible);
    setLoading({ type: "add", status: true });

    const {
      data: { message },
    } = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs`, {
      user: user._id,
      college: {
        name: user.college.name,
        code: user.college.code,
      },
      owner,
      team,
      company: name,
      program: typeOfProgram,
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
        diploma: {
          typeOfGrade: selectedDiplomaTypeOfGrade.name,
          grade: selectedDiplomaGrade.name,
        },
        undergraduate: {
          typeOfGrade: selectedUndergraduateTypeOfGrade.name,
          grade: selectedUndergraduateGrade.name,
        },
        postgraduate: {
          typeOfGrade: selectedPostgraduateTypeOfGrade.name,
          grade: selectedPostgraduateGrade.name,
        },
        placed: placed,
        salary: salary,
      },
      role: selectedRole.name,
      allowPlaced,
      designation,
      jobPostingLocation,
      jobPostingCampus,
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

    setLoading({ type: "add", status: false });

    if (message == "Success! Job Created") {
      toast.success(message, { toastId: message });
      router.push("/dashboard/college/jobs");
    } else {
      toast.error(message, { toastId: message });
    }
  };
  useEffect(() => {
    console.log(eligible);
  }, [eligible]);
  const uploadFileHandler = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "neujqnla");
    try {
      setLoading({ type: type, status: true });
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzn2bzqmt/image/upload",
        formData
      );
      setLoading({ type: type, status: false });
      const { url } = uploadRes.data;
      if (type === "banner") setImage(url);
      if (type === "logo") setLogo(url);
      if (type === "sign") setOwner({ ...owner, signature: url });
    } catch (error) {
      toast.error(error, { toastId: error });
    }
  };
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
              if (student) existingStudents.add(student.email);
            });
            var res = [];
            let studentList = [];
            console.log(data);
            data.forEach((x) => {
              if (x && x["Email"] && !existingStudents.has(x["Email"]))
                res.push({
                  email: x["Email"] ? x["Email"] : "N/A",
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

    console.log(eligible);
  };
  const addNewRound = (num) => {
    if (num < rounds.length) {
      let newRounds = [...rounds];
      for (let i = rounds.length - num; i > 0; i--) newRounds.pop();
      setRounds([...newRounds]);
    } else {
      let number = num - rounds.length;
      let newRounds = [...rounds];
      for (let i = 0; i < number; i++)
        newRounds.push({
          name: "",
          description: "",
          completed: false,
          date: {
            from: from ? from : null,
            to: to ? to : null,
          },
          status: "Yet to start",
          attendees: [],
          shortlisted: [],
          result: [],
        });
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
    console.log(newRounds);
    if (fieldName == "date-from" || fieldName == "date-to") {
      if (fieldName == "date-from") {
        newRounds[index]["date"]["from"] = updatedValue;
        newRounds[index]["date"]["to"] = updatedValue;
      } else newRounds[index]["date"]["to"] = updatedValue;
    } else {
      console.log("hello ", index, fieldName);
      newRounds[index][fieldName] = updatedValue;
    }
    console.log(newRounds);
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
            let existingStudents = new Set();
            let studentList = [];
            rounds[index][field].forEach((student) => {
              if (student) existingStudents.add(student.email);
            });
            if (field === "result") {
              data.forEach((x) => {
                if (x && x["Email"] && !existingStudents.has(x["Email"]))
                  studentList.push({
                    email: x["Email"],
                    role: x["Role"],
                    status: x["Result"],
                  });
              });
            } else {
              data.forEach((x) => {
                if (x && x["Email"] && !existingStudents.has(x["Email"]))
                  studentList.push({
                    email: x["Email"],
                    role: x["Role"],
                  });
              });
            }
            studentList = studentList.filter((x) => x != null);

            let newRounds = [...rounds];
            newRounds[index].field.push(...studentList);
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
    <main className="bg-gray-50 pt-[10vh]">
      {loading.type === "add" && loading.status === true ? <Loading /> : ""}
      <div className="space-y-6 max-w-6xl mx-auto py-8">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="mb-5 md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Job Infomation</h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <div>
            <form className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" method="POST">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700  ">
                  Website
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="off"
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="sign" className="block text-sm font-medium text-gray-700">
                  Owner Sign
                </label>
                <div className="mt-1">
                  <div className="sm:mt-0 sm:col-span-2">
                    {loading.type === "sign" && loading.status ? (
                      <div className="animate-pulse">
                        <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10"></input>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={owner.signature}
                        disabled={true}
                        onChange={(e) => setOwner({ ...owner, signature: e.target.value })}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    )}
                    {loading.type === "sign" && loading.status ? (
                      <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed">
                        <Loader size={8} color="gray" />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        label="Choose File"
                        type="file"
                        name="sign"
                        id="sign"
                        onChange={(e) => uploadFileHandler(e, "sign")}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="ownername" className="block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownername"
                  id="ownername"
                  value={owner.name}
                  onChange={(e) => setOwner({ ...owner, name: e.target.value })}
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="placementOName" className="block text-sm font-medium text-gray-700">
                  Placement Officer Name
                </label>
                <input
                  type="text"
                  name="placementOName"
                  id="placementOName"
                  value={team.placementOfficer}
                  onChange={(e) => setTeam({ ...team, placementOfficer: e.target.value })}
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-200 rounded-md"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="dataLead" className="block text-sm font-medium text-gray-700">
                  Data Team Lead
                </label>
                <input
                  type="text"
                  name="dataLead"
                  id="dataLead"
                  value={team.dataTeamLead}
                  onChange={(e) => setTeam({ ...team, dataTeamLead: e.target.value })}
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-200 rounded-md"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="processLead" className="block text-sm font-medium text-gray-700">
                  Process Team Lead
                </label>
                <input
                  type="text"
                  name="processLead"
                  id="processLead"
                  value={team.processTeamLead}
                  onChange={(e) => setTeam({ ...team, processTeamLead: e.target.value })}
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-base font-medium text-gray-900">Job Program</label>
                <p className="text-sm leading-5 text-gray-500">
                  Whom would you like to show this job posting?
                </p>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {typeOfJobProgram.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="notification-method"
                          type="radio"
                          value={option.name}
                          defaultChecked={option.id === "btech"}
                          checked={option.name === typeOfProgram}
                          onChange={(e) => setTypeOfProgram(e.target.value)}
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
              <div className="sm:col-span-3">
                <Switch.Group as="div" className="flex items-center justify-between">
                  <span className="flex flex-grow flex-col">
                    <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
                      Allow Placed Students
                    </Switch.Label>
                    <Switch.Description as="span" className="text-sm text-gray-500">
                      Please make sure you enter correct information.
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={allowPlaced}
                    onChange={setAllowPlaced}
                    className={classNames(
                      allowPlaced ? "bg-orange-600" : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      className={classNames(
                        allowPlaced ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    >
                      <span
                        className={classNames(
                          allowPlaced
                            ? "opacity-0 ease-out duration-100"
                            : "opacity-100 ease-in duration-200",
                          "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                        )}
                        aria-hidden="true"
                      >
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={classNames(
                          allowPlaced
                            ? "opacity-100 ease-in duration-200"
                            : "opacity-0 ease-out duration-100",
                          "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                        )}
                        aria-hidden="true"
                      >
                        <svg
                          className="h-3 w-3 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      </span>
                    </span>
                  </Switch>
                </Switch.Group>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Editor input={description} dataCallBack={handleCallBack} />
                <p className="mt-2 text-sm text-gray-500">Few lines to describe the job role.</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
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
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    )}
                    {loading.type === "logo" && loading.status ? (
                      <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed">
                        <Loader size={8} color="gray" />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
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
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    )}
                    {loading.type === "banner" && loading.status ? (
                      <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed">
                        <Loader size={8} color="gray" />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Registration Start Date
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  Registration End Date
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
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
                          roles: [...designation.roles.filter((x) => x !== option)],
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
                      className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Exact Stipend
                      </label>
                      <input
                        type="number"
                        name="name"
                        id="name"
                        value={stipend}
                        onChange={(e) => setStipend(e.target.value)}
                        autoComplete="off"
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Exact CTC
                      </label>
                      <input
                        type="number"
                        name="name"
                        id="name"
                        value={ctc}
                        onChange={(e) => setCtc(e.target.value)}
                        autoComplete="off"
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Exact Stipend
                        </label>
                        <input
                          type="number"
                          name="name"
                          id="name"
                          value={stipend}
                          onChange={(e) => setStipend(e.target.value)}
                          autoComplete="off"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Exact CTC
                        </label>
                        <input
                          type="number"
                          name="name"
                          id="name"
                          value={ctc}
                          onChange={(e) => setCtc(e.target.value)}
                          autoComplete="off"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="sm:col-span-6 rounded border">
                <h4 className="font-semibold text-sm bg-gray-100 px-2 py-3 flex">
                  <p>{"Job Posting Location"}</p>
                  <div className="ml-3 flex items-center font-normal">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mr-1 text-orange-600 border-gray-300 rounded outline-none"
                      checked={jobPostingLocation.includes("PAN India")}
                      onChange={(e) => {
                        const id = jobPostingLocation.indexOf("PAN India");
                        if (id == -1) setJobPostingLocation([...jobPostingLocation, "PAN India"]);
                        else {
                          const cat = jobPostingLocation;
                          cat.splice(id, 1);
                          setJobPostingLocation([...cat]);
                        }
                      }}
                    />
                    <label>PAN India</label>
                  </div>
                </h4>
                <CheckBox
                  title={"Job Posting Location"}
                  options={jobPostingLocationOptions}
                  setCheckedOptions={setJobPostingLocation}
                  checkedOptions={jobPostingLocation}
                />
              </div>
              <div className="sm:col-span-6 rounded border">
                <h4 className="font-semibold text-sm bg-gray-100 px-2 py-3 flex">
                  <p>{"Year Of Passing"}</p>
                  <div className="ml-3 flex items-center font-normal">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mr-1 text-orange-600 border-gray-300 rounded outline-none"
                      checked={yearofPassing.length === generateYearsBetween().length}
                      onChange={() => {
                        if (yearofPassing.length === generateYearsBetween().length)
                          setYearofPassing([]);
                        else setYearofPassing([...generateYearsBetween().map((x) => x.name)]);
                      }}
                    />
                    <label>All Years</label>
                  </div>
                </h4>
                <CheckBox
                  title={"Year Of Passing"}
                  options={generateYearsBetween()}
                  setCheckedOptions={setYearofPassing}
                  checkedOptions={yearofPassing}
                />
              </div>
              <div className="sm:col-span-6 rounded border">
              <h4 className="font-semibold text-sm bg-gray-100 px-2 py-3 flex">
                  <p>{"Allowed Campuses"}</p>
                  <div className="ml-3 flex items-center font-normal">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mr-1 text-orange-600 border-gray-300 rounded outline-none"
                      checked={jobPostingCampus.length === jobPostingCampuses.length}
                      onChange={() => {
                        if (jobPostingCampus.length === jobPostingCampuses.length)
                          setJobPostingCampus([]);
                        else setJobPostingCampus([...jobPostingCampuses.map((x) => x.name)]);
                      }}
                    />
                    <label>All Campuses</label>
                  </div>
                </h4>
                <CheckBox
                 title={"Campus Allowed"}
                 options={jobPostingCampuses}
                 setCheckedOptions={setJobPostingCampus}
                 checkedOptions={jobPostingCampus}
                />
              </div>
              <div className="sm:col-span-6 rounded border">
                <h4 className="font-semibold text-sm bg-gray-100 px-2 py-3 flex">
                  <p>{"Eligible Branches"}</p>
                  <div className="ml-3 flex items-center font-normal">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mr-1 text-orange-600 border-gray-300 rounded outline-none"
                      checked={
                        branchOptions.length ===
                        (typeOfProgram === "B.Tech"
                          ? btechBranches.length
                          : typeOfJobProgram === "M.Tech"
                          ? mtechBranches.length
                          : typeOfJobProgram === "MBA"
                          ? mbaBranches.length
                          : degreeBranches.length)
                      }
                      onChange={() => {
                        if (typeOfProgram === "B.Tech") {
                          if (branchOptions.length === btechBranches.length) setBranchOptions([]);
                          else setBranchOptions([...btechBranches.map((x) => x.name)]);
                        } else if (typeOfProgram === "M.Tech") {
                          if (branchOptions.length === mtechBranches.length) setBranchOptions([]);
                          else setBranchOptions([...mtechBranches.map((x) => x.name)]);
                        } else if (typeOfProgram === "MBA") {
                          if (branchOptions.length === mbaBranches.length) setBranchOptions([]);
                          else setBranchOptions([...mbaBranches.map((x) => x.name)]);
                        } else {
                          if (branchOptions.length === degreeBranches.length) setBranchOptions([]);
                          else setBranchOptions([...degreeBranches.map((x) => x.name)]);
                        }
                      }}
                    />
                    <label>All Branches</label>
                  </div>
                </h4>
                <CheckBox
                  title={"Eligible Branches"}
                  options={
                    typeOfProgram === "B.Tech"
                      ? btechBranches
                      : typeOfProgram === "M.Tech"
                      ? mtechBranches
                      : typeOfProgram === "MBA"
                      ? mbaBranches
                      : degreeBranches
                  }
                  setCheckedOptions={setBranchOptions}
                  checkedOptions={branchOptions}
                />
              </div>

              {/* <div className='sm:col-span-3'>
                <label className='text-base font-medium text-gray-900'>
                  What students are eligible ?
                </label>
                <p className='text-sm leading-5 text-gray-500'>
                  Who should be able to apply to this job ?
                </p>
                <fieldset className='mt-4'>
                  <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                    {typeOfPlacedStatus.map((option) => (
                      <div key={option.id} className='flex items-center'>
                        <input
                          id={option.id}
                          name='placed'
                          type='radio'
                          value={option.name}
                          defaultChecked={option.id === "everyone"}
                          onChange={(e) =>
                            setPlaced(
                              e.target.value === "Everyone" ? null : e.target.value === "Placed"
                            )
                          }
                          className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300'
                        />
                        <label
                          htmlFor={option.id}
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {placed && (
                <div className='sm:col-span-3'>
                  <div className='flex flex-col mt-5'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900'>
                        Maximum salary eligible to apply job ?
                      </p>
                      <p className='text-sm font-light'>
                        {"₹" + Number(salary).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className='p-1 mt-1'>
                      <input
                        type='range'
                        min={0}
                        max={5000000}
                        step={5000}
                        className='w-full '
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
                </div>
              )} */}

              <div className="sm:col-span-4">
                <label className="text-base font-medium text-gray-900">Type Of Job Posting</label>
                <p className="text-sm leading-5 text-gray-500">
                  How would you like to show this job posting?
                </p>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {typeOfPosting.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="typeOfPosting"
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
              </div>

              <div className="sm:col-span-2 relative -top-[22px]">
                <DropDown
                  title={"Status"}
                  options={status}
                  selectedOption={selectedStatus}
                  setSelectedOption={setSelectedStatus}
                />
              </div>

              {typeOfPost === "Criteria" && (
                <>
                  <div className="sm:col-span-1 relative -top-[22px]">
                    <DropDown
                      title={"Xth Type Of Grade"}
                      options={typeOfGrade}
                      selectedOption={selectedXthTypeOfGrade}
                      setSelectedOption={setSelectedXthTypeOfGrade}
                    />
                  </div>
                  {selectedXthTypeOfGrade.name !== "Not Applicable" && (
                    <div className="sm:col-span-1 relative -top-[22px]">
                      <DropDown
                        title={"Xth Grade"}
                        options={selectedXthTypeOfGrade.name === "CGPA" ? CGPAs : Percentages}
                        selectedOption={selectedXthGrade}
                        setSelectedOption={setSelectedXthGrade}
                      />
                    </div>
                  )}
                  <div className="sm:col-span-1 relative -top-[22px]">
                    <DropDown
                      title={"XIIth Type Of Grade"}
                      options={typeOfGrade}
                      selectedOption={selectedXIIthTypeOfGrade}
                      setSelectedOption={setSelectedXIIthTypeOfGrade}
                    />
                  </div>
                  {selectedXIIthTypeOfGrade.name !== "Not Applicable" && (
                    <div className="sm:col-span-1 relative -top-[22px]">
                      <DropDown
                        title={"XIIth Grade"}
                        options={selectedXIIthTypeOfGrade.name === "CGPA" ? CGPAs : Percentages}
                        selectedOption={selectedXIIthGrade}
                        setSelectedOption={setSelectedXIIthGrade}
                      />
                    </div>
                  )}
                  <div className="sm:col-span-1 relative -top-[22px]">
                    <DropDown
                      title={"Diploma Type Of Grade"}
                      options={typeOfGrade}
                      selectedOption={selectedDiplomaTypeOfGrade}
                      setSelectedOption={setSelectedDiplomaTypeOfGrade}
                    />
                  </div>
                  {selectedDiplomaTypeOfGrade.name !== "Not Applicable" && (
                    <div className="sm:col-span-1 relative -top-[22px]">
                      <DropDown
                        title={"Diploma Grade"}
                        options={selectedDiplomaTypeOfGrade.name === "CGPA" ? CGPAs : Percentages}
                        selectedOption={selectedDiplomaGrade}
                        setSelectedOption={setSelectedDiplomaGrade}
                      />
                    </div>
                  )}
                  <div className="sm:col-span-1 relative -top-[22px]">
                    <DropDown
                      title={"UG Type Of Grade"}
                      options={typeOfGrade}
                      selectedOption={selectedUndergraduateTypeOfGrade}
                      setSelectedOption={setSelectedUndergraduateTypeOfGrade}
                    />
                  </div>
                  {selectedUndergraduateTypeOfGrade.name !== "Not Applicable" && (
                    <div className="sm:col-span-1 relative -top-[22px]">
                      <DropDown
                        title={"UG Grade"}
                        options={
                          selectedUndergraduateTypeOfGrade.name === "CGPA" ? CGPAs : Percentages
                        }
                        selectedOption={selectedUndergraduateGrade}
                        setSelectedOption={setSelectedUndergraduateGrade}
                      />
                    </div>
                  )}
                  <div className="sm:col-span-1 relative -top-[22px]">
                    <DropDown
                      title={"PG Type Of Grade"}
                      options={typeOfGrade}
                      selectedOption={selectedPostgraduateTypeOfGrade}
                      setSelectedOption={setSelectedPostgraduateTypeOfGrade}
                    />
                  </div>
                  {selectedPostgraduateTypeOfGrade.name !== "Not Applicable" && (
                    <div className="sm:col-span-1 relative -top-[22px]">
                      <DropDown
                        title={"PG Grade"}
                        options={
                          selectedPostgraduateTypeOfGrade.name === "CGPA" ? CGPAs : Percentages
                        }
                        selectedOption={selectedPostgraduateGrade}
                        setSelectedOption={setSelectedPostgraduateGrade}
                      />
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="space-y-6 max-w-6xl mx-auto py-8">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="mb-5 md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Drive Infomation</h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <div>
            <form className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" method="POST">
              <div className="sm:col-span-6">
                <label htmlFor="roundNumber" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-6 rounded border bg-white shadow sm:rounded-lg">
                <h4 className="font-semibold text-sm bg-gray-100 px-2 py-3 flex">
                  <p>Rounds</p>
                </h4>
                <div className="px-5 pb-5">
                  {rounds?.map((round, roundIndex) => (
                    <>
                      <Round
                        type={"add"}
                        isPrevComplete={true}
                        round={round}
                        roundIndex={roundIndex}
                        handleRoundChange={handleRoundChange}
                        handleShortlistFile={handleShortlistFile}
                      />
                      {roundIndex == 0 && typeOfPost === "Shortlisted Students" && (
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="photo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Upload Spreadsheet
                          </label>

                          <input
                            className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                    </>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-6 rounded border bg-white shadow sm:rounded-lg">
                <h4 className="font-semibold text-sm bg-gray-100 px-2 py-3 flex">
                  <p>Questionaire</p>
                </h4>
                <div className="p-5">
                  {questionnaire?.map((questionObj, questionIndex) => (
                    <Question
                      question={questionObj.question}
                      type={questionObj.question.options && questionObj.question.options.length > 0}
                      index={questionIndex}
                      handleQuestionChange={handleQuestionChange}
                      clearOptions={clearOptions}
                      handleOptionChange={handleOptionChange}
                      removeOption={removeOption}
                      addOption={addOption}
                      removeQuestion={removeQuestion}
                    />
                  ))}
                  <div
                    className="cursor-pointer mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-semibold rounded text-orange-600 bg-orange-100"
                    onClick={addNewQuestion}
                  >
                    Add question
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href={`/dashboard/college/jobs`}>
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </button>
          </Link>
          <button
            disabled={loading.status}
            onClick={onSubmitHandler}
            className={`${
              loading.status ? "cursor-not-allowed" : "hover:bg-orange-700 "
            } ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600`}
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async ({ req, res }) => {
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

export default JobAdd;
