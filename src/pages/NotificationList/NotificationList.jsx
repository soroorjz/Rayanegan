import React from "react";
import "./NotificationList.scss";
import { GoDotFill } from "react-icons/go";

const NotificationList = ({ notifications }) => {
  const handleDownload = (e, link) => {
    if (link) {
      window.open(link, "_blank"); // باز کردن لینک در تب جدید
    } else {
      e.preventDefault(); // اگر لینکی نبود، کلیک رو غیرفعال کن
    }
  };

  return (
    <div className="notification-list-container">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-list-item">
          <div className="notification-list-item__icon">
            <span className="notification-list-item__count">
              <GoDotFill />
            </span>
          </div>
          <div className="notification-list-item__content">
            {notification.downloadLink ? (
              <a
                href={notification.downloadLink}
                className="notification-list-item__text"
                onClick={(e) => handleDownload(e, notification.downloadLink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {notification.title}{" "}
                <small className="notification-list-item__download-label">
                  (دریافت)
                </small>
              </a>
            ) : (
              <span className="notification-list-item__text">
                {notification.title}
              </span>
            )}
            <span className="notification-list-item__time">
              {notification.timeAgo}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
