import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import "./EducationForm.scss";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

const schema = yup.object().shape({
  degree: yup.string().required("مقطع تحصیلی را انتخاب کنید"),
  fieldOfStudy: yup.string().required("رشته تحصیلی را وارد کنید"),
  universityType: yup.string().required("نوع دانشگاه را انتخاب کنید"),
  universityName: yup.string().required("نام دانشگاه را وارد کنید"),
  graduationDate: yup.date().required("تاریخ فارغ‌التحصیلی را انتخاب کنید"),
  transcriptImage: yup
    .mixed()
    .test("required", "تصویر مدرک را آپلود کنید", (value) => value?.length > 0)
    .test("fileSize", "حجم فایل نباید بیشتر از 2MB باشد", (value) =>
      value?.[0] ? value[0].size <= MAX_FILE_SIZE : true
    )
    .test("fileFormat", "فرمت فایل باید jpg, jpeg یا png باشد", (value) =>
      value?.[0] ? ALLOWED_FORMATS.includes(value[0].type) : true
    ),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");

  const onSubmit = (data) => {
    onNext();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFileError("تصویر مدرک را آپلود کنید");
      setPreview(null);
      return;
    }

    if (!ALLOWED_FORMATS.includes(file.type)) {
      setFileError("فرمت فایل باید jpg, jpeg یا png باشد");
      setPreview(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("حجم فایل نباید بیشتر از 2MB باشد");
      setPreview(null);
      return;
    }

    setValue("transcriptImage", [file], { shouldValidate: true });

    setFileError("");
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);
    setValue("transcriptImage", null, { shouldValidate: true });
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
          onChange={(value) => {
            if (value) {
              const gregorianDate = value.convert(gregorian).toDate(); // تبدیل به Date میلادی
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
      <div className="form-group">
        <label>تصویر مدرک:</label>
        {/* <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          {...register("transcriptImage")}
          onChange={handleImageChange}
          id="file-upload"
          style={{ display: "none" }}
        /> */}
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageChange}
          id="file-upload"
          style={{ display: "none" }}
        />
        {!preview && (
          <label htmlFor="file-upload" className="upload-icon">
            <MdOutlineAddPhotoAlternate size={40} />
          </label>
        )}

        {errors.transcriptImage && (
          <span>{errors.transcriptImage.message}</span>
        )}
        {fileError && <span>{fileError}</span>}

        {preview && (
          <div className="image-preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <button
              type="button"
              className="remove-image-btn"
              onClick={removeImage}
            >
              ✖
            </button>
          </div>
        )}
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
