import React from "react";
import "./ForgotPassword.scss";
import { useNavigate } from "react-router";
const ForgotPassword = () => {
  const navigate = useNavigate(); // تعریف هوک مسیریابی

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/ResetPass");
  };

  return (
    <div className="forgotpassContainer">
    <div className="forgotPassword-Container">
      <div className="forgotPass">
        <h1>بازیابی رمز عبور</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ایمیل خود را وارد کنید"
            className="form-input"
          />
          <input
            type="text"
            placeholder=" کد ارسالی را وارد کنید   "
            className="form-input"
          />
          <div className="form-options">
            <p className="forgot-password" to="/ForgotPassword">
              لینک بازیابی را دریافت نکرده‌اید؟
            </p>
          </div>
          <button type="submit" className="login-button">
            بازیابی رمزعبور
          </button>
        </form>
      </div>
      <div className="forgotPass-Desc">
        <h1>رمز عبورتان را فراموش کرده‌اید؟</h1>
        <p>
          جای نگرانی نیست. ایمیلتان را وارد کنی. ما به شما یک لینک برای بازیابی
          رمز عبور می فرستیم.
        </p>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
