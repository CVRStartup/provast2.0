import React, { useState } from "react";
import { useAssessmentContext } from "../../../context/AssessmentContext";
import { useModelContext } from "../../../context/ModalContext";

const EditQuestion = () => {
  const { closeModal } = useModelContext();
  const {
    assessment,
    question: assessmentQuestion,
    updateAssessment: editFormSubmitHandler,
  } = useAssessmentContext();

  // console.log(assessmentQuestion, editFormSubmitHandler);

  const [question, setQuestion] = useState(assessmentQuestion?.question?.question?.data);
  const [options, setOptions] = useState(
    assessmentQuestion?.question?.options?.map((option) => option?.value)
  );
  const [correctAnswer, setCorrectAnswer] = useState(assessmentQuestion?.question?.answer);
  const [error, setError] = useState(false);

  const submitHandler = (e) => {
    let isCorrectFlag = false;

    e.preventDefault();

    options.forEach((option) => {
      if (correctAnswer.toLowerCase().trim() === option.toLowerCase().trim()) isCorrectFlag = true;
    });

    if (!isCorrectFlag) {
      setError(true);
      return;
    }

    const newAssessment = JSON.parse(JSON.stringify(assessment));
    const newSections = JSON.parse(JSON.stringify(newAssessment.sections));

    // console.log(newQuestions);

    const newQuestions = [...newSections[assessmentQuestion?.sectionIndex].questions];

    if (newQuestions[assessmentQuestion?.questionIndex]?.question) {
      newQuestions[assessmentQuestion?.questionIndex].question.data = question;
      const newOptionsArr = [...newQuestions[assessmentQuestion?.questionIndex]?.options];
      newOptionsArr.forEach((option, index) => {
        option.value = options[index];
      });
      newQuestions[assessmentQuestion?.questionIndex].options = newOptionsArr;
      newQuestions[assessmentQuestion?.questionIndex].answer = correctAnswer;
    }

    newSections[assessmentQuestion?.sectionIndex].questions = newQuestions;
    newAssessment.sections = newSections;

    editFormSubmitHandler(newAssessment);

    // changeEditMode(false);
    closeModal();
  };

  const optionsUpdateHandler = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  // console.log(assessmentQuestion);

  return (
    <>
      {/* <div className='absolute top-0 left-0 w-screen h-screen overflow-x-hidden bg-black z-30 opacity-50'></div> */}
      {/* <div className='w-[95%] mx-auto'> */}
      {/* <div className="flex items-center justify-center"> */}
      {/* <div className="bg-white p-10 rounded-lg shadow"> */}
      <h2 className='text-center font-bold text-orange-300 text-lg'>Edit Question</h2>
      <form>
        <div className='mb-5'>
          <label htmlFor='name' className='block mb-2 font-bold text-white'>
            Question
          </label>
          <textarea
            // type="text"
            id='name'
            name='name'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='border border-gray-300 shadow p-3 w-full h-24 rounded mb-'
          />
        </div>

        <div className='block mb-2 font-bold text-white'>Options</div>
        <div className='mb-5'>
          {assessmentQuestion &&
            assessmentQuestion.question.options.map((option, index) => {
              return (
                <div key={index} className='flex justify-center items-center'>
                  <span className='mr-2 text-white'>{option.key}.</span>
                  <input
                    type='text'
                    id='twitter'
                    name='twitter'
                    // defaultValue={option.value}
                    value={options[index]}
                    onChange={(e) => optionsUpdateHandler(e, index)}
                    className='border border-gray-300 shadow p-3 w-full rounded my-1'
                  />
                </div>
              );
            })}
        </div>

        <div>
          <span className='inline-block mb-2 font-bold text-white'>Answer</span>:{" "}
          <input
            type='text'
            id='twitter'
            name='twitter'
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className='border border-gray-300 shadow p-3 w-full rounded mb-'
          />
        </div>

        <button
          className='block w-full transition-all bg-orange-500 text-white font-bold p-4 rounded-lg hover:bg-orange-600 mt-10'
          onClick={submitHandler}
        >
          Submit
        </button>
        {error && (
          <span className='text-red-500 text-sm'>
            Please enter an answer from the options only !
          </span>
        )}
      </form>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default EditQuestion;
