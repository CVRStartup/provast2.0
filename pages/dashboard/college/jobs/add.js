import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Editor from "../../../../src/components/Jobs/Editor";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { Loader } from "../../../../src/components/Layout/Loader";
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
  handleFile,
} from "../../../../src/lib/helper";
import { DropDown } from "../../../../src/components/Reusables/Dropdown";
import { CheckBox } from "../../../../src/components/Reusables/CheckBox";
import { MultiInput } from "../../../../src/components/Jobs/MultiInput";
import Link from "next/link";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";

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
  const [yearofPassing, setYearofPassing] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [typeOfPost, setTypeOfPost] = useState("Shortlisted Students");
  const [loading, setLoading] = useState({ type: null, status: false });
  const [eligible, setEligible] = useState([]);

  const [placed, setPlaced] = useState(null);
  const [salary, setSalary] = useState(0);

  const [selectedRole, setSelectedRole] = useState(role[0]);
  const [selectedStatus, setSelectedStatus] = useState(status[0]);
  const [selectedStipendRange, setSelectedStipendRange] = useState(stipendRange[0]);
  const [selectedCTCRange, setSelectedCTCRange] = useState(ctcRange[0]);

  const [selectedXthTypeOfGrade, setSelectedXthTypeOfGrade] = useState(typeOfGrade[0]);
  const [selectedXIIthTypeOfGrade, setSelectedXIIthTypeOfGrade] = useState(typeOfGrade[0]);
  const [selectedBtechTypeOfGrade, setSelectedBtechTypeOfGrade] = useState(typeOfGrade[0]);

  const [selectedXthGrade, setSelectedXthGrade] = useState(CGPAs[0]);
  const [selectedXIIthGrade, setSelectedXIIthGrade] = useState(CGPAs[0]);
  const [selectedBtechGrade, setSelectedBtechGrade] = useState(CGPAs[0]);

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
    if (selectedBtechTypeOfGrade.name === "CGPA") setSelectedBtechGrade(CGPAs[0]);
    else if (selectedBtechTypeOfGrade.name === "Percentage") setSelectedBtechGrade(Percentages[0]);
    else setSelectedBtechGrade({ id: 11, name: 0 });
  }, [selectedBtechTypeOfGrade]);

  const [excelFileError, setExcelFileError] = useState(null);

  const handleCallBack = (data) => {
    setDescription(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading({ type: "add", status: true });

    const {
      data: { message },
    } = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs`, {
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
    });

    setLoading({ type: "add", status: false });

    if (message == "Success! Job Created") {
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

  return (
    <main className='bg-gray-50 mt-[10vh]'>
      {loading.type === "add" && loading.status === true ? <Loading /> : ""}
      <div className='space-y-6 max-w-6xl mx-auto py-8'>
        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='mb-5 md:col-span-1'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>Job Infomation</h3>
            <p className='mt-1 text-sm text-gray-500'>
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <div>
            <form className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6' method='POST'>
              <div className='sm:col-span-3'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Company Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='off'
                  className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>
              <div className='sm:col-span-3'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 '>
                  Website
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete='off'
                  className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>
              <div className='sm:col-span-6'>
                <label htmlFor='purpose' className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <Editor input={description} dataCallBack={handleCallBack} />
                <p className='mt-2 text-sm text-gray-500'>Few lines to describe the job role.</p>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
                  Logo
                </label>
                <div className='mt-1'>
                  <div className='sm:mt-0 sm:col-span-2'>
                    {loading.type === "logo" && loading.status ? (
                      <div className='animate-pulse'>
                        <input className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10'></input>
                      </div>
                    ) : (
                      <input
                        type='text'
                        value={logo}
                        disabled={true}
                        onChange={(e) => setLogo(e.target.value)}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                    )}
                    {loading.type === "logo" && loading.status ? (
                      <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed'>
                        <Loader size={8} color='gray' />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        label='Choose File'
                        type='file'
                        name='image'
                        id='profileImg'
                        onChange={(e) => uploadFileHandler(e, "logo")}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
                  Banner
                </label>
                <div className='mt-1'>
                  <div className='sm:mt-0 sm:col-span-2'>
                    {loading.type === "banner" && loading.status ? (
                      <div className='animate-pulse'>
                        <input className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10'></input>
                      </div>
                    ) : (
                      <input
                        type='text'
                        value={image}
                        disabled={true}
                        onChange={(e) => setImage(e.target.value)}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                    )}
                    {loading.type === "banner" && loading.status ? (
                      <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed'>
                        <Loader size={8} color='gray' />
                        Please Wait...
                      </div>
                    ) : (
                      <input
                        className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        label='Choose File'
                        type='file'
                        name='image'
                        id='profileImg'
                        onChange={(e) => uploadFileHandler(e, "banner")}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='startDate' className='block text-sm font-medium text-gray-700'>
                  Start Date
                </label>
                <div className='mt-1'>
                  <input
                    type='datetime-local'
                    name='startDate'
                    id='startDate'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                    className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='endDate' className='block text-sm font-medium text-gray-700'>
                  End Date
                </label>
                <div className='mt-1'>
                  <input
                    type='datetime-local'
                    name='endDate'
                    id='endDate'
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:col-span-6 relative -top-[22px]'>
                <DropDown
                  title={"Role"}
                  options={role}
                  selectedOption={selectedRole}
                  setSelectedOption={setSelectedRole}
                />
              </div>

              <div className='sm:col-span-6'>
                <div className='flex items-start justify-between'>
                  <div className='w-[49%]'>
                    <MultiInput
                      title='Designation'
                      handleExtraOptions={(extra) =>
                        setDesignation({ ...designation, roles: [...designation.roles, extra] })
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

                  <div className='w-[49%]'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Max Roles That can be applied
                    </label>
                    <input
                      type='number'
                      name='name'
                      id='name'
                      value={designation.max}
                      onChange={(e) =>
                        setDesignation({ ...designation, max: parseInt(e.target.value) })
                      }
                      autoComplete='off'
                      className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-6'>
                {selectedRole.name === "Internship" ? (
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='relative -top-[22px]'>
                      <DropDown
                        title={"Stipend Range"}
                        options={stipendRange}
                        selectedOption={selectedStipendRange}
                        setSelectedOption={setSelectedStipendRange}
                      />
                    </div>
                    <div className=''>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Exact Stipend
                      </label>
                      <input
                        type='number'
                        name='name'
                        id='name'
                        value={stipend}
                        onChange={(e) => setStipend(e.target.value)}
                        autoComplete='off'
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                ) : selectedRole.name === "Full Time" ? (
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='relative -top-[22px]'>
                      <DropDown
                        title={"CTC Range"}
                        options={ctcRange}
                        selectedOption={selectedCTCRange}
                        setSelectedOption={setSelectedCTCRange}
                      />
                    </div>
                    <div className=''>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Exact CTC
                      </label>
                      <input
                        type='number'
                        name='name'
                        id='name'
                        value={ctc}
                        onChange={(e) => setCtc(e.target.value)}
                        autoComplete='off'
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                ) : selectedRole.name === "Internship and Full Time" ? (
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='relative -top-[22px]'>
                        <DropDown
                          title={"Stipend Range"}
                          options={stipendRange}
                          selectedOption={selectedStipendRange}
                          setSelectedOption={setSelectedStipendRange}
                        />
                      </div>
                      <div className=''>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                          Exact Stipend
                        </label>
                        <input
                          type='number'
                          name='name'
                          id='name'
                          value={stipend}
                          onChange={(e) => setStipend(e.target.value)}
                          autoComplete='off'
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='relative -top-[22px]'>
                        <DropDown
                          title={"CTC Range"}
                          options={ctcRange}
                          selectedOption={selectedCTCRange}
                          setSelectedOption={setSelectedCTCRange}
                        />
                      </div>
                      <div className=''>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                          Exact CTC
                        </label>
                        <input
                          type='number'
                          name='name'
                          id='name'
                          value={ctc}
                          onChange={(e) => setCtc(e.target.value)}
                          autoComplete='off'
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className='sm:col-span-6 rounded border'>
                <h4 className='font-semibold text-sm bg-gray-100 px-2 py-3 flex'>
                  <p>{"Job Posting Location"}</p>
                  <div className='ml-3 flex items-center font-normal'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 mr-1 text-blue-600 border-gray-300 rounded outline-none'
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
              <div className='sm:col-span-6 rounded border'>
                <h4 className='font-semibold text-sm bg-gray-100 px-2 py-3 flex'>
                  <p>{"Year Of Passing"}</p>
                  <div className='ml-3 flex items-center font-normal'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 mr-1 text-blue-600 border-gray-300 rounded outline-none'
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
              <div className='sm:col-span-6 rounded border'>
                <h4 className='font-semibold text-sm bg-gray-100 px-2 py-3 flex'>
                  <p>{"Eligible Branches"}</p>
                  <div className='ml-3 flex items-center font-normal'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 mr-1 text-blue-600 border-gray-300 rounded outline-none'
                      checked={branchOptions.length === branches.length}
                      onChange={() => {
                        if (branchOptions.length === branches.length) setBranchOptions([]);
                        else setBranchOptions([...branches.map((x) => x.name)]);
                      }}
                    />
                    <label>All Branches</label>
                  </div>
                </h4>
                <CheckBox
                  title={"Eligible Branches"}
                  options={branches}
                  setCheckedOptions={setBranchOptions}
                  checkedOptions={branchOptions}
                />
              </div>

              <div className='sm:col-span-1 relative -top-[22px]'>
                <DropDown
                  title={"Xth Type Of Grade"}
                  options={typeOfGrade}
                  selectedOption={selectedXthTypeOfGrade}
                  setSelectedOption={setSelectedXthTypeOfGrade}
                />
              </div>
              {selectedXthTypeOfGrade.name !== "Not Applicable" && (
                <div className='sm:col-span-1 relative -top-[22px]'>
                  <DropDown
                    title={"Xth Grade"}
                    options={selectedXthTypeOfGrade.name === "CGPA" ? CGPAs : Percentages}
                    selectedOption={selectedXthGrade}
                    setSelectedOption={setSelectedXthGrade}
                  />
                </div>
              )}
              <div className='sm:col-span-1 relative -top-[22px]'>
                <DropDown
                  title={"XIIth Type Of Grade"}
                  options={typeOfGrade}
                  selectedOption={selectedXIIthTypeOfGrade}
                  setSelectedOption={setSelectedXIIthTypeOfGrade}
                />
              </div>
              {selectedXIIthTypeOfGrade.name !== "Not Applicable" && (
                <div className='sm:col-span-1 relative -top-[22px]'>
                  <DropDown
                    title={"XIIth Grade"}
                    options={selectedXIIthTypeOfGrade.name === "CGPA" ? CGPAs : Percentages}
                    selectedOption={selectedXIIthGrade}
                    setSelectedOption={setSelectedXIIthGrade}
                  />
                </div>
              )}
              <div className='sm:col-span-1 relative -top-[22px]'>
                <DropDown
                  title={"Btech Type Of Grade"}
                  options={typeOfGrade}
                  selectedOption={selectedBtechTypeOfGrade}
                  setSelectedOption={setSelectedBtechTypeOfGrade}
                />
              </div>
              {selectedBtechTypeOfGrade.name !== "Not Applicable" && (
                <div className='sm:col-span-1 relative -top-[22px]'>
                  <DropDown
                    title={"Btech Grade"}
                    options={selectedBtechTypeOfGrade.name === "CGPA" ? CGPAs : Percentages}
                    selectedOption={selectedBtechGrade}
                    setSelectedOption={setSelectedBtechGrade}
                  />
                </div>
              )}
              <div className='sm:col-span-3'>
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
                <div className='sm:col-span-3 relative -top-[22px]'>
                  <div className='flex flex-col mt-5'>
                    <div className='flex items-center justify-between'>
                      <p className='text-base font-medium text-gray-900'>Maximum salary ?</p>
                      <p className='text-sm font-light'>
                        {"₹" + Number(salary).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className='p-1 mt-1'>
                      <input
                        type='range'
                        min={0}
                        max={500000}
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
              )}

              <div className='sm:col-span-3 relative -top-[22px]'>
                <DropDown
                  title={"Status"}
                  options={status}
                  selectedOption={selectedStatus}
                  setSelectedOption={setSelectedStatus}
                />
              </div>

              <div className='sm:col-span-3'>
                <label className='text-base font-medium text-gray-900'>Type Of Job Posting</label>
                <p className='text-sm leading-5 text-gray-500'>
                  How would you like to show this job posting?
                </p>
                <fieldset className='mt-4'>
                  <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                    {typeOfPosting.map((option) => (
                      <div key={option.id} className='flex items-center'>
                        <input
                          id={option.id}
                          name='notification-method'
                          type='radio'
                          value={option.name}
                          defaultChecked={option.id === "shortlisted"}
                          onChange={(e) => setTypeOfPost(e.target.value)}
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
              {typeOfPost === "Shortlisted Students" && (
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
                    onChange={(e) => handleFile(e, setEligible, setExcelFileError)}
                  />
                  {excelFileError &&
                    toast.error(excelFileError, {
                      toastId: excelFileError,
                    })}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className='flex justify-end'>
          <Link href={`/dashboard/college/jobs`}>
            <button
              type='button'
              className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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
  if (user.category === "student") {
    return {
      redirect: {
        destination: "/dashbaord/student",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default JobAdd;
