import { AssessmentCore } from "./AssessmentCore";
import { QuestionsCard } from "./QuestionsCard";
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
    if (!status || !status.attemptStatus) return;
    const visitQuestion = () => {
      questionAttemptHandler(sectionIndex, questionIndex, "visited");
    };
    if (
      status?.attemptStatus[sectionIndex]?.questions[questionIndex]?.questionStatus ===
      "not visited"
    )
      visitQuestion();
  }, [questionIndex]);

  const changeQuestionHandler = (e, qIndex) => {
    if (e.target.id === "prev-question-btn") {
      if (section && section.questions && qIndex == -1) return;
      setQuestionIndex(qIndex);
    } else {
      if (section && section.questions && qIndex == section.questions.length) return;
      setQuestionIndex(qIndex);
    }
  };

  return (
    <div key={sectionIndex}>
      <div className='border-2 shadow border-orange-400 flex items-center justify-between rounded p-2 my-4 font-semibold'>
        <button
          id='prev-section-btn'
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
          id='next-section-btn'
          className={`border-2 p-2 rounded ${
            sectionIndex == lastSectionIndex ? "cursor-not-allowed text-slate-200" : ""
          }`}
          onClick={(e) => {
            setQuestionIndex(0);
            changeSectionHandler(e);
          }}
        >
          Next
        </button>
      </div>
      <div className='grid grid-cols-8'>
        {section.questions && section.questions[questionIndex] && (
          <div className='col-start-1 col-span-7 h-max'>
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
        {section.questions && (
          <div className='col-start-8 col-span-1'>
            <QuestionsCard
              questions={section.questions}
              changeQuestionHandler={changeQuestionHandler}
              status={status}
              sectionIndex={sectionIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
};
