import React from "react";
import SignUpStepper from "../../components/SignUpFormComp/SignUpStepper/SignUpStepper";
import "./ExamSignUpForm.scss";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";


const ExamSignUpForm = () => {
  return (
    <div className="examSignUpForm-Contaner">
      <NavbarTop hideJobSearch={true} />
      <h2>فرم ثبت نام داوطلبان</h2>
      <SignUpStepper />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default ExamSignUpForm;
