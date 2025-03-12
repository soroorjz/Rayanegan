// src/apiService.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

let tokenExpiration = null;

export const fetchToken = async (force = false) => {
  const cachedToken = localStorage.getItem("RayanToken");
  const now = Date.now();
  // فقط اگه توکن نزدیک انقضا باشه (مثلاً 30 ثانیه مونده) یا force باشه، آپدیت کن
  if (cachedToken && tokenExpiration > now + 1000 * 30 && !force) {
    return cachedToken;
  }

  try {
    const response = await fetch("/api/auth", {
      headers: {
        "RAYAN-USERNAME": "S.JAMEIE",
        "RAYAN-PASSWORD": "1156789",
        "RAYAN-DEBUG": true,
        "RAYAN-NOCATCH": true,
      },
      method: "POST",
    });
    const data = await response.json();
    localStorage.setItem("RayanToken", data.token);
    tokenExpiration = now + 1000 * 60 * 5; // 5 دقیقه از حالا
    return data.token;
  } catch (err) {
    throw new Error("خطا در دریافت توکن!");
  }
};

api.interceptors.request.use(async (config) => {
  const token = await fetchToken();
  config.headers["Rayan-Token"] = token;
  config.headers["Rayan-Debug"] = true;
  config.headers["RAYAN-NOCATCH"] = true;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await fetchToken(true); // توکن رو اجباری آپدیت کن
      error.config.headers["Rayan-Token"] = localStorage.getItem("RayanToken");
      return api.request(error.config); // درخواست رو دوباره امتحان کن
    }
    return Promise.reject(error);
  }
);

export const getExamStatuses = async () => {
  const response = await api.get("/examstatus/examstatuses");
  return response.data.reduce((acc, status) => {
    acc[status.examStatusId] = status.examStatusName;
    return acc;
  }, {});
};

export const getExams = async () => {
  const response = await api.get("/exam/exams");
  return response.data;
};
