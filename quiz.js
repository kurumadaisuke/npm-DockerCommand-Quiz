import enquirer from "enquirer";

class Quiz {
  constructor() {
    this.questionsNumber = this.questionsNumberFunction();
  }

  questionNumberChoices = async () => {
    return [
      { name: "5問", message: "5問出題", value: 5 },
      { name: "10問", message: "10問出題", value: 10 },
      { name: "15問", message: "15問出題", value: 15 },
      { name: "20問", message: "20問出題", value: 20 },
    ];
  };

  questionsNumberFunction = async () => {
    const question = {
      type: "select",
      name: "questionNumber",
      message: "Dockerコマンドクイズ!! 出題問題数を選択してください",
      choices: this.questionNumberChoices(),
      result() {
        return this.focused.value;
      },
    };
    const answer = await enquirer.prompt(question);
    return answer.questionNumber;
  };

  getQuestionsNumber = async () => {
    const questionsNumber = await this.questionsNumber;
    console.log(`${questionsNumber}問に挑戦!!`);
  };
}

export default Quiz;
