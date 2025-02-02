import React from "react";
import "./LogIn.scss";
import LogInMain from "../../components/LogInComp/LogInMain";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { Link } from "react-router";
import { IoMdHome } from "react-icons/io";

const LogIn = () => {
  return (
    <div className="logInContainer">
      <NavbarTop />
      <LogInMain />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default LogIn;
