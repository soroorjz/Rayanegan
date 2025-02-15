import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import provinces_cities from "../../../../jsonFiles/provinces_cities.json";
import "./ContactForm.scss";
const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^09[0-9]{9}$/, "شماره تلفن نامعتبر است")
    .required("شماره تلفن را وارد کنید"),
  postalCode: yup
    .string()
    .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .required("کد پستی را وارد کنید"),
  province: yup.string().required("استان را انتخاب کنید"),
  city: yup.string().required("شهر را وارد کنید"),
  address: yup.string().required("آدرس را وارد کنید"),
});

const ContactForm = ({ onNext, handlePreviousStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedProvince, setSelectedProvince] = useState(""); // ذخیره استان انتخاب‌شده
  const [filteredCities, setFilteredCities] = useState([]);

  // استخراج لیست یکتای استان‌ها
  const provinces = [
    ...new Set(provinces_cities.map((item) => item.provinceName)),
  ];

  // فیلتر کردن شهرها بر اساس استان انتخاب‌شده
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);

    const cities = provinces_cities
      .filter((item) => item.provinceName === province)
      .map((item) => item.cityName);

    setFilteredCities(cities); // فیلتر شهرها و ذخیره کردن در state
  };

  const onSubmit = (data) => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form-sj">
      <div className="contact-formWrapper">
        <div className="form-group">
          <label>تلفن همراه:</label>
          <input type="text" {...register("phone")} />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div className="form-group">
          <label>کد پستی:</label>
          <input type="text" {...register("postalCode")} />
          {errors.postalCode && <span>{errors.postalCode.message}</span>}
        </div>

        <div className="form-group">
          <label>استان:</label>
          <select {...register("province")} onChange={handleProvinceChange}>
            <option value="">انتخاب کنید</option>
            {provinces.map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>
          {errors.province && <span>{errors.province.message}</span>}
        </div>

        <div className="form-group">
          <label>شهر:</label>
          <select {...register("city")} disabled={!selectedProvince}>
            <option value="">انتخاب کنید</option>
            {filteredCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span>{errors.city.message}</span>}
        </div>

        <div className="form-group">
          <label>آدرس:</label>
          <textarea {...register("address")} rows="3"></textarea>
          {errors.address && <span>{errors.address.message}</span>}
        </div>
      </div>

      <div className="contactSubmitBtns">
        <button
          onClick={handlePreviousStep}
          className="submit-btn contactSubmit-btn"
        >
          مرحله قبل
        </button>
        <button type="submit" className="contactSubmit-btn">
          مرحله بعد
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
