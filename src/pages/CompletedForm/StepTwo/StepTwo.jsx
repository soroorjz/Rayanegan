import React, { useState, useEffect } from "react";
import "./StepTwo.scss";

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
          universityName: "دانشگاه تهران", // مقدار پیش‌فرض برای نام دانشگاه
          graduationDate: "1398/06/31", // مقدار پیش‌فرض برای تاریخ فارغ‌التحصیلی
        };
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem("stepTwoData", JSON.stringify(formData));
    if (onNext) {
      onNext();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepTwoData", JSON.stringify(formData));
    if (onPrevious) {
      onPrevious();
    }
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
        <div className="step2-form-group">
          <label>مقطع تحصیلی:</label>
          <select
            name="studentType"
            value={formData.studentType}
            onChange={handleChange}
            disabled={!isEditable}
          >
            <option value="دکتری">دکتری</option>
            <option value="کارشناسی ارشد">کارشناسی ارشد</option>
            <option value="کارشناسی">کارشناسی</option>
            <option value="کاردانی">کاردانی</option>
          </select>
        </div>

        <div className="step2-form-group">
          <label>رشته تحصیلی:</label>
          <select
            name="major"
            value={formData.major}
            onChange={handleChange}
            disabled={!isEditable}
          >
            <option value="آموزش ابتدایی">آموزش ابتدایی</option>
            <option value="مهندسی کامپیوتر">مهندسی کامپیوتر</option>
            <option value="علوم تربیتی">علوم تربیتی</option>
            <option value="مدیریت">مدیریت</option>
          </select>
        </div>

        <div className="step2-form-group">
          <label>نوع دانشگاه:</label>
          <input
            name="uniKind"
            value={formData.uniKind}
            onChange={handleChange}
            disabled={!isEditable}
          />
            
          
        </div>

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

        <div className="step2-form-group">
          <label>تاریخ فارغ‌التحصیلی:</label>
          <input
            type="text"
            name="graduationDate"
            value={formData.graduationDate}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="تاریخ فارغ‌التحصیلی (مثال: 1402/06/31)"
          />
        </div>

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
        </div>

        <div className="step2-form-actions">
          <button
            type="button"
            className="step2-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button type="submit" className="step2-next-button">
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
