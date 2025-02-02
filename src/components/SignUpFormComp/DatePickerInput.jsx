import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerInput = ({ label, name, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <DatePicker
        id={name}
        name={name}
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={onChange}
        inputClass="custom-date-input"
        placeholder="تاریخ را انتخاب کنید"
      />
      {error && <small className="error">{error}</small>}
    </div>
  );
};

export default DatePickerInput;
