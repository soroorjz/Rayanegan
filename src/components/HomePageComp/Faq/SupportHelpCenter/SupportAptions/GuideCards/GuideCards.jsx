import React from "react";
import "./GuideCards.scss";

const guideData = [
  {
    id: 1,
    title: "راهنمای ثبت نام در سامانه (PDF)",
    image: "/images/register-guide.png",
  },
  {
    id: 2,
    title: "راهنمای استفاده از پنل کاربری (PDF)",
    image: "/images/user-panel-guide.png",
  },
  {
    id: 3,
    title: "راهنمای ارسال درخواست (PDF)",
    image: "/images/request-guide.png",
  },
  {
    id: 4,
    title: "راهنمای ویرایش اطلاعات (PDF)",
    image: "/images/edit-info-guide.png",
  },
  {
    id: 5,
    title: "راهنمای بازیابی رمز عبور (PDF)",
    image: "/images/recovery-guide.png",
  },
  {
    id: 6,
    title: "راهنمای اتصال به سامانه (PDF)",
    image: "/images/connect-guide.png",
  },
  {
    id: 7,
    title: "راهنمای تنظیمات امنیتی (PDF)",
    image: "/images/security-guide.png",
  },
  {
    id: 8,
    title: "راهنمای ارسال مدارک (PDF)",
    image: "/images/upload-docs-guide.png",
  },
  {
    id: 9,
    title: "راهنمای ثبت درخواست پشتیبانی (PDF)",
    image: "/images/support-guide.png",
  },
  {
    id: 10,
    title: "راهنمای مشاهده وضعیت درخواست (PDF)",
    image: "/images/status-guide.png",
  },
];

const GuideCards = () => {
  return (
    <div className="guide-container">
      {guideData.map((guide) => (
        <div key={guide.id} className="guide-card">
          <img src={guide.image} alt={guide.title} className="guide-image" />
          <button className="guide-button">{guide.title}</button>
        </div>
      ))}
    </div>
  );
};

export default GuideCards;
