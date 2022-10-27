import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useUser } from "../../../lib/hooks";
import { btechBranches } from "../../../lib/helper.js";
export const AssessmentCard = ({ assessment, studentDetails, rollNumber }) => {
  const [ID, setID] = useState(0);
  const [status, setStatus] = useState(null);

  const user = useUser();

  let isDisabledForBatches = !assessment.allowedBatches.includes(
    studentDetails?.batch?.to
  );

  let isShortListed = false;

  let isDisabledForBranches = false;

  // change later the logic for a student if he doesn't have a branch
  let allowedBranches = btechBranches.map((bBranch) => {
    if (assessment.allowedBranches.includes(bBranch.code)) return bBranch.name;
  });

  if (!allowedBranches.includes(studentDetails?.branch))
    isDisabledForBranches = true;

  if (assessment.allowedBranches.length === 0) isDisabledForBranches = false;

  assessment?.shortlistedStudents?.forEach((roll) => {
    if (roll === rollNumber) isShortListed = true;
  });

  if (assessment?.shortlistedStudents?.length === 0) isShortListed = true;

  let isDisabled =
    isDisabledForBatches || isDisabledForBranches || !isShortListed;

  if(user?.college?.name === 'CORPORATE') isDisabled = false;

  if(user?.college?.name === 'CVR College of Engineering') isDisabled = false;

  if(assessment?.mode==='Test' && status?.finishedAt) isDisabled = true;

  useEffect(() => {
    (async () => {
      const {
        data: { assessmentStatus },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments/status/${assessment._id}?userId=${user?._id}&assessmentId=${assessment._id}`
      );

      setStatus(assessmentStatus);
    })();
  }, []);

  const getTimeTaken = () => {
    const getStartTime = (start, end) => {
      let seconds = end.diff(start, "seconds");
      let days = Math.floor(seconds / (24 * 60 * 60));
      seconds = seconds - days * 60 * 60 * 24;

      let hours = Math.floor(seconds / (60 * 60));
      seconds = seconds - hours * 60 * 60;

      let minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;

      return {
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days,
      };
    };
    if (status && status.finishedAt) {
      let timeObj = getStartTime(
        moment(status.openedAt),
        moment(status.finishedAt)
      );

      let tempTime = "";
      if (timeObj.days > 0) tempTime += timeObj.days + "d ";
      if (timeObj.hours > 0) tempTime += timeObj.hours + "h ";
      if (timeObj.minutes > 0) tempTime += timeObj.minutes + "m ";
      if (timeObj.seconds > 0) tempTime += timeObj.seconds + "s ";

      return tempTime;
    }
  };

  let assessmentSize = assessment.sections
    .map((section) => section.questions.length)
    .reduce((a, b) => a + b, 0);

  const assessmentCardContent = (
    <div className="rounded-lg shadow border hover:shadow-md p-3 group relative">
      <div className="text-gray-900 text-xl font-semibold mb-2">
        {assessment.name}
      </div>
      <div
        className={
          (assessment.mode === "Practice"
            ? "text-yellow-600"
            : " text-red-500") + " text-sm my-2"
        }
      >
        {assessment.mode}
      </div>
      {user?.college?.name!=='CVR College of Engineering' && 
        <div className="mb-2 text-sm text-green-500 w-fit">
          <span>Allowed Batches : </span>
          <span>
            {assessment?.allowedBatches?.length > 0 ? (
              assessment.allowedBatches.map((batch) => (
                <span className="mr-1" key={batch}>
                  {batch}
                </span>
              ))
            ) : (
              <span>All</span>
            )}
          </span>{" "}
        </div> 
      }
      {user?.college?.name!=='CORPORATE' && 
        <div className="mb-2 text-sm text-green-500 ">
          <span>Allowed Branches : </span>
          <span className="grid grid-cols-3">
            {assessment?.allowedBranches &&
            assessment?.allowedBranches?.length != btechBranches.length ? (
              assessment.allowedBranches.map((branch) => (
                <span className="mr-1" key={branch}>
                  {branch}
                </span>
              ))
            ) : (
              <span>All</span>
            )}
          </span>{" "}
        </div> 
      }
      
      {isShortListed ? (
        <div className="mb-2 text-sm text-green-500">
          You are Short-Listed for this test
        </div>
      ) : (
        <div className="mb-2 text-sm text-red-500">
          You are not Short-Listed for this test
        </div>
      )}
      <hr className="max-w-full	" />
      {status ? (
        <div>
          {status.finishedAt ? (
            <div className="text-green-600 mt-1">Completed</div>
          ) : (
            <div>
              <div className="text-yellow-600 flex justify-start mt-1 gap-1 items-center">
                <AiOutlineClockCircle />
                In progess
              </div>
              <div>
                Attempted:{" " + status.responses.length}/{assessmentSize}{" "}
              </div>
            </div>
          )}
          <div>{status.finishedAt && `Time Taken: ${getTimeTaken()}`}</div>
          <div>
            {status?.finishedAt && assessment?.mode!=='Test'
              ? `Score: ${status.marks.scored}/${status.marks.total}`
              : ""}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-red-600 mt-2">New</div>
          <div> Total questions: {assessmentSize}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="my-5">
      {isDisabled ? (
        <div className="cursor-not-allowed">{assessmentCardContent}</div>
      ) : (
        <Link href={`/dashboard/student/assessments/${assessment["_id"]}`}>
          <div className="cursor-pointer">{assessmentCardContent}</div>
        </Link>
      )}
    </div>
  );
};
