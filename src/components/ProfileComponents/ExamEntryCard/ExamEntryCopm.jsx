import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { examData } from "../MyExams/data";
import "./ExamEntryCopm.scss";
import ExamEntryCard from "./ExamEntryCard";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220,
    },
  },
};

const ExamEntryCopm = () => {
  const [selectedExam, setSelectedExam] = useState("");

  const exams = [
    { id: 1, name: "آزمون استخدامی وزارت بهداشت", status: "card" },
    { id: 2, name: "آزمون دستگاه‌های اجرایی", status: "not_issued" },
    { id: 3, name: "آزمون آموزش و پرورش", status: "expired" },
  ];

  const handleChange = (event) => {
    setSelectedExam(event.target.value);
  };

  return (
    <div className="Entry-list">
      <h2>کارت‌های ورود به آزمون</h2>
      <div className="Entry-selection">
        <label>انتخاب آزمون:</label>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <Select
            displayEmpty
            value={selectedExam}
            onChange={handleChange}
            input={
              <OutlinedInput
                sx={{ height: 36, fontSize: "12px", padding: "5px" }}
              />
            }
            renderValue={(selected) =>
              selected ? (
                <span style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                  {exams.find((exam) => exam.id === selected)?.name}
                </span>
              ) : (
                <em style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                  آزمون مورد نظر را انتخاب کنید
                </em>
              )
            }
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                آزمون مورد نظر را انتخاب کنید
              </em>
            </MenuItem>
            {exams.map((exam) => (
              <MenuItem key={exam.id} value={exam.id}>
                {exam.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="Exam-result">
        {selectedExam && (
          exams.find((exam) => exam.id === selectedExam)?.status === "card" ? (
            <ExamEntryCard />
          ) : exams.find((exam) => exam.id === selectedExam)?.status === "not_issued" ? (
            <p style={{ color: "orange" }}>در حال حاضر کارت آزمون صادر نشده است.</p>
          ) : (
            <p style={{ color: "red" }}>مهلت دریافت کارت آزمون به پایان رسیده است.</p>
          )
        )}
      </div>
    </div>
  );
};
export default ExamEntryCopm;
