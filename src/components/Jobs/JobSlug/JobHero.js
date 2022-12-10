import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { handleJobResponse } from "../../../lib/helper";
import { useModelContext } from "../../../context/ModalContext";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useUser } from "../../../lib/hooks";
import { Loading } from "../../Reusables/Loading";
import { useSingleAcademic } from "../../../hooks/useSingleAcademic";

export const JobHero = ({ job }) => {
  const user = useUser();
  const { setIsOpen, setForm, setModalJob, loading, setLoading, setDeleteName, setPersonal, setEducation } = useModelContext();
  const { oldAcademic } = useSingleAcademic("null", user?.rollNumber?.value);
  console.log(oldAcademic)
  const [showOptions, setShowOptions] = useState(-1);
  // -1 -> not eligible
  // 0  -> not yet applied
  // 1  -> applied
  // 2  -> not interested

  const compare = (criteriaName, v2) => {
    if (v2 === 0) return true;
    const criteria = [];
    if (criteriaName === "UG") {
      if (oldAcademic.education.length >= 4) {
        criteria = [oldAcademic.education[1]];
      }
    } else criteria = oldAcademic.education.filter((x) => x.program === criteriaName);
    if (criteria.length === 0) return false;
    const v1 = criteria[0].score.grade;
    if (v1 <= 10) v1 *= 9.5;
    if (v2 <= 10) v2 *= 9.5;
    return v1 >= v2;
  };

  useEffect(() => {
    if (!job || !oldAcademic) return;
    const res = job?.eligible?.filter((x) => {
      return x?.email === user?.email;
    })[0];
    if (
      !user ||
      job.typeOfPost === "Off-Campus" ||
      job.typeOfPost === "On-Campus" ||
      job.typeOfPost === "Criteria"
    ) {
      if (res) {
        setShowOptions(res.status?.applied ? 1 : 2);
      } else {
        if (job.typeOfPost === "Criteria") {
          const eligible =
            compare("Class Xth", job.eligibility.tenth.grade) &&
            compare("Class XIIth", job.eligibility.inter.grade) &&
            compare("UG", job.eligibility.undergraduate.grade) &&
            compare("MBA", job.eligibility.postgraduate.grade) &&
            job?.jobPostingCampus?.includes(user.college.campus) &&
            job?.branchOptions?.includes(user?.college?.specialisation?.trim());
          setShowOptions(eligible ? 0 : -1);
        } else setShowOptions(0);
      }
    } else {
      if (res) {
        if (res.status && res.status.applied == null) setShowOptions(0);
        else if (res.status && res.status.applied != null)
          setShowOptions(res.status?.applied ? 1 : 2);
      } else setShowOptions(-1);
    }
  }, [job, user, oldAcademic]);

  const getDesignations = (designations) => {
    var res = "",
      n = designations?.roles?.length;
    designations?.roles?.forEach(
      (d, index) => (res += (index == n - 1 && index > 0 ? " and " : ",") + d)
    );
    return res.substring(1);
  };

  const checkUserResult = () => {
    let email = user?.email;
    let completedRounds = job?.rounds?.filter(
      (round) => round.status === "Partially completed" || round.status === "Completed"
    );
    if (completedRounds.length === 0) return false;
    let flag = completedRounds[completedRounds.length - 1].result.some((res) => {
      if (res.email === email && res.status === "Selected") {
        return true;
      }
    });
    if (flag) return true;
    if (completedRounds[completedRounds.length - 1].status === "Partially completed") {
      if (completedRounds.length === 1) return null;
      else {
        completedRounds[completedRounds.length - 2].result.some((res) => {
          if (res.email === email && res.status === "Selected") {
            return true;
          }
        });
        return null;
      }
    }
    return false;
  };

  const getLastCompletedRoundIndex = () => {
    let completedRounds = job?.rounds?.filter((round) => round.result && round.result.length > 0);
    return completedRounds.length + 1;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      {loading && <Loading />}
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          {job.logo && (
            <div className="relative rounded-md h-28 w-52">
              <Image
                className="rounded-md "
                placeholder="blur"
                blurDataURL={job.logo}
                layout="fill"
                objectFit="contain"
                src={job.logo}
                alt=""
              />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl uppercase tracking-wide font-bold text-gray-900">
            {job?.company}{" "}
            {job.eligible.filter((x, index) => {
              // if (!x) console.log(x + index);
              return x?.email === user?.email;
            }).length > 0 && (
              <div className="text-lg font-bold text-gray-600 inline-flex items-center">
                <span className="mr-1">
                  {job?.rounds?.filter(
                    (round) =>
                      round.status === "Partially completed" || round.status === "Completed"
                  ).length > 0
                    ? checkUserResult() === null
                      ? "(The Result is pending)"
                      : checkUserResult()
                      ? "(Selected" +
                        (getLastCompletedRoundIndex() - 1 < job?.rounds?.length
                          ? " for Round " + getLastCompletedRoundIndex()
                          : "")
                      : "(Not selected for further rounds"
                    : job?.eligible?.filter((x) => x?.email === user?.email)[0]?.status?.applied ===
                      false
                    ? "(Not Interested"
                    : job?.eligible?.filter((x) => x?.email === user?.email)[0]?.status?.applied ===
                      null
                    ? ""
                    : "(Applied"}
                </span>
                <span>
                  {job?.rounds?.filter(
                    (round) =>
                      round.status === "Partially completed" || round.status === "Completed"
                  ).length > 0 ? (
                    checkUserResult(job?.email) === null ? (
                      ""
                    ) : checkUserResult(job?.email) ? (
                      <span className="flex items-center">
                        <FaCheckCircle size={15} color={"green"} /> )
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <MdCancel size={28} color={"red"} /> )
                      </span>
                    )
                  ) : job?.eligible?.filter((x) => x?.email === user?.email)[0]?.status?.applied ===
                    false ? (
                    <span className="flex items-center">
                      <MdCancel size={28} color={"red"} /> )
                    </span>
                  ) : job?.eligible?.filter((x) => x?.email === user?.email)[0]?.status?.applied ===
                    null ? (
                    ""
                  ) : (
                    <span className="flex items-center">
                      <FaCheckCircle size={15} color={"green"} /> )
                    </span>
                  )}
                </span>
              </div>
            )}
          </h1>

          <p className="text-sm font-medium text-gray-500">
            Posted for <span className="text-gray-900">{getDesignations(job?.designation)}</span> on{" "}
            <time dateTime="2020-08-25">{moment(new Date(job?.createdAt)).format("LLLL")}</time>
          </p>

          <div className="inline-flex items-center my-2 px-2.5 py-1.5 border border-transparent text-xs font-semibold rounded text-orange-700 bg-orange-100 ">
            {job?.role}
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        {user?.category === "student" &&
          user?.placed === job?.allowPlaced &&
          showOptions != -1 &&
          new Date(Date.now()) < new Date(job?.to?.substring(0, 16)) && (
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <div className="flex flex-col md:flex-row">
                {showOptions != 1 && (
                  <button
                    onClick={async () => {
                      setLoading(true);
                      setIsOpen(true);
                      setForm("questionnareForm");
                      setModalJob(job);
                      setPersonal({
                        DOB: user.profile.dob,
                        Gender: user.profile.gender,
                        Contact: user.phone.value,
                      });
                      if (oldAcademic?.education)
                        setEducation({
                          XthMarks: oldAcademic.education[3]?.score?.grade,
                          XIIthMarks: oldAcademic.education[2]?.score?.grade,
                          UGMarks: oldAcademic.education[1]?.score?.grade,
                          UGProgram: oldAcademic.education[1].program,
                          UGSpecialization: oldAcademic.education[1].branch,
                          PGMarks: oldAcademic.education[0]?.score?.grade,
                          PGProgram: oldAcademic.education[0].program,
                          PGSpecialization: oldAcademic.education[0].branch,
                        });
                      setLoading(false);
                    }}
                    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700`}
                  >
                    Apply Job
                  </button>
                )}
                {showOptions != 2 && (
                  <button
                    onClick={() => handleJobResponse(job, user, "Not Interested", [], [], null)}
                    className={`md:ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700`}
                  >
                    Not Interested
                  </button>
                )}
                {showOptions != 0 && (
                  <span className="text-sm font-semibold text-gray-500">Changed your mind?</span>
                )}
              </div>
            </div>
          )}
        {user?.category === "college" && (
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
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
