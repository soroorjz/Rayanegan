import React, { useState } from "react";
import "./StepThree.scss";

const StepThree = ({ onNext, onPrevious }) => {
  const [formData] = useState({
    postalCode: "1234567890", // مقدار پیش‌فرض برای کد پستی
    city: "تهران", // مقدار پیش‌فرض برای شهر
    address: "خیابان ولیعصر، کوچه سوم، پلاک ۱۲", // مقدار پیش‌فرض برای آدرس
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
    <div className="step-three-container">
      <form>
        <div className="form-group">
          <label>کد پستی:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            readOnly // غیرقابل ویرایش
            placeholder="کد پستی خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label>شهر:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            readOnly // غیرقابل ویرایش
            placeholder="شهر خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label>آدرس:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            readOnly // غیرقابل ویرایش
            placeholder="آدرس خود را وارد کنید"
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

export default StepThree;
