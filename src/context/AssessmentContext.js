import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AssessmentContext = createContext();

export function AssessmentContextProvider({ children }) {
  const [question, setQuestion] = useState({});
  const [assessment, setAssessment] = useState({});
  const [
    filteredStudentAssessmentStatuses,
    setFilteredStudentAssessmentStatuses,
  ] = useState([]);
  const [studentAssessmentStatuses, setStudentAssessmentStatuses] = useState(
    []
  );

  const updateAssessment = async (newAssessment) => {
    try {
      const {
        data: { assessment },
      } = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/assessments/`,
        {
          ...newAssessment,
        }
      );
      if (assessment) {
        setAssessment(assessment);
        toast.success("Assessment updated!", {
          toastId: 122,
        });
      } else {
        toast.error("Failed to update", {
          toastId: 233,
        });
      }
    } catch (error) {
      console.log(error);
    }
    // };

    // updateAssessmentDatabase();
  };

  const state = {
    question,
    setQuestion,
    assessment,
    setAssessment,
    updateAssessment,
    filteredStudentAssessmentStatuses,
    setFilteredStudentAssessmentStatuses,
    studentAssessmentStatuses,
    setStudentAssessmentStatuses,
  };

  return (
    <AssessmentContext.Provider value={state}>
      {children}
    </AssessmentContext.Provider>
  );
}
export function useAssessmentContext() {
  return useContext(AssessmentContext);
}
