import "./ExamInfoCard.scss";

const ExamInfoCard = ({ startDate, endDate, cardIssueDate, eventDate }) => {
  return (
    <div className="registration-card">
      <h2>اطلاعات آزمون</h2>
      <ul className="registration-card-list">
        <li>
          <strong>تاریخ شروع ثبت‌نام:</strong>{" "}
          {new Date(startDate).toLocaleDateString("fa-IR")}
        </li>
        <li>
          <strong>تاریخ پایان ثبت‌نام:</strong>{" "}
          {new Date(endDate).toLocaleDateString("fa-IR")}
        </li>
        <li>
          <strong>تاریخ دریافت کارت:</strong>{" "}
          {new Date(cardIssueDate).toLocaleDateString("fa-IR")}
        </li>
        <li>
          <strong>تاریخ برگزاری آزمون:</strong>{" "}
          {new Date(eventDate).toLocaleDateString("fa-IR")}
        </li>
      </ul>
    </div>
  );
};

export default ExamInfoCard;
