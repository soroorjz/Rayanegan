import React from "react";
import SignUpStepper from "../../components/SignUpFormComp/SignUpStepper/SignUpStepper";
import "./ExamSignUpForm.scss";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";
import userData from "../../pages/userData.json";
const ExamSignUpForm = ({
  title,
  showNavbar = true,
  successMessage,
  redirectAfterSubmit,
  mode = "signup",
}) => {
  // اگه mode برابر "edit" باشه، اطلاعات اولیه رو از JSON می‌گیره
  const initialData = mode === "edit" ? userData : {};

  return (
    <div className="examSignUpForm-Contaner">
      {showNavbar && <NavbarTop hideJobSearch={true} />}
      <h2>{title}</h2>
      <SignUpStepper
        successMessage={successMessage}
        redirectAfterSubmit={redirectAfterSubmit}
        mode={mode}
        initialData={initialData} // پاس دادن اطلاعات اولیه
      />

      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>{" "}
      </Link>
    </div>
  );
};

export default ExamSignUpForm;
