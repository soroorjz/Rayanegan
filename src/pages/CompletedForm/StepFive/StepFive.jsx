import React from "react";
import { useStepFiveLogic } from "./useStepFiveLogic";
import DatePicker from "react-multi-date-picker";
import Swal from "sweetalert2";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./StepFive.scss";

const StepFive = ({ onNext, onPrevious, gender, onReset }) => {
  const {
    formData,
    isEditable,
    quotaOptions,
    militaryOptions,
    handleChange,
    handleDateChange,
    handleSubmit,
    handlePrevious,
    toggleEdit,
  } = useStepFiveLogic({ onNext, onPrevious });

  const handleFinalConfirmation = () => {
    Swal.fire({
      title: "تأیید نهایی",
      text: "اطلاعات شما با موفقیت تأیید شد!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      onReset(); // استفاده از onReset برای بازگشت به مرحله اول
    });
  };

  return (
    <div className="step5-container">
      <form className="formFive" onSubmit={handleSubmit}>
        <div className="step5-form-group">
          <label>سهمیه:</label>
          {isEditable ? (
            <select name="quota" value={formData.quota} onChange={handleChange}>
              <option value="">انتخاب کنید</option>
              {quotaOptions.map((quota) => (
                <option key={quota.quotaId} value={quota.quotaTitle}>
                  {quota.quotaTitle}
                </option>
              ))}
            </select>
          ) : (
            <input type="text" value={formData.quota} readOnly />
          )}
        </div>
        {gender === "مرد" && (
          <>
            <div className="step5-form-group">
              <label>وضعیت نظام وظیفه:</label>
              {isEditable ? (
                <select
                  name="militaryStatus"
                  value={formData.militaryStatus}
                  onChange={handleChange}
                >
                  <option value="">انتخاب کنید</option>
                  {militaryOptions.map((status) => (
                    <option
                      key={status.dutyStatusId}
                      value={status.dutyStatusName}
                    >
                      {status.dutyStatusName}
                    </option>
                  ))}
                </select>
              ) : (
                <input type="text" value={formData.militaryStatus} readOnly />
              )}
            </div>

            <div className="step5-form-group">
              <label>میزان خدمت( به ماه):</label>
              <input
                type="text"
                name="serviceDuration"
                value={formData.serviceDuration}
                onChange={handleChange}
                readOnly={!isEditable}
                placeholder="میزان خدمت خود را وارد کنید"
              />
            </div>
          </>
        )}

        <div className="step5-form-group">
          <label>تاریخ پایان خدمت:</label>
          {isEditable ? (
            <DatePicker
              value={formData.serviceEndDate}
              onChange={(date) => handleDateChange(date, "serviceEndDate")}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              calendarPosition="bottom-right"
            />
          ) : (
            <input type="text" value={formData.serviceEndDate} readOnly />
          )}
        </div>

        <div className="step5-form-actions">
          <button
            type="button"
            className="step5-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button
            type="button"
            className="step5-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>

          <button
            type="button"
            className="step5-submit-button"
            onClick={handleFinalConfirmation}
          >
            تأیید نهایی
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFive;
