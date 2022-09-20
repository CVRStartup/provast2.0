import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function AssessmentCard({ assessment, user }) {
  const [ID, setID] = useState(0);
  const [statuses, setStatuses] = useState(null);

  useEffect(() => {
    (async () => {
      const {
        data: { assessmentStatuses },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments/status?assessmentId=${assessment._id}`
      );
      setStatuses(assessmentStatuses);
    })();
  }, []);

  const getFinishedCount = () => {
    if (!statuses) return "";

    let count = 0;
    statuses.forEach((status) => {
      if (status.finishedAt != null) ++count;
    });
    return count;
  };

  const getProgressCount = () => {
    if (!statuses) return "";

    let count = 0;
    statuses.forEach((status) => {
      if (status.finishedAt == null) ++count;
    });
    return count;
  };

  return (
    <div className="m-10 ">
      <Link href={`/dashboard/college/assessments/${assessment["_id"]}`}>
        <div className="rounded-lg shadow border hover:shadow-md p-3 group relative cursor-pointer">
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
          {user?.college.name!=='CORPORATE' &&  
            <div className="mb-2 text-sm text-green-500">
              <span>Allowed Batches : </span>
              <p className="flex flex-wrap">
                {assessment?.allowedBatches?.length > 0 ? (
                  assessment.allowedBatches.map((batch) => (
                    <p className="mr-1 inline mr-1" key={batch}>
                      {batch}
                    </p>
                  ))
                ) : (
                  <span>All</span>
                )}
              </p>{" "}
            </div> 
          }
          <hr />
          {statuses && (
            <div className="mt-2">
              <div>In Progress: {getProgressCount()}</div>
              <div>Completed: {getFinishedCount()}</div>
              <div>Total: {statuses.length}</div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
