import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import ExamInfo from "./pages/ExamInfo/ExamInfo";
import ExamSignUpForm from "./pages/ExamSignUpForm/ExamSignUpForm";
import Home from "./pages/HomePage/Home";
import LogIn from "./pages/LogIn/LogIn";

import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPassPage from "./pages/ForgotPasswordPage/ResetPass/ResetPassPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ReportForm from "./pages/ReportForm/ReportForm";
import EmploymentTests from "./pages/EmploymentTests/EmploymentTests";
import ReportTracking from "./pages/ReportTracking/ReportTracking";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUpForm" element={<ExamSignUpForm />} />
        {/* <Route path="/examInfo/:id" component={ExamInfo} /> */}

        <Route path="/examInfo/:id" element={<ExamInfo />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/ResetPass" element={<ResetPassPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ReportForm" element={<ReportForm />} />
        <Route path="/EmploymentTests" element={<EmploymentTests />} />
        <Route path="/ReportTracking" element={<ReportTracking />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
