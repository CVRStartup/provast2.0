import React, { useState } from "react";
import * as XLSX from "xlsx";
import crypto from "crypto";
import { useCollege } from "../../../../../src/hooks/useCollege";
import { toast } from "react-toastify";
import axios from "axios";

const Index = ({ id }) => {
  const { college, isError, isLoading } = useCollege(id);
  const [excelFileError, setExcelFileError] = useState(null);
  const [students, setStudents] = useState([]);
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
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
              return {
                email: x["Email Id"] ?? null,
                detailsAvailable: true,
                academicsAvailable: false,
                profile: {
                  firstName: x["First Name"] ?? null,
                  lastName: x["Last Name"] ?? null,
                  gender: x["Gender"] ?? null,
                  verified: false,
                  frozen: false,
                },
                approved: true,
                category: "student",
                rollnumber: {
                  value: x["Roll No"] ?? null,
                  frozen: false,
                  verified: false,
                },
                phone: {
                  value: x["Phone Number"] ?? null,
                  frozen: false,
                  verified: false,
                },
                college: {
                  name: college.collegeName,
                  code: college._id,
                },
              };
            });
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
  return (
    <div className='mt-[10vh]'>
      <div className='sm:col-span-3'>
        <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
          Upload Spreadsheet
        </label>

        <input
          className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
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
