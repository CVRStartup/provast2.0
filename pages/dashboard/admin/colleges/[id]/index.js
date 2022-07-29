import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useCollege } from "../../../../../src/hooks/useCollege";

const Index = ({ id }) => {
  const { college, isError, isLoading } = useCollege(id);
  const [excelFileError, setExcelFileError] = useState(null);
  const [students, setStudents] = useState([]);
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
            const res = data.map((x) => {
              return {
                email: x["Email Id"] ? x["Email Id"] : null,
                hash: "Password",
                salt: "salt",
                detailsAvailable: true,
                academicsAvailable: false,
                profile: {
                  firstName: x["First Name"] ? x["First Name"] : null,
                  lastName: x["Last Name"] ? x["Last Name"] : null,
                  dob: x["Date of Birth"] ? x["Date of Birth"] : null,
                  gender: x["Gender"] ? x["Gender"] : null,
                },
                contact: {
                  parents: {
                    father: {
                      name: x["Father's/Guardian's Name"] ? x["Father's/Guardian's Name"] : null,
                      email: x["Father's/Guardian's email ID"]
                        ? x["Father's/Guardian's email ID"]
                        : null,
                      phone: x["Father's/Guardian's Contact Number"]
                        ? x["Father's/Guardian's Contact Number"]
                        : null,
                      occupation: x["Father's/Guardian's Occupation"]
                        ? x["Father's/Guardian's Occupation"]
                        : null,
                    },
                    mother: {
                      name: x["Mother's Name"] ? x["Mother's Name"] : null,
                      email: x["Mother's email ID"] ? x["Mother's email ID"] : null,
                      phone: x["Mother's Contact Number"] ? x["Mother's Contact Number"] : null,
                      occupation: x["Mother's Occupation"] ? x["Mother's Occupation"] : null,
                    },
                  },
                  address: {
                    city: x["Permanent Address - City"] ? x["Permanent Address - City"] : null,
                    country: x["Permanent Address - Country"]
                      ? x["Permanent Address - Country"]
                      : "India",
                    state: x["Permanent Address - State"] ? x["Permanent Address - State"] : null,
                  },
                  email: x["Personal Email Address"] ? x["Personal Email Address"] : null,
                  phone: x["Phone Number"] ? x["Phone Number"] : null,
                },
                approved: false,
                category: "student",
                rollnumber: x["Roll No"] ? x["Roll No"] : null,
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
      <button>Create</button>
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
