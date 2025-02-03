import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./BackgroundForm.scss";

const schema = yup.object().shape({
  quota: yup.string().required("لطفاً نوع سهمیه را انتخاب کنید"),
  disabilityType: yup.string().when("quota", {
    is: (val) => val === "disability",
    then: yup.string().required("لطفاً نوع معلولیت را مشخص کنید"),
  }),
  militaryStatus: yup
    .string()
    .required("لطفاً وضعیت نظام وظیفه را انتخاب کنید"),
  serviceDuration: yup
    .number()
    .typeError("مدت خدمت باید عدد باشد")
    .min(0, "مدت خدمت نمی‌تواند کمتر از 0 ماه باشد")
    .required("لطفاً میزان خدمت را به ماه وارد کنید"),
  serviceEndDate: yup.date().required("لطفاً تاریخ پایان خدمت را وارد کنید"),
  workExperience: yup
    .number()
    .typeError("میزان سابقه باید عدد باشد")
    .min(0, "میزان سابقه نمی‌تواند کمتر از 0 ماه باشد")
    .required("لطفاً میزان سابقه کار را وارد کنید"),
});

const BackgroundForm = ({ onFinalSubmit, handlePreviousStep }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedQuota = watch("quota");

  const onSubmit = (data) => {
    console.log("Background Data:", data);
    onFinalSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="background-form-sj">
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
          {errors.disabilityType && (
            <span>{errors.disabilityType.message}</span>
          )}
        </div>
      )}

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
        {errors.serviceDuration && (
          <span>{errors.serviceDuration.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>تاریخ پایان خدمت:</label>
        <input type="date" {...register("serviceEndDate")} />
        {errors.serviceEndDate && <span>{errors.serviceEndDate.message}</span>}
      </div>

      <div className="form-group">
        <label>میزان سابقه کار (ماه):</label>
        <input type="number" {...register("workExperience")} />
        {errors.workExperience && <span>{errors.workExperience.message}</span>}
      </div>

      <br />
      <button type="submit" className="submit-btn">
        تکمیل ثبت‌نام
      </button>
      <button onClick={handlePreviousStep} className="submit-btn">
        مرحله قبل
      </button>
    </form>
  );
};
export default BackgroundForm;
