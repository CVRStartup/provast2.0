export const QuestionsCard = ({
  questions,
  changeQuestionHandler,
  status,
  sectionIndex,
}) => {
  const colors = {
    "not visited": "",
    visited: "bg-red-500",
    answered: "bg-green-500",
    marked: "bg-purple-700",
  };
  const getColor = (index) => {
    let questionId = questions[index]?._id;
    let answered = false;
    status?.responses?.some((response) => {
      if (response?.question === questionId) {
        answered = true;
        return true;
      }
    });

    if (answered) return colors["answered"];

    if (index == 0) return colors["visited"];

    return colors[
      status?.attemptStatus[sectionIndex]?.questions[index]?.questionStatus
    ];
  };
  return (
    <div className="grid grid-cols-5 my-10">
      {questions &&
        questions.map((question, index) => {
          return (
            <div
              key={index}
              onClick={(e) => changeQuestionHandler(e, index)}
              className={
                "border rounded text-center cursor-pointer " +
                (status && status.attemptStatus ? getColor(index) : "")
              }
            >
              {index + 1}
            </div>
          );
        })}
      <div className="col-start-1 col-span-5 my-10 items-start">
        <div className="flex flex-col items-start">
          <div className="flex justify-evenly items-center my-2">
            <div className="border rounded text-center p-1">Q</div>
            <div className="text-center">: Not yet visited</div>
          </div>
          <div className="flex justify-evenly items-center my-2">
            <div className="border rounded text-center p-1 bg-red-500">Q</div>
            <div className="text-center">: Visited but not attempted</div>
          </div>
          <div className="flex justify-evenly items-center my-2">
            <div className="border rounded text-center p-1 bg-green-500">Q</div>
            <div className="text-center">: Attempted</div>
          </div>
          <div className="flex justify-evenly items-center my-2">
            <div className="border rounded text-center p-1 bg-purple-500">
              Q
            </div>
            <div className="text-center">: Marked for review</div>
          </div>
        </div>
      </div>
    </div>
  );
};
