import { useEffect, useMemo, useState } from "react";
import "./Navbar.scss";
import {
  FaTasks,
  FaSearch,
  FaNewspaper,
  FaQuestionCircle,
  FaPhone,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900); // هماهنگ با SCSS

  const menuItems = useMemo(
    () => [
      { icon: <IoHome />, text: "خانه", target: "home" },
      { icon: <FaTasks />, text: "آزمون‌ها", target: "ExamCardPart" },
      { icon: <FaSearch />, text: "آزمون‌یاب", target: "ExamForm" },
      { icon: <FaNewspaper />, text: "اخبار", target: "NewsComp" },
      { icon: <FaQuestionCircle />, text: "سوالات متداول", target: "Faq" },
      { icon: <FaPhone />, text: "تماس با ما", target: "footer" },
    ],
    []
  );

  const handleScroll = (targetId, index) => {
    setActiveIndex(index);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`المان با آیدی ${targetId} پیدا نشد!`);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("isMobile:", isMobile); // برای دیباگ

  return (
    <div className="navbar-container">
      {!isMobile && (
        <div className="sidebarNav">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleScroll(item.target, index)}
            >
              {item.icon}
              <span
                className={`menu-text ${
                  activeIndex === index ? "active-text" : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="bottomNav">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleScroll(item.target, index)}
            >
              {item.icon}
              <span
                className={`menu-text ${
                  activeIndex === index ? "active-text" : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;