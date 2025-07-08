const quiz = [
  {
    question: "What is Captain America's shield made of?",
    options: ["Adamantium", "Vibranium", "Titanium", "Carbon Fiber"],
    answer: "Vibranium",
  },
  {
    question: "Which Infinity Stone is located on Vision's forehead?",
    options: ["Reality", "Mind", "Power", "Soul"],
    answer: "Mind",
  },
  {
    question: "Who is Tony Stark's father?",
    options: ["Howard Stark", "John Stark", "Steve Stark", "Nick Stark"],
    answer: "Howard Stark",
  },
  {
    question: "What is the name of Thor's hammer?",
    options: ["Stormbreaker", "Gungnir", "Mjolnir", "Aesir"],
    answer: "Mjolnir",
  },
  {
    question: "Who is the leader of the Guardians of the Galaxy?",
    options: ["Rocket", "Gamora", "Star-Lord", "Drax"],
    answer: "Star-Lord",
  },
  {
    question: "Which Wakandan herb gives Black Panther his powers?",
    options: [
      "Soulroot",
      "Sacred Blossom",
      "Heart-Shaped Herb",
      "Panther’s Claw",
    ],
    answer: "Heart-Shaped Herb",
  },
  {
    question: "Who created Ultron in the Marvel Cinematic Universe?",
    options: ["Bruce Banner", "Tony Stark", "Thanos", "Both A and B"],
    answer: "Both A and B",
  },
  {
    question: "What is Spider-Man's real name?",
    options: ["Peter Parker", "Miles Morales", "Ben Reilly", "Eddie Brock"],
    answer: "Peter Parker",
  },
  {
    question: "Which character turns into the Hulk?",
    options: ["Bruce Wayne", "Steve Rogers", "Bruce Banner", "Tony Stark"],
    answer: "Bruce Banner",
  },
  {
    question: "What is the name of Iron Man’s A.I. assistant?",
    options: ["J.A.R.V.I.S.", "F.R.I.D.A.Y.", "K.A.R.E.N.", "E.D.I.T.H."],
    answer: "J.A.R.V.I.S.",
  },
];


let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function loadQuestion() {
  const current = quiz[currentIndex];
  document.getElementById("question").textContent = current.question;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  current.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-light";
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    answers.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
  document.getElementById("score").textContent = `Score: ${score}`;
  startTimer();
}

function checkAnswer(selected) {
  clearInterval(timer); // Stop timer once answered

  const correct = quiz[currentIndex].answer;
  const result = document.getElementById("result");

  const allButtons = document.querySelectorAll("#answers button");
  allButtons.forEach((btn) => (btn.disabled = true)); // Disable all buttons

  if (selected === correct) {
    score++;
    result.textContent = "✅ Correct!";
    result.className = "text-success fs-5 mt-3";
  } else {
    result.textContent = `❌ Wrong! The correct answer is "${correct}".`;
    result.className = "text-danger fs-5 mt-3";
  }

  document.getElementById("score").textContent = `Score: ${score}`;
}

function nextQuestion() {
  clearInterval(timer);
  currentIndex++;
  if (currentIndex < quiz.length) {
    timeLeft = 10;
    loadQuestion();
  } else {
    document.getElementById("quiz-container").innerHTML = `
      <h3 class='text-center text-success'>🎉 You've finished the quiz!</h3>
      <p class='text-center fs-4'>Your Score: <strong>${score}/${quiz.length}</strong></p>
      <div class="text-center mt-4">
        <button class="btn btn-warning" onclick="restartQuiz()">Play Again</button>
      </div>
    `;
  }
}

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer("timeout"); // Automatically "wrong" if not answered
    }
  }, 1000);
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  timeLeft = 10;
  document.getElementById("quiz-container").innerHTML = `
    <div id="question" class="mb-3 fs-4"></div>
    <div id="answers" class="d-grid gap-2"></div>
    <div id="result" class="mt-3 fs-5"></div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <span id="timer" class="text-warning"></span>
      <span id="score" class="text-info"></span>
    </div>
    <button class="btn btn-warning mt-4" onclick="nextQuestion()">Next</button>
  `;
  loadQuestion();
}


function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").classList.remove("d-none");

  const controls = `
    <div id="question" class="mb-3 fs-4"></div>
    <div id="answers" class="d-grid gap-2"></div>
    <div id="result" class="mt-3 fs-5"></div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <span id="timer" class="text-warning"></span>
      <span id="score" class="text-info"></span>
    </div>
    <button class="btn btn-warning mt-4" onclick="nextQuestion()">Next</button>
  `;
  document.getElementById("quiz-container").innerHTML = controls;

  currentIndex = 0;
  score = 0;
  timeLeft = 10;
  loadQuestion();
}



