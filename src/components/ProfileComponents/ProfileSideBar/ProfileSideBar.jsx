import React from "react";
// import { FaUserGraduate } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";

import { FaUserPen } from "react-icons/fa6";
import "./ProfileSideBar.scss";
const ProfileSideBar = ({ selectedComponent, setSelectedComponent }) => {
  return (
    <div className="profileSide-Container">
      <div className="acountBtns">
        <button
          onClick={() => setSelectedComponent("personal")}
          className={selectedComponent === "personal" ? "active" : ""}
        >
          <FaUserPen />
          مشخصات شخصی
        </button>
        <button
          onClick={() => setSelectedComponent("exams")}
          className={selectedComponent === "exams" ? "active" : ""}
        >
          <FaBookReader />
          آزمون‌های من
        </button>
        <button
          onClick={() => setSelectedComponent("suggested")}
          className={selectedComponent === "suggested" ? "active" : ""}
        >
          آزمون‌های پیشنهادی
        </button>
        <button
          onClick={() => setSelectedComponent("news")}
          className={selectedComponent === "news" ? "active" : ""}
        >
          <FaRegNewspaper />
          اخبار مربوطه
        </button>
      </div>
    </div>
  );
};

export default ProfileSideBar;
