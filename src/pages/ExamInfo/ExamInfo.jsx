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
  const { id } = useParams();
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          `http://localhost/api/exam/exams/`, // اینجا دیگه id نمی‌فرستیم چون لیست برمی‌گردونه
          {
            headers: { "RAYAN-TOKEN": token },
          }
        );

        console.log("Exam Data (Full List):", response.data); // چک کن کل لیست چیه

        // 🔥 فیلتر کردن آزمونی که ID موردنظر رو داره
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

  const startDate = moment(examData.examRegisterStartDate, "jYYYY/jMM/jDD");
  const endDate = moment(examData.examRegisterEndDate, "jYYYY/jMM/jDD");
  const cardIssueDate = moment(examData.examWithdrawCard, "jYYYY/jMM/jDD");
  const eventDate = moment(examData.examDate, "jYYYY/jMM/jDD");

  console.log("Parsed Dates:", {
    startDate: startDate.format("jYYYY/jMM/jDD"),
    endDate: endDate.format("jYYYY/jMM/jDD"),
    cardIssueDate: cardIssueDate.format("jYYYY/jMM/jDD"),
    eventDate: eventDate.format("jYYYY/jMM/jDD"),
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
