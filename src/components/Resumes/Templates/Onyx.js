import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Onyx = ({ componentRef, filter = null }) => {
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
  return (
    <div ref={componentRef} className="flex w-a4W bg-white mx-auto h-a4H my-5">
      <div
        className="flex flex-col items-center h-full w-64 px-3 py-2"
        style={{ backgroundColor: `rgba(${0}, ${0}, ${0}, 0.05)` }}
      >
        <h2 className="text-3xl font-bold text-gray-700 capitalize tracking-wide mt-2">
          {rename(profile?.firstName)} {rename(profile?.lastName)}
        </h2>
        <h1 className="mt-2 text-xs uppercase font-bold text-gray-500 tracking-wider">
          {profile?.role}
        </h1>
        <div className="mt-10 w-full">
          <h3 className="text-[18px] text-gray-500 uppercase font-extrabold tracking-wide border-b-2 border-gray-300">
            Personal Info
          </h3>
          <div className="flex justify-between items-center mt-3">
            <h6 className="text-xs font-bold text-gray-600">Email</h6>
            <h6 className={`text-xs ${filter?.removeEmail ? "blur" : ""} `}>{profile?.email}</h6>
          </div>
          <div className="flex justify-between items-center mt-3">
            <h6 className="text-xs font-bold text-gray-600">Phone Number</h6>
            <h6 className={`text-xs ${filter?.removePhoneNumber ? "blur" : ""}`}>
              {profile?.phone}
            </h6>
          </div>
          <div className="flex justify-between items-center mt-3">
            <h6 className="text-xs font-bold text-gray-600">Date Of Birth</h6>
            <h6 className="text-xs">{profile?.dob}</h6>
          </div>

          {social?.filter((option) => option?.enabled)?.length > 0 && (
            <div className="mb-2">
              {social?.map((option) => {
                if (option?.enabled === true) {
                  return (
                    <div key={option?._id} className="flex justify-between items-center mt-3">
                      <h6 className="text-xs font-bold text-gray-600">{option?.network}</h6>
                      <a href={option?.url} className="text-xs">
                        {option?.username}
                      </a>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>

        {certifications?.filter((certification) => certification?.enabled)?.length > 0 && (
          <div className="mt-5 w-full">
            <h3 className="text-[18px] text-gray-500 uppercase font-extrabold tracking-wide border-b-2 border-gray-300">
              Certifications
            </h3>

            <div>
              {certifications?.map((certification) => {
                if (certification?.enabled === true) {
                  return (
                    <div
                      key={certification?._id}
                      className="flex justify-between items-center mt-2 mx-1 w-56"
                    >
                      <div>
                        <h6 className="text-xs font-bold">{certification?.title}</h6>
                        <h6 className="text-xs">{certification?.issuer}</h6>
                      </div>
                      <h6 className="text-xs">{new Date(certification?.date).getFullYear()}</h6>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {work?.filter((option) => option?.enabled)?.length > 0 && (
          <div className="mt-5">
            <h3 className="text-[18px] text-gray-500 uppercase font-extrabold tracking-wide border-b-2 border-gray-300">
              Work Experience
            </h3>

            <div>
              {work.map((option) => {
                if (option?.enabled === true) {
                  return (
                    <div key={option?._id} className="flex justify-between mt-2 mx-1 w-56">
                      <div>
                        <h6 className="text-xs font-bold">{option?.company}</h6>
                        <h6 className="text-xs">{option?.designation}</h6>
                      </div>
                      <h6 className="text-xs">
                        {new Date(option?.to).getMonth() - new Date(option?.from).getMonth()} Months
                      </h6>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
          <div className="w-full mt-5">
            <h3 className="text-[18px] text-gray-500 uppercase font-extrabold tracking-wide border-b-2 border-gray-300">
              Skills
            </h3>

            {skills?.map((skill) => {
              if (skill?.enabled === true) {
                return (
                  <div key={skill?._id} className="mt-2">
                    <div className="mb-1 flex justify-between">
                      <h6 className="text-sm font-bold capitalize">{skill?.name}</h6>
                      <span className="capitalize text-xs">{skill?.level}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}

        {languages?.filter((language) => language?.enabled)?.length > 0 && (
          <div className="w-full mt-5">
            <h3 className="text-[18px] text-gray-500 uppercase font-extrabold tracking-wide border-b-2 border-gray-300">
              Languages
            </h3>
            <div>
              {languages?.map((language) => {
                if (language?.enabled === true) {
                  return (
                    <div
                      key={language?._id}
                      className="flex justify-between items-center mt-2 mx-1 w-56"
                    >
                      <h6 className="text-xs font-bold">{language?.name}</h6>
                      <h6 className="text-xs">{language?.fluency}</h6>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
      <div className="w-11/12 mx-4 py-4">
        {objective && (
          <div className="px-2">
            <h3 className="text-[20px] text-gray-500 uppercase font-extrabold tracking-wider">
              Objective
            </h3>
            <div className="border-b-2 mb-2 w-full mx-auto border-gray-300"></div>
            <h4 className="markdown text-[13.5px] tracking-wide font-semibold text-gray-700">
              <MarkdownRenderer>{objective}</MarkdownRenderer>
            </h4>
          </div>
        )}
        {education?.filter((option) => option?.enabled)?.length > 0 && (
          <div className="mt-5 w-full">
            <h3 className="text-[20px] text-gray-500 uppercase font-extrabold tracking-wider">
              Education
            </h3>
            <div className="border-b-2 mb-2 w-full mx-auto border-gray-300"></div>
            {education
              ?.filter((option) => option?.enabled === true)
              .map((option) => (
                <div key={option?._id} className="flex justify-between items-start mb-3">
                  <div className="leading-4">
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
                    <span className="text-[13px]">
                      {option?.fieldOfStudy} &middot; {option?.gpa}
                    </span>
                    {option?.summary?.enabled && (
                      <h4 className="markdown text-[13px] tracking-wide font-semibold text-gray-700 mt-1">
                        <MarkdownRenderer>{option?.summary?.data}</MarkdownRenderer>
                      </h4>
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-wide">
                    {new Date(option?.startDate).getFullYear()} -{" "}
                    {new Date(option?.endDate).getFullYear()}
                  </span>
                </div>
              ))}
          </div>
        )}
        {projects?.filter((project) => project?.enabled)?.length > 0 && (
          <div className="mt-5 w-full">
            <h3 className="text-[20px] text-gray-500 uppercase font-extrabold tracking-wider">
              Projects
            </h3>
            <div className="border-b-2 mb-2 w-full mx-auto border-gray-300"></div>

            <div className="mt-2">
              {projects?.map((project) => {
                if (project?.enabled === true) {
                  return (
                    <div key={project?._id} className="mb-2">
                      <div className="flex flex-col justify-between">
                        <div className="tracking-wide text-sm uppercase font-bold">
                          {project?.name}
                        </div>
                        <div className="flex items-center mb-1 font-semibold text-xs">
                          <span className="text-xs tracking-wider mr-1 font-extrabold text-gray-600">
                            Link:{" "}
                          </span>
                          <div className="relative">
                            <div>{project?.website}</div>
                            <div className="absolute w-full left-0 bottom-0 border-t border-gray-500"></div>
                          </div>
                        </div>
                      </div>
                      {project?.summary?.enabled && (
                        <div className="markdown text-[13px] font-semibold text-gray-800">
                          <MarkdownRenderer>{project?.summary?.data}</MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        <div className="mt-5 w-full">
          {awards?.filter((award) => award?.enabled)?.length > 0 && (
            <>
              {" "}
              <h3 className="text-[20px] text-gray-500 uppercase font-extrabold tracking-wider">
                Awards
              </h3>
              <div className="border-b-2 mb-2 w-full mx-auto border-gray-300"></div>
              <div className="mt-2">
                {awards?.map((award) => {
                  if (award?.enabled === true) {
                    return (
                      <div key={award?._id} className="mb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-[13.5px] uppercase tracking-wide font-bold mb-1">
                            {award?.name},{" "}
                            <span className="text-xs normal-case font-base text-gray-600">
                              Awarded by <span className="capitalize">{award?.awarder}</span>
                            </span>
                          </div>
                          <div className="text-xs font-bold text-gray-500">
                            {new Date(award?.date).getFullYear()}
                          </div>
                        </div>

                        {award?.summary?.enabled && (
                          <div className="markdown text-xs">
                            <MarkdownRenderer>{award?.summary?.data}</MarkdownRenderer>
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </>
          )}

          {hobbies?.filter((hobby) => hobby?.enabled)?.length > 0 && (
            <div className="w-full mt-5">
              <h3 className="text-[18px] text-gray-500 uppercase font-extrabold tracking-wide border-b-2 border-gray-300">
                Hobbies
              </h3>

              {hobbies?.map((hobby) => {
                if (hobby?.enabled === true) {
                  return (
                    <h6
                      key={hobby?._id}
                      className="mt-1 text-sm font-semibold text-gray-600 text-start"
                    >
                      {hobby?.name}
                    </h6>
                  );
                }
              })}
            </div>
          )}
        </div>

        {/* <div className='w-full mt-3'>
          <h3
            className='text-xs uppercase font-bold border-b-2 py-2 tracking-wide'
            style={{
              borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
              color: `rgba(${r}, ${g}, ${b}, ${a})`,
            }}
          >
            Extracurricular
          </h3>

          <div className='mt-4'>
            <div className='mb-4'>
              <h6 className='text-[13.5px] uppercase tracking-wide font-bold mb-1'>
                Inter College Football
              </h6>
              <h6 className='text-xs'>
                Placed 2nd in the inter college football.
              </h6>
            </div>
            <div className='mb-4'>
              <h6 className='text-[13.5px] uppercase tracking-wide font-bold mb-1'>
                Inter College Football
              </h6>
              <h6 className='text-xs'>
                Placed 2nd in the inter college football.
              </h6>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

// export default function Preview({ userInfo }) {
//   return (
//     userInfo && (
//           <hr />
//           <hr />
//         </div>
//
//           <hr />
//           <div>
//             <h3>Areas of Expertise</h3>
//             <div>
//               <h5>Tech skills:</h5> {userInfo.techSkills}
//             </div>
//             <h5>Non Tech Skills:</h5>
//             {userInfo.nonTechSkills &&
//               userInfo.nonTechSkills.map((nts) => {
//                 return (
//                   <div key={nts.id} id={nts.id}>
//                     <div>•{nts.nonTechSkill}</div>
//                   </div>
//                 );
//               })}
//           </div>
//           <hr />
//
//           <hr />
//         </div>
//       </div>
//     )
//   );
// }
