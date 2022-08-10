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

const JobAdd = ({ user }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(status[0]);

  const handleCallBack = (data) => {
    setDescription(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(eligible);

    const {
      data: { message },
    } = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs`, {
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
      visible: visible,
    });

    if (message == "Success! Job Created") {
      toast.success(message, { toastId: message });
      router.push("/dashboard/college/jobs");
    } else {
      toast.error(message, { toastId: message });
    }
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
              <div className="sm:col-span-3 relative -top-[22px]">
                <DropDown
                  title={"Status"}
                  options={status}
                  selectedOption={selectedStatus}
                  setSelectedOption={setSelectedStatus}
                />
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
                  onClick={onSubmitHandler}
                  className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600`}
                >
                  Save
                </button>
              </div>
            </form>
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
