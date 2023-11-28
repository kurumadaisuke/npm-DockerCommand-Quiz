import chalk from "chalk";
import Question from "./question.js";
import enquirer from "enquirer";
import { readFile } from "fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionslist = JSON.parse(
  await readFile(`${__dirname}//questions.json`)
);
const questions = [];

class QuizApp {
  constructor() {
    (async () => {
      questionslist.forEach((question) => {
        questions.push(new Question(question));
      });
      this.maxQuestions = 20;
      this.numberOfQuestion = this.setNumberOfQuestion();
      this.questionIds = await this.setRandomQuestionIds();
    })();
  }

  setNumberOfQuestion = async () => {
    const question = {
      type: "select",
      name: "numberOfQuestion",
      message: "Dockerコマンドクイズ!! 出題問題数を選択してください",
      choices: this.questionNumberChoices(),
      result() {
        return this.focused.value;
      },
    };
    const answer = await enquirer.prompt(question);
    return answer.numberOfQuestion;
  };

  questionNumberChoices = async () => {
    return [
      { name: "5問", message: "5問出題", value: 5 },
      { name: "10問", message: "10問出題", value: 10 },
      { name: "15問", message: "15問出題", value: 15 },
      { name: "20問", message: "20問出題", value: 20 },
    ];
  };

  getQuestionsNumber = async () => {
    const numberOfQuestion = await this.numberOfQuestion;
    console.log(`${numberOfQuestion}問に挑戦!!`);
  };

  setRandomQuestionIds = async () => {
    const questionIds = [];
    const numberOfQuestion = await this.numberOfQuestion;
    while (questionIds.length < numberOfQuestion) {
      const randomNum = Math.floor(Math.random() * this.maxQuestions);
      if (questionIds.indexOf(randomNum) === -1) {
        questionIds.push(randomNum);
      }
    }
    return questionIds;
  };

  dockerQuizStart = async (ids, numberOfQuestion) => {
    let correctAnswer = 0;
    let breakCount = 0;
    for await (const dockerQuestion of this.idSearch(ids)) {
      if (numberOfQuestion <= breakCount) break;
      await (async () => {
        const question = {
          type: "select",
          name: "question",
          message: dockerQuestion.problem,
          choices: this.choiceShuffle(dockerQuestion.choices),
        };
        const answer = await enquirer.prompt(question);
        if (answer.question === dockerQuestion.answer) {
          console.log("正解です！！");
          correctAnswer += 1;
        } else {
          console.log("残念！！不正解！！");
        }
        console.log(""); //出力の見た目のために入れています
        console.log(chalk.red.bold("[SampleCode]"));
        console.log(chalk.white.bold.bgRed(dockerQuestion.sample_code));
        console.log(""); //出力の見た目のために入れています
        console.log(chalk.bold("[解説]"));
        console.log(dockerQuestion.explanation);
        console.log(""); //出力の見た目のために入れています
        breakCount += 1;
      })();
    }
    return correctAnswer;
  };

  idSearch = (ids) => {
    const tmpArray = [];
    ids.forEach(function (id) {
      const Index = questions.findIndex((data) => data.id === id);
      tmpArray.push(questions[Index]);
    });
    return tmpArray;
  };

  choiceShuffle = (choices) => {
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
  };

  score = async (score) => {
    const numberOfQuestion = await this.numberOfQuestion;
    console.log(`結果は${score}/${numberOfQuestion}正解しました。`);
  };
}

export default QuizApp;
