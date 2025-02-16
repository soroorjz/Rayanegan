import React from "react";
import "./ConfirmInfo.scss"
const ConfirmInfo = ({ onNext }) => {
  return (
    <div className="confirm-infoContainer">
      <div className="confirm-Desc">asdexughc Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus esse, ab ex architecto facere repudiandae fuga provident. Provident possimus aliquid consectetur quod, exercitationem facere blanditiis vel eveniet delectus aliquam eum!</div>
      <button onClick={onNext}>بعدی</button>
    </div>
  );
};

export default ConfirmInfo;
