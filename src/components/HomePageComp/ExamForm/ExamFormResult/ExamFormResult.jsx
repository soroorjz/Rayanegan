import React from "react";
import "./ExamFormResult.scss";
import { Link } from "react-router";

const exams = [
  {
    id: 1,
    name: "آزمون استخدامی مشاغل کیفیت بخشی",
    jobLoc: "آموزگار ابتدایی (استثنایی) تهران - بهارستان",
    num: "۱۹۳۴۱",
    date: "۱۴۰۴/۱/۲۵",
  },
  {
    id: 2,
    name: "آزمون استخدامی مشاغل کیفیت بخشی",
    jobLoc: "آموزگار ابتدایی (ابتدایی) تهران-دماوند",
    num: "۱۹۳۶۴",
    date: "۱۴۰۴/۲/۲۰",
  },
  {
    id: 3,
    name: "آزمون استخدامی مشاغل کیفیت بخشی",
    jobLoc: "مربی امور آموزش معلولی البرز - کرج",
    num: "۵۸",
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
