import React, { useState, useEffect } from "react";
import "./StepOne.scss";

const StepOne = ({ onNext }) => {
  const [formData, setFormData] = useState(() => {
    // ابتدا از localStorage می‌خوانیم، اگر چیزی نبود از مقادیر پیش‌فرض استفاده می‌کنیم
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          nationalCode: "0015838791",
          firstName: "محمد",
          lastName: "معروفی",
          fatherName: "احمد",
          gender: "مرد",
          phoneNumber: "1802142",
          provice: "البرز",
          city: "کرج",
          birtDate:"1375/05/12",
          religion: "اسلام(شیعه)",
          mariage: "متاهل",
          children: "0",
        };
  });

  const [isEditable, setIsEditable] = useState(false); // حالت ویرایش

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
      localStorage.setItem("formData", JSON.stringify(formData)); // ذخیره در localStorage
      onNext();
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      localStorage.setItem("formData", JSON.stringify(formData)); // ذخیره تغییرات هنگام غیرفعال کردن ویرایش
    }
    setIsEditable(!isEditable); // تغییر حالت ویرایش
  };

  // ذخیره اولیه در localStorage هنگام بارگذاری کامپوننت (اگر چیزی از قبل نباشد)
  useEffect(() => {
    if (!localStorage.getItem("formData")) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, []);

  return (
    <div className="step1-container">
      <form className="formOne" onSubmit={handleSubmit}>
        <div className="step1-form-group">
          <label>کد ملی:</label>
          <input
            type="text"
            name="nationalCode"
            value={formData.nationalCode}
            onChange={handleChange}
            readOnly={!isEditable} // فقط در حالت ویرایش قابل تغییر است
            placeholder="کد ملی خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>نام:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="نام خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>نام خانوادگی:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="نام خانوادگی خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>نام پدر:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="نام پدر خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>شماره شناسنامه:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="شماره شناسنامه خود را وارد کنید"
          />
        </div>
        <div className="step1-form-group">
          <label> تاریخ تولد:</label>
          <input
            type="text"
            name="birtDate"
            value={formData.birtDate}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="تاریخ تولد  خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>استان:</label>
          <input
            type="text"
            name="provice"
            value={formData.provice}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="استان خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
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

        <div className="step1-form-group">
          <label>دین:</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="دین خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>تاهل:</label>
          <input
            type="text"
            name="mariage"
            value={formData.mariage}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="وضعیت تاهل خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>تعداد فرزند:</label>
          <input
            type="text"
            name="children"
            value={formData.children}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="تعداد فرزندان خود را وارد کنید"
          />
        </div>

        <div className="step1-form-group">
          <label>جنسیت:</label>
          <div className="step1-radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="مرد"
                checked={formData.gender === "مرد"}
                onChange={handleChange}
                disabled={!isEditable} // فقط در حالت ویرایش قابل تغییر است
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
                disabled={!isEditable}
              />
              زن
            </label>
          </div>
        </div>

        <div className="step1-form-actions">
          <button type="submit" className="step1-next-button">
            مرحله بعد
          </button>
          <button
            type="button"
            className="step1-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
