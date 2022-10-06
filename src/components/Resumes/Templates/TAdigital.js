import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const TAdigital = ({ componentRef }) => {
  const { profile, objective, education, awards, projects, skills, languages } = useResumeContext();
  return (
    <>
      <div ref={componentRef} className={`p-8 w-a4W bg-white mx-auto h-a4H my-5 text-sm`}>
        <div className='border h-full border-gray-700 py-2 px-4'>
          <div className='text-center font-bold py-2'>
            <h1 className='text-lg uppercase tracking-wide'>
              {rename(profile?.firstName)} {rename(profile?.lastName)}
            </h1>
            <div className='mt-1 flex items-center justify-center'>
              <span className='flex items-center justify-center mr-3'>
                <span className='mr-2'>E-Mail:</span>
                <span className='font-medium'>{profile?.email}</span>
              </span>
              <span className='flex items-center justify-center'>
                <span className='mr-2'>Mobile: </span>{" "}
                <span className='font-medium'>{profile?.phone}</span>
              </span>
            </div>
          </div>
          {objective && (
            <div className='my-1'>
              <h1 className='uppercase tracking-wide font-bold border-b border-gray-700'>
                Profile Summary
              </h1>
              <div className='markdown my-4'>
                <MarkdownRenderer>{objective}</MarkdownRenderer>
              </div>
            </div>
          )}
          <div>
            <h1 className='uppercase tracking-wide font-bold'>Academic Projects</h1>
            {projects
              ?.filter((project) => project?.enabled === true)
              .map((project) => (
                <div key={project?._id} className='mb-5'>
                  <div className='flex mt-3 font-bold flex-wrap items-start text-[13.2px]'>
                    <div className='flex items-center justify-between w-[14%]'>
                      <h2>Project Title</h2>
                      <h2>:</h2>
                    </div>
                    <p className='ml-2 w-[83%] '>{project?.name}</p>
                  </div>
                  <div className='flex mt-[3px] flex-wrap items-start text-[13.2px]'>
                    <div className='flex items-center justify-between w-[14%]'>
                      <h2>Project Link</h2>
                      <h2>:</h2>
                    </div>
                    <p className='ml-2 w-[83%] '>{project?.website}</p>
                  </div>

                  <div className='flex mt-[3px] flex-wrap items-start text-[13.2px]'>
                    <div className='flex  items-center justify-between w-[14%]'>
                      <h2>Description</h2>
                      <h2>:</h2>
                    </div>
                    {project?.summary?.enabled && (
                      <p className='ml-2 w-[83%]'>{project?.summary?.data}</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div>
            <h1 className='uppercase tracking-wide font-bold mb-2'>Scholastic</h1>
            {education
              ?.filter((option) => option?.enabled === true)
              .map((option) => (
                <div key={option?._id} className='flex items-start mt-1 text-[13.2px]'>
                  <div className='w-[14%]'>{new Date(option?.endDate).getFullYear()}</div>
                  <div className='w-[83%]'>
                    {option?.fieldOfStudy} from {option?.institution}, with {option?.gpa} CGPA.
                  </div>
                </div>
              ))}
          </div>
          <div className='my-5'>
            <h1 className='uppercase tracking-wide font-bold'>Extra Curriculum</h1>
            <div className='my-2 text-[13.2px]'>
              {awards
                ?.filter((award) => award?.enabled === true)
                .map((award) => (
                  <div key={award?._id} className='flex mt-1 items-start'>
                    <ul className='ml-2 list-disc'>
                      <li>
                        {award?.name}, {award?.summary?.enabled ? award?.summary?.data : ""}
                      </li>
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className='flex'>
            <span className='font-bold tracking-wide mr-2'>IT SKILLS:</span>
            <span className='text-sm'>Well versed with programming languages:</span>
          </div>

          <div className='px-8 my-4 flex flex-col -mx-8'>
            <div className='inline-block min-w-full py-2 align-middle'>
              <div className=''>
                <table className='min-w-full border-separate' style={{ borderSpacing: 0 }}>
                  <thead className='bg-white'>
                    <tr className=''>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border border-gray-600 py-1 pr-3 text-left text-sm font-semibold text-gray-900 pl-8'
                      >
                        Programing Language
                      </th>

                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-l-0 border border-gray-600 px-3 py-1 text-left text-sm font-semibold text-gray-900'
                      >
                        Level (Beginner / Intermediate / Expert)
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {skills
                      ?.filter((skill) => skill?.enabled === true)
                      .filter(
                        (skill) =>
                          skill?.level?.toLowerCase() === "beginner" ||
                          skill?.level?.toLowerCase() === "intermediate" ||
                          skill?.level?.toLowerCase() === "expert"
                      )
                      .map((skill) => (
                        <tr key={skill?._id} className=''>
                          <td className='border-b border-x border-gray-600 whitespace-nowrap px-3 py-1 text-sm'>
                            {skill?.name}
                          </td>
                          <td className='border-b border-r border-gray-600 whitespace-nowrap px-3 py-1 text-sm'>
                            {skill?.level}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h1 className='uppercase tracking-wide font-bold'>Personal Snippets</h1>
            <div className='flex flex-wrap mt-4 items-start text-[13.2px]'>
              <div className='flex items-center justify-between w-[17%]'>
                <h2>Date of Birth</h2>
                <h2>:</h2>
              </div>
              <p className='ml-2 w-[80%] '>{`${
                months[new Date(profile?.dob).getMonth() + 1]
              } ${new Date(profile?.dob).getDate()}, ${new Date(profile?.dob).getFullYear()}`}</p>
            </div>
            <div className='flex flex-wrap mt-1 items-start text-[13.2px]'>
              <div className='flex items-center justify-between w-[17%]'>
                <h2>Languages Known</h2>
                <h2>:</h2>
              </div>
              <div className='flex flex-wrap ml-2 w-[80%] '>
                {languages
                  ?.filter((langauge) => langauge?.enabled === true)
                  .map((language, index) => (
                    <span key={language?._id} className='mr-2'>
                      {language?.name}
                      {index ===
                      languages?.filter((langauge) => langauge?.enabled === true)?.length - 1
                        ? "."
                        : ","}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
