import React from "react";
import SignUpStepper from "../../components/SignUpFormComp/SignUpStepper/SignUpStepper";
import "./ExamSignUpForm.scss";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";


const ExamSignUpForm = ({title, showNavbar = true,successMessage, redirectAfterSubmit}) => {
  return (
    <div className="examSignUpForm-Contaner">
       {showNavbar && <NavbarTop hideJobSearch={true} />}
      <h2> {title}</h2>
      <SignUpStepper successMessage={successMessage}  redirectAfterSubmit={redirectAfterSubmit} />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default ExamSignUpForm;
