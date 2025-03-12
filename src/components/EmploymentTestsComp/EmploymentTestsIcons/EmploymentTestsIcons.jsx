import React, { useEffect, useRef, useState } from "react";
import "./EmploymentTestsIcons.scss";
import { LuClipboardPenLine, LuClipboardX } from "react-icons/lu";
import { FaHourglassHalf, FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiSolidNoEntry } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { RiLoader2Fill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const EmploymentTestsIcons = () => {
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelected(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // وقتی 50٪ از المنت قابل مشاهده باشد
      }
    );
    const targets = document.querySelectorAll("[id^=InProgress], [id^=Registering], [id^=EndOfRegistering], [id^=ExamCard], [id^=Held], [id^=UnderReview], [id^=Announcing], [id^=Filter], [id^=Selection], [id^=Expired]");
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []);

  const handleSelect = (id) => {
    setSelected(selected === id ? null : id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 150;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="EmploymentTestsIcons-Wrap">
      <button className="scroll-button left" onClick={() => scroll("left")}>
        <IoIosArrowBack />
      </button>
      <div className="EmploymentTestsIcons-Container" ref={scrollRef}>
        {[
          { id: "InProgress", icon: <FaHourglassHalf />, text: "در انتظار" },
          { id: "Registering", icon: <LuClipboardPenLine />, text: "درحال ثبت‌نام" },
          { id: "EndOfRegistering", icon: <LuClipboardX />, text: "پایان ثبت‌نام" },
          { id: "ExamCard", icon: <FaRegAddressCard />, text: "دریافت کارت ورود به جلسه" },
          { id: "Held", icon: <MdOutlineDownloadDone />, text: "آزمون کتبی برگزار شده" },
          { id: "UnderReview", icon: <RiLoader2Fill />, text: "درحال بررسی" },
          { id: "Announcing", icon: <HiOutlineSpeakerphone />, text: "درحال اعلام نتایج" },
          { id: "Filter", icon: <FaFileSignature />, text: " ارزیابی تکمیلی " },
          { id: "Selection", icon: <FiFilter />, text: "درحال گزینش" },
          { id: "Expired", icon: <BiSolidNoEntry />, text: "پایان آزمون" },
        ].map(({ id, icon, text }) => (
          <button
            key={id}
            className={`icon-button ${selected === id ? "selected" : ""}`}
            onClick={() => handleSelect(id)}
          >
            {icon}
            <span className={`icon-text ${isMobile && selected !== id ? "hidden" : ""}`}>
              {text}
            </span>
          </button>
        ))}
      </div>
      <button className="scroll-button right" onClick={() => scroll("right")}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default EmploymentTestsIcons;