import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsTools } from "react-icons/bs";
import { FaAward, FaGraduationCap, FaLanguage, FaProjectDiagram, FaUser } from "react-icons/fa";
import { GiGamepad } from "react-icons/gi";
import { MdSocialDistance } from "react-icons/md";
import { RiFilePaperFill, RiSuitcaseFill } from "react-icons/ri";
import { useResumeContext } from "../../../context/ResumeContext";

const icons = [
  {
    id: "1",
    Icon: FaUser,
    name: "profile",
    size: 14,
  },
  {
    id: "2",
    Icon: MdSocialDistance,
    name: "social",
    size: 20,
  },
  {
    id: "3",
    Icon: RiFilePaperFill,
    name: "objective",
    size: 17,
  },
  {
    id: "4",
    Icon: RiSuitcaseFill,
    name: "workexperience",
    size: 17,
  },
  {
    id: "5",
    Icon: FaGraduationCap,
    name: "education",
    size: 17,
  },
  {
    id: "6",
    Icon: FaProjectDiagram,
    name: "projects",
    size: 17,
  },
  {
    id: "7",
    Icon: FaAward,
    name: "awards",
    size: 17,
  },
  {
    id: "8",
    Icon: AiFillSafetyCertificate,
    name: "certifications",
    size: 17,
  },
  {
    id: "9",
    Icon: BsTools,
    name: "skills",
    size: 17,
  },

  {
    id: "10",
    Icon: GiGamepad,
    name: "hobbies",
    size: 20,
  },
  {
    id: "11",
    Icon: FaLanguage,
    name: "languages",
    size: 20,
  },
];

export const Nav = () => {
  const { layout, structure } = useResumeContext();
  return (
    <>
      <div className="fixed flex flex-col justify-center min-h-screen ml-3">
        {structure &&
          layout &&
          icons.map((icon) => {
            const Icon = icon.Icon;
            if (structure[layout.template]?.includes(icon.name))
              return (
                <div key={icon.id} className="flex items-center relative justify-center">
                  <a
                    href={`#${icon.name}`}
                    id={icon.id}
                    className="tooltip mb-2 text-white flex-shrink-0 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 my-5 mx-2"
                  >
                    <Icon size={icon.size} title={icon.name.charAt(0) + icon.name.slice(1)} />
                    <span className="tooltiptext capitalize text-xs font-bold tracking-wide">
                      {icon.name}
                    </span>
                  </a>
                </div>
              );
          })}
      </div>
      <style jsx>
        {`
          .tooltip {
            position: relative;
            display: inline-block;
          }

          .tooltip .tooltiptext {
            visibility: hidden;
            background-color: #757575;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            padding: 5px 10px;
            position: absolute;
            z-index: 100000000;
            top: -5px;
            left: 150%;
          }

          .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 100%;
            z-index: 1000000;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent #757575 transparent transparent;
          }
          .tooltip:hover .tooltiptext {
            visibility: visible;
          }
        `}
      </style>
    </>
  );
};
