export const Questionnaire = ({ job }) => {
  console.log(job.questionnaire);
  return (
    <div className='bg-gray-100 min-h-[40vh]'>
      {job && job.questionnaire && job.questionnaire.length > 0 ? (
        <div>
          {job.questionnaire.map((questionObj, index) => (
            <div className='m-10' key={index}>
              <h2>Question {index + 1}:</h2>
              <h2>{questionObj.question.questionName}</h2>
              <p>{questionObj.question.required ? "Required" : "Optional"}</p>
              <div>
                Question type:
                {questionObj.question.options && questionObj.question.options.length > 0
                  ? "MCQ"
                  : "Text"}{" "}
              </div>

              {questionObj.question.options && questionObj.question.options.length > 0 ? (
                <div>
                  Options:
                  {questionObj.question.options.map((option, index) => (
                    <div key={index}>
                      {index + 1}. {option}
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div> Questionnaire not found</div>
      )}
    </div>
  );
};
