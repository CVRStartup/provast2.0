import { useState } from "react";
import { DropDown } from "../Reusables/Dropdown";
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
  console.log(question);
  return (
    <div key={index}>
      <div>
        <label
          htmlFor="questionName"
          className="block text-sm font-medium text-gray-700"
        >
          Question
        </label>
        <input
          type="text"
          name="questionName"
          id="questionName"
          value={question?.questionName}
          onChange={(e) =>
            handleQuestionChange("questionName", e.target.value, index)
          }
          autoComplete="off"
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        ></input>
      </div>
      <div>
        <label
          htmlFor="questionRequired"
          className="block text-sm font-medium text-gray-700"
        >
          Required?
        </label>
        <input
          type="checkbox"
          name="questionRequired"
          id="questionRequired"
          onChange={(e) =>
            handleQuestionChange("required", e.target.checked, index)
          }
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></input>
      </div>

      <div>
        <DropDown
          title={"Question Type"}
          options={types}
          selectedOption={questionType}
          setSelectedOption={changeQuestionType}
        />
      </div>
      {questionType && questionType.id == 1 && (
        <div>
          {question &&
            question.options &&
            question.options.map((option, optionIndex) => {
              return (
                <div key={index + "-" + optionIndex}>
                  <label
                    htmlFor={index + "-" + optionIndex}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {optionIndex + 1}.
                  </label>
                  <input
                    type="text"
                    name="option"
                    id={index + "-" + optionIndex}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(e.target.value, optionIndex, index)
                    }
                    autoComplete="off"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  ></input>
                  <div onClick={(e) => removeOption(index, optionIndex)}>
                    Remove option
                  </div>
                </div>
              );
            })}
          <div onClick={(e) => addOption(index)}>Add option</div>
        </div>
      )}
      <div onClick={(e) => removeQuestion(index)}>Remove question</div>
    </div>
  );
};
