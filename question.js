class Question {
  constructor(question) {
    this.id = question.id;
    this.problem = question.problem;
    this.choices = question.choices;
    this.answer = question.answer;
    this.sample_code = question.sample_code;
    this.explanation = question.explanation;
  }
}

export default Question;
