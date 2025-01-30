import React from "react";
import "./ProfileHeader.scss";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router";
const ProfileHeader = () => {
  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader-Wrapper">
        <div className="ProfileHeader-rightPart">
          <Link to="/">
          <img
            src="/assets/images/IMG-20250126-WA0000-removebg-preview.png"
            alt=""
          />
          </Link>
          
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
