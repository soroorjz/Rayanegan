import React, { useState } from "react";
import "./SignUpStepper.scss";
import SignUpForm from "../SignUpForm";
const SignUpStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [" اطلاعات فردی", "مرحله دوم", "مرحله سوم", "پایان"];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <SignUpForm onNext={handleNextStep} />;
      case 2:
        return <div>محتوای مرحله دوم</div>;
      case 3:
        return <div>محتوای مرحله سوم</div>;
      case 4:
        return <div>تبریک! مراحل ثبت‌نام تکمیل شد.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="stepper-container">
      <div className="stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index + 1 <= currentStep ? "active" : ""}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
      <div className="step-content">{renderContent()}</div>
    </div>
  );
};

export default SignUpStepper;
