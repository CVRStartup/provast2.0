import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { dateInPast } from "../../../lib/helper";
import { useRouter } from "next/router";
import { useModelContext } from "../../../context/ModalContext";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useUser } from "../../../lib/hooks";
import { Loading } from "../../Reusables/Loading";

export const JobHero = ({ job, setJob = "" }) => {
  const user = useUser();
  const { setIsOpen, setForm, setModalJob, loading, setLoading, setDeleteName } = useModelContext();
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!job) return;
    const res = job?.eligible?.filter((x) => {
      return x?.rollnumber === user?.rollNumber;
    })[0];
    setShowOptions(
      !user ||
        res?.status?.applied === null ||
        ((job.typeOfPost === "Off-Campus" || job.typeOfPost === "On-Campus") && !res?.status)
    );
    // setShowOptions(true);
  }, [job, user]);

  const getDesignations = (designations) => {
    var res = "",
      n = designations?.roles?.length;
    designations?.roles?.forEach(
      (d, index) => (res += (index == n - 1 && index > 0 ? " and " : ",") + d)
    );
    return res.substring(1);
  };

  const handleClick = async (op, roles) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setLoading(true);
    if (job.typeOfPost === "Shortlisted Students") {
      let newstatus = [];
      job.eligible.forEach((x) => {
        if (x && x.rollnumber === user?.rollNumber)
          newstatus.push({
            ...x,
            status: {
              applied: op === "Apply",
              roles: roles,
              updatedAt: new Date(),
            },
          });
      });
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs/status?id=${job._id}&roll=${user?.rollNumber}`,
        {
          newstatus: newstatus[0],
        }
      );
      setLoading(false);
      if (data.message == "Job Updated") {
        toast.success(op === "Apply" ? "Job Applied" : "Captured response", {
          toastId: "Job Updated",
        });
        router.reload();
      } else {
        toast.error(data.message, { toastId: data.message });
      }
    } else {
      let newstate = [...job.eligible];
      newstate.push({
        name: user?.profile?.firstName + " " + user?.profile?.lastName,
        branch: user?.branch?.code,
        rollnumber: user?.rollNumber,
        email: user?.email,
        phone: user?.contact?.phone?.toString(),
        status: {
          applied: op === "Apply",
          roles: roles,
          updatedAt: new Date(),
        },
      });

      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs`, {
        ...job,
        eligible: newstate,
      });

      setLoading(false);

      if (data.message == "Job Updated") {
        toast.success(op === "Apply" ? "Job Applied" : "Captured response", {
          toastId: "Job Updated",
        });
        router.reload();
      } else {
        toast.error(data.message, { toastId: data.message });
      }
    }
  };
  return (
    <div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
      {loading && <Loading />}
      <div className='flex items-center space-x-5'>
        <div className='flex-shrink-0'>
          {job.logo && (
            <div className='relative rounded-md h-28 w-52'>
              <Image
                className='rounded-md '
                placeholder='blur'
                blurDataURL={job.logo}
                layout='fill'
                objectFit='fill'
                src={job.logo}
                alt=''
              />
            </div>
          )}
        </div>
        <div>
          <h1 className='text-2xl uppercase tracking-wide font-bold text-gray-900'>
            {job?.company}{" "}
            {job.eligible.filter((x, index) => {
              // if (!x) console.log(x + index);
              return x?.rollnumber === user?.rollNumber;
            }).length > 0 && (
              <div className='text-lg font-bold text-gray-600 inline-flex items-center'>
                <span className='mr-1'>
                  {job?.eligible?.filter((x) => x?.rollnumber === user?.rollNumber)[0]?.status
                    ?.applied === false
                    ? "(Not Interested"
                    : job?.eligible?.filter((x) => x?.rollnumber === user?.rollNumber)[0]?.status
                        ?.applied === null
                    ? ""
                    : "(Applied"}
                </span>
                <span>
                  {job?.eligible?.filter((x) => x?.rollnumber === user?.rollNumber)[0]?.status
                    ?.applied === false ? (
                    <span className='flex items-center'>
                      <MdCancel size={28} color={"red"} /> )
                    </span>
                  ) : job?.eligible?.filter((x) => x?.rollnumber === user?.rollNumber)[0]?.status
                      ?.applied === null ? (
                    ""
                  ) : (
                    <span className='flex items-center'>
                      <FaCheckCircle size={15} color={"green"} /> )
                    </span>
                  )}
                </span>
              </div>
            )}
          </h1>

          <p className='text-sm font-medium text-gray-500'>
            Posted for <span className='text-gray-900'>{getDesignations(job?.designation)}</span> on{" "}
            <time dateTime='2020-08-25'>{moment(new Date(job?.createdAt)).format("LLLL")}</time>
          </p>

          <div className='inline-flex items-center my-2 px-2.5 py-1.5 border border-transparent text-xs font-semibold rounded text-orange-700 bg-orange-100 '>
            {job?.role}
          </div>
        </div>
      </div>
      <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
        {user?.category === "student" && showOptions && dateInPast(new Date(job.to)) && (
          <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
            <button
              onClick={() => {
                if (job?.designation?.roles?.length === 1)
                  handleClick("Apply", job?.designation?.roles);
                else {
                  setIsOpen(true);
                  setForm("ApplyJobForm");
                  setModalJob(job);
                }
              }}
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700`}
            >
              Apply Job
            </button>
            <button
              onClick={() => handleClick("Not Intrested", [])}
              className={` inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700`}
            >
              Not Interested
            </button>
          </div>
        )}
        {user?.category === "college" && (
          <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
            <Link href={`/dashboard/college/jobs/${job._id}/edit`}>
              <a
                className={`
             inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-400 hover:bg-yellow-500`}
              >
                Edit Job
              </a>
            </Link>
            <button
              onClick={() => {
                setIsOpen(true);
                setForm("deleteForm");
                setDeleteName(job);
              }}
              className={` inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700`}
            >
              Delete Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
