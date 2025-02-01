import React, { useState } from "react";
import "./PhoneSupport.scss";
const PhoneSupport = () => {
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("پیامکی");

  return (
    <div className="support-container">
      <p className="support-title">
        جهت دریافت پشتیبانی تماس، شماره همراه خود را وارد نمایید.
      </p>
      <div className="support-form">
        <input
          type="text"
          placeholder="شماره همراه"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="support-input"
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="support-select"
        >
          <option value="پیامکی">پیامکی</option>
          <option value="تماس تلفنی">تماس تلفنی</option>
        </select>
        <button className="support-button">ارسال</button>
      </div>
      <div className="support-message">
        پس از ارسال شماره همراه خود، شما پیامکی شامل راهنمایی‌های مورد نیاز را
        دریافت خواهید نمود. شما می‌توانید با انتخاب هر کدام از موارد و ارسال
        مجدد شماره گزینه، راهنمایی‌های بعدی را دریافت نمایید.
      </div>
    </div>
  );
};

export default PhoneSupport;
