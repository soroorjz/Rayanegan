import React, { useCallback, useEffect, useState } from "react";
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

  // دریافت و ذخیره‌ی توکن
  const fetchToken = useCallback(async () => {
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
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
    }
  }, []);

  // دریافت وضعیت‌های آزمون و تبدیل آن‌ها به یک Map
  const fetchExamStatuses = useCallback(async () => {
    try {
      const response = await axios.get("/api/examStatus/examStatuses", {
        headers: {
          "RAYAN-TOKEN": localStorage.getItem("RayanToken"),
          "RAYAN-DEBUG": true,
        },
      });

      const statusMap = response.data.reduce((acc, status) => {
        acc[status.examStatusId] = status.examStatusName;
        // examStatusId → examStatusName
        return acc;
      }, {});

      console.log(" Exam Statuses:", statusMap);

      setExamStatuses(statusMap);
    } catch (err) {
      console.error("Error fetching exam statuses:", err);
      setError("خطا در دریافت وضعیت آزمون‌ها!");
    }
  }, []);

  const fetchExams = useCallback(async () => {
    if (!examStatuses) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/exam/exams", {
        headers: {
          "RAYAN-TOKEN": localStorage.getItem("RayanToken"),
          "RAYAN-DEBUG": true,
        },
      });

      const updatedExams = response.data.map((exam) => ({
        ...exam,
        examStatusRef: Number(exam.examStatusRef), // حفظ مقدار عددی وضعیت
      }));

      console.log(" Updated Exams:", updatedExams);

      setExamCards(updatedExams);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("خطا در دریافت اطلاعات آزمون‌ها!");
    } finally {
      setLoading(false);
    }
  }, [examStatuses]);

  // اجرای توابع به ترتیب مناسب
  useEffect(() => {
    const fetchData = async () => {
      await fetchToken();
      await fetchExamStatuses();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (examStatuses) {
      fetchExams();
    }
  }, [examStatuses]);

  const getFilteredExams = (statusTitle) => {
    if (!examStatuses) return []; // اطمینان از آماده بودن داده‌ها
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
          examData={getFilteredExams("در حال برسسی")}
          title="در حال بررسی"
        />
      </div>
      <div id="Expired" className="EmploymentTestsComp expiredExams">
        <EmploymentTestsComp
          examData={getFilteredExams("پایان ازمون")}
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
