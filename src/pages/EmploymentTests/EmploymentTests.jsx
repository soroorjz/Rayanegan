import React from "react";
import "./EmploymentTests.scss";
import { IoMdHome } from "react-icons/io";
import EmploymentTestsComp from "../../components/EmploymentTestsComp/EmploymentTestsComp";
import EmploymentTestsIcons from "../../components/EmploymentTestsComp/EmploymentTestsIcons/EmploymentTestsIcons";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import { activeExams } from "./EmploymentTestsData";
import EmploymentTestsBanner from "../../components/EmploymentTestsComp/EmploymentTestsBanner/EmploymentTestsBanner";
import { Link } from "react-router";
const EmploymentTests = () => {
  return (
    <div className="EmploymentTests">
      <NavbarTop />
      <div className="EmploymentTestsBanner">
        <EmploymentTestsBanner />
      </div>
      <div className="EmploymentTestsIcons">
        <EmploymentTestsIcons />
      </div>
      <div id="Registering" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={activeExams}
          title="آزمون‌های درحال نام‌نویسی "
        />
      </div>
      <div id="InProgress" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={activeExams}
          title="آزمون‌های در جریان"
        />
      </div>
      <div id="Active" className="EmploymentTestsComp">
        <EmploymentTestsComp examData={activeExams} title="آزمون‌های فعال" />
      </div>
      <div id="Announcing" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={activeExams}
          title="آزمون‌های در حال اعلام نتایج"
        />
      </div>
      <div id="Expired" className="EmploymentTestsComp expiredExams">
        <EmploymentTestsComp
          examData={activeExams}
          title="آزمون‌های منقضی شده   "
        />
      </div>
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default EmploymentTests;
