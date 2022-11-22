import React from "react";
import { useAcademic } from "../../hooks/useCurrentAcademic";
import { EducationCard } from "./EducationCard";
import { useModelContext } from "../../context/ModalContext";
import { useUser } from "../../lib/hooks";

export const StudentAcademicDetails = ({ student }) => {
  const user = useUser();
  const { setIsOpen, setForm } = useModelContext();
  const { academics } = useAcademic(student?.rollNumber?.value);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="my-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mb-10">
        <div className="flex items-center justify-between border-b-2 border-gray-100">
          <h1 className="text-sm text-gray-600 ">Current / Ongoing Course</h1>
        </div>
        {academics?.education
          ?.filter((x) => x.current)
          .map((option) => (
            <EducationCard
              education={option}
              rollnumber={student?.rollNumber?.value}
              category={user?.category}
            />
          ))}
      </div>
      <div>
        <div className="flex items-center justify-between border-b-2 border-gray-100">
          <h1 className="text-sm text-gray-600 ">Previous Course</h1>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setForm("academic");
            }}
            className={`text-orange-700 hover:bg-orange-200 bg-orange-100 mb-1 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded`}
          >
            Add Course
          </button>
        </div>
        {academics?.education?.filter((x) => !x.current).length > 0 ? (
          academics?.education
            ?.filter((x) => !x.current)
            .map((option, index) => (
              <EducationCard
                key={index}
                education={option}
                rollnumber={student?.rollNumber?.value}
                category={user?.category}
              />
            ))
        ) : (
          <div className="py-2 text-sm text-gray-400">No Previous Courses Available</div>
        )}
      </div>
    </div>
  );
};
