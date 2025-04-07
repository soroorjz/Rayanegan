import React, { useEffect } from "react";
import "./StepOne.scss";
import { useFormLogic } from "./useFormLogic";
import { useGeography } from "./useGeography";
import TextInput from "./TextInput";
import GenderRadio from "./GenderRadio";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const StepOne = ({ onNext, onGenderChange }) => {
  const {
    formData,
    isEditable,
    errors,
    handleChange,
    toggleEdit,
    handleSubmit,
  } = useFormLogic({ onNext });

  const { provinces, cities, loading, error, updateCities, allGeographies } =
    useGeography();

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    handleChange({ target: { name: "city", value: "" } }); // ریست شهر
    handleChange(e); // آپدیت استان
    updateCities(provinceId); // آپدیت لیست شهرها
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("YYYY/MM/DD") : "";
    handleChange({ target: { name: "birtDate", value: formattedDate } });
  };

  const getDisplayValue = (key, type) => {
    const value = formData[key];
    if (!value) return "";
    if (!isNaN(value) && allGeographies.length > 0) {
      const item =
        type === "province"
          ? provinces.find((p) => p.geographyId === Number(value))
          : cities.find((c) => c.geographyId === Number(value));
      return item ? item.geographyName : "";
    }
    return value;
  };
  const handleGenderChange = (e) => {
    console.log("جنسیت انتخاب‌شده توی StepOne:", e.target.value); // دیباگ
    handleChange(e);
    onGenderChange(e.target.value);
  };

  useEffect(() => {
    if (formData.gender) {
      console.log("جنسیت اولیه فرستاده‌شده به والد:", formData.gender); // دیباگ
      onGenderChange(formData.gender);
    }
  }, [formData.gender, onGenderChange]);

  return (
    <div className="step1-container">
      <form className="formOne" onSubmit={handleSubmit}>
        <TextInput
          label="کد ملی"
          name="nationalCode"
          value={formData.nationalCode}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="کد ملی خود را وارد کنید"
          error={errors.nationalCode}
        />
        <TextInput
          label="نام"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="نام خود را وارد کنید"
          error={errors.firstName}
        />
        <TextInput
          label="نام خانوادگی"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="نام خانوادگی خود را وارد کنید"
          error={errors.lastName}
        />
        <TextInput
          label="نام پدر"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="نام پدر خود را وارد کنید"
          error={errors.fatherName}
        />
        <TextInput
          label="شماره شناسنامه"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="شماره شناسنامه خود را وارد کنید"
          error={errors.phoneNumber}
        />
        {isEditable ? (
          <div className="step1-form-group">
            <label>تاریخ تولد:</label>
            <DatePicker
              style={{ width: "100%" }}
              id="birtDate"
              name="birtDate"
              calendar={persian}
              locale={persian_fa}
              value={formData.birtDate}
              onChange={handleDateChange}
              placeholder="تاریخ تولد را انتخاب کنید"
              format="YYYY/MM/DD"
            />
            {errors.birtDate && (
              <small className="error">{errors.birtDate}</small>
            )}
          </div>
        ) : (
          <TextInput
            label="تاریخ تولد"
            name="birtDate"
            value={formData.birtDate}
            onChange={handleChange}
            isEditable={false}
            placeholder="تاریخ تولد خود را وارد کنید"
            error={errors.birtDate}
          />
        )}
        {isEditable ? (
          <>
            {/* {loading && <p>در حال بارگذاری...</p>} */}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
              <>
                <div className="step1-form-group">
                  <label>استان:</label>
                  <select
                    name="provice"
                    value={formData.provice}
                    onChange={handleProvinceChange}
                  >
                    <option value="">انتخاب کنید</option>
                    {provinces.map((province) => (
                      <option
                        key={province.geographyId}
                        value={province.geographyId}
                      >
                        {province.geographyName}
                      </option>
                    ))}
                  </select>
                  {errors.provice && (
                    <small className="error">{errors.provice}</small>
                  )}
                </div>
                <div className="step1-form-group">
                  <label>شهر:</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.provice}
                  >
                    <option value="">انتخاب کنید</option>
                    {cities.map((city) => (
                      <option key={city.geographyId} value={city.geographyId}>
                        {city.geographyName}
                      </option>
                    ))}
                  </select>
                  {(errors.city ||
                    (!formData.city && formData.provice && isEditable)) && (
                    <small className="error">
                      {errors.city || "لطفاً شهر را انتخاب کنید"}
                    </small>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <TextInput
              label="استان"
              name="provice"
              value={getDisplayValue("provice", "province")}
              onChange={handleChange}
              isEditable={false}
              placeholder="استان خود را وارد کنید"
              error={errors.provice}
            />
            <TextInput
              label="شهر"
              name="city"
              value={getDisplayValue("city", "city")}
              onChange={handleChange}
              isEditable={false}
              placeholder="شهر خود را وارد کنید"
              error={errors.city}
            />
          </>
        )}
        <TextInput
          label="دین"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="دین خود را وارد کنید"
          error={errors.religion}
        />
        <TextInput
          label="تاهل"
          name="mariage"
          value={formData.mariage}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="وضعیت تاهل خود را وارد کنید"
          error={errors.mariage}
        />
        <TextInput
          label="تعداد فرزند"
          name="children"
          value={formData.children}
          onChange={handleChange}
          isEditable={isEditable}
          placeholder="تعداد فرزندان خود را وارد کنید"
          error={errors.children}
        />
        <GenderRadio
          value={formData.gender}
          onChange={handleGenderChange} // استفاده از تابع جدید
          isEditable={isEditable}
        />

        <div className="step1-form-actions">
          <button
            type="submit"
            className="step1-next-button"
            disabled={
              Object.keys(errors).length > 0 ||
              (isEditable && formData.provice && !formData.city)
            }
          >
            مرحله بعد
          </button>
          <button
            type="button"
            className="step1-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
