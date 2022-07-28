import React from "react";

export const ResumeCardSkeleton = () => {
  return (
    <div className="mt-10 w-11/12 mx-auto grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 place-content-center">
      <div className="animate-pulse rounded-md bg-slate-200 flex space-x-4 h-[350px] w-64"></div>
      <div className="animate-pulse rounded-md bg-slate-200 flex space-x-4 h-[350px] w-64"></div>
      <div className="animate-pulse rounded-md bg-slate-200 flex space-x-4 h-[350px] w-64"></div>
      <div className="animate-pulse rounded-md bg-slate-200 flex space-x-4 h-[350px] w-64"></div>
      <div className="animate-pulse rounded-md bg-slate-200 flex space-x-4 h-[350px] w-64"></div>
    </div>
  );
};
