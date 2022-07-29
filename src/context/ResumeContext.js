import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from "../lib/loadash";
import { editorStructure } from "../lib/helper";

const ResumeContext = createContext();
export function ResumeContextProvider({ children }) {
  const [resume, setResume] = useState(null);
  const [profile, setProfile] = useState(null);
  const [social, setSocial] = useState(null);
  const [objective, setObjective] = useState(null);
  const [education, setEducation] = useState(null);
  const [awards, setAwards] = useState(null);
  const [projects, setProjects] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [skills, setSkills] = useState(null);
  const [work, setWork] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [template, setTemplate] = useState(null);
  const [layout, setLayout] = useState(null);
  const [structure, setStructure] = useState(editorStructure);

  const debounceUpdateResume = useMemo(() => {
    return debounce(async (res) => {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/${resume._id}`,
        { res }
      );
      setResume(data.resume);
    }, 1000);
  }, [resume]);

  useEffect(() => {
    setProfile(resume?.personal);
    setSocial(resume?.social);
    setObjective(resume?.objective);
    setEducation(resume?.education);
    setAwards(resume?.awards);
    setProjects(resume?.projects);
    setCertifications(resume?.certifications);
    setSkills(resume?.skills);
    setWork(resume?.work);
    setHobbies(resume?.hobbies);
    setLanguages(resume?.languages);
    setLayout(resume?.layout);
  }, [resume]);

  const state = {
    debounceUpdateResume,
    resume,
    setResume,
    profile,
    setProfile,
    social,
    setSocial,
    objective,
    setObjective,
    education,
    setEducation,
    awards,
    setAwards,
    certifications,
    setCertifications,
    projects,
    setProjects,
    work,
    setWork,
    skills,
    setSkills,
    hobbies,
    setHobbies,
    languages,
    setLanguages,
    template,
    setTemplate,
    layout,
    setLayout,
    structure,
    setStructure,
  };
  return <ResumeContext.Provider value={state}>{children}</ResumeContext.Provider>;
}
export function useResumeContext() {
  return useContext(ResumeContext);
}
