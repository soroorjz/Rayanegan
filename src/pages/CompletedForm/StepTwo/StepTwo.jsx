import React from "react";
import "./StepTwo.scss";

const StepTwo = ({ onNext, onPrevious }) => {
  const formData = {
    studentType: "دکتری", // مقدار پیش‌فرض برای مقطع تحصیلی
    major: "آموزش ابتدایی", // مقدار پیش‌فرض برای رشته تحصیلی
    gpa: "16.10", // مقدار پیش‌فرض برای معدل
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext(); // فراخوانی تابع onNext برای رفتن به گام بعدی
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (onPrevious) {
      onPrevious(); // فراخوانی تابع onPrevious برای بازگشت به گام قبلی
    }
  };

  return (
    <div className="step-two-container">
      <form>
        <div className="form-group">
          <label>مقطع تحصیلی:</label>
          <select name="studentType" value={formData.studentType} disabled>
            <option value={formData.studentType}>{formData.studentType}</option>
          </select>
        </div>

        <div className="form-group">
          <label>رشته تحصیلی:</label>
          <select name="major" value={formData.major} disabled>
            <option value={formData.major}>{formData.major}</option>
          </select>
        </div>

        <div className="form-group">
          <label>معدل:</label>
          <input
            type="text"
            name="gpa"
            value={formData.gpa}
            disabled
          />
        </div>

        <div className="form-actions">
          <button className="prev-button" onClick={handlePrevious}>
            مرحله قبل
          </button>
          <button className="next-button" onClick={handleNext}>
            مرحله بعد
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;