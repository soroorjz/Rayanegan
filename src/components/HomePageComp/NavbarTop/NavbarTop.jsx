import React, { useEffect, useState } from "react";
import { IoTriangle } from "react-icons/io5";
import "./NavbarTop.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
const NavbarTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // برای ریفرش Navbar
  };

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
          <div className="jobSearchBtn">
            <button onFocus={handleSearchFocus}>جست و جوی مشاغل</button>
          </div>

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

                <button className="exit" onClick={handleLogout}>
                  <FaSignOutAlt /> خروج
                </button>
              </div>
            </div>
          ) : (
            <div className="logInPart">
              <button>
                <Link to="/logIn">ورود/ ثبت‌نام</Link>
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

                <button className="responsive-exit" onClick={handleLogout}>
                  <FaSignOutAlt /> خروج
                </button>
              </div>
            </div>
          ) : (
            <button className="sidebar-login-button">
              <Link to="/logIn">ورود/ ثبت‌نام</Link>
            </button>
          )}

          <button className="jobSearchBtn" onFocus={handleSearchFocus}>
            جست و جوی مشاغل
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarTop;
