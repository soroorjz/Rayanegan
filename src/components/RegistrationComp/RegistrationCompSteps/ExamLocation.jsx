import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./ExamLocation.scss";
const ExamLocation = ({ onNext, handlePreviousStep }) => {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  const isDisabled = !province || !city;
  return (
    <div className="location-container">
      <h1 className="title">انتخاب محل آزمون</h1>
      <div className="ExamLocation-selections">
        <div className="selection-row">
          <label>استان:</label>
          <select
            className="select-box"
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="1">تهران</option>
            <option value="2">اصفهان</option>
          </select>
        </div>

        <div className="selection-row">
          <label>شهرستان:</label>
          <select
            className="select-box"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="1">شهرستان 1</option>
            <option value="2">شهرستان 2</option>
          </select>
        </div>
      </div>

      <ul className="info-list">
        <li>
          <FaCheck className="icon" />
          محل برگزاری آزمون می‌تواند با استان محل سکونت شما متفاوت باشد.
        </li>
        <li>
          <FaCheck className="icon" />
          محل برگزاری آزمون تأثیری در شرایط بومی یا غیربومی بودن شما ندارد.
        </li>
        <li>
          <FaCheck className="icon" />
          آزمون شما در محلی برگزار خواهد شد، که در این بخش انتخاب می‌کنید.
        </li>
      </ul>

      <div className="ExamLocationSubmitBtns">
        <button onClick={handlePreviousStep}>مرحله قبل</button>
        <button
          onClick={onNext}
          className={`submit-button ${isDisabled ? "disabled-button" : ""}`}
          disabled={isDisabled}
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default ExamLocation;
