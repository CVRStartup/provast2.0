import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Moscow = ({ componentRef }) => {
  const {
    profile,
    objective,
    education,
    projects,
    work,
    skills,
    hobbies,
    languages,
    layout,
  } = useResumeContext();
  console.log(profile);
  return (
    <>
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5`}
      >
        <div className="p-7 h-full bg-gradient-to-b from-purple-100 to-pink-50">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-[25%] h-40">
              {profile && (
                <div className="w-40 h-40 rounded-full overflow-hidden">
                  <img
                    src={profile?.image}
                    className="rounded-full object-cover border-4 border-white"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col w-[70%] py-2">
              <div className="flex flex-col">
                <h1 className="text-2xl italic font-bold ">
                  {rename(profile?.firstName)} {rename(profile?.lastName)}{" "}
                  {profile?.role && ` , ${profile?.role}`}
                </h1>
                <p className="text-sm text-gray-600 font-semibold tracking-wide mb-3">
                  {profile?.email} &middot; {profile?.phone}
                </p>
                {objective && (
                  <div className="markdown text-[13.5px]">
                    <MarkdownRenderer>{objective}</MarkdownRenderer>
                  </div>
                )}
              </div>
            </div>
          </div>

          {work?.filter((option) => option?.enabled)?.length > 0 && (
            <div className="flex items-start justify-between mt-4">
              <div className="flex justify-center w-[25%]">
                <h1 className="text-gray-600 italic font-semibold">
                  Work Experience
                </h1>
              </div>
              <div className="w-[70%]">
                {work
                  ?.filter((option) => option?.enabled === true)
                  .map((option) => (
                    <div key={option?._id} className="flex flex-col mb-2">
                      <h1 className="text-[14px] font-semibold">
                        {option?.company},{" "}
                        <span className="text-gray-500">
                          {option?.designation}
                        </span>
                        .
                      </h1>
                      <div className="italic text-[13.5px] text-gray-400 font-semibold tracking-widest mb-1">
                        {`${
                          months[new Date(option?.from).getMonth() + 1]
                        } ${new Date(option?.from).getFullYear()} - ${
                          months[new Date(option?.to).getMonth() + 1]
                        } ${new Date(option?.to).getFullYear()}`}
                      </div>
                      {option?.summary?.enabled && (
                        <div className="markdown text-[13px]">
                          <MarkdownRenderer>
                            {option?.summary?.data}
                          </MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {education?.filter((education) => education?.enabled)?.length > 0 && (
            <div className="flex items-start justify-between mt-4">
              <div className="flex justify-center w-[25%]">
                <h1 className="text-gray-600 italic font-semibold">
                  Education
                </h1>
              </div>
              <div className="w-[70%]">
                {education
                  ?.filter((option) => option?.enabled === true)
                  .map((option) => (
                    <div key={option?._id} className="flex flex-col mb-2">
                      <h1 className="text-[14px] font-semibold">
                        {option?.fieldOfStudy} from {option?.institution}.
                      </h1>
                      <div className="italic text-[13.5px] text-gray-400 font-semibold tracking-widest mb-1">
                        {`${
                          months[new Date(option?.startDate).getMonth() + 1]
                        } ${new Date(option?.startDate).getFullYear()} - ${
                          months[new Date(option?.endDate).getMonth() + 1]
                        } ${new Date(option?.endDate).getFullYear()}, ${
                          option?.gpa
                        } CGPA`}
                      </div>
                      {option?.summary?.enabled && (
                        <div className="markdown text-[13px]">
                          <MarkdownRenderer>
                            {option?.summary?.data}
                          </MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {projects?.filter((project) => project?.enabled)?.length > 0 && (
            <div className="flex items-start justify-between mt-4">
              <div className="flex justify-center w-[25%]">
                <h1 className="text-gray-600 italic font-semibold">Projects</h1>
              </div>
              <div className="w-[70%]">
                {projects
                  ?.filter((project) => project?.enabled === true)
                  .map((project) => (
                    <div key={project?._id} className="flex flex-col mb-2">
                      <div className="flex justify-between">
                        <h1 className="text-[14px] font-semibold">
                          {project?.name}
                        </h1>
                        <div className="italic text-[13.5px] text-gray-400 font-semibold tracking-widest mb-1">
                          {`${
                            months[new Date(project?.from).getMonth() + 1]
                          } ${new Date(project?.from).getFullYear()} - ${
                            months[new Date(project?.to).getMonth() + 1]
                          } ${new Date(project?.to).getFullYear()}`}
                        </div>
                      </div>
                      {project?.summary?.enabled && (
                        <div className="markdown text-[13px]">
                          <MarkdownRenderer>
                            {project?.summary?.data}
                          </MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {hobbies?.filter((hobby) => hobby?.enabled)?.length > 0 && (
            <div className="flex items-start justify-between mt-4">
              <div className="flex justify-center w-[25%]">
                <h1 className="text-gray-600 italic font-semibold">Hobbies</h1>
              </div>
              <div className="w-[70%] grid grid-cols-4 gap-2">
                {hobbies
                  ?.filter((hobby) => hobby?.enabled === true)
                  .map((hobby) => (
                    <div key={hobby?._id}>
                      <h1 className="text-[14px] font-semibold">
                        {hobby?.name}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
            <div className="flex items-start justify-between mt-4">
              <div className="flex items-center justify-center w-[25%]">
                <h1 className="text-gray-600 italic font-semibold">Skills</h1>
              </div>
              <div className="grid grid-cols-2 gap-2 w-[70%]">
                {skills
                  ?.filter((skill) => skill?.enabled === true)
                  .map((skill) => (
                    <div
                      key={skill?._id}
                      className="flex items-center justify-between mr-2"
                    >
                      <h1 className="text-[14px] font-semibold">
                        {skill?.name}
                      </h1>
                      <span className="text-[13px] italic text-gray-600 font-semibold">
                        {skill?.level}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {languages?.filter((language) => language?.enabled)?.length > 0 && (
            <div className="flex items-start justify-between mt-4">
              <div className="flex justify-center w-[25%]">
                <h1 className="text-gray-600 italic font-semibold">
                  Langugages
                </h1>
              </div>
              <div className="w-[70%] grid grid-cols-2 gap-2">
                {languages
                  ?.filter((language) => language?.enabled === true)
                  .map((language) => (
                    <div
                      key={language?._id}
                      className="flex items-center justify-between mr-2"
                    >
                      <h1 className="text-[14px] font-semibold">
                        {language?.name}
                      </h1>
                      <span className="text-[13px] italic text-gray-600 font-semibold">
                        {language?.fluency}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
