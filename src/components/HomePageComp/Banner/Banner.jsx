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
          <h1>انتخاب هوشمندانه‌ی آزمون‌های استخدامی</h1>

          <p>دسترسی یکپارچه به آزمون‌های استخدامی در بستری جامع</p>
          <p>نمایش هوشمند فرصت‌های شغلی متناسب با مشخصات هر متقاضی</p>
          <p>ثبت‌نام آسان و سریع با اطلاعات به‌روز و دقیق</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
