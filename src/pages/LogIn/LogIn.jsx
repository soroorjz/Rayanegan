import React from "react";
import "./LogIn.scss";
import LogInMain from "../../components/LogInComp/LogInMain";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
const LogIn = () => {
  return (
    <div className="logInContainer">
      <NavbarTop />
      <LogInMain />
    </div>
  );
};

export default LogIn;
