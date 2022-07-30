import React, { useState } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { useResumeContext } from "../../../context/ResumeContext";

export const SketchExample = (props) => {
  const [show, setShow] = useState(false);
  const { resume, layout, setLayout, debounceUpdateResume } = useResumeContext();
  const handleClick = () => setShow(!show);
  const handleClose = () => setShow(false);
  const handleChange = (color) => {
    setLayout({ ...layout, color: color.rgb });
    debounceUpdateResume({ ...resume, layout: { ...layout, color: color.rgb } });
  };
  const styles = reactCSS({
    default: {
      color: {
        width: "10vw",
        height: "20px",
        borderRadius: "2px",
        background: `rgba(${layout?.color ? layout?.color.r : "0"}, ${
          layout?.color ? layout?.color.g : "0"
        }, ${layout?.color ? layout?.color.b : "0"}, ${layout?.color ? layout?.color.a : "0"})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "100000",
        right: "10px",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div className="flex flex-col items-center z-100">
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {show ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={layout?.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default SketchExample;
