import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const ContactForm = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form-sj">
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
        <select {...register("province")}>
          <option value="">انتخاب کنید</option>
          <option value="تهران">تهران</option>
          <option value="اصفهان">اصفهان</option>
          <option value="شیراز">شیراز</option>
          <option value="مشهد">مشهد</option>
        </select>
        {errors.province && <span>{errors.province.message}</span>}
      </div>

      <div className="form-group">
        <label>شهر:</label>
        <input type="text" {...register("city")} />
        {errors.city && <span>{errors.city.message}</span>}
      </div>

      <div className="form-group">
        <label>آدرس:</label>
        <textarea {...register("address")} rows="3"></textarea>
        {errors.address && <span>{errors.address.message}</span>}
      </div>
      <br />
      <button type="submit" className="contactSubmit-btn">
        ثبت اطلاعات
      </button>
    </form>
  );
};

export default ContactForm;
