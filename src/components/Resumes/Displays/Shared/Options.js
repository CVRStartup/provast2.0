import React from "react";
import { Toggle } from "./Toggle";

export const Options = ({ options }) => {
  return (
    <div className="mt-5">
      {options.map((option) => {
        return <Toggle key={option.id} option={option} />;
      })}
    </div>
  );
};
