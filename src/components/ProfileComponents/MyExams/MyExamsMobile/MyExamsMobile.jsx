import React, { useState } from "react";
import "./MyExamsMobile.scss";
import { examData } from "../data";

const MyExamsMobile = () => {
  const [selectedExam, setSelectedExam] = useState(""); // آزمون انتخاب‌شده
  const [selectedExamId, setSelectedExamId] = useState(null); // برای باز و بسته کردن دراپ‌داون

  const toggleDropdown = (id) => {
    setSelectedExamId(selectedExamId === id ? null : id);
  };

  return (
    <div className="exam-list-mobile">
      <h2>آزمون‌های ثبت‌نام‌شده</h2>

      {/* انتخاب آزمون */}
      <div className="exam-selection">
        <label>انتخاب آزمون:</label>
        <select onChange={(e) => setSelectedExam(e.target.value)}>
          <option value="">انتخاب کنید</option>
          {[...new Set(examData.map((exam) => exam.examName))].map(
            (name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            )
          )}
        </select>
      </div>

      {/* نمایش آزمون‌های مرتبط تنها پس از انتخاب */}
      {selectedExam && (
        <div className="exam-list">
          {examData
            .filter((exam) => exam.examName === selectedExam) // فیلتر کردن بر اساس انتخاب
            .map((exam) => (
              <div key={exam.examName} className="exam-item">
                {exam.exams.map((subExam) => (
                  <div key={subExam.id}>
                    <div
                      className="exam-header"
                      onClick={() => toggleDropdown(subExam.id)}
                    >
                      <span>{subExam.category}</span>
                      <span>{subExam.date}</span>
                      <span className="dropdown-icon">
                        {selectedExamId === subExam.id ? "▲" : "▼"}
                      </span>
                    </div>
                    <div
                      className={`exam-details ${
                        selectedExamId === subExam.id ? "open" : ""
                      }`}
                    >
                      <p>
                        <strong>وضعیت فعالیت:</strong> {subExam.status}
                      </p>
                      <p>
                        <strong>نمره:</strong> {subExam.score}
                      </p>
                      <p>
                        <strong>درصد از کل:</strong> {subExam.percentage}
                      </p>
                      <p>
                        <strong>وضعیت داوطلب:</strong> {subExam.candidateStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyExamsMobile;
