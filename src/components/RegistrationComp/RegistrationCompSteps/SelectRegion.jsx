import React, { useState } from "react";
import "./SelectRegion.scss";
import { FaCheckDouble } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
const SelectRegion = ({ onNext, handlePreviousStep }) => {
  const [residency, setResidency] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // چک کردن فرمت فایل
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    if (!allowedFormats.includes(file.type)) {
      setError(
        "فرمت فایل نامعتبر است! لطفا یک تصویر با فرمت JPG, PNG یا WEBP انتخاب کنید."
      );
      return;
    }

    // چک کردن حجم فایل (حداکثر 2 مگابایت)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("حجم فایل بیش از 2 مگابایت است!");
      return;
    }

    setSelectedFile(URL.createObjectURL(file));
    setError("");
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
    document.getElementById("file-upload").value = ""; // ریست کردن مقدار ورودی فایل
  };

  return (
    <div className="job-selection-residency">
      <div className="rules">
        <h2>داوطلب بومی:</h2>
        <p>
          افرادی كه حداقل دارای یكی از ویژگی‌های زیر باشند، داوطلب بومی محسوب
          می‌شوند:
        </p>
        <p>1- شهرستان محل تولد داوطلب با شهرستان محل مورد تقاضا یکی باشد.</p>
        <p>2- محل سکونت فعلی داوطلب با شهرستان محل مورد تقاضا یکی باشد.</p>
        <p>
          3- حداقل چهار سال از سنوات تحصیلی در شهرستان یا استان مورد تقاضا طی
          شده باشد.
        </p>
        <p>
          4- حداقل چهار سال سابقه پرداخت بیمه در شهرستان مورد تقاضا وجود داشته
          باشد.
        </p>
        <p>
          <span>توضیحات:</span> داوطلبان در صورت قبولی حداکثر ۳ ماه مهلت دارند
          محل سکونت خود را به شهرستان مورد نظر منتقل کنند.
        </p>
      </div>

      <div className="selection">
        <FaCheckDouble />
        <label>انتخاب شغل محل بر اساس</label>
        <select
          onChange={(e) => setResidency(e.target.value)}
          className="residency-select"
        >
          <option value="">انتخاب کنید</option>
          <option value="بومی">بومی</option>
          <option value="غیر بومی">غیر بومی</option>
        </select>
        <span>صورت گرفته است.</span>
      </div>

      {residency === "بومی" && (
        <div className="boomi-options">
          <a href="#" className="download-link">
            <FaDownload /> دریافت فرم استشهادنامه محلی
          </a>

          <div className="upload-wrapper">
            <label htmlFor="file-upload" className="upload-label">
              بارگذاری فرم استشهادنامه محلی
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="upload-file"
              onChange={handleFileChange}
              hidden
            />
            {error && <p className="error-message">{error}</p>}
            {selectedFile && (
              <div className="preview">
                <img
                  src={selectedFile}
                  alt="فرم استشهاد"
                  className="preview-image"
                />
                <button onClick={removeFile} className="remove-preview">
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="SelectRegionSubmitBtns">
        <button className="RegionSubmitBtn" onClick={onNext}>
          مرحله بعد
        </button>
        <button className="RegionPrevBtn" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
      </div>
    </div>
  );
};

export default SelectRegion;
