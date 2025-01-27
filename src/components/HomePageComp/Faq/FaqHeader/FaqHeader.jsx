import React, { useState } from "react";
import "./FaqHeader.scss";
import FaqChat from "../FaqChat";
import Faq from "../Faq";
import SupportHelpCenter from "../SupportHelpCenter/SupportHelpCenter";
const FaqHeader = () => {
  const [isFaqSelected, setIsFaqSelected] = useState(true);

  return (
    <div className="faqHeaderContainer">
      <div className="toggle-switch-container">
        <div
          className={`toggle-switch ${isFaqSelected ? "left" : "right"}`}
          onClick={() => setIsFaqSelected(!isFaqSelected)}
        >
          <span className={`option faq ${!isFaqSelected ? "inactive" : ""}`}>
            سوالات متداول
          </span>
          <span className={`option support ${isFaqSelected ? "inactive" : ""}`}>
            پشتیبانی آفلاین
          </span>
          <div className="toggle-circle"></div>
        </div>

        <div className="content-area">
          {isFaqSelected ? (
            <div className="faq-content">
              <Faq />
            </div>
          ) : (
            <div className="offline-support-content">
              {/* <FaqChat /> */}
              <SupportHelpCenter />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqHeader;
