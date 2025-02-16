import React, { useState } from "react";
import SelectRegion from "./RegistrationCompSteps/SelectRegion";
import FinalConfirmation from "./RegistrationCompSteps/FinalConfirmation";
import "./RegistrationComp.scss";
import JobLocSelect from "./RegistrationCompSteps/JobLocSelect";
import ConfirmInfo from "./RegistrationCompSteps/ConfirmInfo";
import ExamLocation from "./RegistrationCompSteps/ExamLocation";
const RegistrationComp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [gender, setGender] = useState(null);
  const persianNumbers = ["۱", "۲", "۳", "۴", "۵"];

  const steps = [
    "انتخاب شغل محل",
    "وضعیت محل آزمون ",
    "وضعیت محل سکونت",
    "تأیید مشخصات",
    "تأیید نهایی و پرداخت",
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        return <JobLocSelect onNext={handleNextStep} setGender={setGender} />;
      case 2:
        return (
          <ExamLocation
            onNext={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <SelectRegion
            onNext={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return (
          <ConfirmInfo
            onNext={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );

      case 5:
        return (
          <FinalConfirmation
            onFinalSubmit={handleFinalSubmit}
            handlePreviousStep={handlePreviousStep}
            gender={gender}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-stepper-container">
      <div className="registration-stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`registration-step ${
              index + 1 <= currentStep ? "active" : ""
            }`}
          >
            <div className="registration-step-number">
              {persianNumbers[index]}
            </div>
            <div className="registration-step-label">{step}</div>
          </div>
        ))}
      </div>
      <div className="registration-step-content">{renderContent()}</div>
      {showModal && (
        <div className="registration-modal-overlay">
          <div className="registration-modal-content">
            <p>ثبت نام با موفقیت انجام شد!</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default RegistrationComp;
