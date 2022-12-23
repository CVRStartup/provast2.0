import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Loading } from "../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../src/lib/auth";
import { genders } from "../../../src/lib/helper";
import { useUser } from "../../../src/lib/hooks";
import { findUser } from "../../../src/lib/user";
import { DropDown } from "../../../src/components/Reusables/Dropdown";
import { mutate } from "swr";

const typeOfCategory = [
  { id: "student", name: "student" },
  { id: "college", name: "college" },
];
const Details = ({ colleges, user }) => {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState({
    value: "",
    verified: false,
    frozen: false,
  });
  const [loading, setLoading] = useState(false);
  const [collegeSearchValue, setCollegeSearchValue] = useState("");
  const [collegeList, setCollegeList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [selectedGender, setSelectedGender] = useState(genders[0]);

  const [category, setCategory] = useState("student");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    image: user?.profile?.image,
    gender: selectedGender.name,
    dob: null,
    verified: false,
    frozen: false,
  });
  const [phone, setPhone] = useState({
    value: null,
    verified: false,
    frozen: false,
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
    verified: false,
    frozen: false,
  });
  const session = useUser();

  const [verified, setVerified] = useState(false);
  const [passphrase, setPassphrase] = useState("");

  const verifyPassphrase = async () => {
    const { data } = await axios.get(`/api/auth/user/verify`, {
      params: {
        pass: passphrase,
      },
    });
    setVerified(data?.verified);
    if (data?.college) {
      setCollege({ ...college, name: data?.college?.name, code: data?.college?.code });
      setCollegeSearchValue(data?.college?.name);
    } else {
      toast.error(data?.message, { toastId: data?.message });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/details?userId=${session?._id}`,
        {
          profile,
          phone,
          rollNumber,
          category,
          college,
          approved: !(category === "college"),
          detailsAvailable: true,
        }
      );

      try {
        const { data } = await axios.post(`/api/payment/${session?._id}`, {
          user: session?._id,
          amount: 0,
          plan: "free",
          modules: ["resumes", "assessments", "jobs", "learning", "testpatterns"],
        });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
      if (data.message === "Details Updated") {
        await mutate("/api/user");
        toast.success("User Details Created.", { toastId: "User Details Created." });
        if (category === "individual") {
          router.push("/dashboard/individual/resumes");
        } else router.push("/dashboard/student");
      }
    } catch (e) {
      toast.error(e.response.data.message, { toastId: e.response.data.message });
      setLoading(false);
    }
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
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='background'>
        {loading && <Loading />}
        <div className='min-h-screen flex flex-col justify-center items-center pb-4 sm:px-6 lg:px-8'>
          <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-2xl'>
            <div className='bg-white pt-1 pb-8 shadow-xl rounded-xl px-10'>
              <div className='my-6 flex justify-between items-center'>
                <div className=''>
                  <span className='text-xs font-semibold'>Signed In As : </span>
                  <span className='text-sm font-bold text-gray-600'>{session?.email}</span>
                </div>
                <button className='font-semibold text-orange-600 text-sm underline hover:text-orange-800'>
                  <a href='/api/auth/logout'>Logout</a>
                </button>
              </div>
              <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-2 text-center text-3xl font-bold text-gray-900'>
                  Fill in your details
                </h2>
              </div>
              <form onSubmit={submitHandler}>
                <fieldset className='mt-4'>
                  <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                    {typeOfCategory.map((option) => (
                      <div key={option.id} className='flex items-center'>
                        <input
                          id={option.id}
                          name='notification-method'
                          type='radio'
                          value={option.name}
                          defaultChecked={option.id === "student"}
                          onChange={(e) => setCategory(e.target.value)}
                          className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300'
                        />
                        <label
                          htmlFor={option.id}
                          className='ml-3 block text-sm font-medium capitalize text-gray-700'
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <React.Fragment>
                  {(category === "student" || category === "college") && (
                    <div className='col-span-6 sm:col-span-4 mt-4'>
                      <div className='flex'>
                        <label
                          htmlFor='paraphase'
                          className='block text-sm font-medium text-gray-700'
                        >
                          {category === "student" ? "" : "Create"} Paraphase
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>

                      <div className='flex items-center'>
                        <input
                          type='text'
                          name='rollnumber'
                          id='rollnumber'
                          autoComplete='roll-number'
                          required
                          value={category === "college" ? college.passphrase : passphrase}
                          onChange={(e) => {
                            if (category === "college")
                              setCollege({ ...college, passphrase: e.target.value });
                            if (category === "student") setPassphrase(e.target.value);
                          }}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                        {category === "student" && (
                          <div>
                            <button
                              type='button'
                              onClick={verifyPassphrase}
                              className='ml-3 mt-1 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                            >
                              Verify
                            </button>
                          </div>
                        )}
                      </div>
                      <p
                        className='mt-1 text-xs tracking-wide text-gray-500'
                        id='pharaphase-description'
                      >
                        {category === "college"
                          ? "Create a passphrase through which your students can associate with the college"
                          : "Enter a passphrase that associates with your college placement cell."}
                      </p>
                    </div>
                  )}

                  <div className='grid grid-cols-6 gap-6 mt-4'>
                    <div
                      className={`col-span-6 sm:col-span-${category === "individual" ? "3" : "2"} `}
                    >
                      <div className='flex'>
                        <label
                          htmlFor='firstName'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First Name
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        autoComplete='given-name'
                        disabled={category === "student" && !verified}
                        required
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div
                      className={`col-span-6 sm:col-span-${category === "individual" ? "3" : "2"} `}
                    >
                      <div className='flex'>
                        <label
                          htmlFor='lastName'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last name
                        </label>
                        <span className='ml-1 text-red-600 font-semibold'>*</span>
                      </div>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        autoComplete='family-name'
                        disabled={category === "student" && !verified}
                        required
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    {category === "individual" && (
                      <div className='col-span-6 sm:col-span-3'>
                        <div className='flex'>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Phone Number
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='tel'
                          name='phone'
                          id='phone'
                          autoComplete='tel'
                          required
                          pattern='[6789][0-9]{9}'
                          value={phone.value}
                          onChange={(e) => {
                            setPhone({ ...phone, value: e.target.value });
                          }}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    )}

                    <div
                      className={`col-span-6 sm:col-span-${
                        category === "individual" ? "3" : "2"
                      } relative -top-[23px]`}
                    >
                      <DropDown
                        isRequired
                        title='Gender'
                        options={genders}
                        selectedOption={selectedGender}
                        setSelectedOption={setSelectedGender}
                      />
                    </div>
                  </div>

                  {category === "student" && (
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='rollnumber'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Roll Number
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='text'
                          name='rollnumber'
                          id='rollnumber'
                          autoComplete='roll-number'
                          disabled={category === "student" && !verified}
                          required
                          value={rollNumber.value}
                          onChange={(e) => setRollNumber({ ...rollNumber, value: e.target.value })}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Phone Number
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='tel'
                          name='phone'
                          id='phone'
                          autoComplete='tel'
                          required
                          disabled={category === "student" && !verified}
                          pattern='[6789][0-9]{9}'
                          value={category === "college" ? college.placement.phone : phone.value}
                          onChange={(e) => {
                            setPhone({ ...phone, value: e.target.value });
                          }}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  )}

                  {category !== "individual" && colleges && (
                    <div className='relative'>
                      <div className='flex'>
                        <label className='mt-4 mb-2 block text-sm font-medium text-gray-700'>
                          College
                        </label>
                        <span className='relative top-4 ml-1 text-red-600 font-semibold'>*</span>
                      </div>
                      <div className='relative'>
                        <input
                          type='text'
                          required
                          value={collegeSearchValue}
                          disabled={category === "student"}
                          onChange={(e) => {
                            setDropDownState(false);
                            setCollegeSearchValue(e.target.value);
                          }}
                          className='w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                        />
                      </div>
                      {category === "college" && showDropDown && collegeList.length > 0 && (
                        <ul className='w-full absolute -bottom-1 left-0 translate-y-full overflow-y-scroll max-h-40 rounded border-1 border-gray-400 bg-white shadow-md'>
                          {collegeList.map((c) => (
                            <li
                              key={c._id}
                              className='px-2 py-3 hover:bg-orange-600 hover:text-white border-b-gray-50 cursor-pointer'
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

                  {category === "college" && (
                    <div className='grid grid-cols-6 gap-4'>
                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='designation'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Designation
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>
                        <input
                          type='text'
                          name='designation'
                          id='designation'
                          required
                          value={college.placement.designation}
                          onChange={(e) =>
                            setCollege({
                              ...college,
                              placement: { ...college.placement, designation: e.target.value },
                            })
                          }
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='website'
                            className='block text-sm font-medium text-gray-700'
                          >
                            College Website
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='text'
                          name='website'
                          id='website'
                          required
                          value={college.website}
                          onChange={(e) => setCollege({ ...college, website: e.target.value })}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Placement Email address
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='email'
                          name='email'
                          id='email'
                          autoComplete='email'
                          required
                          value={college.placement.email}
                          onChange={(e) => {
                            setCollege({
                              ...college,
                              placement: { ...college.placement, email: e.target.value },
                            });
                          }}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Placement Phone Number
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='tel'
                          name='phone'
                          id='phone'
                          autoComplete='tel'
                          required
                          disabled={category === "student" && !verified}
                          pattern='[6789][0-9]{9}'
                          value={category === "college" ? college.placement.phone : phone.value}
                          onChange={(e) => {
                            setCollege({
                              ...college,
                              placement: { ...college.placement, phone: e.target.value },
                            });
                          }}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  )}

                  {category === "college" && (
                    <div className='grid grid-cols-6 gap-4'>
                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Principal Email address
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='email'
                          name='email'
                          id='email'
                          autoComplete='email'
                          required
                          value={college.principal.email}
                          onChange={(e) => {
                            if (category === "college")
                              setCollege({
                                ...college,
                                principal: { ...college.principal, email: e.target.value },
                              });
                          }}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3 mt-4'>
                        <div className='flex'>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Principal Phone Number
                          </label>
                          <span className='ml-1 text-red-600 font-semibold'>*</span>
                        </div>

                        <input
                          type='tel'
                          name='phone'
                          id='phone'
                          autoComplete='tel'
                          required
                          pattern='[6789][0-9]{9}'
                          value={college.principal.phone}
                          onChange={(e) => {
                            if (category === "college")
                              setCollege({
                                ...college,
                                principal: { ...college.principal, phone: e.target.value },
                              });
                          }}
                          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  )}
                  <div className='mt-4'>
                    <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 '>
                      Submit
                    </button>
                  </div>
                </React.Fragment>
              </form>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async function ({ req, res }) {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
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
  if (user?.detailsAvailable) {
    if (user.category === "student")
      return {
        redirect: {
          destination: "/auth/user/academics",
          permanent: false,
        },
      };
    else
      return {
        redirect: {
          destination: "/dashboard/" + user?.category,
          permanent: false,
        },
      };
  }
  const {
    data: { colleges },
  } = await axios.get(`${process.env.HOST_URL}/api/college`);
  return {
    props: { colleges },
  };
};

export default Details;
