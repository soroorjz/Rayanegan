import React, { useEffect, useState } from "react";
import ExamInfoComponent from "../../components/ExamInfoComp/ExamInfoComponent";
import { IoMdHome } from "react-icons/io";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import Countdown from "../../components/ExamInfoComp/CountDown/CountDown";
import "./ExamInfo.scss";
import ExamInfoCard from "../../components/ExamInfoComp/ExamInfoCard/ExamInfoCard";
import { Link, useParams } from "react-router";
import axios from "axios";
import moment from "moment-jalaali";
const ExamInfo = () => {

  const { id } = useParams();
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTargetDate, setCurrentTargetDate] = useState(null);

  useEffect(() => {
    const fetchExamInfo  = async () => {
      try {
        const response = await axios.get(`http://localhost/api/exam/exams/${id}`, {
          headers: {
            "RAYAN-TOKEN": window.localStorage.RayanToken,
          },
        });

        setExamData(response.data);
        // setCurrentTargetDate(response.data.endDate);
      } catch (err) {
        console.error("Error fetching exam details:", err);
        setError("خطا در دریافت اطلاعات آزمون!");
      } finally {
        setLoading(false);
      }
    };

    fetchExamInfo ();
  }, [id]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!examData) return <p>اطلاعاتی یافت نشد</p>;



const startDate = moment(examData.examRegisterStartDate, "jYYYY/jMM/jDD").toDate();
const endDate = moment(examData.examRegisterEndDate, "jYYYY/jMM/jDD").toDate();
const cardIssueDate = moment(examData.examWithdrawCard, "jYYYY/jMM/jDD").toDate();
const eventDate = moment(examData.examDate, "jYYYY/jMM/jDD").toDate();



  return (
    <div className="examInfoContainer">
      <NavbarTop />
      <Countdown registrationDeadline={endDate} />

      <ExamInfoCard
       startDate={startDate}
       endDate={endDate}
       cardIssueDate={cardIssueDate}
       eventDate={eventDate}
      />
      <ExamInfoComponent />
      <button className="homeBtn">
        <Link to="/">
          <IoMdHome />
        </Link>
      </button>
    </div>
  );
};
export default ExamInfo;
