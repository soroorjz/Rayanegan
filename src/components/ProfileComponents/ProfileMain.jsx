import React from "react";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import "./ProfileMain.scss";
import MyExams from "./MyExams/MyExams";
import ExamEntryCard from "./ExamEntryCard/ExamEntryCard";
import NoEntryCard from "./NoEntryCard/NoEntryCard";
import ExamSignUpForm from "../../pages/ExamSignUpForm/ExamSignUpForm";

const ProfileMain = ({ selectedComponent }) => {
  let content;
  switch (selectedComponent) {
    case "personal":
      // content = <ExamSignUpForm />;
      content = <PersonalDetails />;
      break;
    case "exams":
      content = <MyExams />;
      break;
    case "suggested":
      content = <ExamEntryCard />;
      break;
    case "news":
      content = <NoEntryCard />;
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
