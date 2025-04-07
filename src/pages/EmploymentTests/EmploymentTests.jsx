import React from "react";
import "./EmploymentTests.scss";
import { IoMdHome } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import EmploymentTestsComp from "../../components/EmploymentTestsComp/EmploymentTestsComp";
import EmploymentTestsIcons from "../../components/EmploymentTestsComp/EmploymentTestsIcons/EmploymentTestsIcons";
import NavbarTop from "../../components/HomePageComp/NavbarTop/NavbarTop";
import EmploymentTestsBanner from "../../components/EmploymentTestsComp/EmploymentTestsBanner/EmploymentTestsBanner";
import { Link } from "react-router-dom";
import { getExamStatuses, getExams } from "../../apiService";

const EmploymentTests = () => {

  const {
    data: examStatuses,
    isLoading: statusesLoading,
    error: statusesError,
    isFetching: statusesFetching,
  } = useQuery({
    queryKey: ["examStatuses"],
    queryFn: async () => {
      const data = await getExamStatuses();
      console.log("Exam Statuses Loaded:", data);
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 ساعت
    cacheTime: 1000 * 60 * 60 * 24, // 24 ساعت
    retry: 1,
    onError: (err) => console.log("Exam Statuses Error:", err),
  });

  const {
    data: examCards,
    isLoading: examsLoading,
    error: examsError,
    isFetching: examsFetching,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const data = await getExams();
      console.log("Exams Loaded:", data);
      return data.map((exam) => ({
        ...exam,
        examStatusRef: Number(exam.examStatusRef),
      }));
    },
    staleTime: 1000 * 60 * 60, // 1 ساعت
    cacheTime: 1000 * 60 * 60 * 24, // 24 ساعت
    retry: 1,
    onError: (err) => console.log("Exams Error:", err),
  });

  const loading = statusesLoading || examsLoading;
  const fetching = statusesFetching || examsFetching;
  const error = statusesError || examsError;

  //  فیلتر کردن آزمون‌ها
  const getFilteredExams = (statusTitle) => {
    if (!examStatuses || !examCards) return [];
    const statusId = Object.keys(examStatuses).find(
      (key) => examStatuses[key] === statusTitle
    );
    console.log(`Filtering ${statusTitle}: statusId=${statusId}`);
    return examCards.filter((exam) => exam.examStatusRef === Number(statusId));
  };

  // if (loading) {
  //   console.log("Still Loading...");
  //   return <div className="EmploymentTests">در حال بارگذاری...</div>;
  // }

  if (error) {
    console.log("Error occurred:", error);
    return (
      <div className="EmploymentTests">
        خطا در دریافت اطلاعات: {error.message}
      </div>
    );
  }

  console.log("Rendering with data:", { examStatuses, examCards });

  return (
    <div className="EmploymentTests">
      <NavbarTop hideJobSearch={true} />
      <div className="EmploymentTestsBanner">
        <EmploymentTestsBanner />
      </div>
      <div className="EmploymentTestsIcons">
        <EmploymentTestsIcons />
      </div>
      {fetching && (
        <div className="fetching-message">در حال به‌روزرسانی داده‌ها...</div>
      )}
      <div id="InProgress" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("در انتظار")}
          title="در انتظار"
        />
      </div>
      <div id="Registering" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("درحال ثبت نام")}
          title="درحال ثبت نام"
        />
      </div>
      <div id="EndOfRegistering" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("پایان ثبت نام")}
          title="پایان ثبت نام"
        />
      </div>
      <div id="ExamCard" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("دریافت کارت ورود به جلسه")}
          title="دریافت کارت ورود به جلسه"
        />
      </div>
      <div id="Held" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("آزمون کتبی برگزار شده")}
          title="آزمون کتبی برگزار شده"
        />
      </div>
      <div id="UnderReview" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("در حال بررسی")}
          title="در حال بررسی"
        />
      </div>
      <div id="Announcing" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("اعلام نتایج آزمون کتبی")}
          title="اعلام نتایج آزمون کتبی"
        />
      </div>
      <div id="Filter" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("ارزیابی تکمیلی")}
          title="ارزیابی تکمیلی"
        />
      </div>
      <div id="Selection" className="EmploymentTestsComp">
        <EmploymentTestsComp
          examData={getFilteredExams("گزینش")}
          title="گزینش"
        />
      </div>
      <div id="Expired" className="EmploymentTestsComp expiredExams">
        <EmploymentTestsComp
          examData={getFilteredExams("پایان آزمون")}
          title="پایان آزمون"
        />
      </div>
      <Link to="/">
        <button className="homeBtn">
          <IoMdHome />
        </button>
      </Link>
    </div>
  );
};

export default EmploymentTests;
