import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

const NewTimer = ({ startTime, submitAssessmentFromTimer }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    setSeconds(startTime.seconds);
    setMinutes(startTime.minutes);
    setHours(startTime.hours);
  }, [startTime]);

  let timer;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setInterval(() => {
      setSeconds((prevState) => --prevState);

      if (seconds === 0 && minutes === 0) {
        submitAssessmentFromTimer(true);

        return clearInterval(timer);
      }
      if (seconds <= 0 && minutes > 0) {
        setMinutes((prevState) => --prevState);
        setSeconds(59);
      }
      if (minutes < 0) {
        setMinutes(0);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className="mr-5 flex text-xl border rounded p-2 text-red-700 border-red-500">
      <AiOutlineClockCircle size="1.5em" className="mr-1" />
      {(hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)}
    </div>
  );
};

export default NewTimer;
