import React from "react";
import "./ExamFormResult.scss";
import { Link } from "react-router-dom"; // اصلاح وارد کردن Link
import { useAuth } from "../../../../AuthContext"; // اضافه کردن useAuth برای دریافت وضعیت کاربر

const exams = [
  {
    id: 1,
    name: "دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار گروه امور کامپیوتر و فناوری اطلاعات، البرز،کرج،قلم",
    num: "۱۰۲۴",
    date: "۱۴۰۴/۱/۲۵",
  },
  {
    id: 2,
    name: "دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار امور مالی، البرز، کرج، قلم",
    num: "۱۱۹۹",
    date: "۱۴۰۴/۲/۲۰",
  },
  {
    id: 3,
    name: "دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار امور مالی، البرز، کرج، گلشهر",
    num: "۱۲۰۰",
    date: "۱۴۰۴/۴/۱۰",
  },
];

const ExamFormResult = () => {
  const { user } = useAuth(); // دریافت وضعیت کاربر از AuthContext

  return (
    <div className="ResultExam-list">
      {exams.map((exam) => (
        <div key={exam.id} className="ResultExam-item">
          <span className="ResultExam-name">{exam.name}</span>
          <span className="ResultExam-date">{exam.date}</span>
          <span className="ResultExam-date">{exam.num}</span>
          <span className="ResultExam-jobLoc">{exam.jobLoc}</span>
          <div className="ResultExam-more">
            {user ? (
              <Link to="/RegistrationPage">
                <button>ثبت نام</button>
              </Link>
            ) : (
              <Link to="/logIn">
                <button>ورود به حساب کاربری</button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamFormResult;
