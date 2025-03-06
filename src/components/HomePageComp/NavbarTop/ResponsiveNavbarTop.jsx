import React from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ResponsiveNavbarTop = ({
  isSidebarOpen,
  toggleSidebar,
  user,
  logout, // اینجا از handleLogout که از NavbarTop پاس داده شده استفاده می‌کنیم
  hideJobSearch,
  handleSearchFocus,
  hideRepotBtn,
}) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="close-sidebar" onClick={toggleSidebar}>
        ×
      </button>
      <div className="sidebar-content">
        {user ? (
          <div className="responsive-userProfile">
            <div className="responsive-user-info">
              <FaCircleUser className="responsive-user-avatar" />

              <div className="responsive-user-details">
                <span className="responsive-user-name">{user.username}</span>
              </div>
            </div>

            <div className="responsive-dropdown-menu">
              <Link to="/profile">
                <FaUser /> حساب کاربری
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

        {!hideJobSearch && (
          <button className="jobSearchBtn" onFocus={handleSearchFocus}>
            جست و جوی مشاغل
          </button>
        )}

        {!hideRepotBtn && (
          <div className="sideBar-JobSearchBtn">
            <button>
              <Link to="/ReportForm">ثبت اعتراض </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveNavbarTop;
