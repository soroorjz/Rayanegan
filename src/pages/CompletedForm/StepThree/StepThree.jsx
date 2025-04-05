import React from "react";
import { useStepThreeLogic } from "./useStepThreeLogic";
import "./StepThree.scss";

const StepThree = ({ onNext, onPrevious }) => {
  const {
    formData,
    isEditable,
    provinces,
    cities,
    errors,
    handleChange,
    handleProvinceChange,
    handleCityChange,
    handleNext,
    handlePrevious,
    toggleEdit,
  } = useStepThreeLogic({ onNext, onPrevious });

  return (
    <div className="step3-container">
      <form className="formThree" onSubmit={handleNext}>
        <div className="step3-form-group">
          <label>استان:</label>
          {isEditable ? (
            <select
              name="province"
              value={
                provinces.find((p) => p.geographyName === formData.province)
                  ?.geographyId || ""
              }
              onChange={handleProvinceChange}
            >
              <option value="">انتخاب کنید</option>
              {provinces.map((province) => (
                <option key={province.geographyId} value={province.geographyId}>
                  {province.geographyName}
                </option>
              ))}
            </select>
          ) : (
            <input type="text" value={formData.province} readOnly />
          )}
          {errors.province && <span className="error">{errors.province}</span>}
        </div>

        <div className="step3-form-group">
          <label>شهر:</label>
          {isEditable ? (
            <select
              name="city"
              value={
                cities.find((c) => c.geographyName === formData.city)
                  ?.geographyId || ""
              }
              onChange={handleCityChange}
              disabled={!formData.province}
            >
              <option value="">انتخاب کنید</option>
              {cities.map((city) => (
                <option key={city.geographyId} value={city.geographyId}>
                  {city.geographyName}
                </option>
              ))}
            </select>
          ) : (
            <input type="text" value={formData.city} readOnly />
          )}
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div className="step3-form-group">
          <label>آدرس:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="آدرس خود را وارد کنید"
          />
        </div>

        <div className="step3-form-group">
          <label>کد پستی:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="کد پستی خود را وارد کنید"
          />
          {errors.postalCode && (
            <span className="error">{errors.postalCode}</span>
          )}
        </div>

        <div className="step3-form-group">
          <label>تلفن همراه:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            readOnly={!isEditable}
            placeholder="تلفن همراه خود را وارد کنید"
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="step3-form-actions">
          <button
            type="button"
            className="step3-prev-button"
            onClick={handlePrevious}
          >
            مرحله قبل
          </button>
          <button type="submit" className="step3-next-button">
            مرحله بعد
          </button>
          <button
            type="button"
            className="step3-edit-button"
            onClick={toggleEdit}
          >
            {isEditable ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
