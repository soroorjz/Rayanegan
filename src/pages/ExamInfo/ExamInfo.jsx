import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment-jalaali";

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
        const response = await axios.get(
          `http://smp.devrayan.ir:8000/api/exam/exams/`,
          {
            headers: { "RAYAN-TOKEN": token },
          }
        );

        console.log("Exam Data (Full List):", response.data);

        const selectedExam = response.data.find(
          (exam) => Number(exam.examId) === Number(id)
        );

        if (!selectedExam) {
          setError("آزمون موردنظر یافت نشد.");
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

  console.log("Parsed Dates:", {
    startDate,
    endDate,
    cardIssueDate,
    eventDate,
  });

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
