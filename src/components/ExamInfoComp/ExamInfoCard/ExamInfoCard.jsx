import "./ExamInfoCard.scss";

const ExamInfoCard = ({ startDate, endDate, cardIssueDate, eventDate }) => {
  return (
    <div className="registration-card">
      <h2>اطلاعات آزمون</h2>
      <ul className="registration-card-list">
        <li>
          <strong>تاریخ شروع ثبت‌نام:</strong>
          {startDate?.isValid() ? startDate.format("jYYYY/jMM/jDD") : "نامشخص"}
        </li>
        <li>
          <strong>تاریخ پایان ثبت‌نام:</strong>
          {endDate?.isValid() ? endDate.format("jYYYY/jMM/jDD") : "نامشخص"}
        </li>
        <li>
          <strong>تاریخ دریافت کارت:</strong>
          {cardIssueDate?.isValid()
            ? cardIssueDate.format("jYYYY/jMM/jDD")
            : "نامشخص"}
        </li>
        <li>
          <strong>تاریخ برگزاری آزمون:</strong>
          {eventDate?.isValid() ? eventDate.format("jYYYY/jMM/jDD") : "نامشخص"}
        </li>
      </ul>
    </div>
  );
};

export default ExamInfoCard;
