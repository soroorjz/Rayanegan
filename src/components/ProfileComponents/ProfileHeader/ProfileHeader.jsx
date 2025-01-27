import React from "react";
import "./ProfileHeader.scss";
import { MdAccountCircle } from "react-icons/md";
const ProfileHeader = () => {
  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader-Wrapper">
        <div className="rightPart">
          <img
            src="/assets/images/IMG-20250126-WA0000-removebg-preview.png"
            alt=""
          />
        </div>
        <div className="leftPart ">
          <button>سرور جامعی زاده</button>
          <div className="profileImg">
            <MdAccountCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
