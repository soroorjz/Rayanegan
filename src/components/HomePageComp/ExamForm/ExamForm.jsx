import React, { useCallback, useState, useEffect } from "react";
import "./ExamForm.scss";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../AuthContext";
import ExamFormResult from "./ExamFormResult/ExamFormResult";
import axios from "axios";

const ExamForm = () => {
  const { user } = useAuth();
  const [workExperience, setWorkExperience] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showList, setShowList] = useState(false);
  const [educationLevels, setEducationLevels] = useState([]);
  const [birthProvinces, setBirthProvinces] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    educationLevel: "",
    fieldOfStudy: "",
    birthProvince: "",
    quota: "",
    gender: "",
    maritalStatus: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth",
        {},
        {
          headers: {
            "RAYAN-USERNAME": "S.JAMEIE",
            "RAYAN-PASSWORD": "1156789",
            "RAYAN-DEBUG": true,
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
    const cachedEducationLevels = localStorage.getItem("educationLevels");
    const cachedBirthProvinces = localStorage.getItem("birthProvinces");
    const cachedQuotas = localStorage.getItem("quotas");

    if (cachedEducationLevels && cachedBirthProvinces && cachedQuotas) {
      setEducationLevels(JSON.parse(cachedEducationLevels));
      setBirthProvinces(JSON.parse(cachedBirthProvinces));
      setQuotas(JSON.parse(cachedQuotas));
      return;
    }

    let token = localStorage.getItem("RayanToken");
    if (!token) {
      token = await fetchToken();
      if (!token) return;
    }

    try {
      const [geoResponse, quotaResponse, gradeResponse] = await Promise.all([
        axios.get("/api/geography/geographies", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/quota/quotas", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/grade/grades", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
      ]);

      const educationLevelsData = gradeResponse.data || [];
      const birthProvincesData = geoResponse.data.filter(
        (item) => item.geographyParent === null
      );
      const quotasData =
        quotaResponse.data.filter((quota) => quota.quotaParent === null) || [];

      localStorage.setItem(
        "educationLevels",
        JSON.stringify(educationLevelsData)
      );
      localStorage.setItem(
        "birthProvinces",
        JSON.stringify(birthProvincesData)
      );
      localStorage.setItem("quotas", JSON.stringify(quotasData));

      setEducationLevels(educationLevelsData);
      setBirthProvinces(birthProvincesData);
      setQuotas(quotasData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    }
  }, [fetchToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.educationLevel)
      errors.educationLevel = "انتخاب مقطع تحصیلی الزامی است";
    if (!formData.fieldOfStudy)
      errors.fieldOfStudy = "انتخاب رشته تحصیلی الزامی است";
    if (!selectedDate) errors.birthDate = "انتخاب تاریخ تولد الزامی است";
    if (!formData.birthProvince)
      errors.birthProvince = "انتخاب استان محل تولد الزامی است";
    if (!formData.quota) errors.quota = "انتخاب سهمیه الزامی است";
    if (!formData.gender) errors.gender = "انتخاب جنسیت الزامی است";
    if (!formData.maritalStatus)
      errors.maritalStatus = "انتخاب وضعیت تاهل الزامی است";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearch = () => {
    if (!user) {
      if (validateForm()) {
        setShowList(true);
      }
    } else {
      setShowList(true);
    }
  };

  const handleToggle = () => {
    setWorkExperience(!workExperience);
  };

  return (
    <div className="exam-form">
      <form className="search-form">
        {!user && (
          <div className="formContent">
            <div className="form-grid">
              <div className="form-group Level">
                <label htmlFor="educationLevel">مقطع تحصیلی</label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                >
                  <option value="">انتخاب کنید</option>
                  {educationLevels.map((level) => (
                    <option key={level.gradeId} value={level.gradeId}>
                      {level.gradeTitle}
                    </option>
                  ))}
                </select>
                {formErrors.educationLevel && (
                  <span className="error">{formErrors.educationLevel}</span>
                )}
              </div>
              <div className="form-group field">
                <label htmlFor="fieldOfStudy">رشته تحصیلی</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                  placeholder="رشته تحصیلی خود را بنویسید"
                  disabled={!formData.educationLevel}
                />
                {formErrors.fieldOfStudy && (
                  <span className="error">{formErrors.fieldOfStudy}</span>
                )}
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
                {formErrors.birthDate && (
                  <span className="error">{formErrors.birthDate}</span>
                )}
              </div>
              <div className="form-group birthLoc">
                <label htmlFor="birthProvince">استان محل تولد</label>
                <select
                  id="birthProvince"
                  name="birthProvince"
                  value={formData.birthProvince}
                  onChange={handleInputChange}
                >
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
                {formErrors.birthProvince && (
                  <span className="error">{formErrors.birthProvince}</span>
                )}
              </div>
              <div className="form-group fond">
                <label htmlFor="quota">سهمیه</label>
                <select
                  id="quota"
                  name="quota"
                  value={formData.quota}
                  onChange={handleInputChange}
                >
                  <option value="">انتخاب کنید</option>
                  {quotas.map((quota) => (
                    <option key={quota.quotaId} value={quota.quotaId}>
                      {quota.quotaTitle}
                    </option>
                  ))}
                </select>
                {formErrors.quota && (
                  <span className="error">{formErrors.quota}</span>
                )}
              </div>
              <div className="form-group gender-radio">
                <label>جنسیت </label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleInputChange}
                    />
                    خانم
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleInputChange}
                    />
                    آقا
                  </label>
                </div>
                {formErrors.gender && (
                  <span className="error">{formErrors.gender}</span>
                )}
              </div>
              <div className="form-group maritalRadio">
                <label>وضعیت تاهل</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="single"
                      onChange={handleInputChange}
                    />
                    مجرد
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="married"
                      onChange={handleInputChange}
                    />
                    متاهل
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="dependents"
                      onChange={handleInputChange}
                    />
                    معیل
                  </label>
                </div>
                {formErrors.maritalStatus && (
                  <span className="error">{formErrors.maritalStatus}</span>
                )}
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
            {/* دکمه جستجو وقتی کاربر لاگین نکرده باشه اینجا نمایش داده می‌شه */}
            <button
              type="button"
              className="search-button"
              onClick={handleSearch}
            >
              جستجو
            </button>
          </div>
        )}

        <div
          className={`searchForm-side ${user ? "searchForm-side-single" : ""}`}
        >
          <h2>آزمون‌ مناسب خود را پیدا کنید.</h2>
          <p>
            سیستم هوشمند ما با تحلیل اطلاعات شما، بهترین آزمون‌های استخدامی را
            پیشنهاد می‌دهد. با مشاهده و مقایسه‌ی این فرصت‌ها، می‌توانید انتخابی
            آگاهانه داشته باشید و در مسیر شغلی خود گام بردارید
          </p>
          {/* دکمه جستجو وقتی کاربر لاگین کرده باشه اینجا نمایش داده می‌شه */}
          {user && (
            <button
              type="button"
              className="search-button"
              onClick={handleSearch}
            >
              جستجو
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="result-container"
          >
            <ExamFormResult setShowList={setShowList} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamForm;