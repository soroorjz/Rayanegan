import React, { useState, useEffect } from "react";
import "./StepFive.scss";

const StepFive = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepFiveData");
    return savedData
      ? JSON.parse(savedData)
      : {
          quota: "آزاد",
          militaryStatus: "معافیت پزشکی", // وضعیت نظام وظیفه
          serviceDuration: "0 ", // میزان خدمت
          serviceEndDate: "1400/03/25", // تاریخ پایان خدمت
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFiveData", JSON.stringify(formData));
    console.log("Form submitted:", formData);
    if (onNext) {
      onNext(); // رفتن به مرحله نهایی (پیام موفقیت)
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepFiveData", JSON.stringify(formData));
    if (onPrevious) {
      onPrevious();
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("stepFiveData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (!localStorage.getItem("stepFiveData")) {
      localStorage.setItem("stepFiveData", JSON.stringify(formData));
    }
  }, []);

  return (
    <div className="step5-container">
      <form className="formFive" onSubmit={handleSubmit}>
        <div className="step5-form-group">
          <label>سهمیه:</label>
          <input
            type="text"
            name="quota"
            value={formData.quota}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="سهمیه خود را وارد کنید"
          />
        </div>

        <div className="step5-form-group">
          <label>وضعیت نظام وظیفه:</label>
          <input
            type="text"
            name="militaryStatus"
            value={formData.militaryStatus}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="وضعیت نظام وظیفه خود را وارد کنید"
          />
        </div>

        <div className="step5-form-group">
          <label>میزان خدمت:</label>
          <input
            type="text"
            name="serviceDuration"
            value={formData.serviceDuration}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="میزان خدمت خود را وارد کنید"
          />
        </div>

        <div className="step5-form-group">
          <label>تاریخ پایان خدمت:</label>
          <input
            type="text"
            name="serviceEndDate"
            value={formData.serviceEndDate}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="تاریخ پایان خدمت خود را وارد کنید"
          />
        </div>

        <div className="step5-form-actions">
          <button
            type="button"
            className="step5-prev-button"
            onClick={handlePrevious}
          >
            بازگشت
          </button>
          <button
            type="button"
            className="step5-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFive;
