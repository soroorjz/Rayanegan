import React from "react";
import "./EmploymentTestsIcons.scss";
import { LuClipboardPenLine } from "react-icons/lu";
import { FaHourglassHalf } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiSolidNoEntry } from "react-icons/bi";
const EmploymentTestsIcons = () => {
  const handleScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="EmploymentTestsIcons-Container">
      <button
        className="Registering"
        onClick={() => handleScroll("Registering")}
      >
        <LuClipboardPenLine />
        درحال نام‌نویسی{" "}
      </button>
      <button className="InProgress" onClick={() => handleScroll("InProgress")}>
        <FaHourglassHalf />
        در جریان{" "}
      </button>
      <button className="Active" onClick={() => handleScroll("Active")}>
        <MdOutlineDownloadDone />
        فعال{" "}
      </button>
      <button className="Announcing" onClick={() => handleScroll("Announcing")}>
        <HiOutlineSpeakerphone />
        درحال اعلام نتایج
      </button>
      <button className="Expired" onClick={() => handleScroll("Expired")}>
        <BiSolidNoEntry />
        منقضی شده
      </button>
    </div>
  );
};

export default EmploymentTestsIcons;
