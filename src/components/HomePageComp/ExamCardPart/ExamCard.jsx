import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const ExamCard = () => {
  const { user } = useAuth();
  const [examCards, setExamCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost/api/auth", {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
        },
        method: "post",
      }).then(async (val) => {
        localStorage.setItem("RayanToken", (await val.json())["token"]);
      });
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("خطا در دریافت اطلاعات آزمون‌ها!");
    } finally {
      setLoading(false);
    }

    try {
      const response = await axios.get("http://localhost/api/exam/exams", {
        headers: {
          "RAYAN-TOKEN": window.localStorage.RayanToken,
        },
      });
      console.log("Received Exams:", response.data);

      setExamCards(response.data);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("خطا در دریافت اطلاعات آزمون‌ها!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (examCards.length === 0) {
      fetchExams();
    }
  }, [fetchExams, examCards.length]);

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
                    <Link to="/examInfo" key={`examInfo-${examCard.examId}`}>
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
