import React, { useState } from "react";
import "./SupportAptions.scss";
const SupportAptions = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleRequestSubmit = () => {
    alert(`درخواست شما برای: ${selectedOption} ثبت شد`);
  };
  return (
    <div className="support-form">
     <h2 className="supportForm-Title"> روش پشتیبانی موردنظرتان را انتخاب کنید. </h2>
      <div className="support-buttons">
        {[
          { title: "درخواست تماس", image: "/assets/images/phone-support.png" },
          {
            title: "پشتیبانی گویا",
            image: "/assets/images/online-support.png",
          },
          { title: "چت آنلاین", image: "/assets/images/Online-chat.png" },
          {
            title: "پشتیبانی پیامکی",
            image: "/assets/images/sms-support.png",
          },
          {
            title: "راهنمای تصویری",
            image: "/assets/images/guide.png",
          },
        ].map((option) => (
          <button
            key={option}
            className={`support-button ${
              selectedOption === option ? "active" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <img
              src={option.image}
              alt={option.title}
              className="button-icon"
            />
            {/* <h2>{option.title}</h2> */}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SupportAptions;
