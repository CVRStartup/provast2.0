import React from "react";

export const AcademicSubmitForm = ({ submitHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <React.Fragment>
        <div className='col-span-6 sm:col-span-6 mt-2'>
          <div className='flex'>
            <label htmlFor='school' className='block text-sm font-medium text-gray-700'>
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
            className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>

        <div className='grid grid-cols-6 gap-4'>
          <div className='col-span-6 sm:col-span-3'>
            <DropDown
              title={"Program / Degree"}
              isRequired
              options={degrees}
              selectedOption={selectedDegree}
              setSelectedOption={setSelectedDegree}
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <DropDown
              title={"Branch / Specialization"}
              isRequired
              options={btechBranches}
              selectedOption={selectedBranch}
              setSelectedOption={setSelectedBranch}
            />
          </div>
        </div>
        <div className='grid grid-cols-6 gap-4 mt-10'>
          <div className='col-span-6 sm:col-span-3'>
            <div className='flex'>
              <label htmlFor='board' className='block text-sm font-medium text-gray-700'>
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
              className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            />
          </div>
          <div className='col-span-6 sm:col-span-3 relative -top-[23px]'>
            <DropDown
              title={"Education Type"}
              isRequired
              options={typeOfEducation}
              selectedOption={selectedTypeOfEducation}
              setSelectedOption={setSelectedTypeOfEducation}
            />
          </div>
        </div>

        <div className='flex mt-4'>
          <label htmlFor='score' className='block text-sm font-medium text-gray-700'>
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
              className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            />
          </div>
          <div className='col-span-6 sm:col-span-3 relative -top-[45px]'>
            <DropDown
              title={"Grade"}
              isRequired
              options={typeOfEducationGrade}
              selectedOption={selectedTypeOfEducationGrade}
              setSelectedOption={setSelectedTypeOfEducationGrade}
            />
          </div>
        </div>

        <div className='flex'>
          <label htmlFor='duration' className='block text-sm font-medium text-gray-700'>
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
              className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
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
              className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            />
          </div>
        </div>

        <div className='mt-4'>
          <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 '>
            Submit
          </button>
        </div>
      </React.Fragment>
    </form>
  );
};
