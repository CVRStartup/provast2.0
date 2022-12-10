import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useModelContext } from "../../../context/ModalContext";
import { Loading } from "../../Reusables/Loading";
import { useUser } from "../../../lib/hooks";
import { handleJobResponse } from "../../../lib/helper";
import { mutate } from "swr";
import JobQuestionInput from "../../Student/JobQuestionInput";
import { useResumes } from "../../../hooks/useResumes";
import { DropDown } from "../../Reusables/Dropdown";

export const QuestionnareForm = () => {
  const user = useUser();
  const { resumes } = useResumes(user);
  const [resumeDetails, setResumeDetails] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const { closeModal, modalJob, setForm, setModalJobResume, setModalQues, education, personal } =
    useModelContext();
  const [checkedRoles, setCheckRoles] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [blankInputQuestions, setBlankInputQuestions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!resumes) return;
    const newResumeDetails = [];
    resumes.forEach((resume) => {
      newResumeDetails.push({ id: resume._id, name: resume.layout.name });
    });
    console.log(newResumeDetails);
    setResumeDetails([...newResumeDetails]);
    setSelectedResume(newResumeDetails[0]);
  }, [resumes]);

  const checkOptionHandler = (e, questionId) => {
    const newCheckedOptions = [...checkedOptions];
    let questionPresent = false;

    const option = e.target.value;

    newCheckedOptions.forEach((checkedOption) => {
      if (checkedOption["questionId"] === questionId) {
        checkedOption["answer"] = option;
        questionPresent = true;
      }
    });

    if (questionPresent) setCheckedOptions(newCheckedOptions);
    else setCheckedOptions([...newCheckedOptions, { answer: option, questionId }]);

    [...e.target?.parentElement?.parentElement?.children].forEach((child) => {
      if (child.firstChild != e) {
        child.firstChild.required = false;
      }
    });
  };

  const handleQuestionnareSubmit = async (e) => {
    e.preventDefault();
    if (modalJob.designation.roles.length === 1) {
      await handleJobResponse(
        modalJob,
        user,
        "Apply",
        modalJob.designation.roles,
        [...checkedOptions, ...blankInputQuestions],
        selectedResume.id,
        personal,
        education
      );
      await mutate(`/api/jobs/${modalJob._id}`);
      closeModal();
    } else {
      setModalJobResume(selectedResume.id);
      setModalQues([...checkedOptions, ...blankInputQuestions]);
      setForm("ApplyJobForm");
    }
  };
  return (
    <form onSubmit={handleQuestionnareSubmit}>
      <div className="mt-5 w-full text-white">
        <fieldset className="space-y-5">
          <div className="relative">
            {modalJob?.questionnaire?.map((question, index) => {
              return (
                <div key={index}>
                  <div>
                    <span>
                      Question: {question.question.questionName}
                      {question.question.required ? <span className="text-red-100">*</span> : ""}
                    </span>
                    <span>
                      {question?.question?.options?.length > 0 ? (
                        question?.question?.options?.map((option, newIndex) => (
                          <div key={newIndex}>
                            <input
                              checked={checkedOptions.some(
                                (questionObj) =>
                                  questionObj["answer"] === option &&
                                  questionObj["questionId"] === question._id
                              )}
                              type="checkbox"
                              name={option}
                              id={option}
                              onChange={(e) => checkOptionHandler(e, question._id)}
                              value={option}
                              required={question?.question?.required}
                            />
                            <label htmlFor={option} className="font-medium text-white">
                              {option}
                            </label>
                          </div>
                        ))
                      ) : (
                        <JobQuestionInput
                          blankInputQuestions={blankInputQuestions}
                          setBlankInputQuestions={setBlankInputQuestions}
                          questionId={question._id}
                          required={question?.question?.required}
                        />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {resumes && (
            <DropDown
              isRequired
              isDark
              title={"Pick Resume"}
              options={resumeDetails}
              setSelectedOption={setSelectedResume}
              selectedOption={selectedResume}
            />
          )}
        </fieldset>
      </div>
      <div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              closeModal();
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3  inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Apply
          </button>
        </div>
      </div>
      <p className="text-red text-sm">{errorMsg}</p>
    </form>
  );
};
