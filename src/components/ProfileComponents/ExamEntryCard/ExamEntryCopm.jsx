import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { examData } from "../MyExams/data";
import "./ExamEntryCopm.scss";

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
  return (
    <div className="Entry-list">
      <h2>کارت ‌های ورود به آزمون </h2>
      <div className="Entry-selection">
        <label>انتخاب آزمون:</label>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <Select
            displayEmpty
            value=""
            input={
              <OutlinedInput
                sx={{ height: 36, fontSize: "12px", padding: "5px" }}
              />
            }
            renderValue={(selected) =>
              selected ? (
                <span style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                  {selected}
                </span>
              ) : (
                <em style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                  آزمون مورد نظر را انتخاب کنید
                </em>
              )
            }
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em style={{ fontFamily: "Vazirmatn", fontSize: "15px" }}>
                آزمون مورد نظر را انتخاب کنید
              </em>
            </MenuItem>
            {examData.map((exam) => (
              <MenuItem
                key={exam.examName}
                value={exam.examName}
                sx={{
                  color: selectedExam === exam.examName ? "blue" : "black",
                  fontFamily: "Vazirmatn",
                  fontSize: "14px",
                }}
              >
                {exam.examName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="exam-table-container">
        <table>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>عنوان</th>
              <th>تاریخ</th>
              <th>وضعیت فعالیت</th>
              <th>نمره</th>
              <th>درصد از کل</th>
              <th>وضعیت داوطلب</th>
            </tr>
          </thead>
          {/* <tbody>
            {examData
              .find((exam) => exam.examName === selectedExam)
              ?.exams.map((exam, index) => (
                <tr key={exam.id}>
                  <td>{index + 1}</td>
                  <td>{exam.category}</td>
                  <td>{exam.date}</td>
                  <td className={`status ${exam.status}`}>{exam.status}</td>
                  <td>{exam.score}</td>
                  <td>{exam.percentage}</td>
                  <td
                    className={`result ${
                      exam.candidateStatus === "قبول شده"
                        ? "pass"
                        : exam.candidateStatus === "مردود"
                        ? "failed"
                        : "absent"
                    }`}
                  >
                    {exam.candidateStatus}
                  </td>
                </tr>
              ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default ExamEntryCopm;
