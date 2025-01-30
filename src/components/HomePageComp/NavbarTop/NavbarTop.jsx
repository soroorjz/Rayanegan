import React, { useEffect, useState } from "react";
import "./NavbarTop.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router";

const NavbarTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // تاگل کردن سایدبار
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // مدیریت وضعیت اسکرول
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 900) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // اسکرول به ExamForm در زمان فوکوس روی دکمه جستجو مشاغل
  const handleSearchFocus = () => {
    const examFormElement = document.getElementById("ExamForm"); // پیدا کردن المان
    if (examFormElement) {
      examFormElement.scrollIntoView({ behavior: "smooth" }); // اسکرول کردن به المان
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
          <div className="logInPart">
            <button>
              <Link to="/logIn">ورود/ ثبت‌نام</Link>
            </button>
          </div>
        </div>
        
        <div className="navbar-JobPart">
          {/* <input
            type="text"
            placeholder="جستجو کنید..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus} // اضافه شدن هندلر فوکوس
            className="search-input"
          /> */}
          {/* <button onClick={handleSearch} className="search-button">
            جستجو
          </button> */}
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
          {/* <input
            type="text"
            placeholder="جستجو کنید..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus} // اضافه شدن هندلر فوکوس در نسخه موبایل
            className="sidebar-search-input"
          />
          <button onClick={handleSearch} className="sidebar-search-button">
            جستجو
          </button> */}
          <button className="jobSearchBtn" onFocus={handleSearchFocus}>
            جست و جوی مشاغل
          </button>
          <button className="sidebar-login-button">
            <Link to="/logIn">ورود/ ثبت‌نام</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarTop;
