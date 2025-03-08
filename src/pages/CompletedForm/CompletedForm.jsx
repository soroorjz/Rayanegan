import React, { useState } from "react";
import "./CompletedForm.scss";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import StepFour from "./StepFour/StepFour"; // اضافه کردن StepFour
import StepFive from "./StepFive/StepFive";

const CompletedForm = () => {
  const persianNumbers = ["۱", "۲", "۳", "۴", "۵"];
  const steps = [
    "مرحله اول: اطلاعات اولیه",
    "مرحله دوم: اطلاعات تحصیلی",
    "مرحله سوم: تأیید محل",
    "مرحله چهارم: مدارک", // تطابق با محتوای StepFour
    "مرحله پنجم: نهایی‌سازی",
  ];

  const [currentStep, setCurrentStep] = useState(0); // گام فعلی (0 برای StepOne)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1); // رفتن به گام بعدی
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // بازگشت به گام قبلی
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepOne onNext={handleNext} />;
      case 1:
        return <StepTwo onNext={handleNext} onPrevious={handlePrevious} />;
      case 2:
        return <StepThree onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <StepFour onNext={handleNext} onPrevious={handlePrevious} />; // رندر StepFour
      case 4:
        return <StepFive onNext={handleNext} onPrevious={handlePrevious} />; 
      default:
        return (
          <div className="placeholder-content">
            <p>محتوای فرم تکمیل‌شده در اینجا نمایش داده می‌شود.</p>
          </div>
        );
    }
  };

  return (
    <div className="completed-form-container">
      <div className="stepper">
        {steps.map((step, index) => (
          <div key={index} className={`step ${index <= currentStep ? "completed" : ""}`}>
            <div className="step-number">{persianNumbers[index]}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
      <div className="step-content">
        {renderStepContent()}
        {currentStep === steps.length - 1 && (
          <div className="confirmation-message">
           
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedForm;