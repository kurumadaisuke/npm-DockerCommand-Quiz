import chalk from "chalk";
import Question from "./question.js";
import Quiz from "./quiz.js";
import { readFile } from "fs/promises";

const questionslist = JSON.parse(await readFile("./questions.json"));
const questions = [];
const questionIds = [];
const maxQuestions = 20;

const randomQuestion = (questionsNumber) => {
  while (questionIds.length < questionsNumber) {
    const randomNum = Math.floor(Math.random() * maxQuestions);
    if (questionIds.indexOf(randomNum) === -1) {
      questionIds.push(randomNum);
    }
  }
  return questionIds;
};

const choiceShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const idSearch = (ids) => {
  const arr = [];
  ids.forEach(function (id) {
    const Index = questions.findIndex((data) => data.id === id);
    arr.push(questions[Index]);
  });
  return arr;
};

const dockerQuiz = async (ids, questionsNumber) => {
  let correctAnswer = 0;
  let breakCount = 0;
  for await (const dockerQuestion of idSearch(ids)) {
    if (questionsNumber <= breakCount) break;
    await (async () => {
      const question = {
        type: "select",
        name: "question",
        message: dockerQuestion.problem,
        choices: choiceShuffle(dockerQuestion.choices),
      };
      const answer = await enquirer.prompt(question);
      if (answer.question === dockerQuestion.answer) {
        console.log("正解です！！");
        correctAnswer += 1;
      } else {
        console.log("残念！！不正解！！");
      }
      console.log("");
      console.log(chalk.red.bold("[SampleCode]"));
      console.log(chalk.white.bold.bgRed(dockerQuestion.sample_code));
      console.log("");
      console.log(chalk.bold("[解説]"));
      console.log(dockerQuestion.explanation);
      console.log("");
      breakCount += 1;
    })();
  }
  return correctAnswer;
};

const main = async function () {
  try {
    await questionslist.forEach((question) => {
      questions.push(new Question(question));
    });
    const quiz = await new Quiz();
    await quiz.getQuestionsNumber();
    // const questionsNumber = await numberOfQuestions();
    // const ids = await randomQuestion(questionsNumber);
    // const correct = await dockerQuiz(ids, questionsNumber);
    // console.log(`結果は${correct}/${questionsNumber}正解しました。`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

main();
