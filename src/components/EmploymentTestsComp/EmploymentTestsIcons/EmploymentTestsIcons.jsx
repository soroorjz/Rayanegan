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
  const [isClickScroll, setIsClickScroll] = useState(false);
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isClickScroll) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSelected(entry.target.id);
            }
          });
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    const targets = document.querySelectorAll(
      "[id^=InProgress], [id^=Registering], [id^=EndOfRegistering], [id^=ExamCard], [id^=Held], [id^=UnderReview], [id^=Announcing], [id^=Filter], [id^=Selection], [id^=Expired]"
    );
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, [isClickScroll]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollState = () => {
      if (container) {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
        console.log({
          scrollLeft: container.scrollLeft,
          scrollWidth: container.scrollWidth,
          clientWidth: container.clientWidth,
          maxScrollLeft: maxScrollLeft,
          canScrollLeft: container.scrollLeft > 0,
          canScrollRight: container.scrollLeft < maxScrollLeft - 1,
        });
      }
    };

    // یه تأخیر کوچک برای اطمینان از رندر شدن DOM
    setTimeout(() => {
      updateScrollState();
    }, 100);

    container.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setIsClickScroll(true);

    const targetElement = document.getElementById(id);
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const elementHeight = elementRect.height;
      const windowHeight = window.innerHeight;
      const offset = (windowHeight - elementHeight) / 2;

      window.scrollTo({
        top: elementRect.top + window.scrollY - offset,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsClickScroll(false);
      }, 1000);
    }
  };

  const handleHorizontalScroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 200;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      let newScrollLeft = container.scrollLeft;
      if (direction === "left" && container.scrollLeft > 0) {
        newScrollLeft = Math.max(0, container.scrollLeft - scrollAmount);
      } else if (
        direction === "right" &&
        container.scrollLeft < maxScrollLeft
      ) {
        newScrollLeft = Math.min(
          maxScrollLeft,
          container.scrollLeft + scrollAmount
        );
      }

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      console.log(`Scrolling ${direction}: newScrollLeft = ${newScrollLeft}`);
    }
  };

  return (
    <div className="EmploymentTestsIcons-Wrap">
      <button
        className="scroll-button left"
        onClick={() => handleHorizontalScroll("left")}
        disabled={!canScrollLeft}
      >
        <IoIosArrowBack />
      </button>
      <div className="EmploymentTestsIcons-Container" ref={scrollRef}>
        {[
          { id: "InProgress", icon: <FaHourglassHalf />, text: "در انتظار" },
          {
            id: "Registering",
            icon: <LuClipboardPenLine />,
            text: "درحال ثبت‌نام",
          },
          {
            id: "EndOfRegistering",
            icon: <LuClipboardX />,
            text: "پایان ثبت‌نام",
          },
          {
            id: "ExamCard",
            icon: <FaRegAddressCard />,
            text: "دریافت کارت ورود به جلسه",
          },
          {
            id: "Held",
            icon: <MdOutlineDownloadDone />,
            text: "آزمون کتبی برگزار شده",
          },
          { id: "UnderReview", icon: <RiLoader2Fill />, text: "درحال بررسی" },
          {
            id: "Announcing",
            icon: <HiOutlineSpeakerphone />,
            text: "درحال اعلام نتایج",
          },
          { id: "Filter", icon: <FaFileSignature />, text: "ارزیابی تکمیلی" },
          { id: "Selection", icon: <FiFilter />, text: "درحال گزینش" },
          { id: "Expired", icon: <BiSolidNoEntry />, text: "پایان آزمون" },
        ].map(({ id, icon, text }) => (
          <button
            key={id}
            className={`icon-button ${selected === id ? "selected" : ""}`}
            onClick={() => handleSelect(id)}
          >
            {icon}
            <span
              className={`icon-text ${
                isMobile && selected !== id ? "hidden" : ""
              }`}
            >
              {text}
            </span>
          </button>
        ))}
      </div>
      <button
        className="scroll-button right"
        onClick={() => handleHorizontalScroll("right")}
        disabled={!canScrollRight}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default EmploymentTestsIcons;
