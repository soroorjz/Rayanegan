import React from "react";
import "./Banner.scss";
import { Link } from "react-router";
const Banner = () => {
  return (
    <div className="bannerPart">
      <div className="banner_ImagePart">
        <img src="/assets/images/Examing2.jpg" alt="" />
      </div>
      <div className="banner-SloganPart">
        <div className="sloganTitle">
          <h1>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</h1>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربئه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز
            شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای
            موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
        {/* <div className="sloganBtns">
          <button>
            <Link to="/EmploymentTests">دسترسی به آزمون‌های استخدامی</Link>
          </button>
          <button>
            <Link to="/Announcements">اطلاعیه‌های آزمون‌های  استخدامی</Link>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
