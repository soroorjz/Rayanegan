import { useEffect, useMemo, useState } from "react";
import "./Navbar.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  FaTasks,
  FaSearch,
  FaNewspaper,
  FaQuestionCircle,
  FaPhone,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 50 },
        ease: "power1.inOut",
      });
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      menuItems.forEach((item, index) => {
        const element = document.getElementById(item.target);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [menuItems]);

  return (
    <div className="navbar-container">
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
