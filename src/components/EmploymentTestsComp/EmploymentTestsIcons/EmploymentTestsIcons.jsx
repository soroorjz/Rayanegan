import React, { useEffect, useState } from "react";
import "./EmploymentTestsIcons.scss";
import { LuClipboardPenLine } from "react-icons/lu";
import { FaHourglassHalf } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiSolidNoEntry } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
const EmploymentTestsIcons = () => {
  const [selected, setSelected] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 728);
  const handleScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 728);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (id) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="EmploymentTestsIcons-Container">
      {[
        {
          id: "Registering",
          icon: <LuClipboardPenLine />,
          text: "درحال نام‌نویسی",
        },
        { id: "InProgress", icon: <FaHourglassHalf />, text: "در جریان" },
        { id: "Active", icon: <MdOutlineDownloadDone />, text: "فعال" },
        {
          id: "Announcing",
          icon: <HiOutlineSpeakerphone />,
          text: "درحال اعلام نتایج",
        },
        { id: "Expired", icon: <BiSolidNoEntry />, text: "منقضی شده" },
      ].map(({ id, icon, text }) => (
        <button
          key={id}
          className={`icon-button ${
            selected === id || isLargeScreen ? "selected" : ""
          }`}
          onClick={() => handleSelect(id)}
        >
          {icon}
          {(selected === id || isLargeScreen) && (
            <span className="icon-text" onClick={() => handleScroll(id)}>
              {text}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
export default EmploymentTestsIcons;
