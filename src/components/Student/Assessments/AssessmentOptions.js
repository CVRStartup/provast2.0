import React, { useEffect, useState } from "react";

const AssessmentOptions = ({
  question,
  optionSelectHandler = () => {},
  clearOption = () => {},
  responses,
  disable,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const changeOptionHandler = (e, option, question) => {
    optionSelectHandler(option, question);
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (responses.length === 0) {
      setSelectedOption("");
      return;
    }
    if (selectedOption === "") {
      responses.forEach((response) => {
        if (response.question === question._id) {
          setSelectedOption(response.response);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (responses.length === 0) {
      setSelectedOption("");
    }
  }, [responses]);

  return (
    <>
      <div className='text-xl m-10'>
        {question.options.map((option, index) => {
          return (
            <div key={index} className='flex gap-3 items-center my-3'>
              <input
                onChange={(e) => {
                  if (!disable) changeOptionHandler(e, option._id, question._id);
                }}
                type='radio'
                checked={selectedOption === option._id}
                value={option._id}
                name={option._id}
                className={`cursor-pointer scale-125 opacity-60 hover:border hover:border-orange-500 hover:opacity-100 ${
                  disable ? `cursor-not-allowed` : ``
                }`}
              />
              {" " + option.value}
            </div>
          );
        })}
      </div>
      <div className='flex justify-start m-10 mt-5'>
        {/* <div className="grid grid-cols-1"> */}
        <div
          className={`col-start-3 col-span-2 text-sm text-center cursor-pointer bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ${
            disable ? `cursor-not-allowed` : ``
          }`}
          onClick={(e) => {
            if (disable) return;
            setSelectedOption("");
            clearOption(e, question._id);
          }}
        >
          Clear
        </div>
      </div>
    </>
  );
};

export default AssessmentOptions;
