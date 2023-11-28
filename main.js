#!/usr/bin/env node

import QuizApp from "./quiz_app.js";

const main = async function () {
  try {
    const quiz = await new QuizApp();
    const numberOfQuestion = await quiz.getQuestionsNumber();
    const score = await quiz.dockerQuizStart(
      quiz.questionIds,
      numberOfQuestion,
    );
    await quiz.score(score);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

main();
