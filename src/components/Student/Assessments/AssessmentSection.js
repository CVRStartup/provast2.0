import { AssessmentCore } from "./AssessmentCore";
import { useState, useEffect } from "react";
export const AssessmentSection = ({
  section,
  sectionIndex,
  lastSectionIndex,
  status,
  optionSelectHandler,
  changeSectionHandler,
  clearOption,
  questionAttemptHandler,
  disable,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    const visitQuestion = () => {
      questionAttemptHandler(sectionIndex, questionIndex, 0);
    };
    visitQuestion();
  }, [questionIndex]);

  const changeQuestionHandler = (e) => {
    if (e.target.id === "prev-question-btn") {
      if (section && section.questions && questionIndex == 0) return;
      setQuestionIndex(questionIndex - 1);
    } else {
      if (
        section &&
        section.questions &&
        questionIndex == section.questions.length - 1
      )
        return;
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <div key={sectionIndex} className="col-start-2 col-span-4">
      <div className="border-2 shadow border-blue-400 flex items-center justify-between rounded p-2 my-4 font-semibold">
        <button
          id="prev-section-btn"
          className={`border-2 p-2 rounded ${
            sectionIndex == 0 ? "cursor-not-allowed text-slate-200" : ""
          }`}
          onClick={(e) => {
            setQuestionIndex(0);
            changeSectionHandler(e);
          }}
        >
          Previous
        </button>
        {section.name}
        <button
          id="next-section-btn"
          className={`border-2 p-2 rounded ${
            sectionIndex == lastSectionIndex
              ? "cursor-not-allowed text-slate-200"
              : ""
          }`}
          onClick={(e) => {
            setQuestionIndex(0);
            changeSectionHandler(e);
          }}
        >
          Next
        </button>
      </div>
      {section.questions && section.questions[questionIndex] && (
        <div>
          <AssessmentCore
            item={section.questions[questionIndex]}
            index={questionIndex}
            lastIndex={section.questions.length - 1}
            sectionIndex={sectionIndex}
            status={status}
            optionSelectHandler={optionSelectHandler}
            clearOption={clearOption}
            changeQuestionHandler={changeQuestionHandler}
            questionAttemptHandler={questionAttemptHandler}
            disable={disable}
          />
        </div>
      )}
    </div>
  );
};
