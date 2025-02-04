import React, { useState } from "react";
import "./ExamForm.scss";
import { motion } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useAuth } from "../../../AuthContext"; // دریافت وضعیت ورود
import ExamFormResult from "./ExamFormResult/ExamFormResult";

const ExamForm = () => {
  const { user } = useAuth(); // دریافت کاربر لاگین شده
  const [workExperience, setWorkExperience] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showList, setShowList] = useState(false);

  const handleSearch = () => {
    setShowList(true);
  };

  const handleToggle = () => {
    setWorkExperience(!workExperience);
  };

  return (
    <div className="exam-form">
      <form className="search-form">
        {!user && ( // اگر کاربر لاگین نکرده باشد، فرم ورودی نمایش داده شود
          <div className="formContent">
            <div className="form-grid">
              <div className="form-group Level">
                <label htmlFor="educationLevel">مقطع تحصیلی</label>
                <select id="educationLevel" name="educationLevel">
                  <option value="">انتخاب کنید</option>
                  <option value="bachelor">کارشناسی</option>
                  <option value="master">کارشناسی ارشد</option>
                  <option value="phd">دکتری</option>
                </select>
              </div>
              <div className="form-group field">
                <label htmlFor="fieldOfStudy">رشته تحصیلی</label>
                <select id="fieldOfStudy" name="fieldOfStudy">
                  <option value="">انتخاب کنید</option>
                  <option value="engineering">مهندسی</option>
                  <option value="medicine">پزشکی</option>
                  <option value="law">حقوق</option>
                </select>
              </div>
              <div className="form-group birthDay">
                <label htmlFor="birthDate">تاریخ تولد</label>
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  calendar={persian}
                  locale={persian_fa}
                  inputClass="custom-date-input"
                  placeholder="تاریخ خود را انتخاب کنید"
                />
              </div>
              <div className="form-group birthLoc">
                <label htmlFor="birthProvince">استان محل تولد</label>
                <select id="birthProvince" name="birthProvince">
                  <option value="">انتخاب کنید</option>
                  <option value="tehran">تهران</option>
                  <option value="mashhad">مشهد</option>
                  <option value="shiraz">شیراز</option>
                </select>
              </div>
              <div className="form-group fond">
                <label htmlFor="quota">سهمیه</label>
                <select id="quota" name="quota">
                  <option value="">انتخاب کنید</option>
                  <option value="none">بدون سهمیه</option>
                  <option value="martyr">سهمیه شهید</option>
                  <option value="veteran">سهمیه ایثارگر</option>
                </select>
              </div>
              <br />
              <div className="form-group gender-radio">
                <label>جنسیت </label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="gender" value="female" />
                    خانم
                  </label>
                  <label>
                    <input type="radio" name="gender" value="male" />
                    آقا
                  </label>
                </div>
              </div>
              <div className="form-group maritalRadio">
                <label>وضعیت تاهل</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="maritalStatus" value="single" />
                    مجرد
                  </label>
                  <label>
                    <input type="radio" name="maritalStatus" value="married" />
                    متاهل
                  </label>
                  <label>
                    <input type="radio" name="maritalStatus" value="married" />
                    معیل
                  </label>
                </div>
              </div>
              <div className="form-group Experience">
                <div className="toggle-container" onClick={handleToggle}>
                  <div
                    className={`toggle ${workExperience ? "active" : ""}`}
                  ></div>
                  <span>
                    {workExperience ? "سابقه کار دارم" : "سابقه کار ندارم"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`searchForm-side ${user ? "searchForm-side-single" : ""}`}
        >
          <h2>آزمون خود را پیدا کنید. </h2>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
            درجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در
            ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>
          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
          >
            جستجو
          </button>
        </div>
      </form>
      {showList && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ExamFormResult />
        </motion.div>
      )}
    </div>
  );
};

export default ExamForm;
