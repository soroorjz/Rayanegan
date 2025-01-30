import React from "react";
import SignUpStepper from "../../components/SignUpFormComp/SignUpStepper/SignUpStepper";
import "./ExamSignUpForm.scss";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";

const ExamSignUpForm = () => {
  return (
    <div className="examSignUpForm-Contaner">
      <NavbarTop />
      <h2>فرم ثبت نام داوطلبان</h2>
      <SignUpStepper />
    </div>
  );
};

export default ExamSignUpForm;
