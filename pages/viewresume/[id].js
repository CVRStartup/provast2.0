import React, { useEffect, useRef } from "react";
import { Loader } from "../../src/components/Layout/Loader";
import { Core } from "../../src/components/Resumes/Templates/Core";
import { Diamond } from "../../src/components/Resumes/Templates/Diamond";
import { Dynamic } from "../../src/components/Resumes/Templates/Dynamic";
import { Gengar } from "../../src/components/Resumes/Templates/Gengar";
import { Harvard } from "../../src/components/Resumes/Templates/Harvard";
import { Moscow } from "../../src/components/Resumes/Templates/Moscow";
import { NonCore } from "../../src/components/Resumes/Templates/NonCore";
import { Onyx } from "../../src/components/Resumes/Templates/Onyx";
import { Refined } from "../../src/components/Resumes/Templates/Refined";
import { Ruby } from "../../src/components/Resumes/Templates/Ruby";
import { Stockholm } from "../../src/components/Resumes/Templates/Stockholm";
import { TAdigital } from "../../src/components/Resumes/Templates/TAdigital";
import { useResumeContext } from "../../src/context/ResumeContext";
import { useResume } from "../../src/hooks/useResume";

const Templates = {
  noncore: NonCore,
  core: Core,
  onyx: Onyx,
  refined: Refined,
  tadigital: TAdigital,
  dynamic: Dynamic,
  moscow: Moscow,
  gengar: Gengar,
  stockholm: Stockholm,
  ruby: Ruby,
  harvard: Harvard,
  diamond: Diamond,
};

const ViewResume = ({ id }) => {
  const { setResume } = useResumeContext();
  const componentRef = useRef();
  const { resume } = useResume(id);
  const Template = Templates[resume?.layout?.template];

  useEffect(() => {
    if (!resume) return;
    setResume(resume);
  }, [resume]);

  return (
    <div className='flex justify-between bg-gray-800 overflow-auto'>
      {resume ? (
        <section className='mx-auto h-screen overflow-auto py-5 w-full'>
          <Template componentRef={componentRef} />
        </section>
      ) : (
        <Loader size={"16"} color={"white"} />
      )}
    </div>
  );
};

export const getServerSideProps = ({ req, res, query }) => {
  return {
    props: {
      id: query.id,
    },
  };
};

export default ViewResume;
