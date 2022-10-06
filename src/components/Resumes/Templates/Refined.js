import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import { HeadingDivider } from "../Refined/HeadingDivider";

export const Refined = ({ componentRef, filter = null }) => {
  console.log(filter);
  const { profile, education, awards, certifications, projects, skills, languages, layout } =
    useResumeContext();
  return (
    <div ref={componentRef} className='w-a4W bg-white mx-auto h-a4H my-5'>
      <div className='px-14 py-8'>
        <div className='w-full border-b-2 border-gray-300 py-2 text-center'>
          <span className='text-4xl not-italic font-bold text-gray-700'>
            {rename(profile?.firstName)} {rename(profile?.lastName)}
          </span>
        </div>
        <div className='w-full border-gray-200 py-1 text-center mb-5'>
          <span className='text-md italic font-semibold text-gray-700'>
            <span className={`${filter?.removeEmail ? "blur" : ""} `}>{profile?.email}</span>{" "}
            <span className={`${filter?.removePhoneNumber ? "blur" : ""}`}>
              &middot; {profile?.phone}
            </span>
          </span>
        </div>
        {education?.filter((education) => education?.enabled)?.length > 0 && (
          <div className='w-full'>
            <HeadingDivider heading={"Education"} />
            {education
              ?.filter((option) => option?.enabled === true)
              .map((option) => (
                <div key={option?._id} className='flex justify-between items-start mb-3 mt-2'>
                  <div className='leading-4'>
                    <h3
                      className={`${
                        option?.typeOfDegree !== "School / Intermediate" &&
                        filter?.removeCollegeName
                          ? "blur"
                          : ""
                      } text-[13.5px] font-semibold tracking-wide`}
                    >
                      {option?.institution}
                    </h3>
                    <span className='text-[13px]'>
                      {option?.fieldOfStudy} &middot; {option?.gpa}
                    </span>
                    {option?.summary?.enabled && (
                      <h4 className='markdown text-[13px] tracking-wide font-semibold text-gray-700 mt-1'>
                        <MarkdownRenderer>{option?.summary?.data}</MarkdownRenderer>
                      </h4>
                    )}
                  </div>
                  <span className='text-xs font-bold tracking-wide'>
                    {new Date(option?.startDate).getFullYear()} -{" "}
                    {new Date(option?.endDate).getFullYear()}
                  </span>
                </div>
              ))}
          </div>
        )}
        <div>
          {/* <div>
            <HeadingDivider heading={"Work Experience"} />
            {work?.map((option) => {
              if (option.enabled === true) {
                return (
                  <div key={option._id} className='mb-2'>
                    <div className='flex items-center justify-between'>
                      <div className='text-[15px] font-semibold'>
                        {option.company},{" "}
                        <span className='text-[12px] capitalize font-base text-gray-600'>
                          {option.designation}
                        </span>
                      </div>

                      <div className='text-xs font-bold text-gray-500'>
                        {`( ${months[new Date(option.from?.substring(0, 10)).getMonth()]} ${new Date(
                          option.from?.substring(0, 10)
                        ).getFullYear()} ) - ( ${
                          months[new Date(option.to?.substring(0, 10)).getMonth()]
                        } ${new Date(option.to?.substring(0, 10)).getFullYear()} )`}
                      </div>
                    </div>

                    <div className='markdown text-[13.5px]'>
                      <MarkdownRenderer>{option?.summary}</MarkdownRenderer>
                    </div>
                  </div>
                );
              }
            })}
          </div> */}

          {projects?.filter((project) => project?.enabled)?.length > 0 && (
            <div className='mt-4'>
              <HeadingDivider heading={"Projects"} />
              {projects
                ?.filter((project) => project?.enabled === true)
                .map((project) => (
                  <div key={project?._id} className='mb-2'>
                    <div>
                      <div className='flex justify-between'>
                        <div className='text-[15px] font-semibold'>{project?.name}</div>
                        <div className='relative font-semibold text-sm '>
                          <div>{project?.website}</div>
                          <div className='absolute w-full bottom-1 left-0 border-t border-gray-500'></div>
                        </div>
                      </div>
                      {project?.summary?.enabled && (
                        <div className='markdown  text-xs'>
                          <MarkdownRenderer>{project?.summary?.data}</MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        {certifications?.filter((certification) => certification?.enabled)?.length > 0 && (
          <div className='mt-4'>
            <HeadingDivider heading={"Certification"} />
            {certifications
              ?.filter((certification) => certification?.enabled === true)
              .map((certification) => (
                <div key={certification?._id} className='relative mb-2'>
                  <div className='text-[15px] font-semibold'>
                    {certification?.title},{" "}
                    <span className='text-[12px] font-base text-gray-500'>
                      {certification?.issuer}
                    </span>
                  </div>
                  <div className='absolute top-0 right-0 text-xs font-bold text-gray-500'>
                    {new Date(certification?.date).getFullYear()}
                  </div>

                  {certification?.summary?.enabled && (
                    <div className='markdown  text-xs'>
                      <MarkdownRenderer>{certification?.summary?.data}</MarkdownRenderer>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
        {awards?.filter((award) => award?.enabled)?.length > 0 && (
          <div className='w-full'>
            <HeadingDivider heading={"Awards"} />
            {awards
              ?.filter((award) => award?.enabled === true)
              .map((award) => (
                <div key={award?._id} className='mb-2'>
                  <div className='flex items-center justify-between'>
                    <div className='text-[15px] font-semibold'>
                      {award?.name},{" "}
                      <span className='text-[12px]  tracking-wide text-gray-500'>
                        awarded by {award?.awarder}
                      </span>
                    </div>
                    <div className='text-xs font-bold text-gray-500'>
                      {new Date(award?.date).getFullYear()}
                    </div>
                  </div>

                  {award?.summary?.enabled && (
                    <div className='markdown  text-xs'>
                      <MarkdownRenderer>{award?.summary?.data}</MarkdownRenderer>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
          <div className='w-full'>
            <div>
              <HeadingDivider heading={"Skills"} />

              {skills
                ?.filter((skill) => skill?.enabled === true)
                .map((skill) => (
                  <div key={skill._id} className='flex justify-between items-center my-1'>
                    <h4 className='text-[15px]  capitalize font-semibold'>{skill?.name}</h4>
                    <h4 className='text-xs capitalize font-semibold'>{skill?.level}</h4>
                  </div>
                ))}
            </div>
          </div>
        )}

        {languages?.filter((language) => language?.enabled)?.length > 0 && (
          <div className='w-full'>
            <div>
              <HeadingDivider heading={"Languages"} />

              {languages
                ?.filter((language) => language?.enabled === true)
                .map((language) => (
                  <div key={language?._id} className='flex justify-between items-center my-1'>
                    <h4 className='text-[15px] capitalize font-semibold'>{language?.name}</h4>
                    <h4 className='text-xs capitalize font-semibold'>{language?.fluency}</h4>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
