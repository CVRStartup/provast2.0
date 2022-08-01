import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useModelContext } from "../../../context/ModalContext";
import { btechBranches, degrees, typeOfEducation, typeOfEducationGrade } from "../../../lib/helper";
import { useUser } from "../../../lib/hooks";
import { DropDown } from "../../Reusables/Dropdown";
import { mutate } from "swr";
import axios from "axios";
import { toast } from "react-toastify";

export const AcademicForm = () => {
  const session = useUser();
  console.log(session);
  const [loading, setLoading] = useState(false);

  const [selectedDegree, setSelectedDegree] = useState(degrees[0]);
  const [selectedBranch, setSelectedBranch] = useState(btechBranches[0]);
  const [selectedTypeOfEducation, setSelectedTypeOfEducation] = useState(typeOfEducation[0]);
  const [selectedTypeOfEducationGrade, setSelectedTypeOfEducationGrade] = useState(
    typeOfEducationGrade[0]
  );

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
      branch: selectedBranch.name,
      educationType: selectedTypeOfEducation.name,
      score: {
        ...academics.score,
        typeOfGrade: selectedTypeOfEducationGrade.name,
      },
    });
  }, [selectedDegree, selectedBranch, selectedTypeOfEducation, selectedTypeOfEducationGrade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/academics?user=${session?._id}`,
      { academics }
    );
    await mutate(`/api/auth/user/academics?user=${session?._id}`);
    setLoading(false);
    if (data.message === "Academic Details Updated") {
      closeModal();
    } else {
      toast.error(data.message, {
        toastId: data.message,
      });
    }
  };
  const { closeModal, isEdit, editId } = useModelContext();

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center justify-between'>
        <Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-white'>
          Add Education
        </Dialog.Title>
      </div>
      <div className='mt-5 w-full'>
        <React.Fragment>
          <div className='col-span-6 sm:col-span-6 mt-2'>
            <div className='flex'>
              <label htmlFor='school' className='block text-sm font-medium text-white'>
                School / Institution
              </label>
              <span className='ml-1 text-red-600 font-semibold'>*</span>
            </div>
            <input
              type='text'
              name='school'
              id='school'
              value={academics.institution}
              onChange={(e) =>
                setAcademics({
                  ...academics,
                  institution: e.target.value,
                })
              }
              required
              className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            />
          </div>

          <div className='grid grid-cols-6 gap-4'>
            <div className='col-span-6 sm:col-span-3'>
              <DropDown
                title={"Program / Degree"}
                isRequired
                isDark
                options={degrees}
                selectedOption={selectedDegree}
                setSelectedOption={setSelectedDegree}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <DropDown
                title={"Branch / Specialization"}
                isRequired
                isDark
                options={btechBranches}
                selectedOption={selectedBranch}
                setSelectedOption={setSelectedBranch}
              />
            </div>
          </div>
          <div className='grid grid-cols-6 gap-4 mt-10'>
            <div className='col-span-6 sm:col-span-3'>
              <div className='flex'>
                <label htmlFor='board' className='block text-sm font-medium text-white'>
                  Board / University
                </label>
                <span className='ml-1 text-red-600 font-semibold'>*</span>
              </div>
              <input
                type='text'
                name='board'
                id='board'
                required
                value={academics.board}
                onChange={(e) => setAcademics({ ...academics, board: e.target.value })}
                className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            <div className='col-span-6 sm:col-span-3 relative -top-[23px]'>
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

          <div className='flex mt-4'>
            <label htmlFor='score' className='block text-sm font-medium text-white'>
              Score
            </label>
            <span className='ml-1 text-red-600 font-semibold'>*</span>
          </div>
          <div className='grid grid-cols-6 gap-4'>
            <div className='col-span-6 sm:col-span-3 '>
              <input
                type='text'
                name='score'
                id='score'
                required
                value={academics.grade}
                onChange={(e) =>
                  setAcademics({
                    ...academics,
                    score: {
                      ...academics.score,
                      grade: e.target.value,
                    },
                  })
                }
                className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            <div className='col-span-6 sm:col-span-3 relative -top-[45px]'>
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

          <div className='flex'>
            <label htmlFor='duration' className='block text-sm font-medium text-white'>
              Duration
            </label>
            <span className='ml-1 text-red-600 font-semibold'>*</span>
          </div>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <input
                type='number'
                name='duration'
                placeholder='YYYY'
                min='2001'
                max='2100'
                id='duration'
                onChange={(e) =>
                  setAcademics({
                    ...academics,
                    batch: { ...academics.batch, from: e.target.value },
                  })
                }
                required
                className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <input
                type='number'
                placeholder='YYYY'
                min='2001'
                max='2100'
                name='duration'
                id='duration'
                onChange={(e) =>
                  setAcademics({
                    ...academics,
                    batch: { ...academics.batch, to: e.target.value },
                  })
                }
                required
                className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
          </div>
        </React.Fragment>
      </div>
      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={closeModal}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
