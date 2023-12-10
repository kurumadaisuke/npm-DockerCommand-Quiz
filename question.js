class Question {
  constructor(question) {
    this.id = question.id;
    this.sentence = question.sentence;
    this.choices = question.choices;
    this.answer = question.answer;
    this.sample_code = question.sample_code;
    this.explanation = question.explanation;
  }

  isCorrect(answer) {
    return answer === this.answer;
  }
}

export default Question;
