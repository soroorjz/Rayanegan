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
import gsap from "gsap"; // برای مدیریت GSAP

const HomePage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      const checkAndStartTutorial = () => {
        const requiredElements = [
          "#jobSearchBtn",
          "#reportBtn",
          "#menuItem-0",
          "#menuItem-1",
          "#menuItem-2",
          "#menuItem-3",
          "#menuItem-4",
          "#menuItem-5",
          "#chatBotMainBtn",
        ];
        const allElementsReady = requiredElements.every((selector) =>
          document.querySelector(selector)
        );

        if (allElementsReady) {
          startIntro();
          localStorage.setItem("hasSeenTutorial", "true");
        } else {
          console.log("بعضی المان‌ها هنوز رندر نشدن، منتظر می‌مانم...");
          requestAnimationFrame(checkAndStartTutorial);
        }
      };
      requestAnimationFrame(checkAndStartTutorial);
    }
  }, []);

  const startIntro = () => {
    if (window.innerWidth <= 728) {
      console.log("صفحه در حالت موبایل است، توتوریال اجرا نمی‌شود.");
      return;
    }

    // غیرفعال کردن انیمیشن‌های GSAP برای جلوگیری از تداخل
    gsap.globalTimeline.pause();

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
      nextLabel: "متوجه شدم!",
      prevLabel: "قبلی",
      skipLabel: "✖",
      doneLabel: "متوجه شدم!",
      showProgress: false,
      showPrevButton: false,
      showBullets: false,
      disableInteraction: true,
      tooltipClass: "homeTooltip-IntroJs",
      highlightClass: "homeHighlight-IntroJs",
      scrollPadding: 100, // فاصله اضافی برای اسکرول
    });

    intro.onbeforechange(() => {
      const currentStep = intro._currentStep;
      const stepElement = intro._options.steps[currentStep]?.element;
      if (stepElement) {
        const element = document.querySelector(stepElement);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // یه تأخیر کوتاه برای اطمینان از اتمام اسکرول
          return new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
    });

    intro.onexit(() => {
      gsap.globalTimeline.resume(); // برگرداندن انیمیشن‌های GSAP
    });

    intro.start();
  };

  const scrollToTop = () => {
    const banner = document.getElementById("home");
    if (banner) {
      banner.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("المان #home پیدا نشد!");
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
      <button className="tutorialBtn" onClick={startIntro}>
        <RiQuestionFill />
      </button>
      <ChatBot />
    </div>
  );
};

export default HomePage;
