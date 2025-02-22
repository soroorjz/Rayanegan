import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const SelectInput = ({ formData, handleChange, errors }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [allGeographies, setAllGeographies] = useState([]);
  const [religions, setReligions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دریافت و ذخیره توکن
  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post("http://smp.devrayan.ir:2052/api/auth", null, {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
        },
      });

      if (response.status !== 200) throw new Error("خطا در دریافت توکن!");

      localStorage.setItem("RayanToken", response.data.token);
      return response.data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  }, []);

  // تابع دریافت داده‌ها با کش کردن
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem("RayanToken");
      if (!token) {
        token = await fetchToken();
        if (!token) return;
      }

      // چک کردن کش
      const cachedGeoData = localStorage.getItem("GeoData");
      const cachedReligionData = localStorage.getItem("ReligionData");

      if (cachedGeoData && cachedReligionData) {
        console.log(" داده‌ها از کش خوانده شدند");
        const geoData = JSON.parse(cachedGeoData);
        const religionData = JSON.parse(cachedReligionData);
        setProvinces(geoData.filter((item) => item.geographyParent === null));
        setAllGeographies(geoData);
        setReligions(religionData);
        setLoading(false);
        return;
      }

      console.log("📡 دریافت داده‌ها از API...");

      // درخواست همزمان برای استان‌ها و دین‌ها
      const [geoResponse, religionResponse] = await Promise.all([
        axios.get("http://smp.devrayan.ir:2052/api/geography/geographies", {
          headers: { "RAYAN-TOKEN": token },
        }),
        axios.get("http://smp.devrayan.ir:2052/api/religion/religions", {
          headers: { "RAYAN-TOKEN": token },
        }),
      ]);

      if (geoResponse.status !== 200 || religionResponse.status !== 200) {
        throw new Error("خطا در دریافت داده‌ها!");
      }

      const geoData = geoResponse.data;
      const religionData = religionResponse.data;

      // ذخیره داده‌ها در localStorage
      localStorage.setItem("GeoData", JSON.stringify(geoData));
      localStorage.setItem("ReligionData", JSON.stringify(religionData));

      setProvinces(geoData.filter((item) => item.geographyParent === null));
      setAllGeographies(geoData);
      setReligions(religionData);

    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {error && <div className="error">{error}</div>}
      {loading && <p>در حال بارگذاری...</p>}

      {!loading && !error && (
        <>
          <div className="form-group">
            <label htmlFor="province">استان :</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                handleChange(e);
                // فیلتر کردن شهرهای مرتبط با استان انتخابی
                const filteredCities = allGeographies.filter(
                  (city) => city.geographyParent === Number(e.target.value)
                );
                setCities(filteredCities);
              }}
            >
              <option value="">انتخاب نمایید</option>
              {provinces.length > 0 ? (
                provinces.map((province) => (
                  <option key={province.geographyId} value={province.geographyId}>
                    {province.geographyName}
                  </option>
                ))
              ) : (
                <option disabled>داده‌ای یافت نشد</option>
              )}
            </select>
            {errors.province && <small className="error">{errors.province}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="city">شهر :</label>
            <select id="city" name="city" value={formData.city} onChange={handleChange}>
              <option value="">انتخاب نمایید</option>
              {cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city.geographyId} value={city.geographyId}>
                    {city.geographyName}
                  </option>
                ))
              ) : (
                <option disabled>ابتدا استان را انتخاب کنید</option>
              )}
            </select>
            {errors.city && <small className="error">{errors.city}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="religion">دین :</label>
            <select id="religion" name="religion" value={formData.religion} onChange={handleChange}>
              <option value="">انتخاب نمایید</option>
              {religions.length > 0 ? (
                religions.map((religion) => (
                  <option key={religion.religionId} value={religion.religionName}>
                    {religion.religionName}
                  </option>
                ))
              ) : (
                <option disabled>داده‌ای یافت نشد</option>
              )}
            </select>
            {errors.religion && <small className="error">{errors.religion}</small>}
          </div>
        </>
      )}
    </>
  );
};

export default SelectInput;
