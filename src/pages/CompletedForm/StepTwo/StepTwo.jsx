import React, { useState, useEffect } from "react";
import "./StepTwo.scss";
import { useEducationData } from "./useEducationData";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const StepTwo = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepTwoData");
    return savedData
      ? JSON.parse(savedData)
      : {
          studentType: "دکتری",
          major: "آموزش ابتدایی",
          gpa: "16.10",
          uniKind: "دولتی",
          universityName: "دانشگاه تهران",
          graduationDate: "1398/06/31",
        };
  });

  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});
  const { degrees, universityTypes, loading, error } = useEducationData();

  const validateForm = (name, value) => {
    let newErrors = { ...errors };
    const today = new Date();

    if (name === "graduationDate" && value) {
      const gradDate = new Date(value.replace(/\//g, "-"));
      if (gradDate > today) {
        newErrors[name] = "تاریخ فارغ‌التحصیلی نمی‌تواند در آینده باشد";
      } else {
        delete newErrors[name];
      }
    }

    if (name === "gpa" && value) {
      const gpaValue = parseFloat(value);
      if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 20) {
        newErrors[name] = "معدل باید بین 0 و 20 باشد";
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (isEditable) validateForm(name, value);
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("YYYY/MM/DD") : "";
    setFormData((prevData) => ({
      ...prevData,
      graduationDate: formattedDate,
    }));
    if (isEditable) validateForm("graduationDate", formattedDate);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("stepTwoData", JSON.stringify(formData));
      if (onNext) onNext();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepTwoData", JSON.stringify(formData));
    if (onPrevious) onPrevious();
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("stepTwoData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (!localStorage.getItem("stepTwoData")) {
      localStorage.setItem("stepTwoData", JSON.stringify(formData));
    }
  }, []);

  return (
    <div className="step2-container">
      <form className="formTwo" onSubmit={handleNext}>
        {isEditable ? (
          <>
            {loading && <p>در حال بارگذاری...</p>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
              <div className="step2-form-group">
                <label>مقطع تحصیلی:</label>
                <select
                  name="studentType"
                  value={formData.studentType}
                  onChange={handleChange}
                >
                  <option value="">انتخاب کنید</option>
                  {degrees.map((degree) => (
                    <option key={degree.gradeId} value={degree.gradeTitle}>
                      {degree.gradeTitle}
                    </option>
                  ))}
                </select>
                {errors.studentType && (
                  <small className="error">{errors.studentType}</small>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="step2-form-group">
            <label>مقطع تحصیلی:</label>
            <input
              type="text"
              name="studentType"
              value={formData.studentType}
              onChange={handleChange}
              readOnly
              placeholder="مقطع تحصیلی خود را وارد کنید"
            />
          </div>
        )}

        <div className="step2-form-group">
          <label>رشته تحصیلی:</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>

        {isEditable ? (
          <>
            {!loading && !error && (
              <div className="step2-form-group">
                <label>نوع دانشگاه:</label>
                <select
                  name="uniKind"
                  value={formData.uniKind}
                  onChange={handleChange}
                >
                  <option value="">انتخاب کنید</option>
                  {universityTypes.map((type) => (
                    <option
                      key={type.universityTypeId}
                      value={type.universityTypeName}
                    >
                      {type.universityTypeName}
                    </option>
                  ))}
                </select>
                {errors.uniKind && (
                  <small className="error">{errors.uniKind}</small>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="step2-form-group">
            <label>نوع دانشگاه:</label>
            <input
              type="text"
              name="uniKind"
              value={formData.uniKind}
              onChange={handleChange}
              readOnly
              placeholder="نوع دانشگاه خود را وارد کنید"
            />
          </div>
        )}

        <div className="step2-form-group">
          <label>نام دانشگاه:</label>
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="نام دانشگاه خود را وارد کنید"
          />
        </div>

        {isEditable ? (
          <div className="step2-form-group">
            <label>تاریخ فارغ‌التحصیلی:</label>
            <DatePicker
              style={{ width: "100%" }}
              id="graduationDate"
              name="graduationDate"
              calendar={persian}
              locale={persian_fa}
              value={formData.graduationDate}
              onChange={handleDateChange}
              placeholder="تاریخ فارغ‌التحصیلی را انتخاب کنید"
              format="YYYY/MM/DD"
            />
            {errors.graduationDate && (
              <small className="error">{errors.graduationDate}</small>
            )}
          </div>
        ) : (
          <div className="step2-form-group">
            <label>تاریخ فارغ‌التحصیلی:</label>
            <input
              type="text"
              name="graduationDate"
              value={formData.graduationDate}
              onChange={handleChange}
              readOnly
              placeholder="تاریخ فارغ‌التحصیلی (مثال: 1402/06/31)"
            />
          </div>
        )}

        <div className="step2-form-group">
          <label>معدل:</label>
          <input
            type="text"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="معدل خود را وارد کنید"
          />
          {errors.gpa && <small className="error">{errors.gpa}</small>}
        </div>

        <div className="step2-form-actions">
          <button
            type="button"
            className="step2-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button
            type="submit"
            className="step2-next-button"
            disabled={Object.keys(errors).length > 0}
          >
            مرحله بعد
          </button>
          <button
            type="button"
            className="step2-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;