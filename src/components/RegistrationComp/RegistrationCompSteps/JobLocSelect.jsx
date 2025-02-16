import React, { useState } from "react";
import "./JobLocSelect.scss";
const jobs = [
  {
    id: 1,
    code: "1001",
    title: "دبیر تربیت بدنی",
    location: "آذربایجان شرقی - میانه",
  },
  { id: 2, code: "1002", title: "مهندس کامپیوتر", location: "تهران - مرکزی" },
  { id: 3, code: "1003", title: "حسابدار", location: "اصفهان - شمالی" },
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
      setSelectedJob(jobs[0]?.id || null); // انتخاب اولین شغل هنگام تغییر به "smart"
    }
    setError(false);
  };

  const handleNext = () => {
    if (selectedTab === "manual" && !selectedJob) {
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{jobs[0]?.code}</td>
                <td>{jobs[0]?.title}</td>
                <td>{jobs[0]?.location}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {error && (
        <p className="error-message">لطفاً شغل محل خود را انتخاب کنید.</p>
      )}

      <button
        className={`JobLocSelectBtn ${
          selectedTab === "manual" && !selectedJob ? "disabled-btn" : ""
        }`}
        onClick={handleNext}
        disabled={selectedTab === "manual" && !selectedJob}
      >
        مرحله بعد
      </button>
    </div>
  );
};

export default JobLocSelect;
