import React, { useState } from "react";
import provinces_cities from "../../jsonFiles/provinces_cities.json";
const SelectInput = ({ formData, handleChange, errors }) => {
  const [selectedProvince, setSelectedProvince] = useState(""); // استان انتخاب‌شده

  // استخراج لیست یکتای استان‌ها
  const provinces = [
    ...new Set(provinces_cities.map((item) => item.provinceName)),
  ];

  // فیلتر شهرهای مربوط به استان انتخاب‌شده
  const filteredCities = provinces_cities
    .filter((item) => item.provinceName === selectedProvince)
    .map((item) => item.cityName);

  const handleProvinceChange = (e) => {
    const { value } = e.target;
    setSelectedProvince(value);
    handleChange(e); // مقدار را به تابع اصلی ارسال می‌کنیم
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="religion">دین :</label>
        <select
          id="religion"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
        >
          <option value="">انتخاب نمایید</option>

          <option value="اسلام">اسلام</option>
          <option value="مسیحیت">مسیحیت</option>
          <option value="کلیمی">کلیمی</option>
          <option value="یهودیت">زرتشتی</option>
        </select>
        {errors.city && <small className="error">{errors.city}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="province">استان محل تولد:</label>
        <select
          id="province"
          name="province"
          value={formData.province}
          onChange={handleProvinceChange}
        >
          <option value="">انتخاب نمایید</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
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
          disabled={!selectedProvince}
        >
          <option value="">انتخاب نمایید</option>
          {filteredCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <small className="error">{errors.city}</small>}
      </div>
    </>
  );
};

export default SelectInput;
