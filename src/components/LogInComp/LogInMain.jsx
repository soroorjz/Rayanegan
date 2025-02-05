import React, { useState } from "react";
import "./LogInMain.scss";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LootieAnime from "../../lootie/loginanim.lottie";
import { useAuth } from "../../AuthContext";

const LogInMain = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // برای رفرش لوتی
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const correctUsername = "testuser";
    const correctPassword = "123456";

    if (username === correctUsername && password === correctPassword) {
      setShowAnimation(true);
      setAnimationKey((prevKey) => prevKey + 1); // تغییر کلید برای اجرای مجدد

      setTimeout(() => {
        login(username);
        navigate("/");
      }, 3000);
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
            disabled={showAnimation}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={showAnimation}
          />
          <div className="form-options">
            <Link className="forgot-password" to="/ForgotPassword">
              رمز عبورتان را فراموش کرده‌اید؟
            </Link>
          </div>

          <button type="submit" className="login-button" disabled={showAnimation}>
            {showAnimation ? "در حال ورود..." : "ورود"}
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
          {showAnimation && (
            <DotLottieReact
              key={animationKey} // کلید جدید برای رفرش
              id="loginAnim"
              src={LootieAnime}
              autoplay={true}
              loop={false}
              onError={(error) =>
                console.error("Error loading animation:", error)
              }
            />
          )}
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
