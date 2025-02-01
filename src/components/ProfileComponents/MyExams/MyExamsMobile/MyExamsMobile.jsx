import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { examData } from "../data";
import "./MyExamsMobile.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedExams, theme) {
  return {
    fontWeight: selectedExams.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const MyExamsMobile = () => {
  const theme = useTheme();
  const [selectedExams, setSelectedExams] = useState([]); // لیست آزمون‌های انتخاب‌شده
  const [selectedExamId, setSelectedExamId] = useState(null); // برای باز و بسته کردن دراپ‌داون

  const toggleDropdown = (id) => {
    setSelectedExamId(selectedExamId === id ? null : id);
  };

  const handleExamChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedExams(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="exam-list-mobile">
      <h2>آزمون‌های ثبت‌نام‌شده</h2>

      {/* انتخاب آزمون‌ها */}
      <div className="exam-selection">
        <label>انتخاب آزمون‌ها:</label>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <Select
            displayEmpty
            value={selectedExams}
            onChange={handleExamChange}
            input={
              <OutlinedInput
                sx={{
                  height: 36,
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "Vazirmatn",
                }}
              />
            }
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <em style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                    آزمون مورد نظر را انتخاب کنید
                  </em>
                );
              }
              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                آزمون مورد نظر را انتخاب کنید
              </em>
            </MenuItem>
            {[...new Set(examData.map((exam) => exam.examName))].map(
              (examName) => (
                <MenuItem
                  key={examName}
                  value={examName}
                  style={getStyles(examName, selectedExams, theme)}
                >
                  <span style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                    {examName}
                  </span>
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </div>

      {/* نمایش آزمون‌های مرتبط تنها پس از انتخاب */}
      {selectedExams.length > 0 && (
        <div className="exam-list">
          {examData
            .filter((exam) => selectedExams.includes(exam.examName)) // فیلتر کردن بر اساس انتخاب
            .map((exam) => (
              <div key={exam.examName} className="exam-item">
                {exam.exams.map((subExam) => (
                  <div key={subExam.id}>
                    <div
                      className="exam-header"
                      onClick={() => toggleDropdown(subExam.id)}
                    >
                      <span>{subExam.category}</span>
                      <span>{subExam.date}</span>
                      <span className="dropdown-icon">
                        {selectedExamId === subExam.id ? "▲" : "▼"}
                      </span>
                    </div>
                    <div
                      className={`exam-details ${
                        selectedExamId === subExam.id ? "open" : ""
                      }`}
                    >
                      <p>
                        <strong>وضعیت فعالیت:</strong> {subExam.status}
                      </p>
                      <p>
                        <strong>نمره:</strong> {subExam.score}
                      </p>
                      <p>
                        <strong>درصد از کل:</strong> {subExam.percentage}
                      </p>
                      <p>
                        <strong>وضعیت داوطلب:</strong> {subExam.candidateStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyExamsMobile;
