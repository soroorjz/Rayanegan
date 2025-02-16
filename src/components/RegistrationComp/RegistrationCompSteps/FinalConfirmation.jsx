import React, { useState } from "react";
import "./FinalConfirmation.scss";
const FinalConfirmation = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeInfo, setAgreeInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  return (
    <div className="exam-payment-form">
        <div className="examPaymenTitle">
            <h1>تایید نهایی و پرداخت</h1>
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
          مشخصات، شغل محل و نام آزمون را تایید می‌کنم.
        </label>
        <label>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          با قوانین و مقررات سامانه موافقم.
        </label>
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
      <button className="submit-button">پرداخت</button>
    </div>
  );
};
export default FinalConfirmation;
