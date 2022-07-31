import { useState } from "react";
import { DropDown } from "../Reusables/Dropdown";
const typeOfRoundStatus = [
  {
    id: "1",
    name: "Yet to start",
  },
  {
    id: "2",
    name: "In progress",
  },
  {
    id: "3",
    name: "Partially completed",
  },
  {
    id: "4",
    name: "Completed",
  },
];
export const Round = ({
  type,
  round,
  roundIndex,
  from,
  to,
  handleRoundChange,
  handleShortlistFile,
}) => {
  const [roundStatus, setRoundStatus] = useState(
    round.status ? round.status : typeOfRoundStatus[0]
  );
  const changeRoundStatus = (status) => {
    setRoundStatus(status);
    handleRoundChange("status", status.name, roundIndex);
  };
  return (
    <div key={roundIndex} className='sm:col-span-3 bg-gray-100 p-5 rounded-md mt-3'>
      <h3 className='text-sm text-center font-medium underline'>Round {roundIndex + 1}</h3>
      <div className='grid grid-cols-3 gap-4 mt-4'>
        <div>
          <label htmlFor='roundName' className='block text-sm font-medium text-gray-700'>
            Round Name
          </label>
          <input
            type='text'
            name='roundName'
            id='roundName'
            value={round?.name}
            onChange={(e) => handleRoundChange("name", e.target.value, roundIndex)}
            autoComplete='off'
            className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            required
          />
        </div>
        <div>
          <label htmlFor='roundDescription' className='block text-sm font-medium text-gray-700'>
            Round Description
          </label>
          <input
            type='text'
            name='roundDescription'
            id='roundDescription'
            value={round?.description}
            onChange={(e) => handleRoundChange("description", e.target.value, roundIndex)}
            autoComplete='off'
            className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          ></input>
        </div>
        <div className='relative -top-[23px]'>
          <DropDown
            title={"Round Status"}
            options={typeOfRoundStatus}
            selectedOption={roundStatus}
            setSelectedOption={changeRoundStatus}
            className={type == "add" ? "cursor-not-allowed" : ""}
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 mt-4'>
        <div>
          <label htmlFor='roundDateFrom' className='block text-sm font-medium text-gray-700'>
            From
          </label>
          <input
            type='datetime-local'
            name='roundDateFrom'
            value={round != null && round.date.from != null ? round.date.from : from ? from : ""}
            id='roundDateFrom'
            onChange={(e) => handleRoundChange("date-from", e.target.value, roundIndex)}
            className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>
        <div>
          <label htmlFor='roundDateTo' className='block text-sm font-medium text-gray-700'>
            To
          </label>
          <input
            type='datetime-local'
            name='roundDateTo'
            id='roundDateTo'
            value={round != null && round.date.to != null ? round.date.to : to ? to : ""}
            onChange={(e) => handleRoundChange("date-to", e.target.value, roundIndex)}
            className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          ></input>
        </div>
      </div>

      <div
        className={`${
          round && round.status === "Yet to start" && type != "add" ? "visible" : "hidden"
        }`}
      >
        <label htmlFor='shortlist' className='block text-sm font-medium text-gray-700'>
          Upload List of Shortlisted Students
        </label>

        <input
          className='mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          label='Choose File'
          type='file'
          name='excelFile'
          id='excelFile'
          onChange={(e) => handleShortlistFile(e, "shortlisted", roundIndex)}
        />
      </div>
      <div
        className={`${
          round && round.status === "In progress" && type != "add" ? "visible" : "hidden"
        }`}
      >
        <label htmlFor='shortlist' className='block text-sm font-medium text-gray-700'>
          Upload List of Attendees
        </label>

        <input
          className='mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          label='Choose File'
          type='file'
          name='excelFile'
          id='excelFile'
          onChange={(e) => handleShortlistFile(e, "attendees", roundIndex)}
        />
      </div>
      <div
        className={`${
          round &&
          (round.status === "Completed" || round.status === "Partially completed") &&
          type != "add"
            ? "visible"
            : "hidden"
        }`}
      >
        <label htmlFor='shortlist' className='block text-sm font-medium text-gray-700'>
          Upload Results
        </label>

        <input
          className='mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          label='Choose File'
          type='file'
          name='excelFile'
          id='excelFile'
          onChange={(e) => handleShortlistFile(e, "results", roundIndex)}
        />
      </div>
    </div>
  );
};
