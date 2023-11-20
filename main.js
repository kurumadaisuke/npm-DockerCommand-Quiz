import enquirer from "enquirer";
import { readFile } from "fs/promises";

const dockerQuestions = JSON.parse(await readFile("./questions.json"));
const problemCountChoices = () => {
  return [
    { name: "5問", message: "5問出題", value: 5 },
    { name: "10問", message: "10問出題", value: 10 },
    { name: "15問", message: "15問出題", value: 15 },
    { name: "20問", message: "20問出題", value: 20 },
  ];
};

const dockerQuiz = async (dockerQuestions) => {
  for await (const dockerQuestion of dockerQuestions) {
    await (async () => {
      const question = {
        type: "select",
        name: "problem_count",
        message: dockerQuestion.problem,
        choices: dockerQuestion.choices,
      };
      const answer = await enquirer.prompt(question);
      console.log(dockerQuestion.answer);
    })();
  }
};

const numberOfProblems = async () => {
  const question = {
    type: "select",
    name: "problem_count",
    message: "Dockerコマンドクイズ!! 出題問題数を選択してください",
    choices: problemCountChoices,
    result() {
      return this.focused.value;
    },
  };
  const answer = await enquirer.prompt(question);
  return answer.problem_count;
};

const dockerQuizApp = async function () {
  try {
    const problem_count = await numberOfProblems();
    console.log(`${problem_count}問に挑戦!!`);
    await dockerQuiz(dockerQuestions);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

dockerQuizApp();
