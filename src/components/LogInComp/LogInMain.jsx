import React from "react";
import "./LogInMain.scss";
import { Link } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LootieAnime from "../../lootie/loginanim.lottie";
const LogInMain = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>ورود به حساب کاربری</h1>
        <form className="login-form">
          <input type="text" placeholder="نام کاربری" className="form-input" />
          <input
            type="password"
            placeholder="رمز عبور"
            className="form-input"
          />
          <div className="form-options">
            <Link className="forgot-password" to="/ForgotPassword">
              رمز عبورتان را فراموش کرده‌اید؟
            </Link>
          </div>

          <Link to="/profile">
            <button type="submit" className="login-button">
              ورود
            </button>
          </Link>
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
