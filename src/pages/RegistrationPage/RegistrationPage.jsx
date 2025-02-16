import React from "react";
import RegistrationComp from "../../components/RegistrationComp/RegistrationComp";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router";
import "./RegistrationPage.scss";
const RegistrationPage = () => {
  return (
    <div>
      <NavbarTop />
      <RegistrationComp />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default RegistrationPage;
