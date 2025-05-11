import React, { useState, useRef } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { FaCircleCheck, FaUpload } from 'react-icons/fa6';
import { RiFileDamageFill } from 'react-icons/ri';
import './DocumentReviewResult.scss';

const DocumentReviewResult = () => {
  const [activeTab, setActiveTab] = useState('approved');
  const [showRejectionDetails, setShowRejectionDetails] = useState(false);
  const fileInputRefs = useRef([]);

  const tabs = [
    { id: 'approved', label: 'تایید شده' },
    { id: 'rejected', label: 'رد شده' },
    { id: 'incomplete', label: 'دارای نواقص' },
    { id: 'inperson', label: 'نیاز به حضور' },
  ];

  const incompleteDocuments = [
    {
      title: 'کارت ملی',
      deadlineDate: '1404/03/30',
      deadlineTime: '23:59',
    },
    {
      title: 'شناسنامه',
      deadlineDate: '1404/03/28',
      deadlineTime: '20:00',
    },
  ];

  const handleUploadClick = (index) => {
    fileInputRefs.current[index].click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('فایل انتخاب شده:', file.name); // می‌توانید این را با منطق آپلود خود جایگزین کنید
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'approved':
        return (
          <div className="tab-content approved">
            <FaCircleCheck />
            <p>مدارک شما در بررسی و تایید شده است.</p>
          </div>
        );
      case 'rejected':
        return (
          <div className="tab-content rejected">
            <IoMdCloseCircle />
            <p>مدارک شما بررسی و رد شده است.</p>
            <button
              className="details-button"
              onClick={() => setShowRejectionDetails(!showRejectionDetails)}
            >
              توضیحات
            </button>
            {showRejectionDetails && (
              <p className="rejection-details">
                با توجه به نقص مدارک و عدم ارسال مدارک در بازه‌ی زمانی مذکور، مدارک شما رد شده است.
              </p>
            )}
          </div>
        );
      case 'incomplete':
        return (
          <div className="tab-content incomplete">
            <RiFileDamageFill />
            <p>
              مدارک شما بررسی شده است و دارای نواقص ذیل می‌باشد. لطفاً در بازه‌ی تعیین شده مدارک
              لازم را بارگذاری کنید.
            </p>
            <div className="documents-list">
              {incompleteDocuments.map((doc, index) => (
                <div key={index} className="document-item">
                  <span>{doc.title}</span>
                  <span>{doc.deadlineDate}</span>
                  <span>{doc.deadlineTime}</span>
                  <div className="upload-button-wrapper">
                    <button
                      className="upload-button"
                      onClick={() => handleUploadClick(index)}
                    >
                      <FaUpload />
                    </button>
                    <input
                      type="file"
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'inperson':
        return (
          <div className="tab-content inperson">
            <p>مدارک شما بررسی شده است و نیاز به حضور شما می‌باشد.</p>
            <div className="appointment-details">
              <p>تاریخ: 1404/03/25</p>
              <p>ساعت: 8:00</p>
              <p>نشانی: تهران، نجات اللهی، خ. مفتح، خ. کریم خان زند</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="document-review-result">
      <h1 className="title">نتیجه ی بررسی مدارک:</h1>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content-wrapper">{renderTabContent()}</div>
    </div>
  );
};

export default DocumentReviewResult;