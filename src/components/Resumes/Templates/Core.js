import Image from "next/image";
import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

const icons = {
  linkedin: { id: 1, icon: AiFillLinkedin },
  github: { id: 2, icon: AiFillGithub },
  instagram: { id: 3, icon: AiFillInstagram },
  youtube: { id: 4, icon: AiFillYoutube },
  facebook: { id: 5, icon: AiFillFacebook },
};

export const Core = ({ componentRef, filter = null }) => {
  const {
    profile,
    social,
    education,
    awards,
    certifications,
    projects,
    work,
    skills,
    languages,
    layout,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  return (
    <>
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5`}
      >
        <div className='p-7'>
          <div className='flex justify-between items-center '>
            <div className='flex items-center'>
              {profile && (
                <div className="w-36 h-36 rounded-md overflow-hidden mr-4">
                  <img
                    src={profile?.image}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div className='flex flex-col'>
                <h2
                  style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                  className='text-3xl font-bold capitalize'
                >
                  {rename(profile?.firstName)} {rename(profile?.lastName)}
                </h2>
                <h1 className='text-xs uppercase font-bold text-gray-500 tracking-wider'>
                  {profile?.role}
                </h1>

                <div className='mt-5'>
                  <div
                    style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                    className='w-full flex items-center justify-start'
                  >
                    <BiPhone size={20} />
                    <span className='ml-2 text-sm font-semibold text-gray-700'>
                      {profile?.phone}
                    </span>
                  </div>
                  <div
                    style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                    className='w-full flex items-center justify-start'
                  >
                    <AiOutlineCalendar size={20} />
                    <span className='ml-2 text-sm font-semibold text-gray-700'>{profile?.dob}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {languages?.filter((language) => language?.enabled)?.length > 0 && (
                <>
                  <h4
                    style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                    className='uppercase text-sm font-semibold mt-1 '
                  >
                    Languages
                  </h4>

                  <div className='flex'>
                    {languages?.map((langauge) => {
                      if (langauge?.enabled === true) {
                        return (
                          <div key={langauge?._id}>
                            <h5 className='text-sm font-semibold mr-4'>{langauge?.name}</h5>
                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              )}
              <div
                style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                className='w-full my-1 flex items-center justify-start'
              >
                <FiMail size={18} />
                <span className='ml-2 text-sm font-semibold text-gray-700'>{profile?.email}</span>
              </div>

              {social?.map((option) => {
                const Icon = icons[option.network.toLowerCase()]?.icon;
                if (option?.enabled === true) {
                  return (
                    <div
                      key={option._id}
                      style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                      className='w-full my-1 flex items-center justify-start'
                    >
                      {Icon && <Icon size={20} />}
                      <span className='ml-2 text-sm font-semibold text-gray-700'>
                        {option?.username}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className='flex justify-between mt-2'>
            {education?.filter((option) => option?.enabled).length > 0 && (
              <div className='w-full'>
                <h4
                  style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                  className='uppercase font-semibold'
                >
                  Education
                </h4>
                {education
                  ?.filter((option) => option?.enabled === true)
                  .map((option) => (
                    <div key={option?._id} className='mb-2'>
                      <div className='flex justify-between my-1'>
                        <div className='text-[15px] font-semibold'>
                          <p className='leading-4'>{option?.institution}</p>
                          <p className='text-[13.5px] text-gray-600'>
                            {option?.fieldOfStudy} &middot; {option?.gpa}
                          </p>
                        </div>

                        <div className='text-xs font-bold text-gray-500'>
                          {`(${
                            months[new Date(option?.startDate?.substring(0, 10)).getMonth() + 1]
                          } ${new Date(option?.startDate?.substring(0, 10)).getFullYear()}) - (${
                            months[new Date(option?.endDate?.substring(0, 10)).getMonth() + 1]
                          } ${new Date(option?.endDate?.substring(0, 10)).getFullYear()})`}
                        </div>
                      </div>

                      {option?.summary?.enabled && (
                        <div className='markdown text-[13.5px] mt-1'>
                          <MarkdownRenderer>{option?.summary?.data}</MarkdownRenderer>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div>
            {work?.filter((option) => option?.enabled)?.length > 0 && (
              <div>
                <h4
                  style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                  className='uppercase font-semibold mt-2'
                >
                  Experience
                </h4>
                {work?.map((option) => {
                  if (option?.enabled === true) {
                    return (
                      <div key={option?._id} className='mb-2'>
                        <div className='flex items-center justify-between'>
                          <div className='text-[15px] font-semibold'>
                            {option?.company},{" "}
                            <span className='text-[12px] capitalize font-base text-gray-600'>
                              {option?.designation}
                            </span>
                          </div>

                          <div className='text-xs font-bold text-gray-500'>
                            {`(${
                              months[new Date(option?.from?.substring(0, 10)).getMonth() + 1]
                            } ${new Date(option?.from?.substring(0, 10)).getFullYear()}) - (${
                              months[new Date(option?.to?.substring(0, 10)).getMonth() + 1]
                            } ${new Date(option?.to?.substring(0, 10)).getFullYear()})`}
                          </div>
                        </div>

                        {option?.summary?.enabled && (
                          <div className='markdown text-[13.5px]'>
                            <MarkdownRenderer>{option?.summary?.data}</MarkdownRenderer>
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {projects?.filter((project) => project?.enabled)?.length > 0 && (
              <div className='mt-4'>
                <h4
                  style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                  className='uppercase font-semibold mt-1'
                >
                  Projects
                </h4>
                {projects?.map((project) => {
                  if (project?.enabled === true) {
                    return (
                      <div key={project?._id} className='mb-2'>
                        <div>
                          <div className='flex justify-between'>
                            <div className='text-[15px] font-semibold'>{project?.name}</div>
                            <div className='relative font-semibold text-[13px] '>
                              <div>{project?.website}</div>
                              <div className='absolute w-full bottom-1 left-0 border-t border-gray-500'></div>
                            </div>
                          </div>
                          <div className='markdown capitalize text-[13px]'>
                            <MarkdownRenderer>{project?.summary?.data}</MarkdownRenderer>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
          {certifications?.filter((certification) => certification?.enabled)?.length > 0 && (
            <div className='mt-4'>
              <h3
                style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                className='uppercase font-semibold'
              >
                Certifications
              </h3>
              {certifications?.map((certification) => {
                if (certification?.enabled === true) {
                  return (
                    <div key={certification?._id} className='relative mb-2'>
                      <div className='text-[15px] font-semibold'>
                        {certification?.title},{" "}
                        <span className='text-[12px] font-base text-gray-500'>
                          {certification?.issuer}
                        </span>
                      </div>
                      <div className='absolute top-0 right-0 text-sm font-light'>
                        {new Date(certification?.date).getFullYear()}
                      </div>

                      <div className='markdown capitalize text-xs'>
                        <MarkdownRenderer>{certification?.summary?.data}</MarkdownRenderer>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
          <div className='flex justify-between'>
            {awards?.filter((award) => award?.enabled)?.length > 0 && (
              <div className='w-[50%]'>
                <h3
                  style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                  className='uppercase font-semibold mt-3'
                >
                  Awards
                </h3>

                {awards?.map((award) => {
                  if (award?.enabled === true) {
                    return (
                      <div key={award?._id} className='mb-2'>
                        <div className='flex items-center justify-between'>
                          <div className='text-[15px] font-semibold leading-3'>
                            {award?.name},{" "}
                            <span className='text-[12px] capitalize tracking-wide text-gray-500'>
                              awarded by {award?.awarder}
                            </span>
                          </div>
                          <div className='text-xs font-bold text-gray-500'>
                            {new Date(award?.date).getFullYear()}
                          </div>
                        </div>

                        <div className='markdown capitalize text-xs mt-1'>
                          <MarkdownRenderer>{award?.summary?.data}</MarkdownRenderer>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
            <div className='w-[45%]'>
              {skills?.filter((skill) => skill?.enabled).length > 0 && (
                <div>
                  <h4
                    style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}
                    className='uppercase font-semibold mt-3'
                  >
                    Skills
                  </h4>

                  {skills?.map((skill) => {
                    if (skill?.enabled === true) {
                      return (
                        <div key={skill?._id} className='flex justify-between items-center my-1'>
                          <h4 className='text-xs capitalize font-semibold'>{skill?.name}</h4>
                          <h4 className='text-xs capitalize font-semibold'>{skill?.level}</h4>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
