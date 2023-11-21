import { createSlice } from "@reduxjs/toolkit";

const questions = [
  {
    id: 1,
    questionText: "What is the capital of Switzerland?",
    options: ["Bern", "Geneva", "Basel"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText:
      "Which radioactive element, with atomic number 92, is usually fuel in a nuclear power plant?",
    options: ["Radium", "Uranium", "Lithium"],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    questionText: "What is the name of the king of Great Britain?",
    options: ["Charles", "Richard", "Edward"],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    questionText: "Which vitamin is produced in the body by sunlight?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D"],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    questionText: "How many 20 gram pieces are there in 1 kilo?",
    options: ["20", "50", "100"],
    correctAnswerIndex: 1,
  },
  {
    id: 6,
    questionText:
      "In which athletics discipline does Armand Duplantis compete?",
    options: ["Long jump", "Pole vault", "Triple jump"],
    correctAnswerIndex: 1,
  },
  {
    id: 7,
    questionText:
      "What is the name of the canal where a container ship ran aground in 2021??",
    options: ["The Bosphorus", "The Suez Canal", "The Kiel Canal"],
    correctAnswerIndex: 1,
  },
  {
    id: 8,
    questionText:
      "What is the name of the ocean current that affects the climate in northern Europe?",
    options: ["The Gulf Stream", "The Baltic Stream", "El Niño"],
    correctAnswerIndex: 0,
  },
  {
    id: 9,
    questionText:
      "What is a person called who does not believe there is a god?",
    options: ["Atheist", "Anarchist", "Alarmist"],
    correctAnswerIndex: 0,
  },
  {
    id: 10,
    questionText: "What is the center of a heliocentric worldview?",
    options: ["The Milky Way", "The planet Mars", "The sun"],
    correctAnswerIndex: 2,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});
