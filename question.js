class Question {
  constructor(question) {
    this.id = question.id;
    this.sentence = question.sentence;
    this.choices = question.choices;
    this.answer = question.answer;
    this.sample_code = question.sample_code;
    this.explanation = question.explanation;
  }

  isCorrect(answer, dockerQuestion) {
    if (answer === dockerQuestion.answer) {
      console.log("正解です！！");
      return 1;
    } else {
      console.log("残念！！不正解！！");
    }
    return 0;
  }
}

export default Question;
