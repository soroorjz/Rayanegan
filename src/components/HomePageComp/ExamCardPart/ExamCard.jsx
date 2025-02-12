import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useAuth } from "../../../AuthContext"; // گرفتن توکن از AuthContext
import { Link } from "react-router-dom";
import axios from "axios";
import "./ExamCard.scss";

const ExamCard = () => {
  const { user, token, fetchToken } = useAuth(); // گرفتن توکن و تابع دریافت توکن
  const [examCards, setExamCards] = useState([]);
  const [examStatuses, setExamStatuses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دریافت وضعیت‌های آزمون
  const fetchExamStatuses = useCallback(async () => {
    if (!token) return; // منتظر دریافت توکن می‌مانیم

    try {
      const response = await axios.get(
        "http://localhost/api/examStatus/examStatuses",
        {
          headers: {
            "RAYAN-TOKEN": token, // استفاده از توکن ذخیره‌شده
          },
        }
      );

      const statusMap = response.data.reduce((acc, status) => {
        acc[status.examStatusId] = status.examStatusName;
        return acc;
      }, {});

      console.log(" Exam Statuses:", statusMap);
      setExamStatuses(statusMap);
    } catch (err) {
      console.error("Error fetching exam statuses:", err);
      setError("خطا در دریافت وضعیت آزمون‌ها!");
    }
  }, [token]);

  // دریافت اطلاعات آزمون‌ها
  const fetchExams = useCallback(async () => {
    if (!examStatuses || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost/api/exam/exams", {
        headers: {
          "RAYAN-TOKEN": token, // استفاده از توکن ذخیره‌شده
        },
      });

      const updatedExams = response.data.map((exam) => ({
        ...exam,
        examStatusRef: examStatuses[exam.examStatusRef] || "نامشخص",
      }));

      console.log(" Updated Exams:", updatedExams);
      setExamCards(updatedExams);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("خطا در دریافت اطلاعات آزمون‌ها!");
    } finally {
      setLoading(false);
    }
  }, [examStatuses, token]);

  // دریافت توکن و سپس اطلاعات آزمون‌ها
  useEffect(() => {
    if (!token) {
      fetchToken(); // اگر توکن نداریم، ابتدا دریافت شود
    }
  }, [token, fetchToken]);

  useEffect(() => {
    if (token) {
      fetchExamStatuses();
    }
  }, [token, fetchExamStatuses]);

  useEffect(() => {
    if (examStatuses) {
      fetchExams();
    }
  }, [examStatuses, fetchExams]);

  return (
    <div className="examCard-Container">
      {loading && <p className="loading-text">در حال دریافت اطلاعات...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && examCards.length > 0 && (
        <Swiper
          slidesPerView={3}
          spaceBetween={8}
          loop={true}
          navigation={true}
          loopAdditionalSlides={examCards.length}
          modules={[Navigation]}
          className="examSwiper"
          breakpoints={{
            1025: { slidesPerView: 3, spaceBetween: 10 },
            900: { slidesPerView: 2, spaceBetween: 5 },
            426: { slidesPerView: 1, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 5 },
          }}
        >
          {examCards.map((examCard) => (
            <SwiperSlide key={examCard.examId}>
              <div className="examCards-swiper">
                <div className="examCardTop">
                  <div className="examCard-Title">
                    <h2>{examCard.examName}</h2>
                  </div>
                </div>
                <div className="examCard-details">
                  <p className="examCard-Status detail">
                    وضعیت آزمون: <span>{examCard.examStatusRef}</span>
                  </p>
                  <p className="examCard-Capacity detail">ظرفیت درخواستی:</p>
                </div>
                <div className="examCard-Footer">
                  {!user && (
                    <button className="btn1">
                      <Link to="/signUpForm" key="signup">
                        ثبت‌نام
                      </Link>
                    </button>
                  )}
                  <button className="btn2">دفترچه</button>
                  <button className="btn3">
                    <Link
                      to={`/examInfo/${examCard.examId}`}
                      key={`examInfo-${examCard.examId}`}
                    >
                      بیشتر
                    </Link>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!loading && !error && examCards.length === 0 && (
        <p className="no-data-text">هیچ آزمونی یافت نشد.</p>
      )}
    </div>
  );
};

export default ExamCard;
