import React, { useCallback, useState } from "react";
import "./ExamForm.scss";
import { motion } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useAuth } from "../../../AuthContext"; // دریافت وضعیت ورود
import ExamFormResult from "./ExamFormResult/ExamFormResult";
import { useEffect } from "react";
import axios from "axios";

const ExamForm = () => {
  const { user } = useAuth(); // دریافت کاربر لاگین شده
  const [workExperience, setWorkExperience] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showList, setShowList] = useState(false);
  const [educationLevels, setEducationLevels] = useState([]);
  const [birthProvinces, setBirthProvinces] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [error, setError] = useState(null);

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://smp.devrayan.ir:2052/api/auth",
        {},
        {
          headers: {
            "RAYAN-USERNAME": "S.JAMEIE",
            "RAYAN-PASSWORD": "1156789",
          },
        }
      );
      localStorage.setItem("RayanToken", response.data.token);
      return response.data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  }, []);

  const fetchData = useCallback(async () => {
    let token = localStorage.getItem("RayanToken");
    if (!token) {
      token = await fetchToken();
      if (!token) return;
    }

    try {
      const [geoResponse, quotaResponse, gradeResponse] = await Promise.all([
        axios.get("http://smp.devrayan.ir:2052/api/geography/geographies", {
          headers: { "RAYAN-TOKEN": token },
        }),
        axios.get("http://smp.devrayan.ir:2052/api/quota/quotas", {
          headers: { "RAYAN-TOKEN": token },
        }),
        axios.get("http://smp.devrayan.ir:2052/api/grade/grades", {
          headers: { "RAYAN-TOKEN": token },
        }),
      ]);

      setEducationLevels(gradeResponse.data || []);
      setBirthProvinces(
        geoResponse.data.filter((item) => item.geographyParent === null)
      );
      setQuotas(quotaResponse.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    }
  }, [fetchToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                  {educationLevels.map((level) => (
                    <option key={level.gradeId} value={level.gradeId}>
                      {level.gradeTitle}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group field">
                <label htmlFor="fieldOfStudy">رشته تحصیلی</label>
                {/* <select id="fieldOfStudy" name="fieldOfStudy">
                  <option value="">انتخاب کنید</option>
                  <option value="engineering">مهندسی</option>
                  <option value="medicine">پزشکی</option>
                  <option value="law">حقوق</option>
                </select> */}
                <input type="text" placeholder="رشته تحصیلی خود را بنویسید" />
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
                  {birthProvinces.map((province) => (
                    <option
                      key={province.geographyId}
                      value={province.geographyId}
                    >
                      {province.geographyName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group fond">
                <label htmlFor="quota">سهمیه</label>
                <select id="quota" name="quota">
                  <option value="">انتخاب کنید</option>
                  {quotas.map((quota) => (
                    <option key={quota.quotaId} value={quota.quotaId}>
                      {quota.quotaTitle}
                    </option>
                  ))}
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
          <h2>آزمون‌ مناسب خود را پیدا کنید. </h2>
          <p>
            سیستم هوشمند ما با تحلیل اطلاعات شما، بهترین آزمون‌های استخدامی را
            پیشنهاد می‌دهد. با مشاهده و مقایسه‌ی این فرصت‌ها، می‌توانید انتخابی
            آگاهانه داشته باشید و در مسیر شغلی خود گام بردارید.
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
          className="result-container"
        >
          <ExamFormResult />
        </motion.div>
      )}
    </div>
  );
};

export default ExamForm;
