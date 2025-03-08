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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 728);

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

  // ScrollSpy رو فعلاً حذف می‌کنیم تا سرعت بیشتر بشه
  // اگه نیاز داری فعالش کنیم، بگو!
  // useEffect(() => {
  //   const handleScrollSpy = () => {
  //     menuItems.forEach((item, index) => {
  //       const element = document.getElementById(item.target);
  //       if (element) {
  //         const rect = element.getBoundingClientRect();
  //         if (
  //           rect.top <= window.innerHeight / 2 &&
  //           rect.bottom >= window.innerHeight / 2
  //         ) {
  //           setActiveIndex(index);
  //         }
  //       }
  //     });
  //   };

  //   window.addEventListener("scroll", handleScrollSpy);
  //   return () => window.removeEventListener("scroll", handleScrollSpy);
  // }, [menuItems]);

  // مدیریت ریسپانسیو داینامیک
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 728);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return null; // یا یه نسخه ساده‌تر
  }

  return (
    <div className="navbar-container">
      <div className="sidebarNav">
        {menuItems.map((item, index) => (
          <li
            id={`menuItem-${index}`}
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
    </div>
  );
};

export default Navbar;
