import React, { useState } from "react";
import * as XLSX from "xlsx";
import crypto from "crypto";
import { useCollege } from "../../../../../src/hooks/useCollege";
import { toast } from "react-toastify";
import axios from "axios";
import { rename } from "../../../../../src/lib/helper";

const Index = ({ id }) => {
  const { college, isError, isLoading } = useCollege(id);
  const [excelFileError, setExcelFileError] = useState(null);
  const [students, setStudents] = useState([]);
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const getName = (name) => {
    let studentName = {
      firstName: "",
      middleName: "",
      lastName: "",
    };
    if (name.length === 1) {
      studentName.firstName = name[0];
    } else if (name.length === 2) {
      studentName.firstName = name[0];
      studentName.lastName = name[1];
    } else if (name.length === 3) {
      studentName.firstName = name[0];
      studentName.middleName = name[1];
      studentName.lastName = name[2];
    } else {
      studentName.firstName = name[0];
      studentName.middleName = name[2];
      for (let i = 2; i < name.length; i++) {
        studentName.lastName += name[i];
      }
    }
    return studentName;
  };

  const getPercentage = (percentage) => {
    if (!percentage) return "";
    let n = percentage.length;
    if (percentage[n - 1] === "%") return percentage.substring(0, n - 1);
    return percentage;
  };

  const handleFile = (e) => {
    if (!college) return;
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
            const res = data.map((x) => {
              const name = x["STUDENT FULL NAME (AS PER SSC)"].split(" ");
              const studentName = getName(name);
              return {
                email: x["EMAIL ID"] ?? null,
                detailsAvailable: true,
                academicsAvailable: false,
                profile: {
                  ...studentName,
                  gender: x["GENDER"] ?? null,
                  verified: false,
                  frozen: false,
                },
                approved: true,
                category: "student",
                rollNumber: {
                  value: x["ROLL NO"] ?? null,
                  frozen: false,
                  verified: false,
                },
                phone: {
                  value: x["MOBILE NO"] ?? null,
                  frozen: false,
                  verified: false,
                },
                college: {
                  name: college.collegeName,
                  code: college._id,
                },
              };
            });
            console.log(res);
            setStudents(res);
          } else {
            setStudents([]);
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
  const handleCreate = async () => {
    let total = students.length,
      createdCount = 0;
    const failedAccounts = [];
    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      try {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.pbkdf2Sync("Provast@123", salt, 1000, 64, "sha512").toString("hex");
        await axios.post("/api/auth/user/details", {
          ...s,
          hash,
          salt,
        });
        createdCount += 1;
      } catch (e) {
        failedAccounts.push({
          account: s,
          reason: e.response.data.message,
        });
      }
    }
    if (total === createdCount) {
      toast.success("All Users Are Successfully Created!");
    } else {
      toast.error("Account creation failed for " + failedAccounts.length + " Students.");
      console.log(failedAccounts);
    }
  };

  const handleEducation = (e) => {
    if (!college) return;
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
            const res = data.map((x) => {
              return {
                rollNumber: x["ROLL NO"] ?? "",
                education: [
                  {
                    institution: x["COLLEGE"],
                    program: "B.Tech" ?? "",
                    board: "",
                    branch: x["DEPARTMENT"] ? rename(x["DEPARTMENT"]).trim() : "",
                    educationType: "Full Time",
                    score: {
                      typeOfGrade: "CGPA",
                      grade: getPercentage(x["B.TECH AGGREGATE CGPA"]) ?? 0,
                    },
                    batch: {
                      from: 0,
                      to: 0,
                    },
                    current: true,
                    verified: false,
                    frozen: false,
                  },
                  {
                    institution: "N/A",
                    program: "Class XIIth",
                    board: "MPC" ?? "",
                    educationType: "Full Time",
                    score: {
                      typeOfGrade: "Percentage",
                      grade: getPercentage(x["INTER / DIPLOMA PERCENTAGE"]) ?? 0,
                    },
                    batch: {
                      from: 0,
                      to: 0,
                    },
                    current: false,
                    verified: false,
                    frozen: false,
                  },
                  {
                    institution: "N/A",
                    program: "Class Xth",
                    board: "SSC",
                    educationType: "Full Time",
                    score: {
                      typeOfGrade: "Percentage",
                      grade: getPercentage(x["10TH PERCENTAGE"]) ?? 0,
                    },
                    batch: {
                      from: 0,
                      to: 0,
                    },
                    current: false,
                    verified: false,
                    frozen: false,
                  },
                ],
              };
            });
            console.log(res);
            setStudents(res);
          } else {
            setStudents([]);
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
  const handleEducationCreate = async () => {
    let total = students.length,
      createdCount = 0;
    const branch = new Set();
    const failedAccounts = [];
    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      try {
        await axios.post("/api/auth/user/academics", {
          ...s,
        });
        createdCount += 1;
        branch.add(s.education.branch);
      } catch (e) {
        // if (e.response.data.message !== "Details Already Exists") {
        failedAccounts.push({
          account: s,
          reason: e.response.data.message,
        });
        // }
      }
    }
    if (total === createdCount) {
      toast.success("All Users Are Successfully Created!");
    } else {
      toast.error("Account creation failed for " + failedAccounts.length + " Students.");
      console.log(failedAccounts);
    }
    console.log(branch);
  };
  return (
    <div className="pt-[10vh]">
      <div>
        <div className="sm:col-span-3">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
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
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="pt-[10vh]">
        <div className="sm:col-span-3">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Upload Spreadsheet
          </label>

          <input
            label="Choose File"
            className="mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            type="file"
            name="image"
            id="profileImg"
            onChange={handleEducation}
          />
          {excelFileError &&
            toast.error(excelFileError, {
              toastId: excelFileError,
            })}
        </div>
        <button onClick={handleEducationCreate}>Create Education</button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  return {
    props: {
      id: query.id,
    },
  };
};

export default Index;
