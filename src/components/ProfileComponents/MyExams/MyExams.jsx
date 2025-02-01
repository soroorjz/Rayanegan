import React, { useEffect, useState } from "react";
import "./MyExams.scss";
import MyExamsMobile from "./MyExamsMobile/MyExamsMobile";
const examData = [
  {
    id: 1,
    examName: "آزمون پنجم",
    category: "آزمون کتبی",
    date: "1402/11/15",
    status: "برگزار شده",
    score: "74",
    percentage: "85%",
    candidateStatus: "قبول شده",
  },
  {
    id: 2,
    examName: "آزمون پنجم",
    category: "ارزیابی تکمیلی",
    date: "1402/12/02",
    status: "در انتظار اعلام نتایج",
    score: "24",
    percentage: "30%",
    candidateStatus: "مردود",
  },
  {
    id: 3,
    examName: "آزمون پنجم",
    category: "گزینش",
    date: "1402/12/02",
    status: "در حال برگزاری",
    score: "0",
    percentage: "-",
    candidateStatus: "غایب",
  },
  {
    id: 4,
    examName: "آزمون دوازدهم",
    category: "آزمون کتبی",
    date: "1403/01/10",
    status: "برگزار شده",
    score: "60",
    percentage: "75%",
    candidateStatus: "قبول شده",
  },
  {
    id: 5,
    examName: "آزمون دوازدهم",
    category: "ارزیابی تکمیلی",
    date: "1403/01/15",
    status: "در انتظار اعلام نتایج",
    score: "40",
    percentage: "50%",
    candidateStatus: "مردود",
  },
  {
    id: 6,
    examName: "آزمون دوازدهم",
    category: "گزینش",
    date: "1403/01/20",
    status: "در حال برگزاری",
    score: "0",
    percentage: "-",
    candidateStatus: "غایب",
  },
];

const examNames = [...new Set(examData.map((exam) => exam.examName))];

const MyExams = () => {
  const [selectedExam, setSelectedExam] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MyExamsMobile examData={examData} />;
  }


  return (
    <div className="exam-list">
      <h2>آزمون‌های ثبت‌نام‌شده</h2>
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
      <div className="exam-table-container">
        <table>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>عنوان</th>
              <th>تاریخ</th>
              <th>وضعیت فعالیت</th>
              <th>نمره</th>
              <th>درصد از کل</th>
              <th>وضعیت داوطلب</th>
            </tr>
          </thead>
          <tbody>
            {examData
              .filter((exam) => exam.examName === selectedExam)
              .map((exam, index) => (
                <tr
                  key={exam.id}
                  className={exam.status === "لغو شده" ? "canceled" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{exam.category}</td>
                  <td>{exam.date}</td>
                  <td className={`status ${exam.status}`}>{exam.status}</td>
                  <td>{exam.score}</td>
                  <td>{exam.percentage}</td>
                  <td
                    className={`result ${
                      exam.candidateStatus === "قبول شده"
                        ? "pass"
                        : exam.candidateStatus === "مردود"
                        ? "fail"
                        : ""
                    }`}
                  >
                    {exam.candidateStatus}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyExams;
