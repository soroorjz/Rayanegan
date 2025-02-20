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
import "intro.js/introjs.css";
import introJs from "intro.js";
import ChatBot from "../ChatBot/ChatBot";
import { RiQuestionFill } from "react-icons/ri";
const HomePage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      startIntro(); // اگر اولین بار است، توتاریال نمایش داده شود
      localStorage.setItem("hasSeenTutorial", "true"); // ذخیره در لوکال‌استوریج
    }
  }, []);

  const startIntro = () => {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: "#jobSearchBtn",
          intro: "در این قسمت می‌توانید مناسب‌ترین آزمون‌ها را پیدا کنید.",
          position: "right",
        },
        {
          element: "#reportBtn",
          intro: "اگر تخلفی مشاهده کرده‌اید، در این قسمت با ما درمیان بگذارید.",
          position: "right",
        },
        { element: "#menuItem-0", intro: "برگشت به خانه", position: "left" },
        {
          element: "#menuItem-1",
          intro: "برای مشاهده آزمون‌ها کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-2",
          intro: "برای جستجوی مناسب‌ترین آزمون کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-3",
          intro: "برای مشاهده جدیدترین اخبار کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-4",
          intro: "برای مشاهده‌ی سوالات متداول کلیک کنید",
          position: "left",
        },
        {
          element: "#menuItem-5",
          intro: "برای تماس با ما کلیک کنید",
          position: "left",
        },
        {
          element: "#chatBotMainBtn",
          intro: "راه پشتیبانی موردنظرتان را از این قسمت انتخاب کنید",
          position: "bottom",
        },
      ],
      nextLabel: "بعدی",
      prevLabel: "قبلی",
      skipLabel: "✖",
      doneLabel: "متوجه شدم!",
      showProgress: false,
      showPrevButton: false,
      showBullets: false,
      disableInteraction: true,
      tooltipClass: "homeTooltip-IntroJs",
      highlightClass: "homeHighlight-IntroJs",
    });

    intro.start();
  };

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
      <button className="tutorialBtn" onClick={startIntro}>
        <RiQuestionFill />
      </button>
      <ChatBot />
    </div>
  );
};

export default HomePage;
