import React, { useEffect, useState } from "react";
import "./EmploymentTests.scss";
import { IoMdHome } from "react-icons/io";
import EmploymentTestsComp from "../../components/EmploymentTestsComp/EmploymentTestsComp";
import EmploymentTestsIcons from "../../components/EmploymentTestsComp/EmploymentTestsIcons/EmploymentTestsIcons";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import EmploymentTestsBanner from "../../components/EmploymentTestsComp/EmploymentTestsBanner/EmploymentTestsBanner";
import { Link } from "react-router";
import axios from "axios";

const EmploymentTests = () => {
  const [examCards, setExamCards] = useState([]);
  const [examStatuses, setExamStatuses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToken = async () => {
    try {
      const response = await fetch("/api/auth", {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
        },
        method: "post",
      });
      const data = await response.json();
      localStorage.setItem("RayanToken", data.token);
      return data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      throw err;
    }
  };

  const fetchExamStatuses = async (token) => {
    // Check localStorage for cached statuses
    const cachedStatuses = localStorage.getItem("examStatuses");
    if (cachedStatuses) {
      const statusMap = JSON.parse(cachedStatuses);
      setExamStatuses(statusMap);
      return statusMap;
    }

    try {
      const response = await axios.get("/api/examStatus/examStatuses", {
        headers: {
          "RAYAN-TOKEN": token,
          "RAYAN-DEBUG": true,
        },
      });

      const statusMap = response.data.reduce((acc, status) => {
        acc[status.examStatusId] = status.examStatusName;
        return acc;
      }, {});

      console.log("Exam Statuses:", statusMap);
      localStorage.setItem("examStatuses", JSON.stringify(statusMap));
      setExamStatuses(statusMap);
      return statusMap;
    } catch (err) {
      console.error("Error fetching exam statuses:", err);
      setError("خطا در دریافت وضعیت آزمون‌ها!");
      throw err;
    }
  };

  const fetchExams = async (token) => {
    try {
      const response = await axios.get("/api/exam/exams", {
        headers: {
          "RAYAN-TOKEN": token,
          "RAYAN-DEBUG": true,
        },
      });

      const updatedExams = response.data.map((exam) => ({
        ...exam,
        examStatusRef: Number(exam.examStatusRef),
      }));

      console.log("Updated Exams:", updatedExams);
      setExamCards(updatedExams);
      return updatedExams;
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("خطا در دریافت اطلاعات آزمون‌ها!");
      throw err;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check for existing token
        let token = localStorage.getItem("RayanToken");
        if (!token) {
          token = await fetchToken();
        }

        // Fetch statuses and exams in parallel
        const [statuses, exams] = await Promise.all([
          fetchExamStatuses(token),
          fetchExams(token),
        ]);

        // Ensure state is updated only if not already set (from cache)
        if (!examStatuses) {
          setExamStatuses(statuses);
        }
        setExamCards(exams);
      } catch (err) {
        console.error("Error fetching all data:", err);
        if (!error) setError("خطا در دریافت اطلاعات!");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getFilteredExams = (statusTitle) => {
    if (!examStatuses) return [];
    const statusId = Object.keys(examStatuses).find(
      (key) => examStatuses[key] === statusTitle
    );
    return examCards.filter((exam) => exam.examStatusRef === Number(statusId));
  };

  return (
    <div className="EmploymentTests">
      <NavbarTop hideJobSearch={true} />
      <div className="EmploymentTestsBanner">
        <EmploymentTestsBanner />
      </div>
      <div className="EmploymentTestsIcons">
        <EmploymentTestsIcons />
      </div>
      <div id="InProgress" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("در انتظار")}
          title="در انتظار"
        />
      </div>
      <div id="Registering" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("درحال ثبت نام")}
          title="درحال ثبت نام"
        />
      </div>
      <div id="EndOfRegistering" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("پایان ثبت نام")}
          title="پایان ثبت نام"
        />
      </div>
      <div id="ExamCard" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("دریافت کارت ورود به جلسه")}
          title="دریافت کارت ورود به جلسه"
        />
      </div>
      <div id="Held" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("آزمون کتبی برگزار شده")}
          title="آزمون کتبی برگزار شده"
        />
      </div>
      <div id="UnderReview" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("در حال بررسی")}
          title="در حال بررسی"
        />
      </div>
      <div id="Announcing" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("اعلام نتایج آزمون کتبی")}
          title="اعلام نتایج آزمون کتبی"
        />
      </div>
      <div id="Filter" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("ارزیابی تکمیلی")}
          title="ارزیابی تکمیلی"
        />
      </div>
      <div id="Selection" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("گزینش")}
          title="گزینش"
        />
      </div>
      <div id="Expired" className="EmploymentTestsComp expiredExams">
        <EmploymentTestsComp
          examData={getFilteredExams("پایان آزمون")}
          title="پایان آزمون"
        />
      </div>
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};

export default EmploymentTests;