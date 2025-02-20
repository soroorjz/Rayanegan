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
    const observer = new MutationObserver((mutationsList, observer) => {
      const faqOption = document.getElementById("faqOptionBtn");
      const offlineSupport = document.getElementById("offlineSupportOptionBtn");

      if (faqOption && offlineSupport) {
        observer.disconnect(); // متوقف کردن آبزرور

        setTimeout(() => {
          const intro = introJs();
          intro.setOptions({
            steps: [
              {
                element: "#jobSearchBtn",
                intro:
                  "در این قسمت می‌توانید مناسب‌ترین آزمون‌ها را باتوجه مشخصات خود، پیدا کنید.",
                position: "right",
              },
              {
                element: "#reportBtn",
                intro:
                  "اگر تخلفی مشاهده کرده‌اید، در این قسمت با ما درمیان بگذارید.",
                position: "right",
              },
              {
                element: "#menuItem-0",
                intro: "برگشت به خانه",
                position: "left",
              },
              {
                element: "#menuItem-1",
                intro: "برای مشاهده‌ آزمون‌ها کلیک کنید",
                position: "left",
              },
              {
                element: "#menuItem-2",
                intro: "برای جست و جوی مناسب‌ترین آزمون برای شما، کلیک کنید",
                position: "left",
              },
              {
                element: "#menuItem-3",
                intro: "برای مشاهده‌ی جدیدترین اخبار استخدامی، کلیک کنید",
                position: "left",
              },
              {
                element: "#menuItem-4",
                intro: "برای مشاهده‌ی پاسخ سوالات متداول، کلیک کنید",
                position: "left",
              },
              {
                element: "#menuItem-5",
                intro: "برای تماس با ما، کلیک کنید",
                position: "left",
              },
              {
                element: "#chatBotMainBtn",
                intro: "راه پشتیبانی موردنظرتان را از این قسمت، انتخاب کنید",
              },
              // {
              //   element: "#faqOptionBtn",
              //   intro: "پاسخ به سوالات متداول در این قسمت قرار دارد",
              //   position: "bottom",
              // },
              {
                element: "#offlineSupportOptionBtn",
                intro:
                  "کاربران می‌توانند پاسخ سوالات خود را در این قسمت، دریافت کنند.",
                position: "bottom",
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
          });

          // تنظیم `positionPrecedence` فقط برای این دو گزینه
          intro.onbeforechange(function (targetElement) {
            if (
              targetElement.id === "faqOptionBtn" ||
              targetElement.id === "offlineSupportOptionBtn"
            ) {
              intro.setOptions({ positionPrecedence: ["bottom"] });
            } else {
              intro.setOptions({
                positionPrecedence: ["right", "left", "top", "bottom"],
              });
            }
          });

          intro.oncomplete(() => {
            document.body.style.overflow = "auto"; // بازگرداندن اسکرول بعد از اتمام توتاریال
          });

          intro.onexit(() => {
            document.body.style.overflow = "auto"; // بازگرداندن اسکرول اگر کاربر توتاریال را بست
          });

          intro.start();
        }, 1000);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
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
