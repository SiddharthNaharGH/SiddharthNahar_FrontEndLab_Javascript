/**
 * Question class
 * data members
 * - text
 * - choices (array of string)
 * - answer
 */

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (answer) {
    return this.answer === answer;
}

/**
 * Quiz class
 * data members
 * - questions (input in constructor - array of question)
 * - score (initially 0)
 * - questionIndex (initially 0)
 */

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.done = function () {
    return this.questionIndex >= this.questions.length;
}

function loadQuestion() {
    if (quiz.done()) {
        showScore();
        return;
    }

    const currentQuestion = quiz.getCurrentQuestion();
    const questionEl = document.getElementById("question");
    questionEl.textContent = currentQuestion.text;

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const currentChoice = currentQuestion.choices[i];
        document.getElementById(`choice${i}`).textContent = currentChoice;
        handleSelect(`btn${i}`, currentChoice);
    }

    showProgress();
}

function handleSelect(id, choice) {
    document.getElementById(id).onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestion();
    };
}

function showProgress() {
    document.getElementById("progress").textContent = `Question ${quiz.questionIndex + 1} of ${quiz.questions.length}`;
}

function showScore() {
    document.getElementById("quiz").innerHTML = `
        <h1>Result</h1>
		<h2 id="score">You have answered ${(quiz.score/questions.length)*100}% correctly.</h2>
        <h2 id="score">You final score is ${quiz.score}</h2>
    `;
}

const questions = [
    new Question("Which country does not share border with India ?", ["Pakistan", "China", "Sri Lanka", "Brazil"], "Brazil"),
    new Question("Which language is referred to as mother tongue of India?", ["English", "Hindi", "Dutch", "Spanish"], "Hindi"),
    new Question("What country Barcelona is located in ?", ["USA", "Brazil", "Greece", "Spain"], "Spain"),
    new Question("Which is not a Marvel Comics character?", ["Superman", "Batman", "Both options are correct", "None of the above"], "Both options are correct"),
    new Question("What sport is Stephen Curry associated with ? ", ["Golf", "Boxing", "Basketball", "Football"], "Basketball")
];

const quiz = new Quiz(questions);

loadQuestion();