import React, { useEffect, useState } from "react";
import "./NavbarTop.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import ResponsiveNavbarTop from "./ResponsiveNavbarTop";

const NavbarTop = ({
  hideJobSearch = false,
  hideRepotBtn = false,
  showReportTrackingBtn = false,
}) => {
  const { user, logout } = useAuth(); //چک کردن ورود و خروج کاربر
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchFocus = () => {
    const examFormElement = document.getElementById("ExamForm");
    if (examFormElement) {
      examFormElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={`navBarTopPart ${isScrolled ? "scrolledNav" : ""}`}>
        <div className="logoPart">
          <Link to="/">
            <img src="/assets/images/logo2.png" alt="لوگو" />
            <p>مرکز آموزشی و پژوهشی رایانگان</p>
          </Link>
        </div>

        <div className="navbarLeftPart">
          {!hideJobSearch && ( // بررسی مقدار hideJobSearch
            <div className="jobSearchBtn" id="jobSearchBtn">
              <button onFocus={handleSearchFocus}>جست و جوی مشاغل</button>
            </div>
          )}

          {!hideRepotBtn && (
            <div className="jobSearchBtn" id="reportBtn">
              <button>
                <Link to="/ReportForm">ثبت اعتراض </Link>
              </button>
            </div>
          )}

          {showReportTrackingBtn && (
            <div className="jobSearchBtn">
              <button>
                <Link to="/ReportTracking">پیگیری اعتراض</Link>
              </button>
            </div>
          )}
          {user ? (
            <div className="userProfile">
              <div className="user-info">
                <FaCircleUser className="user-avatar" />
                <div className="user-details">
                  <span className="user-name">{user.username}</span>
                </div>
              </div>

              <div className="dropdown-menu">
                <Link to="/profile">
                  <FaUser /> حساب کاربری
                </Link>

                <button className="exit" onClick={logout}>
                  <FaSignOutAlt /> خروج
                </button>
              </div>
            </div>
          ) : (
            <div className="logInPart">
              <button>
                <Link to="/logIn">ورود به حساب کاربری</Link>
              </button>
            </div>
          )}
        </div>

        <div className="hamburger" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </div>
        <div className="responsiveLogo">
          <Link to="/">
            <img src="/assets/images/logo2.png" alt="" />
          </Link>
          <p>مرکز آموزشی و پژوهشی رایانگان</p>
        </div>
      </div>
      <ResponsiveNavbarTop
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        user={user}
        logout={logout}
        hideJobSearch={hideJobSearch}
        handleSearchFocus={handleSearchFocus}
        hideRepotBtn={hideRepotBtn}
      />
    </>
  );
};

export default NavbarTop;
