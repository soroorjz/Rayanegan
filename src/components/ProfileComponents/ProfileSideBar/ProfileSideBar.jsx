import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";

import { FaUserPen } from "react-icons/fa6";
import "./ProfileSideBar.scss";
const ProfileSideBar = () => {
  return (
    <div>
      <div className="profileSide-Container">
        <div className="acountBtns">
          <button>
            <FaUserPen />
            مشخصات شخصی
          </button>
          <button>
            <FaBookReader />
            آزمون‌های من
          </button>
          <button>آزمون‌های پیشنهادی</button>
          <button>
            <FaRegNewspaper />
            اخبار مربوطه
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
