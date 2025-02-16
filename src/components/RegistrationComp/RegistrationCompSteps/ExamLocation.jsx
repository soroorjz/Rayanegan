import React from "react";

const ExamLocation = ({ onNext, handlePreviousStep }) => {
  return (
    <div>
      <button onClick={onNext}>مرحله بعد</button>
      <button onClick={handlePreviousStep}>مرحله قبل</button>
    </div>
  );
};

export default ExamLocation;
