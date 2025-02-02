import React, { useState } from "react";
import "./SignUpForm.scss";
import SelectInput from "./SelectInput";
import RadioGroup from "./RadioGroup";
import FileInput from "./FileInput";
import DatePickerInput from "./DatePickerInput";
import { textInputsDatas } from "./data";
import { fieldLabels } from "./data";

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

  const isPersianText = (text) => /^[\u0600-\u06FF\s]+$/.test(text);
  const isValidMobile = (mobile) => /^09\d{9}$/.test(mobile);
  const isValidIdNumber = (idNumber) => {
    return /^\d{1,10}$/.test(idNumber) && !/^0+$/.test(idNumber);
  };

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
  const isValidIranianNationalCode = (nationalCode) => {
    if (!/^\d{10}$/.test(nationalCode)) return false; // بررسی ۱۰ رقمی بودن

    let checkDigit = parseInt(nationalCode[9]); // رقم کنترل
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(nationalCode[i]) * (10 - i);
    }

    let remainder = sum % 11;
    let calculatedCheckDigit = remainder < 2 ? remainder : 11 - remainder;

    return checkDigit === calculatedCheckDigit;
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

    if (!isValidIranianNationalCode(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی نامعتبر است.";
    }

    if (!isValidIdNumber(formData.idNumber)) {
      newErrors.idNumber = "شماره شناسنامه نامعتبر است.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("Errors found:", newErrors);
    } else {
      setErrors({});
      console.log("No errors, going to next step!");
      onNext();
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          {textInputsDatas.map((input) => (
            <div key={input.id} className="form-group">
              <label htmlFor={input.id}>{input.label}:</label>
              <input
                type={input.type}
                id={input.id}
                name={input.id}
                value={formData[input.id]}
                onChange={handleChange}
                placeholder={`${input.label} خود را وارد کنید`}
              />
              {errors[input.id] && (
                <small className="error">{errors[input.id]}</small>
              )}
            </div>
          ))}

          <DatePickerInput
            formData={formData}
            setFormData={setFormData}
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
