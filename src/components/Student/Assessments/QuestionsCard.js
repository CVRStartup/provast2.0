export const QuestionsCard = ({ questions, changeQuestionHandler, status }) => {
  return (
    <div className="grid grid-cols-5 my-10">
      {questions &&
        questions.map((question, index) => {
          return (
            <div
              key={index}
              onClick={(e) => changeQuestionHandler(e, index)}
              className={"border rounded text-center cursor-pointer"}
            >
              {index + 1}
            </div>
          );
        })}
    </div>
  );
};
