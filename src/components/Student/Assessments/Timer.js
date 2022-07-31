import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

const Timer = ({ startTime }) => {
  const [seconds, setSeconds] = useState(startTime.seconds);
  const [minutes, setMinutes] = useState(startTime.minutes);
  const [hours, setHours] = useState(startTime.hours);
  const [days, setDays] = useState(startTime.days);

  // console.log(startTime);

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds((prevState) => ++prevState);

      if (seconds >= 59) {
        setMinutes((prevState) => ++prevState);
        setSeconds(0);
      }
      if (minutes >= 59) {
        setHours((prevState) => ++prevState);
        setMinutes(0);
        setSeconds(0);
      }
      if (hours >= 23) {
        setDays((prevState) => ++prevState);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className='mr-5 flex text-xl border rounded p-2 text-red-700 border-red-500'>
      <AiOutlineClockCircle size='1.5em' className='mr-1' />
      {(days < 10 ? '0' + days : days) +
        ':' +
        (hours < 10 ? '0' + hours : hours) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds : seconds)}
    </div>
  );
};

export default Timer;
