import React from "react";

const RadioGroup = ({isChildrenEnabled, formData, handleChange, errors }) => {
  return (
    <>
      <div className="form-group">
        <label>وضعیت تاهل:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="single"
              checked={formData.maritalStatus === "single"}
              onChange={handleChange}
            />
            مجرد
          </label>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="married"
              checked={formData.maritalStatus === "married"}
              onChange={handleChange}
            />
            متأهل
          </label>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="guardian"
              checked={formData.maritalStatus === "guardian"}
              onChange={handleChange}
            />
            معیل
          </label>
        </div>
        {errors.maritalStatus && (
          <small className="error">{errors.maritalStatus}</small>
        )}
      </div>
      <div className="form-group">
            <label htmlFor="children">تعداد فرزندان:</label>
            <input
              type="number"
              id="children"
              name="children"
              value={formData.children}
              onChange={handleChange}
              min="0"
              disabled={!isChildrenEnabled}
              placeholder="تعداد فرزندان خود را وارد کنید"
            />
            {errors.children && (
              <small className="error">{errors.children}</small>
            )}
          </div>
      <div className="form-group">
        <label>جنسیت:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />{" "}
            مرد
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />{" "}
            زن
          </label>
        </div>
        {errors.gender && <small className="error">{errors.gender}</small>}
      </div>
    </>
  );
};

export default RadioGroup;
