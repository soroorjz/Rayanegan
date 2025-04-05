import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./ContactForm.scss";

//  اعتبارسنجی
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
  city: yup.string().required("شهر را انتخاب کنید"),
  address: yup
    .string()
    .required("آدرس را وارد کنید")
    .matches(/^[\u0600-\u06FF\s\d]+$/, "آدرس باید با حروف فارسی باشد"),
});

const ContactForm = ({ onNext, handlePreviousStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [allGeographies, setAllGeographies] = useState([]);

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post("/api/auth", null, {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
        },
      });
      if (response.status !== 200) throw new Error("خطا در دریافت توکن!");
      localStorage.setItem("RayanToken", response.data.token);
      return response.data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      return null;
    }
  }, []);

  const fetchGeographies = useCallback(async () => {
    try {
      let token = localStorage.getItem("RayanToken");
      if (!token) {
        token = await fetchToken();
        if (!token) return;
      }

      const cachedGeoData = localStorage.getItem("GeoData");
      if (cachedGeoData) {
        console.log("داده‌های جغرافیایی از کش خوانده شدند");
        const geoData = JSON.parse(cachedGeoData);
        setProvinces(geoData.filter((item) => item.geographyParent === null));
        setAllGeographies(geoData);
        return;
      }

      // درخواست به API
      const response = await axios.get("/api/geography/geographies", {
        headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
      });

      if (response.status !== 200) throw new Error("خطا در دریافت داده‌ها!");

      const geoData = response.data;
      localStorage.setItem("GeoData", JSON.stringify(geoData));
      setProvinces(geoData.filter((item) => item.geographyParent === null));
      setAllGeographies(geoData);
    } catch (err) {
      console.error("Error fetching geographies:", err);
      setProvinces([]);
      setAllGeographies([]);
    }
  }, [fetchToken]);

  useEffect(() => {
    fetchGeographies();
  }, [fetchGeographies]);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    const filteredCities = allGeographies.filter(
      (city) => city.geographyParent === Number(provinceId)
    );
    setCities(filteredCities);
  };

  const onSubmit = (data) => {
    console.log("فرم ارسال شد:", data);
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
            {provinces.map((province) => (
              <option key={province.geographyId} value={province.geographyId}>
                {province.geographyName}
              </option>
            ))}
          </select>
          {errors.province && <span>{errors.province.message}</span>}
        </div>

        <div className="form-group">
          <label>شهر:</label>
          <select {...register("city")} disabled={!selectedProvince}>
            <option value="">انتخاب کنید</option>
            {cities.map((city) => (
              <option key={city.geographyId} value={city.geographyId}>
                {city.geographyName}
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
