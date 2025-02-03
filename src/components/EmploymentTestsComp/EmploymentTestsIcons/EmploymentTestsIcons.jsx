import React from "react";
import "./EmploymentTestsIcons.scss";
import { LuClipboardPenLine } from "react-icons/lu";
import { FaHourglassHalf } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiSolidNoEntry } from "react-icons/bi";
const EmploymentTestsIcons = () => {
  return (
    <div className="EmploymentTestsIcons-Container">
      <button className="Registering">
        <LuClipboardPenLine />
        درحال نام‌نویسی{" "}
      </button>
      <button className="InProgress">
        <FaHourglassHalf />
        در جریان{" "}
      </button>
      <button className="Active">
        <MdOutlineDownloadDone />
        فعال{" "}
      </button>
      <button className="Announcing">
        <HiOutlineSpeakerphone />
        درحال اعلام نتایج
      </button>
      <button className="Expired">
        <BiSolidNoEntry />
        منقضی شده
      </button>
    </div>
  );
};

export default EmploymentTestsIcons;
