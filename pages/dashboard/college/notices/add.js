import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Editor from "../../../../src/components/Jobs/Editor";
import { toast } from "react-toastify";
import { status } from "../../../../src/lib/helper";
import { DropDown } from "../../../../src/components/Reusables/Dropdown";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import Link from "next/link";
import * as XLSX from "xlsx";

const JobAdd = ({ user }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [eligible, setEligible] = useState([]);
  const [excelFileError, setExcelFileError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(status[0]);

  const handleCallBack = (data) => {
    setDescription(data);
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
            const res = data.map((x) => {
              return {
                email: x["Email"] ? x["Email"] : "N/A",
              };
            });
            console.log(res);
            console.log(data);
            setEligible(res);
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(eligible);
    const {
      data: { message },
    } = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/notices`, {
      user: user._id,
      author: {
        name: user.profile.firstName + " " + user.profile.lastName,
        image: user.profile.image,
      },
      college: {
        name: user.college.name,
        code: user.college.code,
      },
      title: title,
      description: description,
      status: selectedStatus.name,
      visible: eligible,
    });

    if (message == "Success! Notice Created") {
      toast.success(message, { toastId: message });
      router.push("/dashboard/college/notices");
    } else {
      toast.error(message, { toastId: message });
    }
  };

  return (
    <main className="bg-gray-50 h-screen pt-[15vh]">
      {/* {loading.type === "add" && loading.status === true ? <Loading /> : ""} */}
      <div className="space-y-6 max-w-6xl mx-auto py-8">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="mb-5 md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Notice</h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <div>
            <form className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" method="POST">
              <div className="sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="off"
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
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
              <div className="sm:col-span-3 relative -top-[22px]">
                <DropDown
                  title={"Status"}
                  options={status}
                  selectedOption={selectedStatus}
                  setSelectedOption={setSelectedStatus}
                />
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <Link href={`/dashboard/college/jobs`}>
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Cancel
                </button>
              </Link>
              <button
                onClick={onSubmitHandler}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600`}
              >
                Save
              </button>
            </div>
          </div>
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
