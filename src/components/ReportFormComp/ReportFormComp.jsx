import React, { useState } from "react";
import "./ReportFormComp.scss"
const ReportFormComp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    mobile: "",
    phone: "",
    email: "",
    examType: "",
    exam: "",
    examState: "",
    violationType: "",
    description: "",
    captcha: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    
    if (name === "mobile") {
      if (!/^09\d{0,9}$/.test(value)) {
        newErrors[name] = "شماره تلفن معتبر نیست.";
      } else {
        delete newErrors[name];
      }
    }

    if (["firstName", "lastName"].includes(name)) {
      if (/[^آ-ی\s]/.test(value)) {
        newErrors[name] = "لطفاً با حروف فارسی بنویسید.";
      } else {
        delete newErrors[name];
      }
    }
    
    setFormData({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "تکمیل این فیلد الزامی است.";
      }
    });
    
    if (formData.mobile && !/^09\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "شماره تلفن معتبر نیست.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    alert("فرم ارسال شد!");
  };

  return (
    <div className="report-container">
      <h2 className="title">گزارش تخلف</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <div className="row">
          <div className="form-group">
            <label>نام</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
             {errors.firstName && <small className="error">{errors.firstName}</small>}
          </div>
          <div className="form-group">
            <label>نام خانوادگی</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
                {errors.lastName && <small className="error">{errors.lastName}</small>}
          </div>
          <div className="form-group">
            <label>کد ملی</label>
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              required
              maxLength="10"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>شماره تلفن همراه</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              maxLength="11"
            />
            
          </div>
          <div className="form-group">
            <label>شماره تلفن ثابت</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>آدرس پست الکترونیکی (email)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>نوع آزمون</label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
            >
              <option value="">----</option>
              <option value="کنکور">کنکور</option>
              <option value="کارشناسی ارشد">کارشناسی ارشد</option>
            </select>
          </div>

          <div className="form-group">
            <label>آزمون</label>
            <select name="exam" value={formData.exam} onChange={handleChange}>
              <option value="">چیزی انتخاب نشده است</option>
            </select>
          </div>
          <div className="form-group">
            <label>استان محل آزمون</label>
            <select
              name="examState"
              value={formData.examState}
              onChange={handleChange}
            >
              <option value="">----</option>
              <option value="تهران">تهران</option>
              <option value="اصفهان">اصفهان</option>
            </select>
          </div>
        </div>

        <div className="form-group ">
          <label>نوع تخلف</label>
          <select
            className="violation"
            name="violationType"
            value={formData.violationType}
            onChange={handleChange}
          >
            <option value="">----</option>
            <option value="تقلب">تقلب در آزمون کتبی</option>
          </select>
        </div>

        <div className="form-group">
          <label>شرح تخلف رخ داده</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <p>کد کپچا</p>
        </div>

        <button type="submit">تایید و دریافت کد پیگیری</button>
      </form>
    </div>
  );
};

export default ReportFormComp;
