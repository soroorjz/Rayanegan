import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import "./EducationForm.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const schema = yup.object().shape({
  degree: yup.string().required("مقطع تحصیلی را انتخاب کنید"),
  fieldOfStudy: yup.string().required("رشته تحصیلی را وارد کنید"),
  universityType: yup.string().required("نوع دانشگاه را انتخاب کنید"),
  universityName: yup.string().required("نام دانشگاه را وارد کنید"),
  graduationDate: yup.date().required("تاریخ فارغ‌التحصیلی را انتخاب کنید"),
  gpa: yup
    .number()
    .typeError("معدل را وارد کنید")
    .min(0, "معدل نباید کمتر از 0 باشد")
    .max(20, "معدل نباید بیشتر از 20 باشد")
    .required("معدل را وارد کنید"),
});

const EducationForm = ({ onNext, handlePreviousStep }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [degrees, setDegrees] = useState([]);
  const [universityTypes, setUniversityTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // مشاهده مقدار انتخاب شده برای مقطع و نوع دانشگاه
  const selectedDegree = watch("degree");
  const selectedUniversityType = watch("universityType");

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
    }
  };

  const fetchDegrees = async () => {
    try {
      const token = localStorage.getItem("RayanToken");
      const response = await axios.get(
        "http://smp.devrayan.ir:2052/api/grade/grades",
        {
          headers: { "RAYAN-TOKEN": token },
        }
      );
      setDegrees(response.data);
    } catch (err) {
      console.error("Error fetching degrees:", err);
    }
  };

  const fetchUniversityTypes = async () => {
    try {
      const token = localStorage.getItem("RayanToken");
      const response = await axios.get(
        "http://smp.devrayan.ir:2052/api/universitytype/universitytypes",
        {
          headers: { "RAYAN-TOKEN": token },
        }
      );
      setUniversityTypes(response.data);
    } catch (err) {
      console.error("Error fetching university types:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchToken();
      const token = localStorage.getItem("RayanToken");

      if (token) {
        await fetchDegrees();
        await fetchUniversityTypes();
        setLoading(false);
      } else {
        console.error("Token not found in localStorage");
      }
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="education-form-sj">
      <div className="form-group">
        <label>مقطع تحصیلی:</label>
        <select {...register("degree")}>
          <option value="">انتخاب کنید</option>
          {loading ? (
            <option>در حال دریافت...</option>
          ) : (
            degrees?.map((degree) => (
              <option key={degree.gradeId} value={degree.gradeId}>
                {degree.gradeTitle}
              </option>
            ))
          )}
        </select>
        {errors.degree && <span>{errors.degree.message}</span>}
      </div>

      <div className="form-group">
        <label>رشته تحصیلی:</label>
        <input
          type="text"
          {...register("fieldOfStudy")}
          disabled={!selectedDegree}
        />
        {errors.fieldOfStudy && <span>{errors.fieldOfStudy.message}</span>}
      </div>

      <div className="form-group">
        <label>نوع دانشگاه:</label>
        <select {...register("universityType")}>
          <option value="">انتخاب کنید</option>
          {loading ? (
            <option>در حال دریافت...</option>
          ) : (
            universityTypes?.map((uniType) => (
              <option key={uniType.id} value={uniType.id}>
                {uniType.universityTypeName}
              </option>
            ))
          )}
        </select>
        {errors.universityType && <span>{errors.universityType.message}</span>}
      </div>

      <div className="form-group">
        <label>نام دانشگاه:</label>
        <input
          type="text"
          {...register("universityName")}
          disabled={!selectedUniversityType}
        />
        {errors.universityName && <span>{errors.universityName.message}</span>}
      </div>

      <div className="form-group">
        <label>تاریخ فارغ‌التحصیلی:</label>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          inputClass="custom-date-input"
          style={{ width: "100%" }}
          placeholder="تاریخ فارغ‌التحصیلی را انتخاب کنید"
          onChange={(value) => {
            if (value) {
              const gregorianDate = value.convert(gregorian).toDate();
              setValue("graduationDate", gregorianDate, {
                shouldValidate: true,
              });
            }
          }}
        />
        {errors.graduationDate && <span>{errors.graduationDate.message}</span>}
      </div>

      <div className="form-group">
        <label>معدل:</label>
        <input type="number" step="0.01" {...register("gpa")} />
        {errors.gpa && <span>{errors.gpa.message}</span>}
      </div>

      <button onClick={handlePreviousStep} className="submit-btn">
        مرحله قبل
      </button>
      <button type="submit" className="submit-btn">
        مرحله بعد
      </button>
    </form>
  );
};

export default EducationForm;
