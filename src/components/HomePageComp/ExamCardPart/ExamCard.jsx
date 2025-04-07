import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router-dom";
import { getExamStatuses, getExams } from "../../../apiService";
import "./ExamCard.scss";
import ExamCardSkeleton from "../../../pages/EmploymentTests/ExamCardSkeleton";
import CardListSkeleton from "./CardListSkeleton";

const ExamCard = () => {
  const { user } = useAuth();

  const {
    data: examStatuses,
    isLoading: statusesLoading,
    error: statusesError,
  } = useQuery({
    queryKey: ["examStatuses"],
    queryFn: getExamStatuses,
    staleTime: 1000 * 60 * 60, // برگشت به 1 ساعت
  });

  const {
    data: exams,
    isLoading: examsLoading,
    error: examsError,
  } = useQuery({
    queryKey: ["exams", examStatuses],
    queryFn: async () => {
      const examData = await getExams();
      return examData.map((exam) => ({
        ...exam,
        examStatusRef: examStatuses?.[exam.examStatusRef] || "نامشخص",
      }));
    },
    enabled: !!examStatuses,
    staleTime: 1000 * 60 * 60, // برگشت به 1 ساعت
  });

  const loading = statusesLoading || examsLoading;
  const error = statusesError || examsError;

  if (loading)
    return <CardListSkeleton />;
  if (error)
    return <div className="examCard-Container">خطا: {error.message}</div>;

  return (
    <div className="examCard-Container">
      {exams?.length > 0 ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={8}
          loop={true}
          navigation={true}
          loopAdditionalSlides={exams.length}
          modules={[Navigation]}
          className="examSwiper"
          breakpoints={{
            1025: { slidesPerView: 3, spaceBetween: 10 },
            900: { slidesPerView: 2, spaceBetween: 5 },
            426: { slidesPerView: 1, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 5 },
          }}
        >
          {exams.map((examCard) => (
            <SwiperSlide key={examCard.examId}>
              <div className="examCards-swiper">
                <div className="examCardTop">
                  <div className="examCard-Title">
                    <h2 className="examCard-Title-H">{examCard.examName}</h2>
                  </div>
                </div>
                <div className="examCard-details">
                  <p className="examCard-Status detail">
                    وضعیت آزمون: <span>{examCard.examStatusRef}</span>
                  </p>
                </div>
                <div className="examCard-Footer">
                  {!user && (
                    <Link to="/signUpForm" key="signup">
                      <button className="btn1">ثبت‌نام</button>
                    </Link>
                  )}
                  <a href="">
                    <button className="btn2">دفترچه</button>
                  </a>
                  <Link
                    to={`/examInfo/${examCard.examId}`}
                    key={`examInfo-${examCard.examId}`}
                  >
                    <button className="btn3">بیشتر</button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="no-data-text">هیچ آزمونی یافت نشد.</p>
      )}
    </div>
  );
};

export default ExamCard;
