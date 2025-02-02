import React, { useEffect, useState } from "react";
import "./SignUpForm.scss";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import DatePickerInput from "./DatePickerInput";
import RadioGroup from "./RadioGroup";
import FileInput from "./FileInput";

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
    children: null,
  });

  const [errors, setErrors] = useState({});
  const [isChildrenEnabled, setIsChildrenEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "maritalStatus") {
      setIsChildrenEnabled(value === "married" || value === "Moeil");
      if (value !== "married" && value !== "Moeil") {
        setFormData((prev) => ({ ...prev, children: null }));
      }
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
      if (!formData[key] && key !== "children" && key !== "profileImage") {
        newErrors[key] = "این فیلد الزامی است";
      }
    });

    setErrors(newErrors);

    // اگر هیچ خطایی نبود، به مرحله بعد بروید
    if (Object.keys(newErrors).length === 0) {
      onNext(); // مرحله بعد را فراخوانی می‌کند
    }
  };


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          <TextInput
            label="نام"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <TextInput
            label="نام خانوادگی"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <TextInput
            label="کد ملی"
            name="nationalCode"
            value={formData.nationalCode}
            onChange={handleChange}
            error={errors.nationalCode}
          />
          <TextInput
            label="تلفن همراه"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
          />
          <DatePickerInput
            label="تاریخ تولد"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleDateChange}
            error={errors.birthDate}
          />
          <RadioGroup
            label="جنسیت"
            name="gender"
            options={[
              { value: "male", label: "مرد" },
              { value: "female", label: "زن" },
            ]}
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender}
          />
          <SelectInput
            label="استان محل تولد"
            name="province"
            options={["تهران", "خراسان رضوی", "اصفهان"]}
            value={formData.province}
            onChange={handleChange}
            error={errors.province}
          />
          <SelectInput
            label="شهرستان محل تولد"
            name="city"
            options={
              formData.province === "تهران"
                ? ["تهران", "ری"]
                : formData.province === "خراسان رضوی"
                ? ["مشهد", "نیشابور"]
                : formData.province === "اصفهان"
                ? ["اصفهان", "کاشان"]
                : []
            }
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />
          <RadioGroup
            label="وضعیت تاهل"
            name="maritalStatus"
            options={[
              { value: "single", label: "مجرد" },
              { value: "married", label: "متأهل" },
              { value: "Moeil", label: "معیل" },
            ]}
            value={formData.maritalStatus}
            onChange={handleChange}
            error={errors.maritalStatus}
          />
          <TextInput
            label="تعداد فرزندان"
            name="children"
            type="number"
            value={formData.children || ""}
            onChange={handleChange}
            error={errors.children}
            disabled={!isChildrenEnabled}
          />
          <FileInput
            label="تصویر پرسنلی"
            name="profileImage"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          مرحله‌ی بعد
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
