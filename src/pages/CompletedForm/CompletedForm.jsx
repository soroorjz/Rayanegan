import React, { useState } from "react";
import "./CompletedForm.scss";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import StepFour from "./StepFour/StepFour";
import StepFive from "./StepFive/StepFive";

const CompletedForm = () => {
  const persianNumbers = ["۱", "۲", "۳", "۴", "۵"];
  const steps = [
    "اطلاعات اولیه",
    "اطلاعات تحصیلی",
    "محل سکونت",
    "تصویر مدارک",
    "سوابق",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [gender, setGender] = useState(""); // اضافه کردن state برای جنسیت

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenderChange = (newGender) => {
    console.log("جنسیت جدید توی CompletedForm:", newGender); // دیباگ
    setGender(newGender);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepOne onNext={handleNext} onGenderChange={handleGenderChange} />
        );
      case 1:
        return <StepTwo onNext={handleNext} onPrevious={handlePrevious} />;
      case 2:
        return <StepThree onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <StepFour onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return (
          <StepFive
            onNext={handleNext}
            onPrevious={handlePrevious}
            gender={gender} // پاس دادن جنسیت به StepFive
          />
        );
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
      <div className="completed-stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index <= currentStep ? "completed" : ""}`}
          >
            <div className="step-number">{persianNumbers[index]}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
      <div className="Complete-step-content">
        {renderStepContent()}
        {currentStep === steps.length - 1 && (
          <div className="confirmation-message"></div>
        )}
      </div>
    </div>
  );
};

export default CompletedForm;
