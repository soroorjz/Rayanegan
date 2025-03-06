import React, { useState } from "react";
import ExamEntryCard from "./ExamEntryCard";
import "./ExamEntryCopm.scss";

const EvaluationCard = () => {
  const [selectedExam, setSelectedExam] = useState("");

  const exams = [
    { id: 1, name: "آزمون استخدامی سازمان ثبت اسناد و املاک کشور", status: "card" },
    { id: 2, name: "آزمون استخدامی سازمان اداری و استخدامی کشور", status: "not_issued" },
    { id: 3, name: "آزمون استخدامی مشاغل کیفیت‌بخشی وزارت آموزش و پرورش", status: "expired" },
  ];

  const handleChange = (event) => {
    setSelectedExam(Number(event.target.value));
  };

  return (
    <div className="Entry-list">
      <h2>کارت‌های ورود به ارزیابی تکمیلی</h2>
      <div className="Entry-selection">
        <label htmlFor="exam-select">انتخاب آزمون:</label>
        <select
          id="exam-select"
          value={selectedExam}
          onChange={handleChange}
          className="exam-select"
        >
          <option value="" disabled>
            آزمون مورد نظر را انتخاب کنید
          </option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
        {selectedExam &&
          exams.find((exam) => exam.id === selectedExam)?.status === "card" && (
            <button className="exam-card-button">دریافت کارت آزمون</button>
          )}
      </div>
      <div className="Exam-result">
        {selectedExam &&
          (exams.find((exam) => exam.id === selectedExam)?.status === "card" ? (
            <ExamEntryCard />
          ) : exams.find((exam) => exam.id === selectedExam)?.status ===
            "not_issued" ? (
            <p style={{ color: "orange" }}>
              در حال حاضر کارت ورود به ارزیابی تکمیلی آزمون استخدامی سازمان اداری و استخدامی کشور صادر
              نشده است.
            </p>
          ) : (
            <p style={{ color: "red" }}>
              مهلت دریافت کارت ورود به ارزیابی تکمیلی آزمون استخدامی مشاغل کیفیت‌بخشی وزارت آموزش و پرورش به پایان
              رسیده است.
            </p>
          ))}
      </div>
    </div>
  );
};

export default EvaluationCard;
