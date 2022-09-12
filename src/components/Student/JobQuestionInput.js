import React, { useState } from "react";

const JobQuestionInput = ({
  blankInputQuestions,
  setBlankInputQuestions,
  questionId,
  required,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputValueHandler = (e) => {
    let newBlankInputQuestions = [...blankInputQuestions];
    let questionPresent = false;
    const answer = e.target.value;
    setInputValue(answer);

    newBlankInputQuestions.forEach((blankInputQuestion) => {
      if (blankInputQuestion["questionId"] === questionId) {
        blankInputQuestion["answer"] = answer;
        questionPresent = true;
      }
    });

    if (questionPresent) setBlankInputQuestions(newBlankInputQuestions);
    else
      setBlankInputQuestions([...newBlankInputQuestions, { answer: e.target.value, questionId }]);
  };

  return (
    <input
      type='text'
      className='inline p-2 text-sm border-0 border-b-2 border-gray-400 outline-none bg-transparent focus:outline-none'
      required={required}
      value={inputValue}
      onChange={inputValueHandler}
    />
  );
};

export default JobQuestionInput;
