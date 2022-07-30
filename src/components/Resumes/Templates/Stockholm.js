import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Stockholm = ({ componentRef }) => {
  const {
    profile,
    social,
    objective,
    education,
    awards,
    certifications,
    projects,
    work,
    skills,
    hobbies,
    languages,
    layout,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  return (
    <>
      <div ref={componentRef} className={`flex bg-white w-a4W mx-auto h-a4H my-5 text-sm`}>
        <div
          className="h-full py-3 px-7 w-[93%]"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <div className="text-center font-bold py-1">
            <h1 className="text-4xl uppercase tracking-wide">
              {rename(profile?.firstName)} {rename(profile?.lastName)}
            </h1>
            <h4 className="my-1 text-lg tracking-wide">{profile?.role}</h4>
            <div className="mt-1 flex items-center justify-center">
              <span className="flex items-center justify-center mr-3">
                <span className="mr-2">E-Mail:</span>
                <span className="font-medium">{profile?.email}</span>
              </span>
              <span className="flex items-center justify-center">
                <span className="mr-2">Mobile: </span>{" "}
                <span className="font-medium">{profile?.phone}</span>
              </span>
            </div>
          </div>
          {objective && (
            <div className="my-1">
              <h1 className="text-center text-xl uppercase tracking-wide font-bold border-b-2 border-gray-700">
                Summary
              </h1>
              <div className="markdown my-2">
                <MarkdownRenderer>{objective && objective}</MarkdownRenderer>
              </div>
            </div>
          )}
          {projects?.filter((project) => project?.enabled)?.length > 0 && (
            <div>
              <h1 className="text-center pt-2 text-xl uppercase tracking-wide font-bold border-b-2 border-gray-700">
                Projects
              </h1>
              {projects
                ?.filter((project) => project.enabled === true)
                .map((project) => (
                  <div key={project._id} className="mb-5">
                    <div className="flex mt-3 font-bold flex-wrap items-start text-md">
                      <div className="flex items-center justify-between w-[14%]">
                        <h2>Project Title</h2>
                        <h2>:</h2>
                      </div>
                      <p className="ml-2 w-[83%] ">{project.name}</p>
                    </div>
                    <div className="flex mt-[3px] flex-wrap items-start text-[13.2px]">
                      <div className="flex items-center justify-between w-[14%]">
                        <h2>Project Link</h2>
                        <h2>:</h2>
                      </div>
                      <p className="ml-2 w-[83%] ">{project.website}</p>
                    </div>

                    <div className="flex mt-[3px] flex-wrap items-start text-[13.2px]">
                      <div className="flex  items-center justify-between w-[14%]">
                        <h2>Description</h2>
                        <h2>:</h2>
                      </div>
                      {project.summary?.enabled && (
                        <p className="ml-2 w-[83%]">{project.summary?.data}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
          {education?.filter((option) => option?.enabled)?.length > 0 && (
            <div>
              <h1 className="text-center text-xl uppercase tracking-wide font-bold border-b-2 border-gray-700">
                Education
              </h1>
              {education
                ?.filter((option) => option.enabled === true)
                .map((option) => (
                  <div key={option._id} className="flex items-start mt-2 text-[13.2px]">
                    <div className="w-[14%]">{new Date(option.endDate).getFullYear()}</div>
                    <div className="w-[83%]">
                      {option.typeOfDegree} in {option.fieldOfStudy} from {option.institution}, with{" "}
                      {option.gpa} CGPA.
                    </div>
                  </div>
                ))}
            </div>
          )}
          {awards?.filter((award) => award?.enabled)?.length > 0 && (
            <div className="my-4">
              <h1 className="text-center text-xl uppercase tracking-wide font-bold border-b-2 border-gray-700">
                Awards
              </h1>
              <div className="my-2 text-[13.2px]">
                {awards
                  ?.filter((award) => award.enabled === true)
                  .map((award) => (
                    <div key={award._id} className="flex mt-1 items-start">
                      <ul className="ml-2 list-disc">
                        <li>
                          {award.name}, {award.summary?.enabled ? award.summary?.data : ""}
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
            <>
              <h1 className="text-center text-xl uppercase tracking-wide font-bold border-b-2 border-gray-700">
                Skills
              </h1>
              <div className="px-8 my-2 flex flex-col -mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                  <div className="">
                    <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                      <thead className="">
                        <tr className="">
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border border-gray-600 py-1 pr-3 text-left text-sm font-semibold text-gray-900 pl-[15px]"
                          >
                            Programing Language
                          </th>

                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-l-0 border border-gray-600 px-3 py-1 text-left text-sm font-semibold text-gray-900"
                          >
                            Level (Beginner / Intermediate / Expert)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {skills
                          ?.filter((skill) => skill.enabled === true)
                          .filter(
                            (skill) =>
                              skill.level.toLowerCase() === "beginner" ||
                              skill.level.toLowerCase() === "intermediate" ||
                              skill.level.toLowerCase() === "expert"
                          )
                          .map((skill, skillIdx) => (
                            <tr key={skill._id} className="">
                              <td className="border-b border-x border-gray-600 whitespace-nowrap px-3 py-1 text-sm">
                                {skill.name}
                              </td>
                              <td className="border-b border-r border-gray-600 whitespace-nowrap px-3 py-1 text-sm">
                                {skill.level}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {profile?.dob && languages?.filter((language) => language?.enabled)?.length > 0 && (
            <div>
              <h1 className="text-center text-xl uppercase tracking-wide font-bold border-b-2 border-gray-700">
                Personal Snippets
              </h1>
              <div className="flex flex-wrap mt-4 items-start text-[13.2px]">
                <div className="flex items-center justify-between w-[17%]">
                  <h2>Date of Birth</h2>
                  <h2>:</h2>
                </div>
                <p className="ml-2 w-[80%] ">{`${
                  months[new Date(profile?.dob).getMonth() + 1]
                } ${new Date(profile?.dob).getDate()}, ${new Date(profile?.dob).getFullYear()}`}</p>
              </div>
              <div className="flex flex-wrap mt-1 items-start text-[13.2px]">
                <div className="flex items-center justify-between w-[17%]">
                  <h2>Languages Known</h2>
                  <h2>:</h2>
                </div>
                <div className="flex flex-wrap ml-2 w-[80%] ">
                  {languages
                    ?.filter((langauge) => langauge.enabled === true)
                    .map((language, index) => (
                      <span key={language._id} className="mr-2">
                        {language.name}
                        {index ===
                        languages?.filter((langauge) => langauge.enabled === true).length - 1
                          ? "."
                          : ","}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="h-full w-[7%]"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
        ></div>
      </div>
    </>
  );
};
