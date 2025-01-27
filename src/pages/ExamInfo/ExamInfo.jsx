import React, { useEffect, useState } from "react";
import ExamInfoComponent from "../../components/ExamInfoComp/ExamInfoComponent";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import Countdown from "../../components/ExamInfoComp/CountDown/CountDown";
import "./ExamInfo.scss";
import ExamInfoCard from "../../components/ExamInfoComp/ExamInfoCard/ExamInfoCard";
const ExamInfo = ({ registrationData }) => {
  const { startDate, endDate, cardIssueDate, eventDate } = registrationData;
  const [currentTargetDate, setCurrentTargetDate] = useState(endDate);

  useEffect(() => {
    if (new Date(endDate) <= new Date()) {
      setCurrentTargetDate(null);
    }
  }, [endDate]);

  return (
    <div className="examInfoContainer">
      <NavbarTop />
      <Countdown registrationDeadline={currentTargetDate} />

      <ExamInfoCard
        startDate={startDate}
        endDate={endDate}
        cardIssueDate={cardIssueDate}
        eventDate={eventDate}
      />
      <ExamInfoComponent />
    </div>
  );
};

export default ExamInfo;
