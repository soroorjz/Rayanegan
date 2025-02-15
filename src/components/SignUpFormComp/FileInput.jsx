import React, { useRef } from "react";
import "./FileInput.scss";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const FileInput = ({ handlePreviousStep, fileError, onNext }) => {
  const [previews, setPreviews] = useState({
    profileImage: null,
    nationalCard: null,
    birthCertPage1: null,
    birthCertPage2: null,
    birthCertPage3: null,
    educationCertificate: null,
  });

  const fileInputs = useRef({}); // برای ریست کردن مقدار اینپوت‌ها
  const errors = useRef({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const file = files[0];
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!validFormats.includes(file.type)) {
        alert("فرمت تصویر معتبر نیست.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("حجم تصویر نباید بیشتر از ۲ مگابایت باشد.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [name]: reader.result }));
        errors.current[name] = false; // حذف خطا در صورت بارگذاری موفق
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (name) => {
    setPreviews((prev) => ({ ...prev, [name]: null }));
    if (fileInputs.current[name]) {
      fileInputs.current[name].value = ""; // مقدار input را پاک می‌کنیم
    }
    errors.current[name] = true; // نمایش خطا پس از حذف تصویر
  };

  const requiredFields = [
    "profileImage",
    "nationalCard",
    "birthCertPage1",
    "birthCertPage2",
    "birthCertPage3",
    "educationCertificate",
  ];

  const pageNames = {
    birthCertPage1: "صفحه اول شناسنامه",
    birthCertPage2: "صفحه دوم شناسنامه",
    birthCertPage3: "صفحه سوم شناسنامه",
  };

  const isNextEnabled = requiredFields.every(
    (field) => previews[field] !== null
  );

  return (
    <div className="file-input-container">
      {requiredFields.map((field, index) => (
        <div key={index} className="file-upload-section">
          {!previews[field] && (
            <label htmlFor={field} className="upload-icon">
              <span>
                {field === "profileImage"
                  ? "عکس پرسنلی خود را بارگذاری کنید."
                  : field === "nationalCard"
                  ? "تصویر کارت ملی خود را بارگذاری کنید."
                  : field === "educationCertificate"
                  ? "تصویر آخرین مدرک تحصیلی خود را بارگذاری کنید."
                  : `تصویر ${pageNames[field]} خود را بارگذاری کنید.`}
              </span>
              <MdOutlineAddPhotoAlternate size={40} />
            </label>
          )}
          <input
            type="file"
            id={field}
            name={field}
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: "none" }}
            ref={(el) => (fileInputs.current[field] = el)} // ذخیره رفرنس برای ریست مقدار
            onChange={handleFileChange}
          />
          {previews[field] && (
            <div className="image-preview">
              <img src={previews[field]} alt="Uploaded" />
              <button
                className="remove-btn"
                onClick={() => handleRemoveImage(field)}
              >
                <FaTimes />
              </button>
            </div>
          )}
          {errors.current[field] && (
            <small className="error">بارگذاری تصویر اجباری است.</small>
          )}
        </div>
      ))}
      {fileError && <small className="error">{fileError}</small>}
      <div className="button-group">
        <button className="prev-button" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
        <button
          className="next-button"
          onClick={onNext}
          disabled={!isNextEnabled}
        >
          مرحله‌ی بعد
        </button>
      </div>
    </div>
  );
};

export default FileInput;
