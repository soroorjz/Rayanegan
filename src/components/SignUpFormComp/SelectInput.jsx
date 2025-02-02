import React from "react";

const SelectInput = ({formData,handleChange,errors}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="province">استان محل تولد:</label>
        <select
          id="province"
          name="province"
          value={formData.province}
          onChange={handleChange}
        >
          <option value="">انتخاب نمایید</option>
          <option value="تهران">تهران</option>
          <option value="خراسان رضوی">خراسان رضوی</option>
          <option value="اصفهان">اصفهان</option>
        </select>
        {errors.province && <small className="error">{errors.province}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="city">شهرستان محل تولد:</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        >
          <option value="">انتخاب نمایید</option>
          {formData.province === "تهران" && (
            <>
              <option value="تهران">تهران</option>
              <option value="ری">ری</option>
            </>
          )}
          {formData.province === "خراسان رضوی" && (
            <>
              <option value="مشهد">مشهد</option>
              <option value="نیشابور">نیشابور</option>
            </>
          )}
          {formData.province === "اصفهان" && (
            <>
              <option value="اصفهان">اصفهان</option>
              <option value="کاشان">کاشان</option>
            </>
          )}
        </select>
        {errors.city && <small className="error">{errors.city}</small>}
      </div>
    </>
  );
};

export default SelectInput;
