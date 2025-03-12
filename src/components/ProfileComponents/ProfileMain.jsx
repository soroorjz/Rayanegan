import React from "react";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import "./ProfileMain.scss";
import MyExams from "./MyExams/MyExams";
import ExamEntryCard from "./ExamEntryCard/ExamEntryCard";
import NoEntryCard from "./NoEntryCard/NoEntryCard";
import { IoMdHome } from "react-icons/io";

import { Link } from "react-router";
import ExamEntryCopm from "./ExamEntryCard/ExamEntryCopm";
import EvaluationCard from "./ExamEntryCard/EvaluationCard";
import ExamSignUpForm from "../../pages/ExamSignUpForm/ExamSignUpForm";
import CompletedForm from "../../pages/CompletedForm/CompletedForm";
import ChangePassword from "../../pages/ChangePassword/ChangePassword";

const ProfileMain = ({ selectedComponent }) => {
  let content;
  switch (selectedComponent) {
    case "personal":
      content = (
        <div className="profilePersonalDetails">
          <CompletedForm />
        </div>
      );

      break;

    case "password":
      content = (
        <div className="passwordChangingPart">
          <ChangePassword />
        </div>
      );

      break;
    case "exams":
      content = <MyExams />;
      break;
    case "suggested":
      content = <ExamEntryCopm />;
      break;
    case "news":
      content = <EvaluationCard />;
      break;
    default:
      content = <CompletedForm />;
  }

  return (
    <div className="ProfileMain-Container">
      {content}

      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default ProfileMain;
