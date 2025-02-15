import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment-jalaali";
import ExamInfoComponent from "../../components/ExamInfoComp/ExamInfoComponent";
import { IoMdHome } from "react-icons/io";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import Countdown from "../../components/ExamInfoComp/CountDown/CountDown";
import ExamInfoCard from "../../components/ExamInfoComp/ExamInfoCard/ExamInfoCard";
import "./ExamInfo.scss";

const ExamInfo = () => {
  const { id } = useParams(); // دریافت examId از URL
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تابع تبدیل اعداد انگلیسی به فارسی
  const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  // تابع تبدیل تاریخ به تاریخ جلالی
  const formatPersianDate = (date) => {
    if (!date) return "نامشخص";
    const momentDate = moment(date, "YYYY-MM-DD"); // فرض بر اینکه تاریخ‌ها به فرمت استاندارد میلادی هستند
    if (!momentDate.isValid()) return "تاریخ نامعتبر";
    return toPersianDigits(momentDate.format("jYYYY/jMM/jDD"));
  };

  // دریافت اطلاعات آزمون بر اساس examId
  useEffect(() => {
    const fetchExamInfo = async () => {
      const token = localStorage.getItem("RayanToken");
  
      if (!token) {
        setError("توکن یافت نشد.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(
          `https://smp.devrayan.ir/api/exam/exams/`,
          {
            headers: { "RAYAN-TOKEN": token },
          }
        );
  
        console.log("Exam Data (Full List):", response.data); // تمام داده‌های دریافتی را چاپ می‌کنیم
        console.log("Exam ID from URL:", id); // id گرفته‌شده از URL را چاپ می‌کنیم
  
        const selectedExam = response.data.find(
          (exam) => Number(exam.examId) === Number(id) // مطمئن شویم که مقایسه به درستی انجام می‌شود
        );
  
        if (!selectedExam) {
          setError("آزمون موردنظر یافت نشد.");
          console.log("No exam found with id:", id);
        } else {
          setExamData(selectedExam);
          console.log("Selected Exam Data:", selectedExam);
        }
      } catch (err) {
        console.error("Error fetching exam details:", err);
        setError("خطا در دریافت اطلاعات آزمون!");
      } finally {
        setLoading(false);
      }
    };
  
    fetchExamInfo();
  }, [id]);
  

  // بررسی وضعیت بارگذاری و خطا
  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!examData) return <p>اطلاعاتی یافت نشد</p>;

  // فرمت تاریخ‌های مربوط به آزمون
  const startDate = formatPersianDate(examData.examRegisterStartDate);
  const endDate = formatPersianDate(examData.examRegisterEndDate);
  const cardIssueDate = formatPersianDate(examData.examWithdrawCard);
  const eventDate = formatPersianDate(examData.examDate);

  console.log("Parsed Dates:", {
    startDate,
    endDate,
    cardIssueDate,
    eventDate,
  });

  return (
    <div className="examInfoContainer">
      <NavbarTop />
      {examData && <p>{examData.examName}</p>} {/* نمایش نام آزمون برای چک کردن */}
      <Countdown registrationDeadline={endDate} />
  
      <ExamInfoCard
        startDate={startDate}
        endDate={endDate}
        cardIssueDate={cardIssueDate}
        eventDate={eventDate}
      />
  
      <ExamInfoComponent />
  
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
  
};

export default ExamInfo;
