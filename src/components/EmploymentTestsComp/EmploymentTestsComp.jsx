import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./EmploymentTestsComp.scss";

const EmploymentTestsComp = ({ examData, title }) => {
  return (
    <div className="active-exams-sj">
      <div className="active-exams-header-sj">{title}</div>
      <Swiper
        spaceBetween={15}
        slidesPerView={"auto"}
        centeredSlides={false}
        loop={true}
        breakpoints={{
          900: {
            slidesPerView: 3,
            spaceBetween: 30,
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
        className="active-exams-slider-sj"
      >
        {examData.map((exam) => (
          <SwiperSlide key={exam.id} className="exam-card-sj">
            <div className="exam-Logo-sj">
              <img src={exam.img} alt="" />
            </div>
            <div className="exam-title-sj">{exam.title}</div>
            <div className="exam-deadline-sj">{exam.deadline}</div>
            <div className="exam-buttons-sj">
              <button className="exam-btn-sj download">دریافت دفترچه</button>
              <button className="exam-btn-sj register">ثبت‌نام</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EmploymentTestsComp;
