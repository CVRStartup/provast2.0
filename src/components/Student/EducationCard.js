import React from "react";
import { useModelContext } from "../../context/ModalContext";
import { AiFillEdit } from "react-icons/ai";

export const EducationCard = ({ education, rollnumber, category }) => {
  const { setIsOpen, setForm, setEditId, setIsEdit, setEducation, setEditRollNumber } =
    useModelContext();
  return (
    <div className="relative my-4 px-4 border-l-2 border-gray-200">
      <div className="flex justify-between">
        <div>
          <div className="flex">
            <h3 className="text-2xl text-gray-500 font-semibold">{education?.program}</h3>
            {category === "college" && (
              <button
                className="ml-2 text-orange-500 hover:text-orange-600"
                onClick={() => {
                  setIsOpen(true);
                  setForm("academic");
                  setEditId(education?._id);
                  setIsEdit(true);
                  setEditRollNumber(rollnumber);
                  setEducation(education);
                }}
              >
                <AiFillEdit size={17} />
              </button>
            )}
          </div>
          <div className="text-sm">
            {education?.board && <span>Board: {education?.board},</span>}
            <span>Type: {education?.educationType}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-500">{education?.score?.grade}</h3>
          <p className="text-md text-orange-500">{education?.score?.typeOfGrade}</p>
        </div>
      </div>

      <h3 className="flex items-center mt-4 text-sm text-gray-400 font-semibold">
        <span>{education?.institution} </span>
        {education?.batch && (
          <span className="ml-1 text-xs">
            &middot; ({education?.batch?.from !== 0 && <span>{education?.batch?.from}</span>}
            {education?.batch?.to !== 0 && (
              <span>
                {education?.batch?.from && education?.batch?.to ? " - " : ""}
                {education?.batch?.to}
              </span>
            )}
            )
          </span>
        )}
      </h3>

      {education.branch && (
        <div className="italic">
          <h3>{education.branch}</h3>
        </div>
      )}

      <div className={`absolute right-2 bottom-2 flex`}>
        {education.verified && (
          <button
            type="button"
            className={`text-green-700 bg-green-100 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded mr-1`}
          >
            Verified
          </button>
        )}
        {education.frozen && (
          <button
            type="button"
            className={`ml-1 text-green-700 bg-green-100 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded`}
          >
            Frozen
          </button>
        )}
      </div>
    </div>
  );
};
