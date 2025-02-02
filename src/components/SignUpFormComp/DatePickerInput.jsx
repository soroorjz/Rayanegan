import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerInput = ({handleDateChange,formData,errors}) => {
  return (
    <div className="form-group">
                <label htmlFor="birthDate">تاریخ تولد:</label>
                <DatePicker
                  id="birthDate"
                  name="birthDate"
                  calendar={persian}
                  locale={persian_fa}
                  value={formData.birthDate}
                  onChange={handleDateChange}
                  inputClass="custom-date-input"
                  placeholder="تاریخ تولد را انتخاب کنید"
                />
                {errors.birthDate && (
                  <small className="error">{errors.birthDate}</small>
                )}
              </div>
  );
};

export default DatePickerInput;
