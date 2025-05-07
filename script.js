// DOM Element references
const questionContainer = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Quiz question dataset
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2,
  },
  {
    question: "Which language is used for styling web pages?",
    answers: ["HTML", "JQuery", "CSS", "XML"],
    correct: 2,
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: ["Python Script", "Node.js", "React", "Vue"],
    correct: 0,
  },
  {
    question: "Which tag is used to create a hyperlink?",
    answers: ["<link>", "<a>", "<href>", "<src>"],
    correct: 1,
  },
];

// State variables
let currentQuestionIndex = 0;
let score = 0;

// Starts quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

// Loads and displays question
function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionContainer.textContent = current.question;

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(button);
  });
}

// Clears previous answers
function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

// Handles answer selection
function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  const buttons = answerButtons.children;

  for (let i = 0; i < buttons.length; i++) {
    if (i === correctIndex) {
      buttons[i].classList.add("correct");
    } else if (i === selectedIndex) {
      buttons[i].classList.add("wrong");
    }
    buttons[i].disabled = true;
  }

  if (selectedIndex === correctIndex) {
    score++;
  }

  nextButton.style.display = "block";
}

// Handles next question or shows final score
function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Displays final score
function showScore() {
  resetState();
  questionContainer.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart Quiz";
  nextButton.style.display = "block";
}

// Event Listener
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNext();
  } else {
    startQuiz();
  }
});

// Initialize
startQuiz();
