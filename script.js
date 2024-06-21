const questions = [
    {
        question: "What is the closest planet to the Sun?",
        answers: [
          "Mercury",
          "Venus",
          "Earth",
          "Mars"
        ],
        correct: 1
    },
    {
        question: "Which planet is known for its giant gas storms and Great Red Spot?",
        answers: [
          "Jupiter",
          "Saturn",
          "Uranus",
          "Neptune"
        ],
        correct: 1
    },
    {
        question: "How many planets are there in our solar system (excluding dwarf planets)?",
        answers: [
          "4",
          "8",
          "10",
          "12"
        ],
        correct: 2
    },
    {
        question: "Which planet is nicknamed the 'Red Planet' due to its iron-rich surface?",
        answers: [
          "Mercury",
          "Venus",
          "Mars",
          "Jupiter"
        ],
        correct: 3
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
          "Jupiter",
          "Saturn",
          "Uranus",
          "Neptune"
        ],
        correct: 1
      },
      {
        question: "Which planet is famous for its beautiful rings made of ice and rock particles?",
        answers: [
          "Jupiter",
          "Saturn",
          "Uranus",
          "Neptune"
        ],
        correct: 2
      },
      {
        question: "What is the hottest planet in our solar system, even hotter than Mercury?",
        answers: [
          "Venus",
          "Earth",
          "Mars",
          "Jupiter"
        ],
        correct: 1
      },
      {
        question: "Which dwarf planet is known for its icy surface and potential subsurface ocean?",
        answers: [
          "Pluto",
          "Eris",
          "Ceres",
          "Haumea"
        ],
        correct: 1
      },
      {
        question: "What is the name of the giant ball of hot gas at the center of our solar system?",
        answers: [
          "Sun",
          "Star",
          "Galaxy",
          "Black Hole"
        ],
        correct: 1
      },
      {
        question: "A year on Earth is roughly 365 days. How many Earth years does it take for Neptune to orbit the Sun?",
        answers: [
          "1",
          "10",
          "100",
          "165"
        ],
        correct: 3
      }
  ];
  
  const headerContainer = document.querySelector("#header");
  const listContainer = document.querySelector("#list");
  const submitBtn = document.querySelector("#submit");
  
  let score = 0,
      questionIndex = 0;
  
  clearPage();
  showQuestion();
  submitBtn.onclick = checkAnswer;
  
  function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
  }
  
  function showQuestion() {
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace("%title%", questions[questionIndex]["question"]);
    headerContainer.innerHTML = title;
  
    let answerNumber = 1;
    for ( let answerText of questions[questionIndex]["answers"]) {
      const questionTemplate = 
      `<li>
          <label>
              <input type="radio" value = "%number%" class="answer" name ="answer" />
              <span>%answer%</span>
          </label>
      </li>`;
  
      const answerHTML = questionTemplate
                                  .replace("%answer%", answerText)
                                  .replace("%number%", answerNumber);
  
      listContainer.innerHTML += answerHTML;
      answerNumber++;
    }
  }
  
  function checkAnswer() {
    const checkedRadio = listContainer.querySelector(
      'input[type= "radio"]:checked'
    );
    if (!checkedRadio) {
      submitBtn.blur();
      return;
    }
  
    const userAnswer = parseInt(checkedRadio.value);
  
    if (userAnswer === questions[questionIndex]['correct']) {
      score++;
    }
  
    if (questionIndex !== questions.length - 1) {
      questionIndex++;
      clearPage();
      showQuestion();
    } else {
      clearPage();
      showResults();
    }
  }
  
  function showResults() {
    const resultsTemplate = `
      <h2 class="title">%title%</h2>
      <h3 class="summary">%message%</h3>
      <p class="result">%result%</p>`;
  
    let title, message;
  
    if (score === questions.length) {
      title = "Congratulations!";
      message = "You answered all the questions correctly!";
    } else if ((score * 100) / questions.length >= 50) {
      title = "Not a bad result";
      message = "You gave more than half of the correct answers";
    } else {
      title = "It's worth trying";
      message = "try again!!";
    }
  
    let result = `${score} from ${questions.length}`;
  
    const finalMessage = resultsTemplate
      .replace("%title%", title)
      .replace("%message%", message)
      .replace("%result%", result);
  
    headerContainer.innerHTML = finalMessage;
  
    submitBtn.blur();
    submitBtn.innerText = "Start again";
    submitBtn.onclick = function () {
      history.go();
    };
  }