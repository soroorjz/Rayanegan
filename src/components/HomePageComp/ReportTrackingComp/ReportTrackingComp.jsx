import React from "react";
import "./ReportTrackingComp.scss";
const userReports = [
  {
    id: 1,
    title: " تقلب در آزمون کتبی ",
    date: "۱۴۰۳/۰۲/۰۵",
    status: "در حال بررسی",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
  },
  {
    id: 2,
    title: "خطا در سوالات آزمون",
    date: "۱۴۰۳/۰۲/۰۵",
    status: "بررسی شده",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
  },
  {
    id: 3,
    title: "رفتار نامناسب ناظر",
    date: "۱۴۰۳/۰۲/۰۵",
    status: "رد شده",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
  },
];
const ReportTrackingComp = () => {
  return (
    <div className="user-reports">
      <h2>پیگیری گزارشات</h2>
      <ul>
        {userReports.map((report) => (
          <li key={report.id} className="report-item">
            <h3 className="report-title">{report.title}</h3>
            <p className="report-date">تاریخ: {report.date}</p>
            <p className="report-status">وضعیت: {report.status}</p>
            <p className="report-description">{report.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportTrackingComp;
