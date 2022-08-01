import { useEffect, useState } from "react";

export const JobResult = ({ job, email }) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (!job || !job.rounds) return;

    let newResult = [];
    job.rounds.some((round, index) => {
      let newRound = round;
      if (
        newRound.status == "Partially completed" ||
        newRound.status == "Completed"
      ) {
        console.log(newRound.result.filter((res) => res.email === email));
        console.log(email);
        if (
          newRound.result &&
          newRound.result.filter((res) => res.email === email).length > 0
        ) {
          if (index == job.rounds.length - 1)
            newRound.message = "You have been selected!";
          else newRound.message = "You have been selected for the next round";
        } else {
          if (index == job.rounds.length - 1)
            newRound.message = "You have not been selected.";
          else
            newRound.message = "You have not been selected for the next round";

          newResult.push(newRound);
          return true;
        }
      }
      newResult.push(newRound);
    });

    setResult(newResult);
  }, []);
  return (
    <div>
      {console.log(result)}
      {result && result.length > 0 ? (
        <div>
          {result.map((round, index) => (
            <div className="m-10" key={index}>
              <h2>Round {index + 1}:</h2>
              <h2>Name:{round.name}</h2>
              <p>Description: {round.description}</p>
              <div>
                <p>From: {round.date.from ? round.date.from : "TBD"}</p>
                <p>To: {round.date.to ? round.date.to : "TBD"}</p>
              </div>
              {round.status && <p>{round.status}</p>}
              {round.status != "Yet to start" && round.message && (
                <div>{round.message}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div> Result not found</div>
      )}
    </div>
  );
};
