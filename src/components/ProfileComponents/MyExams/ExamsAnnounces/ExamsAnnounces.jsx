import React from "react";
import "./ExamsAnnounces.scss";

const ExamsAnnounces = ({ announcements }) => {
  return (
    <div className="exams-announces">
      <h2 className="title">اعلانات</h2>
      <ul className="announce-list">
        {announcements && announcements.length > 0 ? (
          announcements.map((announce, index) => (
            <li key={index} className="announce-item">
              <span className="announce-date">{announce.date}</span>:
              <p className="announce-text">
                {announce.text}
                {announce.link && (
                  <a href={announce.link.url} className="highlight">
                    ({announce.link.text})
                  </a>
                )}
              </p>
            </li>
          ))
        ) : (
          <li className="announce-item">
            <p className="announce-text">اعلانی برای این آزمون وجود ندارد.</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ExamsAnnounces;