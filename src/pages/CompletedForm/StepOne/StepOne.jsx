import React, { useState } from "react";
import "./StepOne.scss";

const StepOne = ({ onNext }) => {
  const [formData, setFormData] = useState({
    nationalCode: "0015838791", 
    firstName: "محمد", // مقدار پیش‌فرض برای نام
    lastName: "معروفی", // مقدار پیش‌فرض برای نام خانوادگی
    fatherName: "احمد", // مقدار پیش‌فرض برای نام پدر
    gender: "مرد", // مقدار پیش‌فرض برای جنسیت
    phoneNumber: "09123456789", // مقدار پیش‌فرض برای شماره تلفن
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext(); // فراخوانی تابع onNext برای رفتن به گام بعدی
    }
  };

  return (
    <div className="step-one-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>کد ملی:</label>
          <input
            type="text"
            name="nationalCode"
            value={formData.nationalCode}
            onChange={handleChange}
            placeholder="کد ملی خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label>نام:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="نام خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label>نام خانوادگی:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="نام خانوادگی خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label>نام پدر:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="نام پدر خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label>جنسیت:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="مرد"
                checked={formData.gender === "مرد"}
                onChange={handleChange}
              />
              مرد
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="زن"
                checked={formData.gender === "زن"}
                onChange={handleChange}
              />
              زن
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>شماره تلفن:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="شماره تلفن خود را وارد کنید"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="next-button">
            تأیید
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;