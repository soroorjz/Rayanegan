import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { examData } from "../MyExams/data";
import "./ExamEntryCopm.scss";
import ExamEntryCard from "./ExamEntryCard";

const ExamEntryCopm = () => {
  const [selectedExam, setSelectedExam] = useState("");

  const exams = [
    { id: 1, name: "آزمون استخدامی وزارت بهداشت", status: "card" },
    { id: 2, name: "آزمون دستگاه‌های اجرایی", status: "not_issued" },
    { id: 3, name: "آزمون آموزش و پرورش", status: "expired" },
  ];

  const handleChange = (event) => {
    setSelectedExam(Number(event.target.value));
  };

  return (
    <div className="Entry-list">
      <h2>کارت‌های ورود به آزمون</h2>
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
              در حال حاضر کارت آزمون صادر نشده است.
            </p>
          ) : (
            <p style={{ color: "red" }}>
              مهلت دریافت کارت آزمون به پایان رسیده است.
            </p>
          ))}
      </div>
    </div>
  );
};
export default ExamEntryCopm;
