import Image from "next/image";
import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const NonCore = React.forwardRef(function NonCore({ componentRef }) {
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
    <div
      ref={componentRef}
      style={{ fontFamily: layout?.font }}
      className="flex my-5 w-a4W bg-white mx-auto h-a4H"
    >
      <div
        className="flex flex-col items-center h-full w-64 px-3"
        style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.08)` }}
      >
        {/* <img className="mt-5 w-36 h-36 rounded-full object-cover" src={profile?.image} alt="" /> */}
        {profile && (
          <div className="mt-5 w-40 h-40 rounded-full overflow-hidden">
            <img src={profile?.image} className="rounded-full object-cover" />
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-700 capitalize tracking-wide mt-2">
          {rename(profile?.firstName)} {rename(profile?.lastName)}
        </h2>
        <h1 className="mt-2 text-xs uppercase font-bold text-gray-500 tracking-wider">
          {profile?.role}
        </h1>
        <div
          className="relative mx-4 mt-10 w-52 border-2 rounded-md"
          style={{ borderColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
        >
          <div
            className="absolute -top-[11.5px] right-[93px]"
            style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
          >
            <BsFillSunFill size={21} />
          </div>
          <div className="flex flex-col items-center mt-3">
            <h6 className="text-xs font-bold text-gray-600">Phone Number</h6>
            <h6 className="text-xs">{profile?.phone}</h6>
          </div>
          <div className="flex flex-col items-center mt-3">
            <h6 className="text-xs font-bold text-gray-600">Date Of Birth</h6>
            <h6 className="text-xs">{profile?.dob}</h6>
          </div>
          <div className="flex flex-col items-center mt-2">
            <h6 className="text-xs font-bold text-gray-600">Email Address</h6>
            <h6 className="text-xs">{profile?.email}</h6>
          </div>
          {social?.filter((option) => option?.enabled)?.length > 0 && (
            <div className="mb-2">
              {social?.map((option) => {
                if (option?.enabled === true) {
                  return (
                    <div
                      key={option?._id}
                      className="flex flex-col items-center mt-2"
                    >
                      <h6 className="text-xs font-bold text-gray-600">
                        {option?.network}
                      </h6>
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

        {certifications?.filter((certification) => certification?.enabled)
          ?.length > 0 && (
          <div className="mt-5">
            <h3
              className="text-center text-xs uppercase font-bold tracking-wide"
              style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
            >
              Certifications
            </h3>
            <div
              className="border-b-2 my-1 w-16 mx-auto"
              style={{ borderColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
            ></div>

            <div>
              {certifications?.map((certification) => {
                if (certification?.enabled === true) {
                  return (
                    <div
                      key={certification?._id}
                      className="flex justify-between items-center mt-2 mx-1 w-56"
                    >
                      <div>
                        <h6 className="text-xs font-bold">
                          {certification?.title}
                        </h6>
                        <h6 className="text-xs">{certification?.issuer}</h6>
                      </div>
                      <h6 className="text-xs">
                        {new Date(certification?.date)?.getFullYear()}
                      </h6>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
          <div className="w-full mt-2 px-2">
            <h3
              className="text-center text-xs uppercase font-bold tracking-wide"
              style={{
                color: `rgba(${r}, ${g}, ${b}, ${a})`,
              }}
            >
              Skills
            </h3>
            <div
              className="border-b-2 my-1 w-8 mx-auto"
              style={{ borderColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
            ></div>

            {skills?.map((skill) => {
              if (skill?.enabled === true) {
                return (
                  <div key={skill?._id} className="mt-2">
                    <div className="mb-1 flex justify-between">
                      <h6 className="text-xs font-bold capitalize">
                        {skill?.name}
                      </h6>
                      <span className="capitalize text-xs">{skill?.level}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
        {languages?.filter((language) => language?.enabled)?.length > 0 && (
          <div className="mt-2">
            <h3
              className="text-center text-xs uppercase font-bold tracking-wide"
              style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
            >
              Languages
            </h3>
            <div
              className="border-b-2 my-1 w-10 mx-auto"
              style={{ borderColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
            ></div>
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
        {hobbies?.filter((hobby) => hobby?.enabled)?.length > 0 && (
          <div className="mt-2 text-center">
            <h3
              className="text-xs uppercase font-bold tracking-wide"
              style={{
                borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                color: `rgba(${r}, ${g}, ${b}, ${a})`,
              }}
            >
              Hobbies and Interests
            </h3>
            <div
              className="border-b-2 my-1 w-20 mx-auto"
              style={{ borderColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
            ></div>

            {hobbies?.map((hobby) => {
              if (hobby?.enabled === true) {
                return (
                  <h6
                    key={hobby?._id}
                    className="mt-1 text-xs font-semibold text-gray-600"
                  >
                    {hobby?.name}
                  </h6>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="w-full mx-4 my-7">
        {objective && (
          <div className="">
            <h3
              className="text-xs uppercase font-bold tracking-wide"
              style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
            >
              Objective
            </h3>
            <div
              className="border-b-2 my-1 w-full mx-auto"
              style={{ borderColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
            ></div>
            <h4 className="markdown text-[13.5px] tracking-wide font-semibold text-gray-700">
              <MarkdownRenderer>{objective}</MarkdownRenderer>
            </h4>
          </div>
        )}
        {education?.filter((option) => option?.enabled)?.length > 0 && (
          <div className="mt-4 w-full">
            <h3
              className="text-xs uppercase font-bold border-b-2 py-2 tracking-wide"
              style={{
                borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                color: `rgba(${r}, ${g}, ${b}, ${a})`,
              }}
            >
              Education
            </h3>

            {education
              ?.filter((option) => option?.enabled === true)
              .map((option) => (
                <div
                  key={option?._id}
                  className="flex justify-between items-start mb-3 mt-2"
                >
                  <div className="leading-4">
                    <h3 className="text-[14px] font-semibold tracking-wide">
                      {option?.institution}
                    </h3>
                    <span className="text-[13px]">
                      {option?.fieldOfStudy} &middot; {option?.gpa}
                    </span>
                    {option?.summary?.enabled && (
                      <h4 className="markdown text-[13px] tracking-wide font-semibold text-gray-700 mt-1">
                        <MarkdownRenderer>
                          {option?.summary?.data}
                        </MarkdownRenderer>
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
          <div className="mt-3 w-full">
            <h3
              className="text-xs uppercase font-bold border-b-2 py-2 tracking-wide"
              style={{
                borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                color: `rgba(${r}, ${g}, ${b}, ${a})`,
              }}
            >
              Projects
            </h3>

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
                          <div className="w-auto">
                            <div>{project?.website}</div>
                            <div className="border-t border-gray-700"></div>
                          </div>
                        </div>
                      </div>
                      {project?.summary?.enabled && (
                        <div className="markdown capitalize text-[13px] font-semibold text-gray-800">
                          <MarkdownRenderer>
                            {project?.summary?.data}
                          </MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {work?.filter((option) => option?.enabled)?.length > 0 && (
          <div className="mt-4 w-full">
            <h3
              className="text-xs uppercase font-bold border-b-2 py-2 tracking-wide"
              style={{
                borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                color: `rgba(${r}, ${g}, ${b}, ${a})`,
              }}
            >
              Experience
            </h3>

            <div className="mt-2">
              {work?.map((option) => {
                if (option?.enabled === true) {
                  return (
                    <div key={option?._id} className="mb-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm uppercase tracking-wide font-bold mb-1">
                          {option?.company},{" "}
                          <span className="text-xs capitalize font-base text-gray-800">
                            {option?.designation}
                          </span>
                        </div>

                        <div className="text-xs font-bold text-gray-500">
                          {`( ${
                            months[
                              new Date(
                                option?.from?.substring(0, 10)
                              ).getMonth() + 1
                            ]
                          } ${new Date(
                            option?.from?.substring(0, 10)
                          ).getFullYear()} ) - ( ${
                            months[
                              new Date(
                                option?.to?.substring(0, 10)
                              ).getMonth() + 1
                            ]
                          } ${new Date(
                            option?.to?.substring(0, 10)
                          ).getFullYear()} )`}
                        </div>
                      </div>

                      {option?.summary?.enabled && (
                        <div className="markdown capitalize text-[13px] font-semibold text-gray-800">
                          <MarkdownRenderer>
                            {option?.summary?.data}
                          </MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {awards?.filter((award) => award?.enabled)?.length > 0 && (
          <div className="mt-5 w-full">
            <h3
              className="text-xs uppercase font-bold border-b-2 py-2 tracking-wide"
              style={{
                borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                color: `rgba(${r}, ${g}, ${b}, ${a})`,
              }}
            >
              Awards
            </h3>

            <div className="mt-2">
              {awards?.map((award) => {
                if (award?.enabled === true) {
                  return (
                    <div key={award?._id} className="mb-2">
                      <div className="flex items-center justify-between">
                        <div className="text-[13.5px] uppercase tracking-wide font-bold mb-1">
                          {award?.name},{" "}
                          <span className="text-xs capitalize font-base text-gray-600">
                            awarded by {award?.awarder}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-gray-500">
                          {new Date(award?.date)?.getFullYear()}
                        </div>
                      </div>

                      {award.summary?.enabled && (
                        <div className="markdown capitalize text-xs">
                          <MarkdownRenderer>
                            {award?.summary?.data}
                          </MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

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
});

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
