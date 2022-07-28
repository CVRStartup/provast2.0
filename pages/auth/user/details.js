import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { DropDown } from "../../../src/components/Reusables/Dropdown";
import { getLoginSession } from "../../../src/lib/auth";
import { branches, genders, rename } from "../../../src/lib/helper";
import { useUser } from "../../../src/lib/hooks";

const typeOfCategory = [
  { id: "individual", name: "individual" },
  { id: "student", name: "student" },
  { id: "college", name: "college" },
];

const Details = ({ colleges, user }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [collegeSearchValue, setCollegeSearchValue] = useState("");
  const [collegeList, setCollegeList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [selectedGender, setSelectedGender] = useState(genders[0]);

  const [category, setCategory] = useState("college");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    image: user?.profile?.image,
    gender: selectedGender.name,
    dob: null,
  });
  const [college, setCollege] = useState({
    name: "",
    code: "",
    passphrase: "",
    website: "",
    placement: {
      designation: "",
      email: "",
      phone: null,
    },
    principal: {
      email: "",
      phone: null,
    },
  });
  console.log(college);
  console.log(user);
  const session = useUser();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ profile, category, college, approved: !(category === "college") });
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/details?userId=${session?._id}`,
      { profile, category, college, approved: !(category === "college") }
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      collegeSearchHandler();
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [collegeSearchValue]);

  const collegeSearchHandler = async () => {
    if (collegeSearchValue === "") return;
    const {
      data: { colleges },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/college?search=${collegeSearchValue}`
    );
    setCollegeList(colleges);
    if (!dropDownState) setShowDropDown(true);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Provast | Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="background">
        <div className="min-h-screen flex flex-col justify-center items-center pb-4 sm:px-6 lg:px-8">
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="bg-white pt-1 pb-8 shadow-xl rounded-xl px-10">
              <div className="my-6 flex justify-between items-center">
                <div className="">
                  <span className="text-xs font-semibold">Signed In As : </span>
                  <span className="text-sm font-bold text-gray-600">{session?.email}</span>
                </div>
                <button className="font-semibold text-blue-600 text-sm underline hover:text-blue-800">
                  Logout
                </button>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                  Fill in your details
                </h2>
              </div>
              <form onSubmit={submitHandler}>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {typeOfCategory.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="notification-method"
                          type="radio"
                          value={option.name}
                          defaultChecked={option.id === "individual"}
                          onChange={(e) => setCategory(e.target.value)}
                          className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-3 block text-sm font-medium capitalize text-gray-700"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <React.Fragment>
                  <div className="col-span-6 sm:col-span-4 mt-4">
                    <div className="flex">
                      <label
                        htmlFor="paraphase"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {category === "student" ? "" : "Create"} Paraphase
                      </label>
                      <span className="ml-1 text-red-600 font-semibold">*</span>
                    </div>

                    <input
                      type="text"
                      name="rollnumber"
                      id="rollnumber"
                      autoComplete="roll-number"
                      required
                      value={college.passphrase}
                      onChange={(e) => {
                        if (category === "college")
                          setCollege({ ...college, passphrase: e.target.value });
                      }}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <p
                      className="mt-1 text-xs tracking-wide text-gray-500"
                      id="pharaphase-description"
                    >
                      {category === "college"
                        ? "Create a passphrase through which your students can associate with the college"
                        : "Enter a passphrase that associates with your college placement cell."}
                    </p>
                  </div>

                  <div className="grid grid-cols-6 gap-6 mt-4">
                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <span className="ml-1 text-red-600 font-semibold">*</span>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        required
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <span className="ml-1 text-red-600 font-semibold">*</span>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        required
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <DropDown
                      isRequired
                      title={"Gender"}
                      options={genders}
                      selectedOption={selectedGender}
                      setSelectedOption={setSelectedGender}
                    />
                  </div>

                  {category === "college" && (
                    <>
                      <div className="col-span-6 sm:col-span-4 mt-4">
                        <div className="flex">
                          <label
                            htmlFor="designation"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Designation
                          </label>
                          <span className="ml-1 text-red-600 font-semibold">*</span>
                        </div>
                        <input
                          type="text"
                          name="designation"
                          id="designation"
                          required
                          value={college.placement.designation}
                          onChange={(e) =>
                            setCollege({
                              ...college,
                              placement: { ...college.placement, designation: e.target.value },
                            })
                          }
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}

                  {category === "student" && (
                    <div className="col-span-6 sm:col-span-4 mt-4">
                      <div className="flex">
                        <label
                          htmlFor="rollnumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Roll Number
                        </label>
                        <span className="ml-1 text-red-600 font-semibold">*</span>
                      </div>

                      <input
                        type="text"
                        name="rollnumber"
                        id="rollnumber"
                        autoComplete="roll-number"
                        required
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  )}

                  {colleges && (
                    <div className="relative">
                      <div className="flex">
                        <label className="mt-4 mb-2 block text-sm font-medium text-gray-700">
                          College
                        </label>
                        <span className="relative top-4 ml-1 text-red-600 font-semibold">*</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={collegeSearchValue}
                          onChange={(e) => {
                            setDropDownState(false);
                            setCollegeSearchValue(e.target.value);
                          }}
                          className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                      {showDropDown && collegeList.length > 0 && (
                        <ul className="w-full absolute -bottom-1 left-0 translate-y-full overflow-y-scroll max-h-40 rounded border-1 border-gray-400 bg-white shadow-md">
                          {collegeList.map((c) => (
                            <li
                              key={c._id}
                              className="px-2 py-3 hover:bg-orange-600 hover:text-white border-b-gray-50 cursor-pointer"
                              onClick={() => {
                                setCollegeSearchValue(c.collegeName);
                                setShowDropDown(false);
                                setDropDownState(true);
                                setCollege({ ...college, name: c.collegeName, code: c._id });
                              }}
                            >
                              {c.collegeName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="col-span-6 sm:col-span-4 mt-4">
                    <div className="flex">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        {category === "student" && category === "individual"
                          ? "Email address"
                          : "Placement Email address"}
                      </label>
                      <span className="ml-1 text-red-600 font-semibold">*</span>
                    </div>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      value={college.placement.email}
                      onChange={(e) => {
                        if (category === "college")
                          setCollege({
                            ...college,
                            placement: { ...college.placement, email: e.target.value },
                          });
                      }}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4 mt-4">
                    <div className="flex">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        {category === "student" && category === "individual"
                          ? "Phone Number"
                          : "Placement Phone Number"}
                      </label>
                      <span className="ml-1 text-red-600 font-semibold">*</span>
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      required
                      pattern="[6789][0-9]{9}"
                      value={college.placement.phone}
                      onChange={(e) => {
                        if (category === "college")
                          setCollege({
                            ...college,
                            placement: { ...college.placement, phone: e.target.value },
                          });
                      }}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {category === "college" && (
                    <>
                      <div className="col-span-6 sm:col-span-4 mt-4">
                        <div className="flex">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Principal Email address
                          </label>
                          <span className="ml-1 text-red-600 font-semibold">*</span>
                        </div>

                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          required
                          value={college.principal.email}
                          onChange={(e) => {
                            if (category === "college")
                              setCollege({
                                ...college,
                                principal: { ...college.principal, email: e.target.value },
                              });
                          }}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4 mt-4">
                        <div className="flex">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Principal Phone Number
                          </label>
                          <span className="ml-1 text-red-600 font-semibold">*</span>
                        </div>

                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          required
                          pattern="[6789][0-9]{9}"
                          value={college.principal.phone}
                          onChange={(e) => {
                            if (category === "college")
                              setCollege({
                                ...college,
                                principal: { ...college.principal, phone: e.target.value },
                              });
                          }}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4 mt-4">
                        <div className="flex">
                          <label
                            htmlFor="website"
                            className="block text-sm font-medium text-gray-700"
                          >
                            College Website
                          </label>
                          <span className="ml-1 text-red-600 font-semibold">*</span>
                        </div>

                        <input
                          type="text"
                          name="website"
                          id="website"
                          required
                          value={college.website}
                          onChange={(e) => setCollege({ ...college, website: e.target.value })}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                  <div className="mt-4">
                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ">
                      Submit
                    </button>
                  </div>
                </React.Fragment>
              </form>
            </div>
          </div>
        </div>

        <style jsx>{`
          .background {
            background-image: url("https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.home_page_bg_desktop.png-26-4770753d59b970e1.png");
            width: 100%;
            position: absolute;
            min-height: 100%;
            box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px inset;
            transition-property: background-image;
            transition-duration: 180ms;
            transition-timing-function: ease-in-out;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}</style>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async function ({ req, res }) {
  const session = await getLoginSession(req);
  const user = session?._doc;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (user?.details?.available) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const {
    data: { colleges },
  } = await axios.get(`${process.env.HOST_URL}/api/college`);
  return {
    props: { colleges, user },
  };
};

export default Details;
