import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDownloadResumeFilterContext } from "../../context/DownloadResumeFilterContext";
import { useResumeContext } from "../../context/ResumeContext";
import { Core } from "./Templates/Core";
import { Dynamic } from "./Templates/Dynamic";
import { Moscow } from "./Templates/Moscow";
import { NonCore } from "./Templates/NonCore";
import { Onyx } from "./Templates/Onyx";
import { Refined } from "./Templates/Refined";
import { Stockholm } from "./Templates/Stockholm";
import { TAdigital } from "./Templates/TAdigital";

export const DownloadResumes = ({ students, setDownloadOpen }) => {
  const componentRef = useRef();
  const { setResume } = useResumeContext();
  const [template, setTemplate] = useState();
  const [student, setStudent] = useState();
  const [pdf, setPdf] = useState(null);
  const { filter, setFilter } = useDownloadResumeFilterContext();
  useEffect(() => {
    setPdf(require("react-component-export-image"));
  }, []);

  const changeResume = async (student) => {
    const {
      data: { resumes },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/getpublicresume?id=${student._id}`
    );
    if (resumes.length === 0) return false;
    else {
      setStudent(student);
      setResume(resumes[0]);
      setTemplate(resumes[0].layout.template);
      return true;
    }
  };
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  useEffect(() => {
    (async () => {
      for (let i = 0; i < students.length; i++) {
        const status = await changeResume(students[i]);
        if (status) document.querySelector(".pdfb").click();
        await sleep(1000);
      }
      setDownloadOpen(false);
    })();
  }, []);
  return (
    <div className="bg-gray-800 py-10">
      <button
        onClick={() =>
          pdf.exportComponentAsPDF(componentRef, {
            fileName: `${student?.profile?.firstName}${student?.profile?.lastName}_${student.rollNumber.value}}`,
            pdfOptions: {
              unit: "cm",
              w: 21.0,
              h: 29.7,
            },
          })
        }
        className="pdfb block px-4 py-2 text-sm uppercase w-full text-left font-semibold"
      >
        As PDF
      </button>
      <section className="mx-auto w-a4w h-a4h">
        {template === "noncore" && <NonCore componentRef={componentRef} />}
        {template === "core" && <Core componentRef={componentRef} filter={filter} />}
        {template === "onyx" && <Onyx componentRef={componentRef} filter={filter} />}
        {template === "refined" && <Refined componentRef={componentRef} filter={filter} />}
        {template === "tadigital" && <TAdigital componentRef={componentRef} />}
        {template === "moscow" && <Moscow componentRef={componentRef} />}
        {template === "stockholm" && <Stockholm componentRef={componentRef} />}
        {template === "dynamic" && <Dynamic componentRef={componentRef} />}
      </section>
    </div>
  );
};
