//creates questions 
const questions = [
    {
        questionText: "What does CSS stand for?",
        options: ["1.Continous Spread Sheet", "2. Creative Style Sheet", "3. Cascading Style Sheet", "4. Collaborative Style Sheet"],
        answer: "3. Cascading Style Sheet",
    },

    {

        questionText: "When was the first website made?",
        options: ["1.April 1st 2000", "2. March 9th 1997", "3. January 16th 1979", "4. April 30th 1993"],
        answer: "4. April 30th 1993",

    },

    {

        questionText: "What does HTML stand for?",
        options: ["1.Hyper Text Marketing Language", "2. Hole Textfile Makeup Log", "3. Herd Text Makup Log", "4. Helping Text Marketing Link"],
        answer: "1. Hyper Text Marketing Language",

    },

    {
        questionText: "What do APIs do?",
        options: ["1. Outlines the specifics of software applications, telling components how they should act on an interface.", "2. Automatically creates Websites", "3. Applies interfaces", "4. Mirrors interfaces on other computers"],
        answer: "1. Outlines the specifics of software applications, telling components how they should act on an interface.",

    },

    {

        questionText: "What is a <div> tag??",
        options: ["1. Divides elements in a page to the bottom.", "2. Used as a container for HTML elements", "3. Directly Injecting Variables", "4. Mirrors interfaces on other computers"],
        answer: "1. Outlines the specifics of software applications, telling components how they should act on an interface.",

    },


    {

        questionText: "#ffff gives you what colour?",
        options: ["1. White.", "2. Brown", "3. Black", "4. Fuscia"],
        answer: "1. White",        

    },

    {
        
        questionText: "Flexbox is an example of what?",
        options: ["1. CSS 3 web layout model.", "2. A CSS element that boxes any element", "3. A playable video that varies in size", "4. A customizable generator that creates elements based on size"],
        answer: "1. CSS 3 web layout model.",    
        
    },
];

//assigns to variables
const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card");

//hides the cards in the background
function hideCards() {
  startCard.setAttribute("hidden", true);
  questionCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
  leaderboardCard.setAttribute("hidden", true);
}

const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");

//hides results
function hideResultText() {
  resultDiv.style.display = "none";
}

//var functions
var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-button").addEventListener("click", startQuiz);

//starts quiz 
function startQuiz() {
  hideCards();
  questionCard.removeAttribute("hidden");

  //displays questions
  currentQuestion = 0;
  displayQuestion();

  //sets time based on questions 
  time = questions.length * 10;


  intervalID = setInterval(countdown, 1000);

  
  displayTime();
}


function countdown() {
  time--;
  displayTime();
  if (time < 1) {
    endQuiz();
  }
}

const timeDisplay = document.querySelector("#time");
function displayTime() {
  timeDisplay.textContent = time;
}

function displayQuestion() {
  let question = questions[currentQuestion];
  let options = question.options;

  let h2QuestionElement = document.querySelector("#question-text");
  h2QuestionElement.textContent = question.questionText;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let optionButton = document.querySelector("#option" + i);
    optionButton.textContent = option;
  }
}


document.querySelector("#quiz-options").addEventListener("click", checkAnswer);


function optionIsCorrect(optionButton) {
  return optionButton.textContent === questions[currentQuestion].answer;
}


function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  resultDiv.style.display = "block";
  if (optionIsCorrect(optionButton)) {
    resultText.textContent = "Correct!";
    setTimeout(hideResultText, 1000);
  } else {
    resultText.textContent = "Incorrect!";
    setTimeout(hideResultText, 1000);
    if (time >= 10) {
      time = time - 10;
      displayTime();
    } else {
      
      time = 0;
      displayTime();
      endQuiz();
    }
  }


  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}


const score = document.querySelector("#score");


function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");
  score.textContent = time;
}

const submitButton = document.querySelector("#submit-button");
const inputElement = document.querySelector("#initials");


submitButton.addEventListener("click", storeScore);

function storeScore(event) {
 
  event.preventDefault();


  if (!inputElement.value) {
    alert("Please enter your name!");
    return;
  }


  let leaderboardItem = {
    initials: inputElement.value,
    score: time,
  };

  updateStoredLeaderboard(leaderboardItem);


  hideCards();
  leaderboardCard.removeAttribute("hidden");

  renderLeaderboard();
}


function updateStoredLeaderboard(leaderboardItem) {
  let leaderboardArray = getLeaderboard();

 
  leaderboardArray.push(leaderboardItem);
  localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}


function getLeaderboard() {
  let storedLeaderboard = localStorage.getItem("leaderboardArray");
  if (storedLeaderboard !== null) {
    let leaderboardArray = JSON.parse(storedLeaderboard);
    return leaderboardArray;
  } else {
    leaderboardArray = [];
  }
  return leaderboardArray;
}


function renderLeaderboard() {
  let sortedLeaderboardArray = sortLeaderboard();
  const highscoreList = document.querySelector("#highscore-list");
  highscoreList.innerHTML = "";
  for (let i = 0; i < sortedLeaderboardArray.length; i++) {
    let leaderboardEntry = sortedLeaderboardArray[i];
    let newListItem = document.createElement("li");
    newListItem.textContent =
      leaderboardEntry.initials + " - " + leaderboardEntry.score;
    highscoreList.append(newListItem);
  }
}

function sortLeaderboard() {
  let leaderboardArray = getLeaderboard();
  if (!leaderboardArray) {
    return;
  }

  leaderboardArray.sort(function (a, b) {
    return b.score - a.score;
  });
  return leaderboardArray;
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);


function clearHighscores() {
  localStorage.clear();
  renderLeaderboard();
}

const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);


function returnToStart() {
  hideCards();
  startCard.removeAttribute("hidden");
}


const leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard() {
  hideCards();
  leaderboardCard.removeAttribute("hidden");

  clearInterval(intervalID);


  time = undefined;
  displayTime();

  renderLeaderboard();
}