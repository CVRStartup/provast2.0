import Image from "next/image";
import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiFillPhone,
  AiFillYoutube,
} from "react-icons/ai";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";

const icons = {
  linkedin: { id: 1, icon: AiFillLinkedin },
  github: { id: 2, icon: AiFillGithub },
  instagram: { id: 3, icon: AiFillInstagram },
  youtube: { id: 4, icon: AiFillYoutube },
  facebook: { id: 5, icon: AiFillFacebook },
};

export const Pro = ({ componentRef }) => {
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
  console.log(education);
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  return (
    <div ref={componentRef} className="w-a4W bg-white mx-auto h-a4H my-5">
      <div className="px-14 py-8">
        <div className=" flex justify-between items-center h-1/2">
          <div className="w-[30%]">
            <div className="w-full py-2">
              <span className="text-4xl not-italic font-bold text-gray-700">
                {rename(profile?.firstName)} {rename(profile?.lastName)}
              </span>
              {/* <span className='w-full font-bold text-xl block'>
                Indian Institute of Technology Madras (IIT)
              </span> */}
            </div>
            <div className="text-xs">
              {/* {session?.userDetails?.emailList[0]} &middot; {profile?.phone} */}
              <div className="flex flex-col justify-between items-center">
                <span className="flex w-full justify-start items-center">
                  <span>{<AiFillPhone />} </span>
                  <span className="mr-2"> +91-{profile?.phone}</span>
                </span>{" "}
                <span className="w-full flex justify-start items-center">
                  <span>{<AiFillMail />} </span>
                  <span className="mr-4"> {profile?.email}</span>
                </span>{" "}
                {/* <span>{AiFillLinkedin} www.linkedIn.com/in/xxxxxx</span> &#8226;
                <span>{AiFillGithub} www.github.com/xxxxxx</span> */}
              </div>
            </div>
          </div>
          {/* <img
            className="object-fit h-28 max-w-auto border-4 border-white rounded-full"
            src={
              "https://cracku.in/latest-govt-jobs/wp-content/uploads/2020/01/iit-madras-logo.png"
            }
            alt="iit logo"
          /> */}
          <div className="relative object-fit h-28 w-28 max-w-auto border-4 border-white rounded-full">
            {profile && (
              <Image
                placeholder="blur"
                blurDataURL={
                  "https://cracku.in/latest-govt-jobs/wp-content/uploads/2020/01/iit-madras-logo.png"
                }
                layout="fill"
                objectFit="contain"
                className=""
                src={
                  "https://cracku.in/latest-govt-jobs/wp-content/uploads/2020/01/iit-madras-logo.png"
                }
                alt="iit logo"
              />
            )}
          </div>
        </div>
        {/* <div className='w-full border-gray-200 py-1 text-center mb-5'>
          <span className='text-md italic font-semibold text-gray-700'>
            {session?.userDetails?.emailList[0]} &middot; {profile?.phone}
          </span>
        </div> */}
        {education?.filter((education) => education.enabled).length > 0 && (
          <div className="flex justify-center items-center  mt-4">
            <div className="flex flex-col w-[91%]">
              <div className="my-2  sm:-mx-6 lg:-mx-8">
                <div className="inline-block w-full ">
                  <div className="overflow-hidden w-full">
                    <h1 className="self-start w-full  font-medium text-xl mb-2">Education</h1>

                    <table className="min-w-full text-sm text-black-400">
                      <thead className="bg-white-500 text-xs uppercase font-medium border-y-2 border-gray-200">
                        <tr>
                          <th></th>
                          <th scope="col" className="px-6 py-3 text-left">
                            Program
                          </th>
                          <th scope="col" className="px-6 py-3 text-left">
                            Instituition/Board
                          </th>
                          <th scope="col" className="px-6 py-3 text-left tracking-wider">
                            %/CGPA
                          </th>
                          <th scope="col" className="px-6 py-3 text-left">
                            Year
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white-200">
                        {education
                          ?.filter((option) => option.enabled === true)
                          .map((option) => (
                            <tr className="bg-white" key={option._id}>
                              <td className="flex px-1 py-4">
                                <span className="ml-2 font-medium"></span>
                              </td>
                              <td className="px-6 py-4 ">
                                {option.typeOfDegree !== "None" ? `${option.typeOfDegree}` : ""}
                              </td>
                              <td className="px-6 py-4">{option.institution}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{option.gpa}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(option.startDate).getFullYear()} -{" "}
                                {new Date(option.endDate).getFullYear()}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {projects?.filter((project) => project.enabled).length > 0 && (
          <div className="py-1 mt-4">
            <h1 className="border-b-2 border-gray-400 font-medium text-xl mb-2">Work Experience</h1>
            {work?.map((option, index) => {
              if (option.enabled === true) {
                return (
                  <div className="p-1" key={option._id}>
                    <div className="flex justify-between items-center">
                      <div>
                        <span>{index + 1}. </span>
                        <h2 className="italic text-lg inline font-medium"> {option.company}</h2>
                      </div>
                      <h3 className="italic text-lg inline font-medium">
                        {`( ${
                          months[new Date(option.from?.substring(0, 10)).getMonth() + 1]
                        } ${new Date(option.from?.substring(0, 10)).getFullYear()} ) - ( ${
                          months[new Date(option.to?.substring(0, 10)).getMonth() + 1]
                        } ${new Date(option.to?.substring(0, 10)).getFullYear()} )`}
                      </h3>
                    </div>
                    <div className="flex justify-start items-center">
                      <p className="text-sm pl-2">{option.designation}</p>
                    </div>
                    <ul className="my-0.5 text-xs">
                      <li>&bull; {option.summary.data}</li>
                    </ul>
                  </div>
                );
              }
            })}
          </div>
        )}

        {projects?.filter((project) => project.enabled).length > 0 && (
          <div className="py-1 my-0">
            <h1 className="border-b-2 border-gray-400 font-medium text-xl mb-2">Key Projects</h1>
            {projects
              ?.filter((project) => project.enabled === true)
              .map((project, index) => (
                <div className="p-1" key={project._id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span>{index + 1}. </span>
                      <h2 className="italic text-lg inline font-medium"> {project.name}</h2>
                    </div>
                    {/* <h3 className='italic text-lg inline font-medium'>
                      Aug 20xx - April 20xx
                    </h3> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">{project.website}</p>
                  </div>
                  <ul className="my-0.5 text-xs">
                    <li>&bull; {project.summary.data}</li>
                  </ul>
                </div>
              ))}
          </div>
        )}

        {skills?.filter((skill) => skill.enabled).length > 0 && (
          <div className="w-full">
            <h1 className="my-4 border-b-2 border-gray-200 font-medium text-xl mb-2">Skills</h1>
            <div className="w-full text-sm">
              <ul className="w-full">
                {skills
                  ?.filter((skill) => skill.enabled === true)
                  .map((skill) => (
                    <li className="pr-2 flex justify-between items-center" key={skill._id}>
                      <span>&bull; {skill.name}</span>
                      <span>- {skill.level}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
