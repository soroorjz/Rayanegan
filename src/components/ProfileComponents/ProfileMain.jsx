import React from "react";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import "./ProfileMain.scss";
import MyExams from "./MyExams/MyExams";
import ExamEntryCard from "./ExamEntryCard/ExamEntryCard";
import NoEntryCard from "./NoEntryCard/NoEntryCard";
import { IoMdHome } from "react-icons/io";
import ExamSignUpForm from "../../pages/ExamSignUpForm/ExamSignUpForm";
import { Link } from "react-router";
import ExamEntryCopm from "./ExamEntryCard/ExamEntryCopm";

const ProfileMain = ({ selectedComponent }) => {
  let content;
  switch (selectedComponent) {
    case "personal":
      content = (
        <div className="profilePersonalDetails">
          <ExamSignUpForm
            title="ویرایش اطلاعات "
            showNavbar={false}
            successMessage="اطلاعات به روز شد!"
            redirectAfterSubmit={false}
          />
        </div>
      );
      // content = <PersonalDetails />;
      break;
    case "exams":
      content = <MyExams />;
      break;
    case "suggested":
      // content = <ExamEntryCard />;
      content = <ExamEntryCopm />;
      break;
    case "news":
      content = <ExamEntryCopm />;
      break;
    default:
      content = <PersonalDetails />;
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
