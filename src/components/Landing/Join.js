import React from "react";

export const Join = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center mb-20'>
      <div className='w-full line-height leading-10 text-3xl font-black text-orange-500 lg:text-6xl lg:w-1/2'>
        Join over <mark className='mark'>12,698,000</mark> users worldwide
      </div>
      <p>Start for free — try our resume builder now</p>
      <button
        type='submit'
        className='my-5 py-3 px-4 bg-orange-500 rounded text-white font-bold text-md tracking-wider hover:bg-orange-600'
      >
        Create My Resume
      </button>
      <style jsx>{`
        .line-height {
            line-height: 74px;
        }
        .mark {
            background: 0 0;
            color: inherit;
            background-repeat: no-repeat;
            background-image: linear-gradient(#ffd15a,#ffd15a);
            background-size: 100% .0833em;
            background-position: 0 100%;
        }
        }
      `}</style>
    </div>
  );
};
