export const RoundInfo = ({ job }) => {
  return (
    <div>
      {job && job.rounds && job.rounds.length > 0 ? (
        <div>
          {job.rounds.map((round, index) => (
            <div className="m-10" key={index}>
              <h2>Round {index + 1}:</h2>
              <h2>Name:{round.name}</h2>
              <p>Description: {round.description}</p>
              <div>
                <p>From: {round.date.from ? round.date.from : "TBD"}</p>
                <p>To: {round.date.to ? round.date.to : "TBD"}</p>
              </div>
              {round.completed ? <p>Completed</p> : <p>Yet to complete</p>}
              {round.completed && round.shortlisted.length > 0 && (
                <div>
                  <div>
                    The following students have been shortlisted for the next
                    round:{" "}
                  </div>
                  <table>
                    <th>Roll Number</th>
                    {round.shortlisted.map((student, index) => (
                      <tr key={index}>
                        {index + 1}. {student}
                      </tr>
                    ))}
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div> Round information not found</div>
      )}
    </div>
  );
};
