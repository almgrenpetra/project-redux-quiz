import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { quiz } from "../reducers/quiz";
import "./summary.css";

export const Summary = () => {
  const gradeTable = [
    {
      score: [10],
      grade: "A",
      header: "Congratulations, you passed!",
      text: "Wow! Someone paid attention in class. You defenitly smarter than the average bear.",
    },
    {
      score: [9],
      grade: "B",
      header: "Congratulations, you passed!",
      text: "Well done! You defenitly smarter than the average bear.",
    },
    {
      score: [7, 8],
      grade: "C",
      header: "You passed!",
      text: "Ok you may not be smarter than a fifth grader, but you be alright.",
    },
    {
      score: [5, 6],
      grade: "D",
      header: "You passed!",
      text: "Ok you may not be smarter than a fifth grader, but you be alright.",
    },
    {
      score: [3, 4],
      grade: "E",
      header: "You passed!",
      text: "So you might not be the brightest bulb in the chandelier and you might not be smarter than a 5th grader, but you be alright.",
    },
    {
      score: [0, 1, 2],
      grade: "F",
      header: "Sorry, you didn't pass!",
      text: "Too Cool for School?\nWell you're definitely not smarter than a 5th grader.",
    },
  ];

  const [result, setResult] = useState({
    grade: "",
    header: "",
    text: "",
  });

  const answers = useSelector((state) => state.quiz.answers);
  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  const nrOfCorrectAnswers = correctAnswers.length;
  const dispatch = useDispatch();

  const restartQuiz = () => {
    dispatch(quiz.actions.restart());
  };

  const findGrade = (number) => {
    const foundGrade = gradeTable.find((gradeItem) =>
      gradeItem.score.includes(number)
    );

    if (foundGrade) {
      const { grade, header, text } = foundGrade;
      setResult({ grade, header, text });
    } else {
      setResult({ grade: "", header: "", text: "" });
    }
  };

  useEffect(() => {
    findGrade(nrOfCorrectAnswers);
  }, []);

  return (
    <div className="summary">
      <p className="correct">
        Correct answers: {nrOfCorrectAnswers} of {answers.length}{" "}
      </p>
      <div className="grade-container">
        <button
          className="grade"
          disabled
          style={{
            background: `rgba(${
              result.grade === "F" ? "200, 141, 141" : "141, 200, 141"
            }, 0.5)`,
          }}
        >
          {result.grade}
        </button>
        <div className="text-container">
          <h3>{result.header}</h3>
          <p>{result.text}</p>
        </div>
      </div>
      <button className="restart-button" onClick={restartQuiz}>
        Try again
      </button>
    </div>
  );
};
