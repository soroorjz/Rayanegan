import React from "react";
import "./ExamFormResult.scss";
import { Link } from "react-router";

const exams = [
  {
    id: 1,
    name: "آزمون استخدامی نیروی انسانی سازمان زندان‌ها و اقدامات تامینی و تربیتی کشور",
    num:"۱۲۰۲۵",
    date: "۱۴۰۲/۱۰/۱۵",
  },
  {
    id: 2,
    name: "آزمون استخدام نیروی پیمانی مشاغل عملیاتی آتش‌نشانی شهرداری‌های کشور",
    num:"۱۰۷۲۵",
    date: "۱۴۰۲/۱۱/۲۰",
  },
  {
    id: 3,
    name: "آزمون استخدامی مشاغل کیفیت‌بخشی وزارت آموزش و پرورش",
    num:"۱۰۲۵۵",
    date: "۱۴۰۲/۱۲/۱۰",
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
