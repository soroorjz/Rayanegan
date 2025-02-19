import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import Navbar from "../Navbar/Navbar";
import Banner from "./Banner/Banner";
import ExamForm from "./ExamForm/ExamForm";
import ExamCardPart from "./ExamCardPart/ExamCardPart";
import NewsComp from "./NewsComp/NewsComp";
import Footer from "./Footer/Footer";
import NavbarTop from "./NavbarTop/NavbarTop";
import FaqHeader from "./Faq/FaqHeader/FaqHeader";
import { FaArrowUp } from "react-icons/fa";
import "intro.js/introjs.css";
import introJs from "intro.js";
// import { TiMessages } from "react-icons/ti";
import ChatBot from "../ChatBot/ChatBot";
const HomePage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // اجرای تور آموزشی بعد از 1 ثانیه برای اطمینان از لود کامل کامپوننت
    setTimeout(() => {
      introJs()
        .setOptions({
          steps: [
            {
              element: "#jobSearchBtn",
              intro: "اینجا می‌توانید به جست‌وجوی مشاغل بپردازید.",
            },
            {
              element: "#reportBtn",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#menuItem-0",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#menuItem-1",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#menuItem-2",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#menuItem-3",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#menuItem-4",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#menuItem-5",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#chatBotMainBtn",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#faqOptionBtn",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
            {
              element: "#offlineSupportOptionBtn",
              intro: "از اینجا می‌توانید تخلفات را گزارش کنید.",
            },
          ],
          nextLabel: "بعدی",
          prevLabel: "قبلی",
          doneLabel: "تمام",
          showProgress: false,
          showPrevButton: false,
          showBullets: false,
          disableInteraction: true,
          tooltipClass: "homeTooltip-IntroJs",
          highlightClass: "homeHighlight-IntroJs",
        })
        .start();
    }, 1000);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.getElementById("home")?.offsetHeight || 0;
      setShowScrollButton(window.scrollY > bannerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const banner = document.getElementById("home");
    if (banner) {
      banner.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="homeContainer">
      <NavbarTop />
      <Navbar />
      <div id="home">
        <Banner />
      </div>
      <div id="ExamCardPart">
        <ExamCardPart />
      </div>
      <div id="ExamForm">
        <ExamForm />
      </div>
      <div id="NewsComp">
        <NewsComp />
      </div>
      <div id="Faq">
        <FaqHeader />
      </div>
      <div id="footer">
        <Footer />
      </div>
      {/* {showScrollButton && (
        <button className="scrollToTopBtn" onClick={scrollToTop}>
          <TiMessages />
        </button>
      )} */}

      <ChatBot />
    </div>
  );
};

export default HomePage;
