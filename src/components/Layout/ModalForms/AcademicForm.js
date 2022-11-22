import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useModelContext } from "../../../context/ModalContext";
import {
  academicDegrees,
  btechBranches,
  degreeBranches,
  degrees,
  mbaBranches,
  mbaSrmBranches,
  typeOfEducation,
  typeOfEducationGrade,
} from "../../../lib/helper";
import { useUser } from "../../../lib/hooks";
import { DropDown } from "../../Reusables/Dropdown";
import { mutate } from "swr";
import axios from "axios";

const getOption = (options, selected) => {
  if (!selected) return options[0];
  const option = options.find((x) => x.name === selected);
  return option ?? options[0];
};

export const AcademicForm = () => {
  const session = useUser();
  const { closeModal, editId, isEdit, education, editRollNumber } = useModelContext();
  const [loading, setLoading] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState(academicDegrees[0]);
  const [selectedBranch, setSelectedBranch] = useState(btechBranches[0]);
  const [selectedTypeOfEducation, setSelectedTypeOfEducation] = useState(typeOfEducation[0]);
  const [selectedTypeOfEducationGrade, setSelectedTypeOfEducationGrade] = useState(
    typeOfEducationGrade[0]
  );

  useEffect(() => {
    setSelectedBranch(
      selectedDegree.name == "MBA"
        ? mbaBranches[0]
        : selectedDegree.name == "B.Tech"
        ? btechBranches[0]
        : selectedDegree.name == "Degree"
        ? degreeBranches[0]
        : btechBranches[0]
    );
  }, [selectedDegree]);

  const [academics, setAcademics] = useState({
    institution: "",
    board: "",
    program: selectedDegree.name,
    branch: selectedBranch.name,
    educationType: selectedTypeOfEducation.name,
    score: {
      typeOfGrade: selectedTypeOfEducationGrade.name,
      grade: 0,
    },
    batch: {
      from: 0,
      to: 0,
    },
    current: false,
    verified: false,
    frozen: false,
  });

  useEffect(() => {
    setAcademics({
      ...academics,
      program: selectedDegree.name,
      branch:
        selectedDegree.name !== "Class Xth" && selectedDegree.name !== "Class XIIth"
          ? selectedBranch.name
          : "",
      educationType: selectedTypeOfEducation.name,
      score: {
        ...academics.score,
        typeOfGrade: selectedTypeOfEducationGrade.name,
      },
    });
  }, [selectedDegree, selectedBranch, selectedTypeOfEducation, selectedTypeOfEducationGrade]);

  useEffect(() => {
    if (isEdit) {
      setSelectedDegree(getOption(academicDegrees, education.program));
      setSelectedBranch(getOption(btechBranches, education.branch));
      setSelectedTypeOfEducation(getOption(typeOfEducation, education.educationType));
      setSelectedTypeOfEducationGrade(getOption(typeOfEducationGrade, education.score.typeOfGrade));
      setAcademics(education);
    }
  }, [isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`/api/auth/user/academics?rollNumber=${editRollNumber}`, {
        academics: {
          ...academics,
          frozen: session.category === "college",
        },
      });
    } else {
      await axios.post(`/api/auth/user/academics`, {
        rollNumber: editRollNumber,
        education: {
          ...academics,
          frozen: session.category === "college",
        },
      });
    }
    await mutate(`/api/auth/user/academics?rollNumber=${editRollNumber}`);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white">
          {isEdit ? "Edit " : "Add "}Education
        </Dialog.Title>
      </div>
      <div className="mt-5 w-full">
        <React.Fragment>
          <div className="col-span-6 sm:col-span-6 mt-2">
            <div className="flex">
              <label htmlFor="school" className="block text-sm font-medium text-white">
                School / Institution
              </label>
              <span className="ml-1 text-red-600 font-semibold">*</span>
            </div>
            <input
              type="text"
              name="school"
              id="school"
              value={academics.institution}
              onChange={(e) =>
                setAcademics({
                  ...academics,
                  institution: e.target.value,
                })
              }
              required
              className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div
              className={`col-span-6 ${
                !(selectedDegree.name === "Class Xth" || selectedDegree.name === "Class XIIth")
                  ? "sm:col-span-3"
                  : "col-span-6"
              }`}
            >
              <DropDown
                title={"Program / Degree"}
                isRequired
                isDark
                options={academicDegrees}
                selectedOption={selectedDegree}
                setSelectedOption={setSelectedDegree}
              />
            </div>
            {!(selectedDegree.name === "Class Xth" || selectedDegree.name === "Class XIIth") && (
              <div className="col-span-6 sm:col-span-3">
                <DropDown
                  title={"Branch / Specialization"}
                  isRequired
                  isDark
                  options={
                    selectedDegree.name == "MBA"
                      ? mbaBranches
                      : selectedDegree.name == "B.Tech"
                      ? btechBranches
                      : selectedDegree.name == "Degree"
                      ? degreeBranches
                      : btechBranches
                  }
                  selectedOption={selectedBranch}
                  setSelectedOption={setSelectedBranch}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-6 gap-4 mt-10">
            <div className="col-span-6 sm:col-span-3">
              <div className="flex">
                <label htmlFor="board" className="block text-sm font-medium text-white">
                  Board / University
                </label>
                <span className="ml-1 text-red-600 font-semibold">*</span>
              </div>
              <input
                type="text"
                name="board"
                id="board"
                required
                value={academics.board}
                onChange={(e) => setAcademics({ ...academics, board: e.target.value })}
                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3 relative -top-[23px]">
              <DropDown
                title={"Education Type"}
                isRequired
                isDark
                options={typeOfEducation}
                selectedOption={selectedTypeOfEducation}
                setSelectedOption={setSelectedTypeOfEducation}
              />
            </div>
          </div>

          <div className="flex mt-4">
            <label htmlFor="score" className="block text-sm font-medium text-white">
              Score
            </label>
            <span className="ml-1 text-red-600 font-semibold">*</span>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 sm:col-span-3 ">
              <input
                type="text"
                name="score"
                id="score"
                required
                value={academics.score.grade}
                onChange={(e) =>
                  setAcademics({
                    ...academics,
                    score: {
                      ...academics.score,
                      grade: e.target.value,
                    },
                  })
                }
                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3 relative -top-[45px]">
              <DropDown
                title={"Grade"}
                isRequired
                isDark
                options={typeOfEducationGrade}
                selectedOption={selectedTypeOfEducationGrade}
                setSelectedOption={setSelectedTypeOfEducationGrade}
              />
            </div>
          </div>

          <div className="flex">
            <label htmlFor="duration" className="block text-sm font-medium text-white">
              From
            </label>
            <span className="ml-1 text-red-600 font-semibold">*</span>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <input
                type="number"
                name="duration"
                placeholder="YYYY"
                min="2001"
                max="2100"
                id="duration"
                value={academics?.batch?.from}
                onChange={(e) =>
                  setAcademics({
                    ...academics,
                    batch: { ...academics.batch, from: parseInt(e.target.value) },
                  })
                }
                required
                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <input
                type="number"
                placeholder="YYYY"
                min="2001"
                max="2100"
                name="duration"
                id="duration"
                value={academics?.batch?.to}
                onChange={(e) =>
                  setAcademics({
                    ...academics,
                    batch: { ...academics.batch, to: parseInt(e.target.value) },
                  })
                }
                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </React.Fragment>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {session.category === "college" ? "Freeze" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};
