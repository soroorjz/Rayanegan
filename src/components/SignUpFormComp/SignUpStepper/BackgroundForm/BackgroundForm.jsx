import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./BackgroundForm.scss";

// اسکیما با رفع مشکل وابستگی چرخشی
const schema = yup.object().shape({
  quota: yup.string().required("لطفاً نوع سهمیه را انتخاب کنید"),
  disabilityType: yup.string().when("quota", {
    is: (val) => val === "disability",
    then: yup.string().required("لطفاً نوع معلولیت را مشخص کنید"),
  }),

  militaryStatus: yup.string().required("لطفاً وضعیت نظام وظیفه را انتخاب کنید"),
  serviceDuration: yup
    .number()
    .typeError("مدت خدمت باید عدد باشد")
    .min(0, "مدت خدمت نمی‌تواند کمتر از 0 ماه باشد")
    .required("لطفاً میزان خدمت را به ماه وارد کنید"),
  serviceEndDate: yup.string().required("لطفاً تاریخ پایان خدمت را وارد کنید"),

  workExperience: yup
    .number()
    .typeError("میزان سابقه باید عدد باشد")
    .min(0, "میزان سابقه نمی‌تواند کمتر از 0 ماه باشد")
    .test("work-experience-required", "لطفاً میزان سابقه کار را وارد کنید", function (value) {
      const { workExperienceEnabled } = this.parent;
      return !workExperienceEnabled || (value !== undefined && value !== null && value !== "");
    }),
});

const BackgroundForm = ({ onFinalSubmit, handlePreviousStep, gender }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      workExperienceEnabled: false, // مقدار پیش‌فرض
      workExperience: 0, // برای جلوگیری از خطای اعتبارسنجی
    },
  });

  const [workExperienceEnabled, setWorkExperienceEnabled] = useState(false);
  const selectedQuota = watch("quota");
  const serviceEndDate = watch("serviceEndDate");

  // تابع برای تغییر تاریخ پایان خدمت
  const handleDateChange = (value) => {
    setValue("serviceEndDate", value.format("YYYY-MM-DD"));
  };

  // تابع ثبت فرم
  const onSubmit = (data) => {
    console.log("Background Data:", data);
    onFinalSubmit();
  };

  // تغییر وضعیت "سابقه کار دارم / ندارم"
  const handleToggle = () => {
    const newValue = !workExperienceEnabled;
    setWorkExperienceEnabled(newValue);
    setValue("workExperienceEnabled", newValue);
    setValue("workExperience", newValue ? "" : 0); // مقدار را بر اساس وضعیت تغییر می‌دهیم
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="background-form-sj">
      <div className="backgroundFormWrapper">
        <div className="form-group">
          <label>سهمیه:</label>
          <select {...register("quota")}>
            <option value="">انتخاب کنید</option>
            <option value="none">بدون سهمیه</option>
            <option value="martyr">ایثارگران</option>
            <option value="disability">معلولیت</option>
          </select>
          {errors.quota && <span>{errors.quota.message}</span>}
        </div>

        {selectedQuota === "disability" && (
          <div className="form-group">
            <label>نوع معلولیت:</label>
            <input type="text" {...register("disabilityType")} />
            {errors.disabilityType && <span>{errors.disabilityType.message}</span>}
          </div>
        )}

        {gender === "male" && (
          <>
            <div className="form-group">
              <label>وضعیت نظام وظیفه:</label>
              <select {...register("militaryStatus")}>
                <option value="">انتخاب کنید</option>
                <option value="completed">پایان خدمت</option>
                <option value="exempted">معاف</option>
                <option value="not_completed">در حال خدمت</option>
              </select>
              {errors.militaryStatus && <span>{errors.militaryStatus.message}</span>}
            </div>

            <div className="form-group">
              <label>میزان خدمت (ماه):</label>
              <input type="number" {...register("serviceDuration")} />
              {errors.serviceDuration && <span>{errors.serviceDuration.message}</span>}
            </div>

            <div className="form-group">
              <label>تاریخ پایان خدمت:</label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={serviceEndDate}
                onChange={handleDateChange}
                inputClass="custom-date-input"
                placeholder="تاریخ پایان خدمت را انتخاب کنید"
              />
              {errors.serviceEndDate && <span>{errors.serviceEndDate.message}</span>}
            </div>
          </>
        )}

        <div className="form-group Experience">
          <div className="toggle-container" onClick={handleToggle}>
            <div className={`toggle ${workExperienceEnabled ? "active" : ""}`}></div>
            <p className="workExperienceP">{workExperienceEnabled ? "سابقه کار دارم" : "سابقه کار ندارم"}</p>
          </div>
        </div>

        <div className="form-group">
          <label>میزان سابقه کار (ماه):</label>
          <input
            type="number"
            {...register("workExperience")}
            disabled={!workExperienceEnabled}
          />
          {errors.workExperience && <span>{errors.workExperience.message}</span>}
        </div>
      </div>

      <div className="backgroundFormBtns">
        <button onClick={handlePreviousStep} className="submit-btn">
          مرحله قبل
        </button>
        <button type="submit" className="submit-btn">
          تکمیل ثبت‌نام
        </button>
      </div>
    </form>
  );
};

export default BackgroundForm;
