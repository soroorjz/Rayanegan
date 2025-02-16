import React, { useState } from "react";
import "./FinalConfirmation.scss";
const FinalConfirmation = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeInfo, setAgreeInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  return (
    <div className="exam-payment-form">
      <div className="exam-info">
        <h2>
          نام آزمون:
          <span></span>
        </h2>
        <h2>
          هزینه آزمون: <span></span>
        </h2>
      </div>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={agreeInfo}
            onChange={() => setAgreeInfo(!agreeInfo)}
          />
          مشخصات، شغل، ملیت و نام آزمون را تایید می‌کنم.
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
