import React from "react";

const AssessmentInput = ({
  optionKey,
  itemId,
  optionSelectHandler,
  name,
  id,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <input
        onChange={(e) => optionSelectHandler(e, option._id, item._id)}
        type="radio"
        checked={selectedOption === option.key}
        value={optionKey}
        name={name}
        id={id}
      />
      {option.key + ". " + option.value}
    </>
  );
};

export default AssessmentInput;
