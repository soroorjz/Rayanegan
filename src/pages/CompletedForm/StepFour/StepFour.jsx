import React, { useState } from "react";
import "./StepFour.scss";

const StepFour = ({ onNext, onPrevious }) => {
  const [formData] = useState({
    file1: "https://example.com/image1.jpg", // آدرس پیش‌فرض برای تصویر مدرک شناسایی
    file2: "https://example.com/image2.jpg", // آدرس پیش‌فرض برای تصویر مدرک تحصیلی
    file3: "https://example.com/image3.jpg", // آدرس پیش‌فرض برای تصویر صفحه اول شناسنامه
    file4: "https://example.com/image4.jpg", // آدرس پیش‌فرض برای تصویر صفحه دوم شناسنامه
    file5: "https://example.com/image5.jpg", // آدرس پیش‌فرض برای تصویر سایر مدارک
  });

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
    <div className="step-four-container">
      <form>
        <div className="form-group">
          <label>تصویر مدرک شناسایی:</label>
          <input
            type="text"
            name="file1"
            value={formData.file1}
            readOnly // غیرقابل ویرایش
            placeholder="آدرس تصویر مدرک شناسایی"
          />
        </div>

        <div className="form-group">
          <label>تصویر مدرک تحصیلی:</label>
          <input
            type="text"
            name="file2"
            value={formData.file2}
            readOnly // غیرقابل ویرایش
            placeholder="آدرس تصویر مدرک تحصیلی"
          />
        </div>

        <div className="form-group">
          <label>تصویر صفحه اول شناسنامه:</label>
          <input
            type="text"
            name="file3"
            value={formData.file3}
            readOnly // غیرقابل ویرایش
            placeholder="آدرس تصویر صفحه اول شناسنامه"
          />
        </div>

        <div className="form-group">
          <label>تصویر صفحه دوم شناسنامه:</label>
          <input
            type="text"
            name="file4"
            value={formData.file4}
            readOnly // غیرقابل ویرایش
            placeholder="آدرس تصویر صفحه دوم شناسنامه"
          />
        </div>

        <div className="form-group">
          <label>تصویر سایر مدارک:</label>
          <input
            type="text"
            name="file5"
            value={formData.file5}
            readOnly // غیرقابل ویرایش
            placeholder="آدرس تصویر سایر مدارک"
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

export default StepFour;
