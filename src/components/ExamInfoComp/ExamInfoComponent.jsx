import { useState } from "react";
import "./ExamInfoComponent.scss";
import { examSections } from "./examInfoData";
import ExamForm from "../HomePageComp/ExamForm/ExamForm";
import { Link } from "react-router";
import { useAuth } from "../../AuthContext";
const ExamInfoComponent = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const { user } = useAuth(); 

  return (
    <div className="exam-info-sj">
      <nav className="exam-info-nav-sj">
        <button
          onClick={() => setActiveSection("introduction")}
          className={
            activeSection === "introduction" ? "exam-InfoTab-Active" : ""
          }
          id="ExamIntroduction"
        >
          معرفی آزمون
        </button>
        <button
          onClick={() => setActiveSection("booklet")}
          className={activeSection === "booklet" ? "exam-InfoTab-Active" : ""}
          id="bookletBtn"
        >
          دفترچه
        </button>
        <button
          onClick={() => setActiveSection("announcements")}
          className={
            activeSection === "announcements" ? "exam-InfoTab-Active" : ""
          }
          id="announcementsBtn"
        >
          اطلاعیه‌ها
        </button>
        <button
          onClick={() => setActiveSection("jobs")}
          className={activeSection === "jobs" ? "exam-InfoTab-Active" : ""}
          id="InfojobSearchBtn"
        >
          جست و جوی مشاغل
        </button>
      </nav>

      {activeSection === "introduction" && (
        <section id="introduction" className="exam-section-sj">
          <h2>معرفی آزمون</h2>
          {examSections.map((item, index) => (
            <div key={index} className="introduction-item">
              <p className="date">{item.date}</p>
              <h3 className="title">{item.title}</h3>
              <p className="description">{item.description}</p>
            </div>
          ))}
          <button className="RegistrationPageBtn">
            <Link to={user ? "/RegistrationPage" : "/logIn"}>
              {user ? "ثبت نام" : "ورود به حساب کاربری"}
            </Link>
          </button>
        </section>
      )}

      {activeSection === "booklet" && (
        <section id="booklet" className="exam-section-sj">
          <h2>دفترچه</h2>
          <p>اطلاعات مربوط به دفترچه آزمون در این بخش قرار می‌گیرد.</p>
        </section>
      )}

      {activeSection === "announcements" && (
        <section id="announcements" className="exam-section-sj">
          <h2>اطلاعیه‌ها</h2>
          <p>اطلاعات مربوط به اطلاعیه‌ها در این بخش قرار می‌گیرد.</p>
        </section>
      )}

      {activeSection === "jobs" && (
        <section id="jobs" className="exam-section-sj">
          <h2>جست و جوی مشاغل</h2>
          <ExamForm />
        </section>
      )}
    </div>
  );
};

export default ExamInfoComponent;
