import "./ExamCard.scss";
import { examCards } from "./data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Link } from "react-router";
import { useAuth } from "../../../AuthContext";

const ExamCard = () => {
  const { user } = useAuth(); // ✅ دریافت مقدار user برای بررسی لاگین بودن

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
            spaceBetween: 10,
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
          <SwiperSlide key={examCard.id}>
            <div className="examCards">
              <div className="examCardTop">
                <div className="examCard-Logo">
                  <img src={examCard.logo} alt="" />
                </div>
                <div className="examCard-Title">
                  <h2>{examCard.title}</h2>
                </div>
              </div>

              <div className="examCard-details">
                <p className="examCard-Status detail">
                  وضعیت آزمون:
                  <span> {examCard.status}</span>
                </p>
                <p className="examCard-Capacity detail">
                  ظرفیت درخواستی:
                  <span> {examCard.number} نفر</span>
                </p>
              </div>
              <div className="examCard-Footer">
                {!user && ( // ✅ اگر لاگین نکرده باشد، دکمه "ثبت‌نام" را نمایش بده
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
