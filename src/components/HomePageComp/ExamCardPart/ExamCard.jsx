import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router";

const ExamCard = () => {
  const { user } = useAuth();
  const [examCards, setExamCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);


  const fetchToken = async () => {
    try {
      const response = await fetch("/api/auth", {
        headers: {
          "Rayan-Username": "S.JAMEIE",
          "Rayan-Password": "1156789",
        },
        method: "POST",
      });

      if (!response.ok) {
        console.error("Failed to fetch token:", response.status);
        throw new Error("Failed to fetch token");
      }

      const newToken = await response.text();
      console.log("New token:", newToken); // توکن جدید تو کنسول
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.error("Error fetching token:", error);
      setError(error.message);
    }
  };

  // دریافت داده‌های آزمون‌ها
  const fetchExams = async () => {
    if (!token) return;

    try {
      const response = await fetch("/api/exam/exams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response Status:", response.status); // وضعیت پاسخ را بررسی می‌کنیم

      if (response.status === 401) {
        console.log("Token expired, fetching new token...");
        const newToken = await fetchToken();
        setToken(newToken); 
        return fetchExams();
      }

      if (!response.ok) {
        console.error("Failed to fetch exams:", response.status);
        throw new Error("Failed to fetch exams");
      }

      const examsData = await response.json();

      if (Array.isArray(examsData) && examsData.length > 0) {
        console.log("Fetched Exams Data: ", examsData); // نمایش داده‌های دریافتی از API
        setExamCards(examsData);
      } else {
        console.error("Invalid data format or empty data", examsData);
        setError("No exams found");
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const initialToken = await fetchToken();
        setToken(initialToken);
        await fetchExams();
      } catch (err) {
        console.error("Error initializing:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();

    //  تایمر  بروزرسانی توکن هر 4 دقیقه
    const interval = setInterval(() => {
      fetchToken();
    }, 4 * 60 * 1000); // 4 دقیقه

    return () => clearInterval(interval); 
  }, []);


  if (loading) return <div>در حال بارگذاری...</div>;


  if (error) return <div>خطا: {error}</div>;

  if (!examCards.length) return <div>هیچ داده‌ای برای نمایش وجود ندارد.</div>;

  return (
    <div className="examCard-Container">
      <Swiper
        slidesPerView={3}
        spaceBetween={8}
        loop={true}
        navigation={true}
        loopAdditionalSlides={examCards.length}
        modules={[Navigation]}
        className="examSwiper"
        breakpoints={{
          1025: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          426: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
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
                  وضعیت آزمون:
                  <span> {examCard.examStatusRef}</span>
                </p>
                <p className="examCard-Capacity detail">
                  ظرفیت درخواستی:
                </p>
              </div>
              <div className="examCard-Footer">
                {!user && (
                  <button className="btn1">
                    <Link to="/signUpForm">ثبت‌نام</Link>
                  </button>
                )}
                <button className="btn2">دفترچه</button>
                <button className="btn3">
                  <Link to="/examInfo">بیشتر</Link>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExamCard;