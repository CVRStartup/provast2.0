import { useUser } from "../../lib/hooks";
import { useStudents } from "../../hooks/useStudents";
import { ShortlistTable } from "./ShortlistTable";
import { ResultTable } from "./ResultTable";
import Image from "next/image";
import moment from "moment";

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
              name: studentDetail.profile.firstName + " " + studentDetail.profile.lastName,
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

      newFilteredStudents = newFilteredStudents.filter((x) => x && x.name != null);
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
              name: studentDetail.profile.firstName + " " + studentDetail.profile.lastName,
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

      newFilteredStudents = newFilteredStudents.filter((x) => x && x.name != null);
      return newFilteredStudents;
    }
    return eligible;
  };

  return (
    <div>
      {job && job.rounds && job.rounds.length > 0 ? (
        <div className='px-10'>
          {job.rounds.map((round, index) => (
            <div className='my-10' key={index}>
              <h2 className='text-center text-xl font-semibold'>Round {index + 1}</h2>
              <div className='mt-4 max-w-md bg-white py-4 text-center mx-auto rounded-lg border'>
                <h2 className='font-semibold'>{round.name}</h2>
                <p className='text-gray-600'>{round.description}</p>
                <span className='text-sm text-orange-500'>{round.status && round.status}</span>
                <div className='text-sm'>
                  <span>
                    {round.date.from
                      ? moment(new Date(round.date.from)).format("YYYY-MM-DD HH:mm:ss")
                      : "TBD"}
                  </span>
                  <span className='ml-1'>
                    -{" "}
                    {round.date.to
                      ? moment(new Date(round.date.to)).format("YYYY-MM-DD HH:mm:ss")
                      : "TBD"}
                  </span>
                </div>
              </div>

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
              {(round.status === "Partially completed" || round.status === "Completed") && (
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
        <div className='pt-4 flex flex-col'>
          <article className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='relative flex-shrink-0 flex justify-center h-40 w-40 mx-auto'>
              <Image
                placeholder='blur'
                blurDataURL='/no_results.png'
                layout='fill'
                objectFit='contain'
                src='/no_results.png'
                alt=''
              />
            </div>
            <div className='py-4'>
              <div className='text-center'>
                <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                  Round Information Not Found.
                </h1>
                <p className='mt-2 text-base text-gray-500'>
                  Seems like no rounds posted for this job.
                </p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
