import React from "react";
import "./EmploymentTests.scss";
import EmploymentTestsComp from "../../components/EmploymentTestsComp/EmploymentTestsComp";
import EmploymentTestsIcons from "../../components/EmploymentTestsComp/EmploymentTestsIcons/EmploymentTestsIcons";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
const EmploymentTests = () => {
  return (
    <div className="EmploymentTests">
      <NavbarTop />
      <div className="EmploymentTestsIcons">
        <EmploymentTestsIcons />
      </div>

      <div className="EmploymentTestsComp">
        <EmploymentTestsComp />
      </div>
    </div>
  );
};

export default EmploymentTests;
