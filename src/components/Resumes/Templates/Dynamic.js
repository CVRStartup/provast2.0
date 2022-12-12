import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";

import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Dynamic = ({ componentRef }) => {
  const { profile, objective, education, projects, skills, languages, layout } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  return (
    <>
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5`}
      >
        <div className='p-7'>
          <div className='flex items-center justify-between'>
            <div className='w-[20%]'>
              {profile && (
                <div className="w-36 h-36 rounded-md overflow-hidden mr-4">
                  <img
                    src={profile?.image}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
            <div
              className='h-36 flex flex-col justify-center px-4 w-[80%] border'
              style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 225)` }}
            >
              <div className='font-bold text-white uppercase text-3xl'>
                <span className='mr-2'>{rename(profile?.firstName)}</span>
                <span>{rename(profile?.lastName)}</span>
              </div>
              <p className='text-md font-semibold tracking-wide text-white'>{profile?.role}</p>
              <p className='text-xs mt-1 font-semibold tracking-wide text-white'>
                {profile?.email} &middot; {profile?.phone}
              </p>
            </div>
          </div>
          <div className='px-8 py-4'>
            {objective && (
              <div className='w-full'>
                <h4 className='inline italic text-lg font-bold border-b-4 border-gray-700'>
                  Profile Summary
                </h4>
                <h4 className='markdown text-[13.5px] tracking-wide mt-3 mb-4'>
                  <MarkdownRenderer>{objective}</MarkdownRenderer>
                </h4>
              </div>
            )}
            {education?.filter((option) => option?.enabled)?.length > 0 && (
              <div className='mt-4'>
                <h4 className='inline italic text-lg font-bold border-b-4 border-gray-700'>
                  Education
                </h4>
                <div className='mt-3'>
                  {education
                    ?.filter((option) => option?.enabled === true)
                    .map((option) => (
                      <div key={option?._id} className='mb-2'>
                        <div>
                          <div className='flex flex-col justify-between'>
                            <div className='text-[16px] font-semibold'>
                              {option?.fieldOfStudy} from {option?.institution}, with {option?.gpa}{" "}
                              CGPA.
                            </div>
                            <div className='uppercase text-sm text-gray-400 font-semibold tracking-widest mb-1'>
                              {`${months[new Date(option?.startDate)?.getMonth() + 1]} ${new Date(
                                option?.startDate
                              )?.getFullYear()} - ${
                                months[new Date(option?.endDate)?.getMonth() + 1]
                              } ${new Date(option?.endDate)?.getFullYear()}`}
                            </div>
                          </div>
                          {option?.summary?.enabled && (
                            <div className='markdown text-[13px]'>
                              <MarkdownRenderer>{option?.summary?.data}</MarkdownRenderer>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {projects?.filter((project) => project?.enabled)?.length > 0 && (
              <div className='mt-4'>
                <h4 className='inline italic text-lg font-bold border-b-4 border-gray-700'>
                  Projects
                </h4>
                <div className='mt-3'>
                  {projects
                    ?.filter((project) => project?.enabled === true)
                    .map((project) => (
                      <div key={project?._id} className='mb-2'>
                        <div>
                          <div className='flex justify-between'>
                            <div className='text-[16px] font-semibold'>{project?.name}</div>
                            <div className='relative font-semibold text-sm '>
                              <div>{project?.website}</div>
                              <div className='absolute w-full bottom-1 left-0 border-t border-gray-500'></div>
                            </div>
                          </div>
                          {project?.summary?.enabled && (
                            <div className='markdown capitalize text-[13px]'>
                              <MarkdownRenderer>{project?.summary?.data}</MarkdownRenderer>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
              <div className='mt-4'>
                <h4 className='inline italic text-lg font-bold border-b-4 border-gray-700'>
                  Skills
                </h4>
                <div className='mt-3 grid grid-cols-2 gap-1'>
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((skill) => (
                      <div key={skill?._id} className='mb-2'>
                        <div className='flex flex-col justify-between'>
                          <div className='text-xs font-semibold'>{skill?.name}</div>
                          <div className='relative w-11/12 h-2 border-2'>
                            <div
                              className={`${
                                skill?.level === "Beginner"
                                  ? "w-[25%]"
                                  : skill?.level === "Intermediate"
                                  ? "w-[55%] "
                                  : skill?.level === "Expert"
                                  ? "w-full"
                                  : ""
                              } absolute h-full top-0 left-0 bg-gray-800`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {languages?.filter((language) => language?.enabled)?.length > 0 && (
              <div className='mt-4'>
                <h4 className='inline italic text-lg font-bold border-b-4 border-gray-700'>
                  Languages
                </h4>
                <div className='mt-3 grid grid-cols-2 gap-2'>
                  {languages
                    ?.filter((langauge) => langauge?.enabled === true)
                    .map((language) => (
                      <div
                        key={language?._id}
                        className='w-11/12 flex items-center justify-between'
                      >
                        <span className='font-semibold'>{language?.name}</span>
                        <span className='text-sm'>{language?.fluency}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
