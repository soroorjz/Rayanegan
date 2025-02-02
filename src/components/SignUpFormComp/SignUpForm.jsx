import React, { useState } from "react";
import "./SignUpForm.scss";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import SelectInput from "./SelectInput";
import RadioGroup from "./RadioGroup";
import FileInput from "./FileInput";
import DatePickerInput from "./DatePickerInput";

const SignUpForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    fatherName: "",
    idNumber: "",
    gender: "",
    birthDate: "",
    province: "",
    city: "",
    maritalStatus: "",
    religion: "",
    children: 0,
  });

  const [errors, setErrors] = useState({});
  const [isChildrenEnabled, setIsChildrenEnabled] = useState(false);

  const fieldLabels = {
    firstName: "نام",
    lastName: "نام خانوادگی",
    nationalCode: "کد ملی",
    mobile: "تلفن همراه",
    fatherName: "نام پدر",
    idNumber: "شماره شناسنامه",
    gender: "جنسیت",
    birthDate: "تاریخ تولد",
    province: "استان محل تولد",
    city: "شهرستان محل تولد",
    maritalStatus: "وضعیت تاهل",
    religion: "دین",
    children: "تعداد فرزندان",
  };

  const isPersianText = (text) => /^[\u0600-\u06FF\s]+$/.test(text);
  const isValidMobile = (mobile) => /^09\d{9}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === "maritalStatus") {
        setIsChildrenEnabled(value !== "single");
        if (value === "single") {
          setFormData((prev) => ({ ...prev, children: 0 }));
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleDateChange = (value) => {
    setFormData({
      ...formData,
      birthDate: value.format("YYYY-MM-DD"),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "children") {
        newErrors[key] = `وارد کردن ${fieldLabels[key]} الزامی است.`;
      }
    });

    ["firstName", "lastName", "fatherName", "religion"].forEach((field) => {
      if (formData[field] && !isPersianText(formData[field])) {
        newErrors[field] = `لطفاً با حروف فارسی نوشته شود.`;
      }
    });

    if (!isValidMobile(formData.mobile)) {
      newErrors.mobile = "شماره تلفن نامعتبر است.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("Errors found:", newErrors); // لاگ برای بررسی خطاها
    } else {
      setErrors({});
      console.log("No errors, going to next step!"); // لاگ برای تست
      onNext();
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          {[
            { id: "firstName", label: "نام", type: "text" },
            { id: "lastName", label: "نام خانوادگی", type: "text" },
            { id: "nationalCode", label: "کد ملی", type: "text" },
            { id: "mobile", label: "تلفن همراه", type: "text" },
            { id: "fatherName", label: "نام پدر", type: "text" },
            { id: "idNumber", label: "شماره شناسنامه", type: "text" },
            { id: "religion", label: "دین", type: "text" },
          ].map(({ id, label, type }) => (
            <div key={id} className="form-group">
              <label htmlFor={id}>{label}:</label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                placeholder={`${label} خود را وارد کنید`}
              />
              {errors[id] && <small className="error">{errors[id]}</small>}
            </div>
          ))}

          <DatePickerInput
            formData={formData}
            handleDateChange={handleDateChange}
            errors={errors}
          />

          <SelectInput
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <RadioGroup
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            isChildrenEnabled={isChildrenEnabled}
          />
          <FileInput handleChange={handleChange} />
        </div>

        <button type="submit" className="submit-button">
          مرحله‌ی بعد
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
