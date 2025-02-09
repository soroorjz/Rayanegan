import "./ExamInfoCard.scss";
import moment from "moment-jalaali";
const ExamInfoCard = ({ startDate, endDate, cardIssueDate, eventDate }) => {
  return (
    <div className="registration-card">
      <h2>اطلاعات آزمون</h2>
      <ul className="registration-card-list">
        <li>
          <strong>تاریخ شروع ثبت‌نام:</strong>
          {moment(startDate, "jYYYY/jMM/jDD").locale("fa").format("jYYYY/jMM/jDD")}
        </li>
        <li>
          <strong>تاریخ پایان ثبت‌نام:</strong>
          {moment(endDate, "jYYYY/jMM/jDD").locale("fa").format("jYYYY/jMM/jDD")}
        </li>
        <li>
          <strong>تاریخ دریافت کارت:</strong>
          {moment(cardIssueDate, "jYYYY/jMM/jDD").locale("fa").format("jYYYY/jMM/jDD")}
        </li>
        <li>
          <strong>تاریخ برگزاری آزمون:</strong>
          {moment(eventDate, "jYYYY/jMM/jDD").locale("fa").format("jYYYY/jMM/jDD")}
        </li>
      </ul>
    </div>
  );
};
export default ExamInfoCard;
