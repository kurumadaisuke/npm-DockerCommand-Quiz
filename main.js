import enquirer from "enquirer";
import { readFile } from "fs/promises";

const questions = JSON.parse(await readFile("./questions.json"));
const problemCountChoices = () => {
  return [
    { name: "5問", message: "5問出題", value: 5 },
    { name: "10問", message: "10問出題", value: 10 },
    { name: "15問", message: "15問出題", value: 15 },
    { name: "20問", message: "20問出題", value: 20 },
  ];
};

const quiz = () => {
  for (const question of questions) {
    console.log(`問題：${question.problem}`);
    console.log(`選択肢：${question.choices}`);
    console.log(`答え：${question.answer}`);
    console.log(`解説：${question.explanation}`);
    console.log("");
  }
};

(async () => {
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
  console.log(`${answer.problem_count}問に挑戦`);

  await quiz();
})();
