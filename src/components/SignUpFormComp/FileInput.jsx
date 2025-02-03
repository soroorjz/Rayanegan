import React from "react";
import "./FileInput.scss";
import { useState } from "react";
import {  FaTimes } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const FileInput = ({ handleChange, fileError }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    handleChange(e);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
  };

  return (
    <div className="file-input-container">
      <label htmlFor="profileImage" className="upload-icon">
        <span>عکس پرسنلی خود را آپلود کنید.</span>
        <MdOutlineAddPhotoAlternate size={40} />
      </label>
      <input
        type="file"
        id="profileImage"
        name="profileImage"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
      />
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Uploaded" />
          <button className="remove-btn" onClick={handleRemoveImage}>
            <FaTimes />
          </button>
        </div>
      )}
      {fileError && <small className="error">{fileError}</small>}
    </div>
  );
};

export default FileInput;
