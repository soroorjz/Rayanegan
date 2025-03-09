import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment-jalaali";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { RiQuestionFill } from "react-icons/ri";

import ExamInfoComponent from "../../components/ExamInfoComp/ExamInfoComponent";
import { IoMdHome } from "react-icons/io";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import Countdown from "../../components/ExamInfoComp/CountDown/CountDown";
import ExamInfoCard from "../../components/ExamInfoComp/ExamInfoCard/ExamInfoCard";
import { useAuth } from "../../AuthContext";

import "./ExamInfo.scss";

const ExamInfo = () => {
  const { id } = useParams();
  const { token, fetchToken } = useAuth();
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  useEffect(() => {
    const fetchExamInfo = async () => {
      const token = localStorage.getItem("RayanToken");

      if (!token) {
        setError("توکن یافت نشد. لطفاً دوباره وارد شوید.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/exam/exams/`, {
          headers: {
            "RAYAN-TOKEN": token,
            "RAYAN-DEBUG": true,
            "RAYAN-NOCACHE": true,
          },
        });

        const selectedExam = response.data.find(
          (exam) => Number(exam.examId) === Number(id)
        );

        if (!selectedExam) {
          setError("آزمون موردنظر یافت نشد.");
        } else {
          setExamData(selectedExam);
        }
      } catch (err) {
        setError("خطا در دریافت اطلاعات آزمون!");
      } finally {
        setLoading(false);
      }
    };

    fetchExamInfo();
  }, [id]);

  useEffect(() => {
    if (examData) {
      const hasSeenTutorial = localStorage.getItem("hasSeenExamTutorial");

      if (!hasSeenTutorial && window.innerWidth > 728) {
        setTimeout(() => {
          const registrationBtn = document.querySelector("#RegistrationBtn");
          if (registrationBtn) {
            registrationBtn.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });

            const rect = registrationBtn.getBoundingClientRect();
            if (rect.top >= 0 && rect.left >= 0) {
              startTutorial();
              localStorage.setItem("hasSeenExamTutorial", "true");
            } else {
              console.log(
                "موقعیت #RegistrationBtn قابل محاسبه نیست، دوباره تلاش می‌کنم..."
              );
              setTimeout(() => {
                startTutorial();
                localStorage.setItem("hasSeenExamTutorial", "true");
              }, 300);
            }
          } else {
            console.log("المان #RegistrationBtn هنوز رندر نشده است.");
          }
        }, 500);
      }
    }
  }, [examData]);

  const startTutorial = () => {
    if (window.innerWidth <= 728) {
      return;
    }

    const intro = introJs();
    const steps = [
      {
        element: "#RegistrationBtn",
        intro: "برای ثبت‌نام در آزمون، این دکمه را فشار دهید.",
        position: "bottom",
      },
      {
        element: "#ExamIntroduction",
        intro: "در این قسمت، توضیحات آزمون را مشاهده خواهید کرد.",
        position: "right",
      },
      {
        element: "#bookletBtn",
        intro: "برای دریافت دفترچه راهنما، این دکمه را کلیک کنید.",
        position: "left",
      },
      {
        element: "#announcementsBtn",
        intro: "اطلاعیه‌های مهم مربوط به آزمون را در این قسمت ببینید.",
        position: "top",
      },
      {
        element: "#InfojobSearchBtn",
        intro: "در این قسمت می‌توانید اطلاعات شغل‌های مرتبط را جستجو کنید.",
        position: "left",
      },
    ];

    const registrationBtn = document.getElementById("RegistrationBtn");
    if (!registrationBtn) {
      const registrationStepIndex = steps.findIndex(
        (step) => step.element === "#RegistrationBtn"
      );
      if (registrationStepIndex !== -1) {
        steps.splice(registrationStepIndex, 1);
      }
    }

    intro.setOptions({
      steps: steps,
      nextLabel: "متوجه شدم!",
      prevLabel: "قبلی",
      skipLabel: "",
      doneLabel: "متوجه شدم!",
      showProgress: false,
      showPrevButton: false,
      showBullets: false,
      disableInteraction: true,
      tooltipClass: "examTooltip-IntroJs",
      highlightClass: "examHighlight-IntroJs",
    });

    intro.start();
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!examData) return <p>اطلاعاتی یافت نشد</p>;

  const formatPersianDate = (date) => {
    if (!date) return "نامشخص";
    const momentDate = moment(date, "jYYYY/jMM/jDD");
    if (!momentDate.isValid()) return "تاریخ نامعتبر";
    return toPersianDigits(momentDate.format("jYYYY/jMM/jDD"));
  };

  const startDate = moment(examData.examRegisterStartDate, "jYYYY/jMM/jDD");
  const endDate = moment(examData.examRegisterEndDate, "jYYYY/jMM/jDD");
  const cardIssueDate = moment(examData.examWithdrawCard, "jYYYY/jMM/jDD");
  const eventDate = moment(examData.examDate, "jYYYY/jMM/jDD");

  // تبدیل endDate به فرمت رشته‌ای برای NotificationList
  const formattedEndDate = endDate.format("jYYYY-jMM-jDD");

  return (
    <div className="examInfoContainer">
      <NavbarTop />
      <Countdown registrationDeadline={endDate} />

      <ExamInfoCard
        startDate={startDate}
        endDate={endDate}
        cardIssueDate={cardIssueDate}
        eventDate={eventDate}
        toPersianDigits={toPersianDigits}
        examName={examData.examName}
      />

      <ExamInfoComponent
        startDate={startDate}
        endDate={formattedEndDate} // فرمت رشته‌ای برای NotificationList
        cardIssueDate={cardIssueDate}
        eventDate={eventDate}
        toPersianDigits={toPersianDigits}
        examName={examData.examName}
      />

      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>

      <button className="ExamInfo-tutorialBtn" onClick={startTutorial}>
        <RiQuestionFill />
      </button>
    </div>
  );
};

export default ExamInfo;
