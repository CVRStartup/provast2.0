import React from "react";
import { VscLock } from "react-icons/vsc";
import { useModelContext } from "../../../../context/ModalContext";
import { useResumeContext } from "../../../../context/ResumeContext";
import { usePlan } from "../../../../hooks/usePlan";
import { useUser } from "../../../../lib/hooks";
import ColorPicker from "../ColorPicker";
import { RightCard } from "./RightCard";

const fonts = [
  { name: "default", fontName: "Roboto" },
  { name: "monospace", fontName: "monospace" },
  { name: "serif", fontName: "serif" },
  { name: "cursive", fontName: "cursive" },
  { name: "fantasy", fontName: "fantasy" },
  { name: "System UI", fontName: "system-ui" },
  { name: "Lora", fontName: "Lora" },
  { name: "Lobster", fontName: "Lobster" },
  { name: "Shadows", fontName: "Shadows Into Light" },
  { name: "Satisfy", fontName: "Satisfy" },
  { name: "Patrick Hand", fontName: "Patrick Hand" },
  { name: "Padauk", fontName: "Padauk" },
  { name: "Merienda", fontName: "Merienda" },
  { name: "Handlee", fontName: "Handlee" },
];

export const Right = React.forwardRef(function Right({ componentRef }) {
  const { resume, layout, setLayout, debounceUpdateResume } = useResumeContext();
  const { setIsOpen, setForm } = useModelContext();
  const user = useUser();
  const { payment } = usePlan(user?._id);

  const checkPlan = (name) => {
    if (!payment) return;

    const plan = payment?.plan;
    if (plan === "Basic") {
      if (name === "color" || name === "font") return false;
      if (name === "download") return true;
    }
    if (plan === "Essential") {
      if (name === "color") return false;
      if (name === "font" || name === "download") return true;
    }
    if (plan === "Premium") {
      if (name === "color" || name === "font" || name === "download") return true;
    }
    return false;
  };

  const handleClick = (font) => {
    setLayout({ ...layout, font });
    debounceUpdateResume({ ...resume, layout: { ...layout, font } });
  };

  return (
    <div>
      <div className='w-full py-4 flex flex-col items-center'>
        {layout?.template !== "onyx" &&
        layout?.template !== "refined" &&
        layout?.template !== "tadigital" &&
        layout?.template !== "moscow" ? (
          <div className='my-2 border-b border-gray-400 w-full'>
            <h2 className='mb-5 px-2 text-white text-2xl'>Colors</h2>
            <div
              onClick={() => {
                if (!checkPlan("color")) {
                  setForm("paymentForm");
                  setIsOpen(true);
                  return;
                }
              }}
              className={`w-[70%] mx-auto mb-5 ${
                !checkPlan("color") ? "relative" : ""
              } cursor-pointer`}
            >
              <div className={`${checkPlan("color") ? "" : "pointer-events-none opacity-60"}`}>
                <ColorPicker />
              </div>
              {!checkPlan("color") && (
                <div className='absolute z-10 top-[1px] right-[40%] flex items-center justify-center h-7 w-7 bg-gray-900 bg-opacity-70 rounded-full p-1 '>
                  <VscLock size={15} color='white' />
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <h2 className='mb-5 px-2 text-white text-2xl'>Actions</h2>
          {/* <RightCard
            heading={"Pick Template"}
            description={
              "Each resume template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates."
            }
            button={"Pick Template"}
            componentRef={componentRef}
          /> */}
          <RightCard
            heading={"Download Your Resume"}
            description={
              "Download your resume as a PDF, a PNG, or a JPEG to share with recruiters."
            }
            checkPlan={checkPlan("download")}
            button={"Download Your Resume"}
            componentRef={componentRef}
          />
          <RightCard
            heading={"Export Your Resume"}
            description={
              "Export your resume as JSON that you will be able to import back onto this app on another computer."
            }
            button={"Export Your Resume"}
            componentRef={componentRef}
          />
          <RightCard
            heading={"Import Your Resume"}
            description={
              "Vast has its own schema format to make the most of all the customizable capabilities it has to offer. If you'd like to import a backup of your resume made with this app, just upload the file using the button below."
            }
            button={"Import Your Resume"}
            componentRef={componentRef}
          />
          <RightCard
            heading={"Load Demo Data"}
            description={
              "Unclear on what to do with a fresh blank page? Load some demo data to see how a resume should look and you can start editing from there."
            }
            button={"Load Demo Data"}
          />
          <RightCard
            heading={"Reset Demo Data"}
            description={
              "Feels like you made too many mistakes? No worries, clear everything with just one click, but be careful if there are no backups."
            }
            button={"Reset Demo Data"}
          />
        </div>
        {layout?.template !== "onyx" &&
        layout?.template !== "refined" &&
        layout?.template !== "tadigital" ? (
          <div className='w-full text-white py-5 border-t border-gray-400'>
            <h2 className='px-2 mb-5 text-white text-2xl'>Fonts</h2>
            <div className='grid md:grid-cols-2 gap-4 mx-3'>
              {fonts.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!checkPlan("font") && option.name !== "default") {
                      setForm("paymentForm");
                      setIsOpen(true);
                      return;
                    }
                  }}
                  className={`${layout?.font === option.fontName ? "border" : ""} 
                  } px-2 rounded bg-gray-700 py-2 text-md cursor-pointer text-center relative`}
                >
                  <button
                    key={option.name}
                    onClick={() => handleClick(option.fontName)}
                    style={{ fontFamily: option.fontName }}
                    className={`${
                      checkPlan("font") || option.name === "default" ? "" : "opacity-30"
                    } truncate w-full capitalize tracking-wide`}
                  >
                    {option.name}
                  </button>
                  {!checkPlan("font") && option.name !== "default" && (
                    <div className='absolute z-10 top-[20%] right-[35%] flex items-center justify-center h-7 w-7 bg-gray-900 bg-opacity-70 rounded-full p-1 '>
                      <VscLock size={15} color='white' />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
});
