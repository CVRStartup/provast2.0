import { useState } from "react";
import { DropDown } from "../Reusables/Dropdown";
import { AiFillDelete } from "react-icons/ai";

export const Question = ({
  question,
  type,
  index,
  handleQuestionChange,
  clearOptions,
  handleOptionChange,
  removeOption,
  addOption,
  removeQuestion,
}) => {
  const types = [
    {
      id: 1,
      name: "MCQ",
    },
    {
      id: 2,
      name: "Text",
    },
  ];
  const [questionType, setQuestionType] = useState(type ? types[0] : types[1]);
  const changeQuestionType = (type) => {
    clearOptions(index);
    setQuestionType(type);
  };

  return (
    <div key={index} className='relative bg-gray-100 p-5 rounded-md mb-4'>
      <button onClick={(e) => removeQuestion(index)} className='absolute text-red-600 right-5'>
        <AiFillDelete size={20} />
      </button>
      <h3 className='text-sm text-center font-medium underline'>Question {index + 1}</h3>

      <div className='grid grid-cols-2 gap-4 mt-5'>
        <div>
          <label htmlFor='questionName' className='block text-sm font-medium text-gray-700'>
            Question
          </label>
          <input
            type='text'
            name='questionName'
            id='questionName'
            value={question?.questionName}
            onChange={(e) => handleQuestionChange("questionName", e.target.value, index)}
            autoComplete='off'
            className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            required
          ></input>
        </div>
        <div className='relative -top-[23px]'>
          <DropDown
            title={"Question Type"}
            options={types}
            selectedOption={questionType}
            setSelectedOption={changeQuestionType}
          />
        </div>
      </div>
      {questionType && questionType.id == 1 && (
        <div>
          {question &&
            question.options &&
            question.options.map((option, optionIndex) => {
              return (
                <div key={index + "-" + optionIndex} className='my-2'>
                  <label
                    htmlFor={index + "-" + optionIndex}
                    className='block text-xs font-bold text-gray-700'
                  >
                    Option {optionIndex + 1}
                  </label>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      name='option'
                      id={index + "-" + optionIndex}
                      value={option}
                      onChange={(e) => handleOptionChange(e.target.value, optionIndex, index)}
                      autoComplete='off'
                      className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      required
                    />
                    <button
                      onClick={(e) => removeOption(index, optionIndex)}
                      className='ml-5 text-red-600 right-5'
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          <div
            className='cursor-pointer mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-semibold rounded text-orange-600 bg-orange-100'
            onClick={(e) => addOption(index)}
          >
            Add option
          </div>
        </div>
      )}
      <div className='flex mt-3'>
        <input
          type='checkbox'
          name='questionRequired'
          id='questionRequired'
          checked={question.required}
          onChange={(e) => handleQuestionChange("required", e.target.checked, index)}
          className='mt-1 focus:ring-orange-500 focus:border-orange-500 block shadow-sm sm:text-sm border-gray-300 rounded'
        />
        <label
          htmlFor='questionRequired'
          className='ml-2 mt-[3px] text-sm font-medium text-gray-700'
        >
          Required?
        </label>
      </div>
    </div>
  );
};
