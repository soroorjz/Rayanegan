import React, { useState, useEffect } from "react";
import "./StepThree.scss";

const StepThree = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("stepThreeData");
    return savedData
      ? JSON.parse(savedData)
      : {
          postalCode: "315594771",
          city: "تهران",
          address: " البرز، کرج، میدان اسبی ",
          mobile: "09355986776", // مقدار پیش‌فرض برای تلفن همراه
          province: "تهران", // مقدار پیش‌فرض برای استان
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
    localStorage.setItem("stepThreeData", JSON.stringify(formData));
    if (onNext) {
      onNext();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    localStorage.setItem("stepThreeData", JSON.stringify(formData));
    if (onPrevious) {
      onPrevious();
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("stepThreeData", JSON.stringify(formData));
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (!localStorage.getItem("stepThreeData")) {
      localStorage.setItem("stepThreeData", JSON.stringify(formData));
    }
  }, []);

  return (
    <div className="step3-container">
      <form className="formThree" onSubmit={handleNext}>
        <div className="step3-form-group">
          <label>کد پستی:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="کد پستی خود را وارد کنید"
          />
        </div>

        <div className="step3-form-group">
          <label>شهر:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="شهر خود را وارد کنید"
          />
        </div>

        <div className="step3-form-group">
          <label>آدرس:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="آدرس خود را وارد کنید"
          />
        </div>

        <div className="step3-form-group">
          <label>تلفن همراه:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="تلفن همراه خود را وارد کنید"
          />
        </div>

        <div className="step3-form-group">
          <label>استان:</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="استان خود را وارد کنید"
          />
        </div>

        <div className="step3-form-actions">
          <button
            type="button"
            className="step3-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button type="submit" className="step3-next-button">
            مرحله بعد
          </button>
          <button
            type="button"
            className="step3-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;