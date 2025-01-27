import React from "react";
import ProfileMain from "../../components/ProfileComponents/ProfileMain";
import "./ProfilePage.scss";
import ProfileSideBar from "../../components/ProfileComponents/ProfileSideBar/ProfileSideBar";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader/ProfileHeader";
const ProfilePage = () => {
  return (
    <div className="profile-page">
      <ProfileHeader/>
      <ProfileSideBar />
      <ProfileMain />
    </div>
  );
};

export default ProfilePage;
