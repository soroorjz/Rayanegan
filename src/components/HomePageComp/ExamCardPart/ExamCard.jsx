// import React, { useState, useEffect, useCallback } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import { useAuth } from "../../../AuthContext";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./ExamCard.scss";
// const ExamCard = () => {
//   const { user } = useAuth();
//   const [examCards, setExamCards] = useState([]);
//   const [examStatuses, setExamStatuses] = useState(null); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  
//   const fetchToken = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth", {
//         headers: {
//           "RAYAN-USERNAME": "S.JAMEIE",
//           "RAYAN-PASSWORD": "1156789",
//           "RAYAN-DEBUG": true,
//           "RAYAN-NOCATCH": true,
//         },
//         method: "POST",
//       });
//       const data = await response.json();
//       localStorage.setItem("RayanToken", data.token);
//     } catch (err) {
//       console.error("Error fetching token:", err);
//       setError("خطا در دریافت توکن!");
//     }
//   }, []);

//   // دریافت وضعیت‌های آزمون و تبدیل آن‌ها به یک Map
//   const fetchExamStatuses = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         "/api/examstatus/examstatuses",
//         {
//           headers: {
//             "Rayan-Token": localStorage.getItem("RayanToken"),
//             "Rayan-Debug": true,
//             "RAYAN-NOCATCH": true,
//           },
//         }
//       );

//       const statusMap = response.data.reduce((acc, status) => {
//         acc[status.examStatusId] = status.examStatusName;
//         // examStatusId → examStatusName
//         return acc;
//       }, {});

//       console.log(" Exam Statuses:", statusMap);

//       setExamStatuses(statusMap);
//     } catch (err) {
//       console.error("Error fetching exam statuses:", err);
//       setError("خطا در دریافت وضعیت آزمون‌ها!");
//     }
//   }, []);

//   const fetchExams = useCallback(async () => {
//     if (!examStatuses) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         "/api/exam/exams",
//         {
//           headers: {
//             "RAYAN-TOKEN": localStorage.getItem("RayanToken"),
//             "RAYAN-DEBUG": true,
//             "RAYAN-NOCATCH": true,
//           },
//         }
//       );

//       const updatedExams = response.data.map((exam) => ({
//         ...exam,
//         examStatusRef: examStatuses[exam.examStatusRef] || "نامشخص", // تبدیل عدد به متن
//       }));

//       console.log(" Updated Exams:", updatedExams);

//       setExamCards(updatedExams);
//     } catch (err) {
//       console.error("Error fetching exams:", err);
//       setError("خطا در دریافت اطلاعات آزمون‌ها!");
//     } finally {
//       setLoading(false);
//     }
//   }, [examStatuses]);
//   // اجرای توابع به ترتیب مناسب
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchToken();
//       await fetchExamStatuses();
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (examStatuses) {
//       fetchExams();
//     }
//   }, [examStatuses]);

//   return (
//     <div className="examCard-Container">
//       {error && <p className="error-text">{error}</p>}
//       {!loading && !error && examCards.length > 0 && (
//         <Swiper
//           slidesPerView={3}
//           spaceBetween={8}
//           loop={true}
//           navigation={true}
//           loopAdditionalSlides={examCards.length}
//           modules={[Navigation]}
//           className="examSwiper"
//           breakpoints={{
//             1025: { slidesPerView: 3, spaceBetween: 10 },
//             900: { slidesPerView: 2, spaceBetween: 5 },
//             426: { slidesPerView: 1, spaceBetween: 10 },
//             0: { slidesPerView: 1, spaceBetween: 5 },
//           }}
//         >
//           {examCards.map((examCard) => (
//             <SwiperSlide key={examCard.examId}>
//               <div className="examCards-swiper">
//                 <div className="examCardTop">
//                   <div className="examCard-Title">
//                     <h2 className="examCard-Title-H">{examCard.examName}</h2>
//                   </div>
//                 </div>
//                 <div className="examCard-details">
//                   <p className="examCard-Status detail">
//                     وضعیت آزمون: <span>{examCard.examStatusRef}</span>
//                   </p>
//                   {/* <p className="examCard-Capacity detail">ظرفیت درخواستی:</p> */}
//                 </div>
//                 <div className="examCard-Footer">
//                   {!user && (
//                     <button className="btn1">
//                       <Link to="/signUpForm" key="signup">
//                         ثبت‌نام
//                       </Link>
//                     </button>
//                   )}
//                   <button className="btn2">دفترچه</button>

//                   <button className="btn3">
//                     <Link
//                       to={`/examInfo/${examCard.examId}`}
//                       key={`examInfo-${examCard.examId}`}
//                     >
//                       بیشتر
//                     </Link>
//                   </button>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//       {!loading && !error && examCards.length === 0 && (
//         <p className="no-data-text">هیچ آزمونی یافت نشد.</p>
//       )}
//     </div>
//   );
// };

// export default ExamCard;

import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ExamCard.scss";

const ExamCard = () => {
  const { user } = useAuth();
  const [examCards, setExamCards] = useState([]);
  const [examStatuses, setExamStatuses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToken = useCallback(async () => {
    const cachedToken = localStorage.getItem("RayanToken");
    if (cachedToken) return; // اگر توکن در localStorage موجود است، از API درخواست نده

    try {
      const response = await fetch("/api/auth", {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
          "RAYAN-NOCATCH": true,
        },
        method: "POST",
      });
      const data = await response.json();
      localStorage.setItem("RayanToken", data.token);
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
    }
  }, []);

  const fetchExamStatuses = useCallback(async () => {
    const cachedStatuses = localStorage.getItem("examStatuses");
    if (cachedStatuses) {
      setExamStatuses(JSON.parse(cachedStatuses));
      return;
    }

    try {
      const response = await axios.get("/api/examstatus/examstatuses", {
        headers: {
          "Rayan-Token": localStorage.getItem("RayanToken"),
          "Rayan-Debug": true,
          "RAYAN-NOCATCH": true,
        },
      });

      const statusMap = response.data.reduce((acc, status) => {
        acc[status.examStatusId] = status.examStatusName;
        return acc;
      }, {});

      console.log("Exam Statuses:", statusMap);
      localStorage.setItem("examStatuses", JSON.stringify(statusMap));
      setExamStatuses(statusMap);
    } catch (err) {
      console.error("Error fetching exam statuses:", err);
      setError("خطا در دریافت وضعیت آزمون‌ها!");
    }
  }, []);

  const fetchExams = useCallback(async () => {
    if (!examStatuses) return;

    const cachedExams = localStorage.getItem("examCards");
    if (cachedExams) {
      setExamCards(JSON.parse(cachedExams));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/exam/exams", {
        headers: {
          "RAYAN-TOKEN": localStorage.getItem("RayanToken"),
          "RAYAN-DEBUG": true,
          "RAYAN-NOCATCH": true,
        },
      });

      const updatedExams = response.data.map((exam) => ({
        ...exam,
        examStatusRef: examStatuses[exam.examStatusRef] || "نامشخص",
      }));

      console.log("Updated Exams:", updatedExams);
      localStorage.setItem("examCards", JSON.stringify(updatedExams));
      setExamCards(updatedExams);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("خطا در دریافت اطلاعات آزمون‌ها!");
    } finally {
      setLoading(false);
    }
  }, [examStatuses]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchToken();
      await fetchExamStatuses();
    };
    fetchData();
  }, [fetchToken, fetchExamStatuses]);

  useEffect(() => {
    if (examStatuses) {
      fetchExams();
    }
  }, [examStatuses, fetchExams]);

  return (
    <div className="examCard-Container">
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