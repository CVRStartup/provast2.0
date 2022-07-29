import React, { useState } from "react";
import * as XLSX from "xlsx";

const Index = () => {
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
                firstName: x["First Name"] ? x["First Name"] : "N/A",
                lastName: x["Last Name"] ? x["Last Name"] : "N/A",
                branch: x["Branch"] ? x["Branch"] : "N/A",
                rollnumber: x["Roll Number"] ? x["Roll Number"] : "N/A",
                email: x["Email"] ? x["Email"] : "N/A",
                phone: x["Phone"] ? x["Phone"] : "N/A",
                batchFrom: x["Batch From"] ? x["Batch From"] : "N/A",
                batchTo: x["Batch To"] ? x["Batch To"] : "N/A",
                password: "Provast@2022",
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

export default Index;
