import { useDispatch, useSelector } from "react-redux";

import { quiz } from "../reducers/quiz";
import "./header.css";

export const Header = () => {
  const nrOfQuestions = useSelector((state) => state.quiz.questions.length);
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const answers = useSelector((state) => state.quiz.answers);
  const dispatch = useDispatch();

  const restartQuiz = () => {
    dispatch(quiz.actions.restart());
  };

  const correctAnswers = answers.filter((answer) => answer.isCorrect);

  const progress = ((answers.length / nrOfQuestions) * 100).toFixed();

  return (
    <div className="header">
      <div className="top-container">
        <p className="question-id">
          Question: {question.id}/{nrOfQuestions}
        </p>
        <p className="score">Correct answers: {correctAnswers.length} </p>
        <p className="restart" onClick={restartQuiz}>
          Restart Quiz
        </p>
      </div>

      <div className="progress-bar">
        <span
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></span>
      </div>
    </div>
  );
};
