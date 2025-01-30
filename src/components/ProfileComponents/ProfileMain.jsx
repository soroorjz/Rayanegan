import React from "react";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import "./ProfileMain.scss";
import MyExams from "./MyExams/MyExams";

const ProfileMain = ({ selectedComponent }) => {
  let content;
  switch (selectedComponent) {
    case "personal":
      content = <PersonalDetails />;
      break;
    case "exams":
      content = <MyExams />;
      break;
    case "suggested":
      // content = <SuggestedExams />;
      break;
    case "news":
      // content = <News />;
      break;
    default:
      content = <PersonalDetails />;
  }

  return (
    <div className="ProfileMain-Container">
      {content}
    </div>
  );
};

export default ProfileMain;
