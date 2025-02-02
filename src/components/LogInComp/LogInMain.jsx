import React, { useState } from "react";
import "./LogInMain.scss";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LootieAnime from "../../lootie/loginanim.lottie";
import { useAuth } from "../../AuthContext"; // ✅ اضافه کردن useAuth

const LogInMain = () => {
  const { login } = useAuth(); // ✅ دریافت تابع login از AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // اطلاعات پیش‌فرض برای لاگین
    const correctUsername = "testuser";
    const correctPassword = "123456";

    if (username === correctUsername && password === correctPassword) {
      login(username); // ✅ استفاده از تابع login به‌جای تغییر مستقیم localStorage
      navigate("/");
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>ورود به حساب کاربری</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="نام کاربری"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-options">
            <Link className="forgot-password" to="/ForgotPassword">
              رمز عبورتان را فراموش کرده‌اید؟
            </Link>
          </div>

          <button type="submit" className="login-button">
            ورود
          </button>
        </form>
        <div className="login-divider">یا</div>

        <div className="register-link">
          <p>
            عضو نیستید؟
            <Link to="/signUpForm"> ثبت‌نام کنید</Link>
          </p>
        </div>
      </div>
      <div className="login-right">
        <div>
          <DotLottieReact
            id="loginAnim"
            src={LootieAnime}
            onError={(error) =>
              console.error("Error loading animation:", error)
            }
          />
        </div>
        <h1>خوش آمدید!</h1>
        <h3>برای ورود به حساب کاربری خود، اطلاعات را وارد کنید.</h3>
        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگریاز شامل حروفچینی دستاوردهای اصلی،
          و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
          گیرد.
        </p>
      </div>
    </div>
  );
};

export default LogInMain;
