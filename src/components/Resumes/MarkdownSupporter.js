import React from "react";

export const MarkdownSupporter = () => {
  return (
    <div className='text-white text-xs mt-2 flex flex-col w-full'>
      <p className='mb-1'>
        This text block supports{" "}
        <a
          rel='noreferrer'
          target={"_blank"}
          href='https://www.markdownguide.org/basic-syntax/'
          className='text-orange-500 underline cursor-pointer hover:text-orange-800'
        >
          markdown
        </a>
      </p>
      <div className='text-xs text-gray-400'>
        <p>Start with &apos; - &apos; for bullet points.</p>
        <p>Enclose with &apos; ** &apos; for bold points.</p>
      </div>
    </div>
  );
};
