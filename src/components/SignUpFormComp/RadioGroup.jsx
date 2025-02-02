import React from "react";

const RadioGroup = ({ label, name, options, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <div className="radio-group">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />{" "}
            {option.label}
          </label>
        ))}
      </div>
      {error && <small className="error">{error}</small>}
    </div>
  );
};

export default RadioGroup;
