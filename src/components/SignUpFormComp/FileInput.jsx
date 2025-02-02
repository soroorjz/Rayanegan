import React from "react";
import "./FileInput.scss";

const FileInput = ({ handleChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="profileImage">تصویر پرسنلی:</label>
      <input
        type="file"
        id="profileImage"
        name="profileImage"
        onChange={handleChange}
      />
    </div>
  );
};

export default FileInput;
