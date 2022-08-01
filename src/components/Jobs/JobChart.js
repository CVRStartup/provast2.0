import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const JobChart = ({ counts, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Your Stats",
        data: [counts[0], counts[1]],
        backgroundColor: ["#FCA5A5", "#FDBA74"],
      },
    ],
  };

  let emptyFlag = false;
  if (counts[0] === 0 && counts[1] === 0) emptyFlag = true;

  return (
    <div className="mx-auto px-4">
      {emptyFlag ? (
        <div className="rounded shadow bg-slate-200 bg-opacity-80 text-center p-5 mb-5">
          The Dataset is empty for
          <div>
            <span className="text-red-500 font-semibold">{labels[0]}</span> and{" "}
            <span className="text-orange-400 font-semibold">{labels[1]}</span>
          </div>
        </div>
      ) : (
        <Doughnut
          options={{
            maintainAspectRatio: true,
            borderWidth: 5,
          }}
          data={data}
        />
      )}
    </div>
  );
};
