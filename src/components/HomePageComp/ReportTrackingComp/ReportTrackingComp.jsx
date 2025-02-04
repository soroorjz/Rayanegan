import React, { useState } from "react";
import "./ReportTrackingComp.scss";

const ReportTrackingComp = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckReport = () => {
    if (trackingCode === "123456") {
      setReportData({
        title: "تقلب در آزمون کتبی",
        date: "1403/02/05",
        status: "در حال بررسی",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
      });
      setError(null);
    } else {
      setReportData(null);
      setError("کد پیگیری نامعتبر است.");
    }
  };

  return (
    <div className="tracking-container">
      <h2 className="title">پیگیری گزارش</h2>
      <div className="tracking-input">
        <input
          type="text"
          placeholder="کد پیگیری را وارد کنید"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />
        <button onClick={handleCheckReport}>بررسی</button>
      </div>
      {error && <small className="error">{error}</small>}
      {reportData && (
        <div className="report-box">
          <h3>{reportData.title}</h3>
          <p><strong>تاریخ:</strong> {reportData.date}</p>
          <p className="status">وضعیت: <span>{reportData.status}</span></p>
          <p>{reportData.description}</p>
        </div>
      )}
    </div>
  );
};
export default ReportTrackingComp;
