import React, { useState } from "react";
import "./SignUpStepper.scss";
import SignUpForm from "../SignUpForm";
import EducationForm from "./EducationForm/EducationForm";
import ContactForm from "./ContactForm/ContactForm";
import BackgroundForm from "./BackgroundForm/BackgroundForm";
const SignUpStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const persianNumbers = ["۱", "۲", "۳", "۴"];

  const steps = [" اطلاعات فردی", "اطلاعات تحصیلی ", "مرحله سوم", "پایان"];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinalSubmit = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <SignUpForm onNext={handleNextStep} />;
      case 2:
        return (
          <div>
            <EducationForm onNext={handleNextStep} />
          </div>
        );
      case 3:
        return (
          <div>
            <ContactForm onNext={handleNextStep} />
          </div>
        );
      case 4:
        return (
          <div>
            <BackgroundForm onFinalSubmit={handleFinalSubmit} />
          </div>
        );
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
            <div className="step-number">{persianNumbers[index]}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
      <div className="step-content">{renderContent()}</div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>ثبت نام با موفقیت انجام شد!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpStepper;
