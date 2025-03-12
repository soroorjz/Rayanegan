import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./EmploymentTestsComp.scss";
import { Link } from "react-router";
import { useAuth } from "../../AuthContext";

const EmploymentTestsComp = ({ examData, title }) => {
  const { user } = useAuth();

  return (
    <div className="active-exams-sj">
      <div className="active-exams-header-sj">{title}</div>
      {examData.length > 0 ? (
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
              {/* <div className="exam-Logo-sj">
                <img src={exam.img} alt="" />
              </div> */}
              <div className="exam-title-sj">{exam.examName}</div>
              <div className="exam-deadline-sj">
                تاریخ برگزاری آزمون: {exam.examDate}
              </div>
              <div className="examCard-Footer">
                {!user && (
                  <Link to="/signUpForm" key="signup">
                    <button className="btn1">ثبت‌نام</button>{" "}
                  </Link>
                )}
                <a href="">
                  <button className="btn2">دفترچه</button>
                </a>

                <Link
                  to={`/examInfo/${exam.examId}`}
                  key={`examInfo-${exam.examId}`}
                >
                  <button className="btn3">بیشتر </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="no-exam-message">درحال حاضر آزمونی وجود ندارد</p>
      )}
    </div>
  );
};

export default EmploymentTestsComp;
