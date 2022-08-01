import { useUser } from "../../lib/hooks";
import { useStudents } from "../../hooks/useStudents";
import { ShortlistTable } from "./ShortlistTable";
import { ResultTable } from "./ResultTable";

export const RoundInfo = ({ job }) => {
  const user = useUser();
  const students = useStudents(user);

  const getFilteredShortlist = (eligible) => {
    if (students && students.students) {
      let newFilteredStudents = eligible.map((student) => {
        let studentDetails = {};
        students.students.some((studentDetail) => {
          if (studentDetail.email == student.email) {
            studentDetails = {
              name:
                studentDetail.profile.firstName +
                " " +
                studentDetail.profile.lastName,
              email: studentDetail.email,
              phone: studentDetail.phone?.value,
              rollnumber: studentDetail.rollNumber?.value,
              role: student.role,
            };
            return true;
          }
        });
        return studentDetails;
      });

      newFilteredStudents = newFilteredStudents.filter(
        (x) => x && x.name != null
      );
      return newFilteredStudents;
    }
    return eligible;
  };
  const getFilteredResult = (eligible) => {
    if (students && students.students) {
      let newFilteredStudents = eligible.map((student) => {
        let studentDetails = {};
        students.students.some((studentDetail) => {
          if (studentDetail.email == student.email) {
            studentDetails = {
              name:
                studentDetail.profile.firstName +
                " " +
                studentDetail.profile.lastName,
              email: studentDetail.email,
              phone: studentDetail.phone?.value,
              rollnumber: studentDetail.rollNumber?.value,
              status: student.status,
              role: student.role,
            };
            return true;
          }
        });
        return studentDetails;
      });

      newFilteredStudents = newFilteredStudents.filter(
        (x) => x && x.name != null
      );
      return newFilteredStudents;
    }
    return eligible;
  };

  return (
    <div>
      {job && job.rounds && job.rounds.length > 0 ? (
        <div>
          {job.rounds.map((round, index) => (
            <div className="m-10" key={index}>
              <h2>Round {index + 1}:</h2>
              <h2>Name:{round.name}</h2>
              <p>Description: {round.description}</p>
              <div>
                <p>From: {round.date.from ? round.date.from : "TBD"}</p>
                <p>To: {round.date.to ? round.date.to : "TBD"}</p>
              </div>
              {round.status && <p>{round.status}</p>}

              {index === 0 ? (
                <ShortlistTable
                  eligible={getFilteredShortlist(job.eligible)}
                  heading={"Shortlisted students"}
                  tagline={"Students shortlisted to appear for this round"}
                />
              ) : (
                <ShortlistTable
                  eligible={getFilteredShortlist(round.shortlisted)}
                  heading={"Shortlisted students"}
                  tagline={"Students shortlisted to appear for this round"}
                />
              )}
              {round.status !== "Yet to start" && (
                <ShortlistTable
                  eligible={getFilteredShortlist(round.attendees)}
                  heading={"Students attended"}
                  tagline={"Students that appeared for this round"}
                />
              )}
              {(round.status === "Partially completed" ||
                round.status === "Completed") && (
                <ResultTable
                  eligible={getFilteredResult(round.result)}
                  heading={"Result"}
                  tagline={"Round results"}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div> Round information not found</div>
      )}
    </div>
  );
};
