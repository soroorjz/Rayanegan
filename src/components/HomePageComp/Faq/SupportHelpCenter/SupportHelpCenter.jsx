import React, { useState } from "react";
import "./SupportHelpCenter.scss";
import { categories } from "./SupportHelpCenterData";
import SupportAptions from "./SupportAptions/SupportAptions";

const SupportHelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const resetState = () => {
    setActiveCategory(null);
    setActiveQuestion(null);
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveQuestion(null);
    setFeedback(null);
  };

  const handleQuestionClick = (question) => {
    setActiveQuestion(question);
  };

  const handleFeedbackClick = (type) => {
    if (type === "like") {
      resetState();
    } else {
      setFeedback("dislike");
    }
  };

  return (
    <div className="support-help-center">
      {!activeCategory && !feedback && (
        <div className="categories">
          <h2>دسته‌بندی‌ها</h2>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="category-button"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {activeCategory && !activeQuestion && (
        <div className="questions">
          <h2>{activeCategory.name}</h2>
          {activeCategory.questions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="question-button"
            >
              {question}
            </button>
          ))}
          <button onClick={resetState} className="back-button">
            بازگشت
          </button>
        </div>
      )}

      {activeQuestion && !feedback && (
        <div className="answer">
          <h2>{activeQuestion}</h2>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است.
          </p>
          <div className="feedback-buttons">
            <button
              onClick={() => handleFeedbackClick("like")}
              className="like-button"
            >
              مفید بود
            </button>
            <button
              onClick={() => handleFeedbackClick("dislike")}
              className="dislike-button"
            >
              نیاز به راهنمایی بیشتر دارم
            </button>
          </div>
        </div>
      )}

      {feedback === "dislike" && !selectedOption && (
        <SupportAptions onSelectOption={setSelectedOption}  resetState={resetState}/>
      )}

    </div>
  );
};

export default SupportHelpCenter;
