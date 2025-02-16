import React, { useState } from "react";
import "./JobLocSelect.scss";
const jobs = [
  {
    id: 1,
    code: "۱۰۰۱",
    title: "دبیر تربیت بدنی",
    location: "آذربایجان شرقی - میانه",
  },
  { id: 2, code: "۱۰۰۲", title: "مهندس کامپیوتر", location: "تهران - مرکزی" },
  { id: 3, code: "۱۰۰۳", title: "حسابدار", location: "اصفهان - شمالی" },
];

const JobLocSelect = ({ onNext }) => {
  const [selectedTab, setSelectedTab] = useState("manual");
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(false);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "manual") {
      setSelectedJob(null); // پاک کردن انتخاب قبلی
    } else {
      setSelectedJob(null); // در ابتدا هیچ شغلی انتخاب نشده باشد
    }
    setError(false);
  };

  const handleNext = () => {
    if (!selectedJob) {
      setError(true);
    } else {
      setError(false);
      onNext();
    }
  };

  return (
    <div className="job-selection">
      <div className="tabs">
        <button
          className={selectedTab === "manual" ? "manual active" : "manual"}
          onClick={() => handleTabChange("manual")}
        >
          انتخاب شغل محل توسط داوطلب
        </button>
        <button
          className={selectedTab === "smart" ? "smart active" : "smart"}
          onClick={() => handleTabChange("smart")}
        >
          انتخاب هوشمند شغل محل بر اساس مشخصات داوطلب
        </button>
      </div>

      <div className="table-container">
        {selectedTab === "manual" ? (
          <table className="job-table">
            <thead>
              <tr>
                <th>کد شغل محل</th>
                <th>شغل</th>
                <th>محل خدمت</th>
                <th>انتخاب</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.code}</td>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>
                    <input
                      type="radio"
                      name="job"
                      checked={selectedJob === job.id}
                      onChange={() => {
                        setSelectedJob(job.id);
                        setError(false);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="job-table">
            <thead>
              <tr>
                <th>کد شغل محل</th>
                <th>شغل</th>
                <th>محل خدمت</th>
                <th>انتخاب</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{jobs[0]?.code}</td>
                <td>{jobs[0]?.title}</td>
                <td>{jobs[0]?.location}</td>
                <td>
                  <input
                    type="radio"
                    name="job"
                    checked={selectedJob === jobs[0]?.id}
                    onChange={() => {
                      setSelectedJob(jobs[0]?.id);
                      setError(false);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {error && (
        <p className="error-message">لطفاً شغل محل خود را انتخاب کنید.</p>
      )}

      <button
        className={`JobLocSelectBtn ${!selectedJob ? "disabled-btn" : ""}`}
        onClick={handleNext}
        disabled={!selectedJob}
      >
        مرحله بعد
      </button>
    </div>
  );
};
export default JobLocSelect;
