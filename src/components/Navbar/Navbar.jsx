import { useEffect, useMemo, useState } from "react";
import "./Navbar.scss";
import {
  FaTasks,
  FaSearch,
  FaNewspaper,
  FaQuestionCircle,
  FaPhone,
} from "react-icons/fa";
const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Use useMemo to memoize the menuItems array
  const menuItems = useMemo(
    () => [
      { icon: <FaTasks />, text: "آزمون‌ها", target: "ExamCardPart" },
      { icon: <FaSearch />, text: "آزمون‌یاب", target: "ExamForm" },
      { icon: <FaNewspaper />, text: "اخبار", target: "NewsComp" },
      { icon: <FaQuestionCircle />, text: "سوالات پرتکرار", target: "Faq" },
      { icon: <FaPhone />, text: "تماس با ما", target: "footer" },
    ],
    [] // Dependency array ensures this only recalculates once
  );

  const handleScroll = (targetId, index) => {
    setActiveIndex(index); // Set the clicked menu item as active
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      menuItems.forEach((item, index) => {
        const element = document.getElementById(item.target);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the middle of the viewport
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveIndex(index); // Update the activeIndex state
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
      {/* Sidebar for larger screens */}
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

      {/* Bottom navigation for smaller screens */}
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
