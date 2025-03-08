import React from "react";
import "./StepFive.scss"; // فایل استایل برای StepFive

const StepFive = ({ onNext, onPrevious }) => {
  const formData = {
    name: "محمد رضایی", // مقدار پیش‌فرض نمونه
    number: "123456789", // مقدار پیش‌فرض نمونه
    disabilityStatus: "در حال بازرسی", // مقدار پیش‌فرض
    serviceArea: "تهران", // مقدار پیش‌فرض نمونه
  };

  const handleSubmit = () => {
    // اینجا می‌توانید منطق ارسال فرم را پیاده‌سازی کنید
    console.log("Form submitted:", formData);
    onNext(); // رفتن به مرحله نهایی (پیام موفقیت)
  };

  return (
    <div className="step-five-container">
      <div className="form-group">
        <label>سهمیه:</label>
        <input type="text" name="name" value={formData.name} disabled />
      </div>

      <div className="form-group">
        <label>وضعیت نظام وظیفه:</label>
        <input type="text" name="number" value={formData.number} disabled />
      </div>

      <div className="form-group">
        <label>میزان خدمت:</label>
        <input
          type="text"
          name="disabilityStatus"
          value={formData.disabilityStatus}
          disabled
        />
      </div>

      <div className="form-group">
        <label>تاریخ پایان خدمت:</label>
        <input
          type="text"
          name="serviceArea"
          value={formData.serviceArea}
          disabled
        />
      </div>

      <div className="button-group">
        <button className="previous-btn" onClick={onPrevious}>
          بازگشت
        </button>
      </div>
    </div>
  );
};

export default StepFive;
