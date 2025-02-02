import React, { useState } from "react";
import { FaTimes, FaRegFileImage } from "react-icons/fa";
import "./FileInput.scss";

const FileInput = ({ name, onChange }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MIN_DIMENSIONS = 300;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // بررسی نوع فایل
      if (!file.type.startsWith("image/")) {
        setError("فقط فایل‌های تصویری مجاز هستند!");
        return;
      }

      // بررسی حجم فایل
      if (file.size > MAX_FILE_SIZE) {
        setError("حجم فایل نباید بیشتر از ۲MB باشد!");
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        // بررسی ابعاد تصویر
        if (img.width < MIN_DIMENSIONS || img.height < MIN_DIMENSIONS) {
          setError(
            `ابعاد تصویر نباید کمتر از ${MIN_DIMENSIONS}×${MIN_DIMENSIONS} باشد!`
          );
          return;
        }
        setError(""); // پاک کردن خطاها
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        onChange(event); // ارسال فایل به والد
      };
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError(""); // پاک کردن خطا در صورت حذف تصویر
    onChange({ target: { name, files: null } }); // ریست کردن مقدار ورودی فایل
  };

  return (
    <div className="file-input-container">
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden-input"
      />
      {!preview ? (
        <label htmlFor={name} className="upload-icon">
          عکس پرسنلی خود را وارد کنید <FaRegFileImage size={40} />
        </label>
      ) : (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
          <button className="remove-button" onClick={handleRemoveImage}>
            <FaTimes size={16} />
          </button>
        </div>
      )}
      {error && <small className="error photoError">{error}</small>}
    </div>
  );
};

export default FileInput;
