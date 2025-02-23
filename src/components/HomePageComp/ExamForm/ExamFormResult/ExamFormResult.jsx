import React from "react";
import "./ExamFormResult.scss";
import { Link } from "react-router";

const exams = [
  {
    id: 1,
    name:"دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار گروه امور کامپیوتر و فناوری اطلاعات، البرز،کرج،قلم",
    num: "۱۰۲۴",
    date: "۱۴۰۴/۱/۲۵",
  },
  {
    id: 2,
    name:"دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار امور مالی، البرز، کرج، قلم",
    num: "۱۱۹۹",
    date: "۱۴۰۴/۲/۲۰",
  },
  {
    id: 3,
    name:"دوازدهمین آزمون مشترک فراگیر دستگاه‌های اجرایی کشور",
    jobLoc: "بانکدار امور مالی، البرز، کرج، گلشهر",
    num: "۱۲۰۰",
    date: "۱۴۰۴/۴/۱۰",
  },
];
const ExamFormResult = () => {
  return (
    <div className="ResultExam-list">
      {exams.map((exam) => (
        <div key={exam.id} className="ResultExam-item">
          <span className="ResultExam-name">{exam.name}</span>
          <span className="ResultExam-date">{exam.date}</span>
          <span className="ResultExam-date">{exam.num}</span>
          <span className="ResultExam-jobLoc">{exam.jobLoc}</span>
          <a
            className="ResultExam-more"
            href={`/examInfo/${exam.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>بیشتر</button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ExamFormResult;
