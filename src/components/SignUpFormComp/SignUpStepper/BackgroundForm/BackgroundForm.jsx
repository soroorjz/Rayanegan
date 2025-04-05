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
      const response = await fetch("/api/auth", {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
        },
        method: "POST",
      });
      const data = await response.json();
      localStorage.setItem("RayanToken", data.token);
      return data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  };

  const fetchQuotas = async (token) => {
    try {
      const response = await axios.get("/api/quota/quotas", {
        headers: {
          "RAYAN-TOKEN": token,
          "RAYAN-DEBUG": true,
        },
      });
      const filteredQuotas = response.data.filter(
        (quota) => quota.quotaParent === null
      );
      setQuotaOptions(Array.isArray(filteredQuotas) ? filteredQuotas : []);
    } catch (err) {
      console.error("Error fetching quotas:", err);
      setError("خطا در دریافت سهمیه‌ها!");
      setQuotaOptions([]);
    }
  };

  const fetchMilitaryStatuses = async (token) => {
    try {
      const response = await axios.get("/api/dutystatus/dutystatuses", {
        headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
      });
      console.log("Military statuses response:", response.data); // برای دیباگ
      setMilitaryOptions(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching military statuses:", err);
      setError("خطا در دریافت وضعیت نظام وظیفه!");
      setMilitaryOptions([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await fetchToken();
      if (token) {
        await Promise.all([
          fetchQuotas(token),
          gender === "male" ? fetchMilitaryStatuses(token) : Promise.resolve(),
        ]);
      } else {
        setQuotaOptions([]);
        setMilitaryOptions([]);
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
      workExperienceEnabled: false,
      workExperience: 0,
    },
    context: { gender }, // برای دسترسی به gender در schema
  });

  const [workExperienceEnabled, setWorkExperienceEnabled] = useState(false);
  const selectedQuota = watch("quota");
  const serviceEndDate = watch("serviceEndDate");

  const handleDateChange = (value) => {
    if (value) {
      setValue("serviceEndDate", value.format("YYYY-MM-DD"), {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data) => {
    console.log("Background Data:", data);
    onFinalSubmit();
  };

  const handleToggle = () => {
    const newValue = !workExperienceEnabled;
    setWorkExperienceEnabled(newValue);
    setValue("workExperienceEnabled", newValue);
    setValue("workExperience", newValue ? 0 : 0);
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="background-form-sj">
      <div className="backgroundFormWrapper">
        <div className="form-group">
          <label>سهمیه:</label>
          <select {...register("quota")}>
            <option value="">انتخاب کنید</option>
            {quotaOptions.map((quota) => (
              <option key={quota.quotaId} value={quota.quotaTitle}>
                {quota.quotaTitle}
              </option>
            ))}
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

        {gender === "male" && (
          <>
            <div className="form-group">
              <label>وضعیت نظام وظیفه:</label>
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
