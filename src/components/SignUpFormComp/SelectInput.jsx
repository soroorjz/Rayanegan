import React from "react";

const SelectInput = ({ label, name, options, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="">انتخاب نمایید</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <small className="error">{error}</small>}
    </div>
  );
};

export default SelectInput;
