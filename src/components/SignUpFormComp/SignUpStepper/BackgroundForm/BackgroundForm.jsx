import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./BackgroundForm.scss";
import axios from "axios";

const BackgroundForm = ({ onFinalSubmit, handlePreviousStep, gender }) => {
  const [quotaOptions, setQuotaOptions] = useState([]);
  const [militaryOptions, setMilitaryOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToken = async () => {
    try {
      const response = await fetch("http://smp.devrayan.ir:2052/api/auth", {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
        },
        method: "POST",
      });
      const data = await response.json();
      localStorage.setItem("RayanToken", data.token);
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
    }
  };

  const fetchQuotas = async () => {
    try {
      const token = localStorage.getItem("RayanToken");
      const response = await axios.get(
        "http://smp.devrayan.ir:2052/api/quota/quotas",
        {
          headers: {
            "RAYAN-TOKEN": token,
          },
        }
      );

      // فیلتر کردن سهمیه‌هایی که quotaParent آنها null است
      const filteredQuotas = response.data.filter(
        (quota) => quota.quotaParent === null
      );
      setQuotaOptions(filteredQuotas);
    } catch (err) {
      console.error("Error fetching quotas:", err);
      setError("خطا در دریافت سهمیه‌ها!");
    }
  };
  const fetchMilitaryStatuses = async () => {
    try {
      const token = localStorage.getItem("RayanToken");
      const response = await axios.get(
        "http://smp.devrayan.ir:2052/api/dutystatus/dutystatuses",
        {
          headers: { "RAYAN-TOKEN": token },
        }
      );
      setMilitaryOptions(response.data);
    } catch (err) {
      console.error("Error fetching military statuses:", err);
      setError("خطا در دریافت وضعیت نظام وظیفه!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchToken();
      await fetchQuotas();
      if (gender === "male") {
        await fetchMilitaryStatuses();
      }
      setLoading(false);
    };
    fetchData();
  }, [gender]);

  const schema = yup.object().shape({
    quota: yup.string().required("لطفاً نوع سهمیه را انتخاب کنید"),
    disabilityType: yup.string().when("quota", {
      is: (val) => val === "disability",
      then: yup.string().required("لطفاً نوع معلولیت را مشخص کنید"),
    }),

    // اعتبارسنجی نظام وظیفه فقط برای مردان
    militaryStatus: yup.string().when("gender", {
      is: "male",
      then: yup.string().required("لطفاً وضعیت نظام وظیفه را انتخاب کنید"),
    }),

    serviceDuration: yup
      .number()
      .typeError("مدت خدمت باید عدد باشد")
      .min(0, "مدت خدمت نمی‌تواند کمتر از 0 ماه باشد")
      .when("gender", {
        is: "male",
        then: yup.number().required("لطفاً میزان خدمت را به ماه وارد کنید"),
      }),

    serviceEndDate: yup.string().when("gender", {
      is: "male",
      then: yup.string().required("لطفاً تاریخ پایان خدمت را وارد کنید"),
    }),

    workExperience: yup
      .number()
      .typeError("میزان سابقه باید عدد باشد")
      .min(0, "میزان سابقه نمی‌تواند کمتر از 0 ماه باشد")
      .when("workExperienceEnabled", {
        is: true,
        then: yup.number().required("لطفاً میزان سابقه کار را وارد کنید"),
      }),
  });

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
    setValue("workExperience", newValue ? 0 : 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="background-form-sj">
      <div className="backgroundFormWrapper">
        <div className="form-group">
          <label>سهمیه:</label>
          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <select {...register("quota")}>
              <option value="">انتخاب کنید</option>
              {quotaOptions.map((quota) => (
                <option key={quota.quotaId} value={quota.quotaTitle}>
                  {quota.quotaTitle}
                </option>
              ))}
            </select>
          )}
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

        {gender === "male" && (
          <>
            <div className="form-group">
              <label>وضعیت نظام وظیفه:</label>
              {loading ? (
                <p>در حال بارگذاری...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <select {...register("militaryStatus")}>
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
              )}
              {errors.militaryStatus && (
                <span>{errors.militaryStatus.message}</span>
              )}
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
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={serviceEndDate}
                onChange={handleDateChange}
                inputClass="custom-date-input"
                placeholder="تاریخ پایان خدمت را انتخاب کنید"
              />
              {errors.serviceEndDate && (
                <span>{errors.serviceEndDate.message}</span>
              )}
            </div>
          </>
        )}

        <div className="form-group Experience">
          <div className="toggle-container" onClick={handleToggle}>
            <div
              className={`toggle ${workExperienceEnabled ? "active" : ""}`}
            ></div>
            <p className="workExperienceP">
              {workExperienceEnabled ? "سابقه کار دارم" : "سابقه کار ندارم"}
            </p>
          </div>
        </div>

        <div className="form-group">
          <label>میزان سابقه کار (ماه):</label>
          <input
            type="number"
            {...register("workExperience")}
            disabled={!workExperienceEnabled}
          />
          {errors.workExperience && (
            <span>{errors.workExperience.message}</span>
          )}
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
