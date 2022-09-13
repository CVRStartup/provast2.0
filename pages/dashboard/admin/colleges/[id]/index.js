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
  const [excelFile, setExcelFile] = useState(null);
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

  const userIds = {
    6383758397: "631392d283b1159278b8e3de",
    "Jb6958@srmist.edu.in": "631392d283b1159278b8e3d8",
    "Pe4996@srmist.edu.in": "631392c583b1159278b8e315",
    "Sa5870@srmist.edu.in": "631392c183b1159278b8e2e2",
    "Sb0477@srmist.edu.in": "631392cb83b1159278b8e36c",
    "Vc0719@srmist.edu.in": "631392c083b1159278b8e2ca",
    "ab3492@srmist.edu.in": "631392d183b1159278b8e3cf",
    "ab8497@srmist.edu.in": "631392c783b1159278b8e336",
    "ac2640@srmist.edu.in": "631392c083b1159278b8e2d0",
    "ac3147@srmist.edu.in": "631392c783b1159278b8e33f",
    "ac5597@srmist.edu.in": "631392cf83b1159278b8e3a8",
    "ae7018@srmist.edu.in": "631392c383b1159278b8e300",
    "ak1961@srmist.edu.in": "631392be83b1159278b8e2a3",
    "ak2806@srmist.edu.in": "631392bf83b1159278b8e2be",
    "ak6079@srmist.edu.in": "631392d183b1159278b8e3c3",
    "al9237@srmist.edu.in": "631392c283b1159278b8e2ee",
    "an1064@srmist.edu.in": "631392c683b1159278b8e32d",
    "ar4562@srmist.edu.in": "631392c883b1159278b8e34b",
    "as4379@srmist.edu.in": "631392c483b1159278b8e312",
    "bb9848@srmist.edu.in": "631392c183b1159278b8e2d9",
    "bk7579@srmist.edu.in": "631392c583b1159278b8e31b",
    "br9266@srmist.edu.in": "631392d383b1159278b8e3e7",
    "bs3155@srmist.edu.in": "631392c383b1159278b8e2fa",
    "bs5277@srmist.edu.in": "631392c683b1159278b8e32a",
    "cs4825@srmist.edu.in": "631392c383b1159278b8e303",
    "dg7886@srmist.edu.in": "631392cd83b1159278b8e393",
    "dh8058@srmist.edu.in": "631392c083b1159278b8e2d3",
    "dp5880@srmist.edu.in": "631392cd83b1159278b8e38a",
    "ds3887@srmist.edu.in": "631392c583b1159278b8e318",
    "dz2855@srmist.edu.in": "631392d283b1159278b8e3db",
    "eg5434@srmist.edu.in": "631392cf83b1159278b8e3b4",
    "es9627@srmist.edu.in": "631392be83b1159278b8e2a6",
    "gb8667@srmist.edu.in": "631392cc83b1159278b8e387",
    "gg2849@srmist.edu.in": "631392c983b1159278b8e351",
    "gm0320@srmist.edu.in": "631392cb83b1159278b8e36f",
    "gm4918@srmist.edu.in": "631392ca83b1159278b8e363",
    "gn5077@srmist.edu.in": "631392c183b1159278b8e2df",
    "gr3988@srmist.edu.in": "631392cd83b1159278b8e38d",
    "gv3565@srmist.edu.in": "631392d183b1159278b8e3cc",
    "hg1522@srmist.edu.in": "631392c283b1159278b8e2e8",
    "hs1777@srmist.edu.in": "631392d383b1159278b8e3e4",
    "hu2169@srmist.edu.in": "631392c583b1159278b8e31e",
    "ja1589@srmist.edu.in": "631392cc83b1159278b8e381",
    "jb2978@srmist.edu.in": "631392ca83b1159278b8e369",
    "jj4821@srmist.edu.in": "631392cd83b1159278b8e390",
    "jm6379@srmist.edu.in": "631392c283b1159278b8e2e5",
    "jr0543@srmist.edu.in": "631392c783b1159278b8e33c",
    "jr1621@srmist.edu.in": "631392cb83b1159278b8e378",
    "js8044@srmist.edu.in": "631392c083b1159278b8e2c7",
    "kp8429@srmist.edu.in": "631392d283b1159278b8e3d2",
    "kr3626@srmist.edu.in": "631392bf83b1159278b8e2c1",
    "ks4324@srmist.edu.in": "631392c983b1159278b8e357",
    "kv1856@srmist.edu.in": "631392c783b1159278b8e333",
    "lr2687@srmist.edu.in": "631392d183b1159278b8e3c6",
    "ma3412@srmist.edu.in": "631392ce83b1159278b8e3a5",
    "mb9395@srmist.edu.in": "631392d083b1159278b8e3c0",
    "mh8370@srmist.edu.in": "631392c883b1159278b8e342",
    "mi7814@srmist.edu.in": "631392c483b1159278b8e306",
    "mi8670@srmist.edu.in": "631392bf83b1159278b8e2b8",
    "mj0251@srmist.edu.in": "631392c283b1159278b8e2f1",
    "mj3720@srmist.edu.in": "631392be83b1159278b8e2a9",
    "mk3280@srmist.edu.in": "631392d283b1159278b8e3d5",
    "mm3089@srmist.edu.in": "631392be83b1159278b8e29a",
    "mm8089@srmist.edu.in": "631392cc83b1159278b8e37b",
    "mn2369@srmist.edu.in": "631392ce83b1159278b8e39c",
    "ms8080@srmist.edu.in": "631392bf83b1159278b8e2b2",
    "mt6056@srmist.edu.in": "631392cd83b1159278b8e396",
    "mv3288@srmist.edu.in": "631392c183b1159278b8e2dc",
    "nb8998@srmist.edu.in": "631392c883b1159278b8e34e",
    "pk1083@srmist.edu.in": "631392c883b1159278b8e345",
    "pk3684@srmist.edu.in": "631392c683b1159278b8e330",
    "pp8462@srmist.edu.in": "631392cf83b1159278b8e3ab",
    "pr5238@srmist.edu.in": "631392d383b1159278b8e3ea",
    "ps0837@srmist.edu.in": "631392c483b1159278b8e30f",
    "pv8126@srmist.edu.in": "631392be83b1159278b8e29d",
    "ra3241@srmist.edu.in": "631392ce83b1159278b8e3a2",
    "ra3715@srmist.edu.in": "631392cb83b1159278b8e372",
    "ri3519@srmist.edu.in": "631392c883b1159278b8e348",
    "rk1141@srmist.edu.in": "631392c983b1159278b8e35a",
    "rk6585@srmist.edu.in": "631392ca83b1159278b8e366",
    "rk8540@srmist.edu.in": "631392d083b1159278b8e3bd",
    "rm2096@srmist.edu.in": "631392ce83b1159278b8e399",
    "rr6229@srmist.edu.in": "631392d383b1159278b8e3e1",
    "sa1230@srmist.edu.in": "631392c083b1159278b8e2c4",
    "sb1812@srmist.edu.in": "631392cf83b1159278b8e3ae",
    "sb4208@srmist.edu.in": "631392cf83b1159278b8e3b1",
    "sb9315@srmist.edu.in": "631392cc83b1159278b8e37e",
    "sd2355@srmist.edu.in": "631392ca83b1159278b8e360",
    "sk6250@srmist.edu.in": "631392bf83b1159278b8e2af",
    "sm1655@srmist.edu.in": "631392c983b1159278b8e354",
    "sp4709@srmist.edu.in": "631392c683b1159278b8e324",
    "sp8276@srmist.edu.in": "631392c283b1159278b8e2eb",
    "sp8856@srmist.edu.in": "631392c183b1159278b8e2d6",
    "sr6121@srmist.edu.in": "631392c283b1159278b8e2f4",
    "ss1235@srmist.edu.in": "631392c783b1159278b8e339",
    "ss1841@srmist.edu.in": "631392c483b1159278b8e30c",
    "ss3282@srmist.edu.in": "631392cb83b1159278b8e375",
    "ss5686@srmist.edu.in": "631392c483b1159278b8e309",
    "ss6936@srmist.edu.in": "631392c083b1159278b8e2cd",
    "sv0788@srmist.edu.in": "631392be83b1159278b8e2a0",
    "sv4796@srmist.edu.in": "631392bf83b1159278b8e2bb",
    "sv9544@srmist.edu.in": "631392bf83b1159278b8e2b5",
    "ta7576@srmist.edu.in": "631392d183b1159278b8e3c9",
    "ts8800@srmist.edu.in": "631392be83b1159278b8e2ac",
    "va0320@srmist.edu.in": "631392ce83b1159278b8e39f",
    "va5702@srmist.edu.in": "631392c583b1159278b8e321",
    "va8990@srmist.edu.in": "631392ca83b1159278b8e35d",
    "vk8884@srmist.edu.in": "631392c383b1159278b8e2f7",
    "vp3989@srmist.edu.in": "631392cc83b1159278b8e384",
    "vr0146@srmist.edu.in": "631392c383b1159278b8e2fd",
    "vs4802@srmist.edu.in": "631392d083b1159278b8e3b7",
    "ya8561@srmist.edu.in": "631392c683b1159278b8e327",
    "yb5043@srmist.edu.in": "631392d083b1159278b8e3ba",
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
              const name = x["Student Name"].split(" ");
              const studentName = getName(name);
              return {
                email: x["Email Id"] ?? null,
                detailsAvailable: true,
                academicsAvailable: true,
                profile: {
                  ...studentName,
                  gender: x["GENDER"] ?? null,
                  verified: false,
                  frozen: false,
                },
                approved: true,
                category: "student",
                rollNumber: {
                  value: x["RollNo."] ?? null,
                  frozen: false,
                  verified: false,
                },
                phone: {
                  value: x["Student Contact No"] ?? null,
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
        const {
          data: { details },
        } = await axios.post("/api/auth/user/details", {
          ...s,
          hash,
          salt,
        });
        userIds[details.email] = details._id;
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
    console.log(userIds);
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
                rollNumber: x["RollNo."] ?? "",
                education: [
                  {
                    institution: "CVR College Of Engineering",
                    program: "B.Tech",
                    board: "JNTUH",
                    branch: x["Branch"] ? rename(x["Branch"]).trim() : "",
                    educationType: "Full Time",
                    score: {
                      typeOfGrade: "CGPA",
                      grade: getPercentage(x["B.Tech"]) ?? 0,
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
                    institution: x["COLLEGE  NAME "],
                    program: "Class XIIth",
                    board: "SSC",
                    educationType: "Full Time",
                    score: {
                      typeOfGrade: "Percentage",
                      grade: getPercentage(x["INTER %"]) ?? 0,
                    },
                    batch: {
                      from: 0,
                      to: x["INTER YEAR OF PASSING "],
                    },
                    current: false,
                    verified: false,
                    frozen: false,
                  },
                  {
                    institution: x["SCHOOL NAME "],
                    program: "Class Xth",
                    board: x["SSC DETAILS"],
                    educationType: "Full Time",
                    score: {
                      typeOfGrade: "Percentage",
                      grade: getPercentage(x["SSC %"]) ?? 0,
                    },
                    batch: {
                      from: 0,
                      to: x["SSC YEAR OF PASSING "],
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

  const handlePayment = (e) => {
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
            console.log(userIds["yb5043@srmist.edu.in"]);
            const res = data.map((x) => {
              return {
                user: userIds[x["Email Id"].toString().trim(" ")],
                amount: 7500,
                email: x["Email Id"].toString().trim(" "),
                address: {
                  country: "India",
                  postal: "500074",
                },
                phone: x["Phone Number"],
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
  const handlePaymentCreate = async () => {
    let total = students.length,
      createdCount = 0;
    const failedAccounts = [];
    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      try {
        await axios.put("/api/payment/crt", {
          ...s,
        });
        createdCount += 1;
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
      toast.success("All Payments Are Successfully Created!");
    } else {
      toast.error("Payment creation failed for " + failedAccounts.length + " Students.");
      console.log(failedAccounts);
    }
  };

  const handlePlaced = (e) => {
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
                rollNumber: x["Roll Number"],
                placed: x["Placed"],
              };
            });
            console.log(res);
            alert(123);
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

  const handlePlacedStudent = async () => {
    let total = students.length,
      createdCount = 0;
    const failedAccounts = [];
    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      try {
        await axios.put("/api/auth/user/placed", {
          ...s,
        });
        createdCount += 1;
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
      toast.success("Placed status have been updated for all!");
    } else {
      toast.error("Payment creation failed for " + failedAccounts.length + " Students.");
      console.log(failedAccounts);
    }
  };
  return (
    <div className='pt-[10vh]'>
      <div>
        <div className='sm:col-span-3'>
          <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
            Upload Spreadsheet
          </label>

          <input
            className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
            label='Choose File'
            type='file'
            name='image'
            id='profileImg'
            onChange={handleFile}
          />
          {excelFileError &&
            toast.error(excelFileError, {
              toastId: excelFileError,
            })}
        </div>
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className='pt-[10vh]'>
        <div className='sm:col-span-3'>
          <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
            Upload Spreadsheet
          </label>

          <input
            label='Choose File'
            className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
            type='file'
            name='image'
            id='profileImg'
            onChange={handleEducation}
          />
          {excelFileError &&
            toast.error(excelFileError, {
              toastId: excelFileError,
            })}
        </div>
        <button onClick={handleEducationCreate}>Create Education</button>
      </div>

      <div className='pt-[10vh]'>
        <div className='sm:col-span-3'>
          <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
            Upload Spreadsheet
          </label>

          <input
            label='Choose File'
            className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
            type='file'
            name='image'
            id='profileImg'
            onChange={handlePayment}
          />
          {excelFileError &&
            toast.error(excelFileError, {
              toastId: excelFileError,
            })}
        </div>
        <button onClick={handlePaymentCreate}>Create Payment</button>
      </div>

      <div className='pt-[10vh]'>
        <div className='sm:col-span-3'>
          <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
            Upload Spreadsheet
          </label>

          <input
            label='Choose File'
            className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
            type='file'
            name='image'
            id='profileImg'
            onChange={handlePlaced}
          />
          {excelFileError &&
            toast.error(excelFileError, {
              toastId: excelFileError,
            })}
        </div>
        <button onClick={handlePlacedStudent}>Update Placed Students</button>
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
