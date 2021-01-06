const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultForm = document.getElementById('form-result');

let countRightAnswers = 0;
let shuffledQuestions, currentQuestionIndex;
let currentQuestion = 1;

var timer = document.querySelector('#timer');
var seconds = 101;
setInterval(function(){
    if(seconds > 0){
        seconds--;
        timer.innerHTML = 'Time Left: ' + seconds;
    } else {
        resultForm.classList.remove('hide');
        questionContainerElement.classList.add('hide');

        startButton.innerText = 'Repeat'; 
        startButton.classList.remove('hide'); 
    }
}, 1000)

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
  document.getElementById('answer-buttons').classList.remove('no-click'); 

  currentQuestionIndex++; 
  setNextQuestion();

  currentQuestion++; 
  document.getElementById('current-question').innerHTML = currentQuestion;
})


function startGame() {
  seconds = 101;
  console.log('started');

  document.getElementById('answer-buttons').classList.remove('no-click'); 

  startButton.classList.add('hide');
  resultForm.classList.add('hide');

  shuffledQuestions = questions.sort (() => Math.random() - 0.5) 
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();

  currentQuestion = 1;
  document.getElementById('current-question').innerHTML = currentQuestion;

  
  countRightAnswers = 0;

  document.getElementById('all-questions2').innerHTML = questions.length;
  document.getElementById('all-questions').innerHTML = questions.length; 
}


function setNextQuestion() {
  resetState(); 
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question; 
  question.answers.forEach(answer => {
    const button = document.createElement('button'); 
    button.innerText = answer.text;  
    button.classList.add('btn'); 
    if (answer.correct){ 
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button); 
  });
}


function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {

    resultForm.classList.remove('hide');
    questionContainerElement.classList.add('hide');

    startButton.innerText = 'Repeat'; 
    startButton.classList.remove('hide'); 
  }


  
  if (selectedButton.dataset = correct) {
    countRightAnswers++; 
  }

  
  document.getElementById('right-answers').innerHTML = countRightAnswers; 
  document.getElementById('answers-percent').innerHTML = ((100 * countRightAnswers)/questions.length).toFixed(0);
  document.getElementById('answer-buttons').classList.add('no-click'); 
}


function setStatusClass(element, correct) { 
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong')
  }
}


function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}


const questions = [
    {
      question: 'Inside which HTML element do we put the JavaScript?',
      answers: [
        { text: '<script>', correct: true },
        { text: '<javascript>', correct: false },
        { text: 'scripting', correct: false },
        { text: '<js>', correct: false },
      ]
    },
  
      {
      question: 'Where is the correct place to insert a JavaScript?',
      answers: [
        { text: 'The <body> section', correct: false },
        { text: 'The <head> section', correct: false },
        { text: 'Both the <head> section and the body section are correct', correct: true },
      ]
    },
    {
      question: 'The external JavaScript file must contain the <script> tag.',
      answers: [
        { text: 'False', correct: true },
        { text: 'True', correct: false },
      ]
    },
    {
      question: 'How do you write Hello World in an alert box?',
      answers: [
        { text: 'msgBox(Hello World);', correct: false },
        { text: 'alertBox(Hello World);', correct: false },
        { text: 'msg(Hello World);', correct: false },
        { text: 'alert(Hello World);', correct: true },
      ]
    },
    {
      question: 'How do you create a function in JavaScript?',
      answers: [
        { text: 'function myFunction()', correct: true },
        { text: 'function:myFunction()', correct: false },
        { text: 'function=myFunction()', correct: false },
        { text: 'function(function(f))', correct: false },
      ]
    },
    {
      question: 'How to write an IF statement in JavaScript?',
      answers: [
        { text: 'if i==5 then', correct: false },
        { text: 'if i=5 then', correct: false },
        { text: 'if(i==5)', correct: true },
        { text: 'if i=5', correct: false },
      ]
    },
    {
      question: 'How does a WHILE loop start?',
      answers: [
        { text: 'a while loop does not exist', correct: false },
        { text: 'while i=1 to 10', correct: false },
        { text: 'while(i<=10;i++)', correct: false },
        { text: 'while(i<=10)', correct: true },
      ]
    },
    {
      question: 'How can you add a comment in a JavaScript?',
      answers: [
        { text: 'This is a comment', correct: false },
        { text: '//This is a comment', correct: true },
        { text: '<!--This is a comment-->', correct: false },
      ]
    },
    {
      question: 'How to insert a comment that has more than one line?',
      answers: [
        { text: '/*This comment has more than one line*/', correct: true },
        { text: '//This comment has more than one line//', correct: false },
        { text: '<!--This coomment has more than one line-->', correct: false },
      ]
    },
    {
      question: 'JavaScript is the same as Java',
      answers: [
        { text: 'False', correct: true },
        { text: 'True', correct: false },
      ]
    },
  ]


var saveScoreButton = document.querySelector('#save-score') 
var userInitials = document.getElementById('initials')
var rightAnswersCount = document.querySelector('#right-answers');
var oldScores = document.querySelector('.score-p')
var highscores = document.querySelector('.highscores-show')

saveScoreButton.addEventListener("click", function(){
    if(localStorage.length < 5){
        localStorage.setItem(`initials${localStorage.length}`, userInitials.value);
        localStorage.setItem(`score${localStorage.length}`, rightAnswersCount.innerHTML);
    }
})


for(let i = 0; i < localStorage.length; i++){
    if(i%2 == 0){
        var userName = localStorage.getItem(`initials${[i]}`);
        var currentScore = localStorage.getItem(`score${[i + 1]}`);
        var newP = document.createElement('p');
        newP.innerHTML = userName + ' ' + currentScore;
        highscores.appendChild(newP);
    }

}


function showHighscores(){
    if(highscores.style.display == 'none'){
        highscores.style.display = 'block'
    } else{
        highscores.style.display = 'none'
    }

}