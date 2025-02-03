import React from "react";
import { Link } from "react-router";
import "./ReportModal.scss";
const ReportModal = ({ trackingCode, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>کد پیگیری تخلف</h2>
        <p className="tracking-code">{trackingCode}</p>
        <p className="tracking-desc">
          اطلاعات شما با موفقیت ثبت گردید. در صورت لزوم با شما تماس گرفته
          می‌شود.
        </p>
        <Link to="/" className="home-button">
          صفحه آغازین
        </Link>
        
      </div>
    </div>
  );
};

export default ReportModal;
