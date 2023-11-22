import chalk from "chalk";
import enquirer from "enquirer";
import { readFile } from "fs/promises";

const dockerQuestions = JSON.parse(await readFile("./questions.json"));
const questionIds = [];
const maxQuestions = 20;

const questionNumberChoices = () => {
  return [
    { name: "5問", message: "5問出題", value: 5 },
    { name: "10問", message: "10問出題", value: 10 },
    { name: "15問", message: "15問出題", value: 15 },
    { name: "20問", message: "20問出題", value: 20 },
  ];
};

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
    const Index = dockerQuestions.findIndex((data) => data.id === id);
    arr.push(dockerQuestions[Index]);
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

const numberOfQuestions = async () => {
  const question = {
    type: "select",
    name: "questionNumber",
    message: "Dockerコマンドクイズ!! 出題問題数を選択してください",
    choices: questionNumberChoices,
    result() {
      return this.focused.value;
    },
  };
  const answer = await enquirer.prompt(question);
  return answer.questionNumber;
};

const dockerQuizApp = async function () {
  try {
    const questionsNumber = await numberOfQuestions();
    await console.log(`${questionsNumber}問に挑戦!!`);
    const ids = await randomQuestion(questionsNumber);
    const correct = await dockerQuiz(ids, questionsNumber);
    console.log(`結果は${correct}/${questionsNumber}正解しました。`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

dockerQuizApp();
