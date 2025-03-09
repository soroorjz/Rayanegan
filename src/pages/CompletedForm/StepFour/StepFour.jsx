import React, { useState, useEffect } from "react";
import "./StepFour.scss";

const StepFour = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepFourData");
    return savedData
      ? JSON.parse(savedData)
      : {
          idCard: "/assets/images/idCard.png", // تصویر کارت ملی
          degree: "/assets/images/fa.png", // تصویر مدرک تحصیلی
          birthCertPage1: "/assets/images/hghj.png", // تصویر صفحه اول شناسنامه
          birthCertPage2: "/assets/images/page2.png", // تصویر صفحه دوم شناسنامه
          birthCertOtherPages: "/assets/images/shxfdb.jpg", // تصویر سایر صفحات شناسنامه
          otherDocs: "/assets/images/page2.png", // تصویر سایر مدارک
        };
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // ایجاد URL موقت برای پیش‌نمایش
      setFormData((prevData) => ({
        ...prevData,
        [field]: fileURL,
      }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFourData", JSON.stringify(formData));
    if (onNext) {
      onNext();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFourData", JSON.stringify(formData));
    if (onPrevious) {
      onPrevious();
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("stepFourData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (!localStorage.getItem("stepFourData")) {
      localStorage.setItem("stepFourData", JSON.stringify(formData));
    }
  }, []);

  return (
    <div className="step4-container">
      <form className="formFour" onSubmit={handleNext}>
        <div className="step4-form-group">
          <label>تصویر کارت ملی:</label>
          <div className="step4-file-preview">
            <img src={formData.idCard} alt="کارت ملی" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "idCard")}
              />
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر مدرک تحصیلی:</label>
          <div className="step4-file-preview">
            <img src={formData.degree} alt="مدرک تحصیلی" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "degree")}
              />
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر صفحه اول شناسنامه:</label>
          <div className="step4-file-preview">
            <img src={formData.birthCertPage1} alt="صفحه اول شناسنامه" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "birthCertPage1")}
              />
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر صفحه دوم شناسنامه:</label>
          <div className="step4-file-preview">
            <img src={formData.birthCertPage2} alt="صفحه دوم شناسنامه" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "birthCertPage2")}
              />
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر سایر صفحات شناسنامه:</label>
          <div className="step4-file-preview">
            <img src={formData.birthCertOtherPages} alt="عکس پرسنلی" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "birthCertOtherPages")}
              />
            )}
          </div>
        </div>

        <div className="step4-form-group">
          <label>تصویر سایر مدارک:</label>
          <div className="step4-file-preview">
            <img src={formData.otherDocs} alt="سایر مدارک" />
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "otherDocs")}
              />
            )}
          </div>
        </div>

        <div className="step4-form-actions">
          <button
            type="button"
            className="step4-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button type="submit" className="step4-next-button">
            مرحله بعد
          </button>
          <button
            type="button"
            className="step4-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFour;
