import React, { useState } from "react";
import "./ProfileHeader.scss";

import { FaSignOutAlt, FaAngleDown } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router";
const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // هدایت کاربر به صفحه اصلی
    window.location.reload(); // ریفرش صفحه برای اعمال تغییرات در نوبار
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader-Wrapper">
        <div className="ProfileHeader-rightPart">
          <Link to="/">
            <img
              src="/assets/images/IMG-20250126-WA0000-removebg-preview.png"
              alt=""
            />
          </Link>
        </div>
        
        {/* بخش پروفایل با قابلیت باز شدن دراپ‌داون */}
        <div className="leftPart" onClick={toggleDropdown}>
          <button className="user-btn">
            سرور جامعی زاده
            <FaAngleDown className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`} />
          </button>
          <div className="profileImg">
            <MdAccountCircle />
          </div>

          {/* دراپ‌داون خروج */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="logout-btn" onClick={handleLogout}>
                خروج
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
