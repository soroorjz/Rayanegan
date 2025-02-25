import React, { useState } from "react";
import "./FinalConfirmation.scss";
const FinalConfirmation = ({ handlePreviousStep }) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeInfo, setAgreeInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const isDisabled = !(agreeTerms && agreeInfo);

  return (
    <div className="exam-payment-form">
      <div className="examPaymenTitle">
        <h1>تأیید نهایی و پرداخت</h1>
      </div>
      <div className="exam-info">
        <h2>
          عنوان آزمون:
          <span>استخدام شرکت توزیع نیروی برق استان بوشهر</span>
        </h2>
        <h2>
          هزینه ثبت‌نام در آزمون: <span>۴,۰۰۰,۰۰۰ ریال</span>
        </h2>
      </div>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={agreeInfo}
            onChange={() => setAgreeInfo(!agreeInfo)}
          />
          مشخصات، شغل محل و نام آزمون را تأیید می‌کنم.
        </label>
        <label className="secAgreeTerms">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          قوانین و مقررات مندرج در دفترچه آزمون را مطالعه کرده‌ام و مورد پذیرش
          اینجانب است.
        </label>
        <span>
          <a href="" download className="bookletDownload">
            (دانلود دفترچه آزمون)
          </a>
        </span>
      </div>
      <div className="payment-method">
        <p className="payment-method-Title">روش پرداخت:</p>
        <label>
          <div className="rightPart">
            <img src="/assets/images/mellat.png" alt="" />
            <div className="paymentMethodDesc">
              <p>پرداخت آنلاین</p>
              <span>بانک ملت</span>
            </div>
          </div>

          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
          />
        </label>
      </div>
      <div className="exam-paymentBtns">
        <button className="submit-button" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
        <button
          className={`submit-button ${isDisabled ? "disabled-button" : ""}`}
          disabled={isDisabled}
        >
          <a href="../../../behpardakht-Ui-main/index.html">پرداخت</a>
        </button>
      </div>
    </div>
  );
};
export default FinalConfirmation;
