import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./currentQuestion.css";
import next from "../assets/next.png";
import { quiz } from "../reducers/quiz";
import { Header } from "./Header";
import { Summary } from "./Summary";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const isQuizOver = useSelector((state) => state.quiz.quizOver);

  const [score, setScore] = useState(0);
  const [borderColor, setBorderColor] = useState("transparent");
  const [selectedOption, setSelectedOption] = useState(null);
  const [disableOptionButtons, setDisableOptionButtons] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  console.log({ showNextButton });

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const checkIfAnswerIsCorrect = (index) => {
    setDisableOptionButtons(true);
    setShowNextButton(true);

    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex: index,
      })
    );

    if (index === question.correctAnswerIndex) {
      setScore(score + 1);
      setBorderColor("#8dc88d");
    } else {
      setBorderColor("#c88d8d");
    }
    setSelectedOption(index);
  };

  const goToNextQuestion = () => {
    setDisableOptionButtons(false);
    setShowNextButton(false);
    setBorderColor("transparent");
    dispatch(quiz.actions.goToNextQuestion());
  };

  if (isQuizOver) {
    return <Summary />;
  }

  return (
    <div className="question-card">
      <Header score={score} />
      <div className="main">
        <h2 className="question">{question.questionText}</h2>

        <div className="option-buttons">
          {question.options.map((option, index) => (
            <button
              key={index}
              disabled={disableOptionButtons}
              onClick={() => checkIfAnswerIsCorrect(index)}
              className="option-button"
              style={{
                boxShadow: `0px 0px 0px 2px ${
                  selectedOption === index ? borderColor : "transparent"
                }`,
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {showNextButton && (
          <div className="next-container">
            <span>Next</span>
            <button className="next-button" onClick={() => goToNextQuestion()}>
              <img className="arrow-img" src={next} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
