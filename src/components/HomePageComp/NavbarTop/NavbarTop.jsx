import React, { useEffect, useState } from "react";
import "./NavbarTop.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom"; //  تغییر ایمپورت به react-router-dom
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";

const NavbarTop = ({
  hideJobSearch = false,
  hideRepotBtn = false,
  showReportTrackingBtn = false,
}) => {
  const { user, logout } = useAuth(); //  دریافت user و logout از AuthContext
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
            <div className="jobSearchBtn">
              <button onFocus={handleSearchFocus}>جست و جوی مشاغل</button>
            </div>
          )}

          {!hideRepotBtn && (
            <div className="jobSearchBtn">
              <button>
                <Link to="/ReportForm">گزارش تخلف</Link>
              </button>
            </div>
          )}

          {showReportTrackingBtn && (
            <div className="jobSearchBtn">
              <button>
                <Link to="/ReportTracking">پیگیری گزارشات</Link>
              </button>
            </div>
          )}
          {user ? (
            <div className="userProfile">
              <div className="user-info">
                <img
                  src="/assets/images/photo_2022-03-23_18-31-12.jpg"
                  alt="User Avatar"
                  className="user-avatar"
                />
                <div className="user-details">
                  <span className="user-name">{user.username}</span>
                  <span className="user-role">Admin</span>
                </div>
              </div>

              <div className="dropdown-menu">
                <Link to="/profile">
                  <FaUser /> پروفایل
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

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          &times;
        </button>
        <div className="sidebar-content">
          {user ? (
            <div className="responsive-userProfile">
              <div className="responsive-user-info">
                <img
                  src="/assets/images/photo_2022-03-23_18-31-12.jpg"
                  alt="User Avatar"
                  className="responsive-user-avatar"
                />
                <div className="responsive-user-details">
                  <span className="responsive-user-name">{user.username}</span>
                </div>
              </div>

              <div className="responsive-dropdown-menu">
                <Link to="/profile">
                  <FaUser /> پروفایل
                </Link>

                <button className="responsive-exit" onClick={logout}>
                  <FaSignOutAlt /> خروج
                </button>
              </div>
            </div>
          ) : (
            <button className="sidebar-login-button">
              <Link to="/logIn">ورود به حساب کاربری</Link>
            </button>
          )}

          {!hideJobSearch && ( // بررسی مقدار hideJobSearch
            <button className="jobSearchBtn" onFocus={handleSearchFocus}>
              جست و جوی مشاغل
            </button>
          )}

          {!hideRepotBtn && (
            <div className="sideBar-JobSearchBtn">
              <button>
                <Link to="/ReportForm">گزارش تخلف</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarTop;
