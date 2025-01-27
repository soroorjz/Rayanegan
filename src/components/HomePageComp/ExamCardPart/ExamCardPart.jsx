import React from "react";
import "./ExamCardPart.scss";
import ExamCard from "./ExamCard";
const ExamCardPart = () => {
  return (
    <div className="examCardPart-Container">
      <div className="examCardPart-Title">
        <h1> آزمون‌های فعال</h1>
      </div>
      <div className="examCards">
        <ExamCard />
      </div>
    </div>
  );
};

export default ExamCardPart;
