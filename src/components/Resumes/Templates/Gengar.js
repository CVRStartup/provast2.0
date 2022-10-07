import Image from "next/image";
import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";

import { rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Gengar = ({ componentRef }) => {
  const { profile, objective, certifications, education, work, skills, languages, layout } =
    useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  return (
    <>
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W overflow-hidden bg-white mx-auto h-a4H my-5`}
      >
        <div className=''>
          <div className=''>
            <div
              className='h-56 flex flex-col items-center justify-center px-4 border'
              style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 225)` }}
            >
              <div className='font-bold text-white uppercase text-5xl'>
                <span className='mr-2'>{rename(profile?.firstName)}</span>
                <span>{rename(profile?.lastName)}</span>
              </div>
              <div className='relative w-3/4 my-4'>
                <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                  <div className='w-full border-t border-white' />
                </div>
                <div className='relative flex justify-center'>
                  <span
                    className='px-5 text-xl font-semibold text-white'
                    style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 225)` }}
                  >
                    {profile?.role}
                  </span>
                </div>
              </div>
              <div className='w-full border-gray-200 py-1 text-center mb-5'>
                <span className='text-md italic font-semibold text-white'>
                  <span>{profile?.email}</span> <span>&middot; {profile?.phone}</span>
                </span>
              </div>
            </div>
          </div>
          <div className='py-4'>
            <div className='px-2 flex items-center justify-between'>
              <div className='w-[30%] '>
                <div className='relative object-fit h-40 w-40 mx-auto border-4 border-white rounded-full'>
                  {profile && (
                    <Image
                      placeholder='blur'
                      blurDataURL={profile?.image}
                      layout='fill'
                      objectFit='contain'
                      className=''
                      src={profile?.image}
                      alt='resume-img'
                    />
                  )}
                </div>
              </div>
              {objective && (
                <div className='w-[70%]'>
                  <h4
                    className='inline text-lg uppercase tracking-wider font-bold'
                    style={{ color: `rgba(${r}, ${g}, ${b}, 225)` }}
                  >
                    Profile
                  </h4>
                  <h4 className='markdown text-[13.5px] tracking-wide mt-3 mb-4'>
                    <MarkdownRenderer>{objective}</MarkdownRenderer>
                  </h4>
                </div>
              )}
            </div>
            <div className='flex h-screen justify-between mt-2'>
              <div className='w-[30%] border-r-2'>
                {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
                  <div className=''>
                    <h4
                      className=' py-2 text-lg text-center uppercase text-white tracking-wider font-bold'
                      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 225)` }}
                    >
                      Skills
                    </h4>
                    <ul className='pl-8 flex flex-col py-3'>
                      {skills
                        ?.filter((skill) => skill?.enabled === true)
                        .map((skill, key) => (
                          <li
                            key={key}
                            className='mb-1 list-disc text-sm font-semibold text-gray-700'
                          >
                            {skill?.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {education?.filter((option) => option?.enabled)?.length > 0 && (
                  <div className=''>
                    <h4
                      className='py-2 text-lg text-center uppercase text-white tracking-wider font-bold'
                      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 225)` }}
                    >
                      Education
                    </h4>
                    <div className='pl-4 flex flex-col py-3'>
                      {education
                        ?.filter((option) => option?.enabled === true)
                        .map((option, index) => (
                          <div key={index} className='mb-3'>
                            <span
                              style={{ color: `rgba(${r}, ${g}, ${b}, 225)` }}
                              className='text-lg italic font-semibold'
                            >{`${new Date(option?.startDate).getFullYear()} - ${new Date(
                              option?.endDate
                            ).getFullYear()}`}</span>
                            <h1 className='text-[14px] font-semibold'>
                              {option?.fieldOfStudy} from {option?.institution}.
                            </h1>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {languages?.filter((language) => language?.enabled)?.length > 0 && (
                  <div className=''>
                    <h4
                      className=' py-2 text-lg text-center uppercase text-white tracking-wider font-bold'
                      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 225)` }}
                    >
                      Languages
                    </h4>
                    <ul className='pl-8 flex flex-col py-3'>
                      {languages
                        ?.filter((language) => language?.enabled === true)
                        .map((language, index) => (
                          <li
                            key={index}
                            className='mb-1 list-disc text-sm font-semibold text-gray-700'
                          >
                            {language?.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className='w-[70%] border-t-2'>
                <div className='px-5'>
                  {work?.filter((work) => work?.enabled)?.length > 0 && (
                    <div>
                      <h4
                        className='py-2 text-lg text-center uppercase text-white tracking-wider font-bold border-b-2'
                        style={{ color: `rgba(${r}, ${g}, ${b}, 225)` }}
                      >
                        Work Experience
                      </h4>
                      <div className='flex flex-col py-3'>
                        {work
                          ?.filter((option) => option?.enabled === true)
                          .map((option, index) => (
                            <div key={index} className='mb-3'>
                              <span
                                style={{ color: `rgba(${r}, ${g}, ${b}, 225)` }}
                                className='text-lg italic font-semibold'
                              >{`${new Date(option?.from).getFullYear()} - ${new Date(
                                option?.to
                              ).getFullYear()}`}</span>
                              <h1 className='text-sm font-semibold'>
                                {option?.company},{" "}
                                <span className='text-gray-500'>{option?.designation}</span>.
                              </h1>
                              {option?.summary?.enabled && (
                                <div className='markdown text-[14px] mt-1'>
                                  <MarkdownRenderer>{option?.summary?.data}</MarkdownRenderer>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {certifications?.filter((certification) => certification?.enabled)?.length >
                    0 && (
                    <div>
                      <h4
                        className='py-2 text-lg text-center uppercase text-white tracking-wider font-bold border-b-2'
                        style={{ color: `rgba(${r}, ${g}, ${b}, 225)` }}
                      >
                        Certifications
                      </h4>
                      <div className='flex flex-col py-3'>
                        {certifications
                          ?.filter((certification) => certification?.enabled === true)
                          .map((certification, index) => (
                            <div key={index} className='mb-3 relative'>
                              <span
                                style={{ color: `rgba(${r}, ${g}, ${b}, 225)` }}
                                className='text-sm italic font-semibold absolute right-0 top-0'
                              >{`${new Date(certification?.date).getFullYear()}`}</span>
                              <h1 className='text-sm font-semibold'>
                                {certification?.title},{" "}
                                <span className='text-gray-500'>{certification?.issuer}</span>.
                              </h1>
                              {certification?.summary?.enabled && (
                                <div className='markdown text-[14px] mt-1'>
                                  <MarkdownRenderer>
                                    {certification?.summary?.data}
                                  </MarkdownRenderer>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* {education?.filter((option) => option?.enabled)?.length > 0 && (
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
                              {option?.typeOfDegree !== "School / Intermediate" &&
                              option?.typeOfDegree !== "None"
                                ? `${option?.typeOfDegree} in`
                                : ""}{" "}
                              {option?.fieldOfStudy} from {option?.institution}, with {option?.gpa}{" "}
                              CGPA.
                            </div>
                            <div className='uppercase text-sm text-gray-400 font-semibold tracking-widest mb-1'>
                              {`${months[new Date(option?.startDate)?.getMonth()]} ${new Date(
                                option?.startDate
                              )?.getFullYear()} - ${
                                months[new Date(option?.endDate)?.getMonth()]
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
                          <div className='text-[16px] font-semibold'>{skill?.name}</div>
                          <div className='relative w-11/12 h-2 border-2'>
                            <div
                              className={`${
                                skill?.level === "Beginner"
                                  ? "w-[10%]"
                                  : skill?.level === "Novice"
                                  ? "w-[25%] "
                                  : skill?.level === "Amatuer"
                                  ? "w-[50%]"
                                  : skill?.level === "Expert"
                                  ? "w-[75%]"
                                  : skill?.level === "Advanced"
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
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};
