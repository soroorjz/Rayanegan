import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./EmploymentTestsComp.scss";

const EmploymentTestsComp = () => {
  const exams = [
    {
      id: 1,
      img:"/assets/images/images (1).png",
      title: "آزمون استخدامی وزارت کشور",
      deadline: "مهلت ثبت‌نام: ۲۰ بهمن ۱۴۰۲",
    },
    {
      id: 2,
      img:"/assets/images/لوگو-وزارت-آموزش-و-پرورش-1024x1024.png",
      title: "آزمون استخدامی آموزش و پرورش",
      deadline: "مهلت ثبت‌نام: ۲۵ بهمن ۱۴۰۲",
    },
    {
      id: 3,
      img:"/assets/images/images.png",
      title: "آزمون استخدامی وزارت بهداشت",
      deadline: "مهلت ثبت‌نام: ۳۰ بهمن ۱۴۰۲",
    },
    {
      id: 4,
      img:"/assets/images/images (2).png",
      title: "آزمون استخدامی قوه قضاییه",
      deadline: "مهلت ثبت‌نام: ۵ اسفند ۱۴۰۲",
    },
    {
      id: 5,
      img:"/assets/images/images.jfif",
      title: "آزمون استخدامی بانک مرکزی",
      deadline: "مهلت ثبت‌نام: ۱۰ اسفند ۱۴۰۲",
    },
    {
      id: 6,
      img:"/assets/images/5e0bb3ce2380erah.jpg",
      title: "آزمون استخدامی وزارت راه و ترابری",
      deadline: "مهلت ثبت‌نام: ۱۰ اسفند ۱۴۰۲",
    },
    {
      id:7,
      img:"/assets/images/images (4).png",
      title: "آزمون استخدامی وزارت خارجه ",
      deadline: "مهلت ثبت‌نام: ۱۰ اسفند ۱۴۰۲",
    },
    {
      id: 8,
      img:"/assets/images/images (3).png",
      title: "آزمون استخدامی کانون وکلا ",
      deadline: "مهلت ثبت‌نام: ۱۰ اسفند ۱۴۰۲",
    },
  ];

  return (
    <div className="active-exams-sj">
      <div className="active-exams-header-sj">آزمون‌های فعال</div>
      <Swiper
        spaceBetween={15}
        slidesPerView={"auto"}
        centeredSlides={false}
        loop={true}
        className="active-exams-slider-sj"
      >
        {exams.map((exam) => (
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
