import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./EducationForm.scss";

const schema = yup.object().shape({
  degree: yup.string().required("مقطع تحصیلی را انتخاب کنید"),
  fieldOfStudy: yup.string().required("رشته تحصیلی را وارد کنید"),
  universityType: yup.string().required("نوع دانشگاه را انتخاب کنید"),
  universityName: yup.string().required("نام دانشگاه را وارد کنید"),
  graduationDate: yup.date().required("تاریخ فارغ‌التحصیلی را انتخاب کنید"),
  transcriptImage: yup.mixed().required("تصویر مدرک را آپلود کنید"),
  gpa: yup
    .number()
    .min(0, "معدل نباید کمتر از 0 باشد")
    .max(20, "معدل نباید بیشتر از 20 باشد")
    .required("معدل را وارد کنید"),
});

const EducationForm = ({ onNext,handlePreviousStep }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    onNext();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="education-form-sj">
      <div className="form-group">
        <label>مقطع تحصیلی:</label>
        <select {...register("degree")}>
          <option value="">انتخاب کنید</option>
          <option value="Associate">کاردانی</option>
          <option value="bachelor">کارشناسی</option>
          <option value="master">کارشناسی ارشد</option>
          <option value="phd">دکتری</option>
        </select>
        {errors.degree && <span>{errors.degree.message}</span>}
      </div>

      <div className="form-group">
        <label>رشته تحصیلی:</label>
        <input type="text" {...register("fieldOfStudy")} />
        {errors.fieldOfStudy && <span>{errors.fieldOfStudy.message}</span>}
      </div>

      <div className="form-group">
        <label>نوع دانشگاه:</label>
        <select {...register("universityType")}>
          <option value="">انتخاب کنید</option>
          <option value="public">دولتی</option>
          <option value="Non-profit">غیرانتفاعی</option>
          <option value="private">آزاد</option>
        </select>
        {errors.universityType && <span>{errors.universityType.message}</span>}
      </div>

      <div className="form-group">
        <label>نام دانشگاه:</label>
        <input type="text" {...register("universityName")} />
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
          onChange={(value) => setValue("graduationDate", value?.format("YYYY-MM-DD"))}
        />
        {errors.graduationDate && <span>{errors.graduationDate.message}</span>}
      </div>

      <div className="form-group">
        <label>تصویر مدرک:</label>
        <input
          type="file"
          accept="image/*"
          {...register("transcriptImage")}
          onChange={handleImageChange}
        />
        {errors.transcriptImage && (
          <span>{errors.transcriptImage.message}</span>
        )}
        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}
      </div>

      <div className="form-group">
        <label>معدل:</label>
        <input type="number" step="0.01" {...register("gpa")} />
        {errors.gpa && <span>{errors.gpa.message}</span>}
      </div>
      <br />
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
