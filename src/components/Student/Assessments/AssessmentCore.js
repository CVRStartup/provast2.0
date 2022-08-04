import { useEffect } from "react";
import Split from "react-split";
import AssessmentOptions from "./AssessmentOptions";

export const AssessmentCore = ({
  item,
  index,
  lastIndex,
  sectionIndex,
  status,
  optionSelectHandler,
  clearOption,
  disable,
  changeQuestionHandler,
  questionAttemptHandler,
}) => {
  let flag = false;
  return (
    <div
      key={index}
      className="rounded-lg shadow border hover:shadow-md p-3 relative m-5 h-3/4"
    >
      <Split sizes={[40, 60]} minSize={[100, 200]} className="flex">
        <div className="flex justify-between items-center">
          <div className="text-xl flex gap-2">
            <div className="font-semibold">{index + 1}. </div>{" "}
            <div>
              {item.question.data.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
          {item.difficulty &&
            (item.difficulty.charAt(0) == "E" ||
              item.difficulty.charAt(0) == "e") && (
              <div className="w-20 text-center rounded-lg text-green-600 border border-green-300 text-l ml-5 p-2">
                Easy
              </div>
            )}
          {item.difficulty &&
            (item.difficulty.charAt(0) == "M" ||
              item.difficulty.charAt(0) == "m") && (
              <div className="w-20 text-center rounded-lg text-amber-500 border text-l ml-5 p-2 border-amber-400">
                Medium
              </div>
            )}
          {item.difficulty &&
            (item.difficulty.charAt(0) == "H" ||
              item.difficulty.charAt(0) == "h") && (
              <div className="w-20 text-center rounded-lg text-red-600  border text-l ml-5  p-2 border-red-300">
                Hard
              </div>
            )}
        </div>
        <div>
          {status && (
            <div>
              <AssessmentOptions
                question={item}
                optionSelectHandler={optionSelectHandler}
                clearOption={clearOption}
                responses={status ? status.responses : []}
                disable={disable}
              />
              <button
                id="prev-question-btn"
                className={`border-2 p-2 rounded ${
                  index == 0 ? "cursor-not-allowed text-slate-200" : ""
                }`}
                onClick={(e) => changeQuestionHandler(e, index - 1)}
              >
                Back
              </button>
              <button
                id="next-question-btn"
                className={`border-2 p-2 rounded ${
                  index == lastIndex ? "cursor-not-allowed text-slate-200" : ""
                }`}
                onClick={(e) => changeQuestionHandler(e, index + 1)}
              >
                Next
              </button>
            </div>
          )}
          {status && status.finishedAt && (
            <div>
              {status.responses.length == 0 ? (
                <div className="border border-red-600 p-2 text-red-600 rounded m-2 mt-4">
                  ❌ Correct Answer: {item.answer}
                </div>
              ) : (
                status.responses.map((response, index) => {
                  if (!flag && response.question == item._id) {
                    item.options.forEach((option) => {
                      if (option.value == item.answer) {
                        ans = option._id;
                        return;
                      }
                    });
                    flag = response.response == ans;
                  }
                  if (status.responses.length == index + 1) {
                    return flag ? (
                      <div
                        key={index}
                        className="border border-green-600 font-semibold p-2 text-green-600 rounded m-2 mt-4"
                      >
                        ✅ Correct Answer: {item.answer}
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="border border-red-600 p-2 text-red-600 rounded m-2 mt-4"
                      >
                        ❌ Correct Answer: {item.answer}
                      </div>
                    );
                  }
                })
              )}
            </div>
          )}
        </div>
      </Split>
    </div>
  );
};
