import React, { useState } from "react";
import "./SignUpStepper.scss";
import SignUpForm from "../SignUpForm";
import EducationForm from "./EducationForm/EducationForm";
import ContactForm from "./ContactForm/ContactForm";
import BackgroundForm from "./BackgroundForm/BackgroundForm";
import FileInput from "../FileInput";
import { useNavigate } from "react-router";
import Receipt from "./Receipt/Receipt";
import Swal from "sweetalert2"; 

const SignUpStepper = ({initialData, successMessage, redirectAfterSubmit = true }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [gender, setGender] = useState(null);
  const persianNumbers = ["۱", "۲", "۳", "۴", "۵"];
  const navigate = useNavigate();
  const steps = [
    " اطلاعات فردی",
    "اطلاعات تحصیلی ",
    " اطلاعات محل سکونت",
    "بارگذاری تصاویر",
    "سوابق",
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
    Swal.fire({
      title: "ثبت نام شما با موفقیت انجام شد",
      text: "نام کاربری و رمزعبور، کد ملی شما می‌باشد.",
      icon: "success",
      confirmButtonText: "تأیید",
      confirmButtonColor: "#04364a",
    }).then((result) => {
      if (result.isConfirmed && redirectAfterSubmit) {
        navigate("/logIn"); 
      }
    });
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <SignUpForm initialData={initialData} onNext={handleNextStep} setGender={setGender} />;
      case 2:
        return (
          <div>
            <EducationForm
              handlePreviousStep={handlePreviousStep}
              onNext={handleNextStep}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <ContactForm
              handlePreviousStep={handlePreviousStep}
              onNext={handleNextStep}
            />
          </div>
        );
      case 4:
        return (
          <div className="fileInputPart">
            <FileInput
              handlePreviousStep={handlePreviousStep}
              onNext={handleNextStep}
            />
          </div>
        );
      case 5:
        return (
          <div>
            <BackgroundForm
              handlePreviousStep={handlePreviousStep}
              onFinalSubmit={handleFinalSubmit}
              gender={gender}
            />
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
    </div>
  );
};

export default SignUpStepper;
