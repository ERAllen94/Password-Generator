
let time = 90;
let timeout;
let initialInput;
const highscore = {
    initials: '',
    quizScore: 0
};
let quizScore = 0;
let timerInterval;

let initialQuestions = [
    {
        question: 'What does HTML stand for?',
        answerA: 'Hyper Text Markup Language',
        answerB: 'Hyper Tool Markup Language',
        answerC: 'Hyper Text Madeup Language',
        correctAnswer: 'A',
        
    },
    {
        question: 'Which of these is not a empty tag?',
        answerA: 'the break tag',
        answerB: 'the image tag',
        answerC: 'the paragraph tag',
        correctAnswer: 'C',
        
    },
    {
        question: 'What is the smallest header element?',
        answerA: 'Is it h2,',
        answerB: 'Is it h5',
        answerC: 'Or none of the above',
        correctAnswer: 'C',
    },
    {
        question: 'How many heading elements are there in HTML?',
        answerA: '7',
        answerB: '6',
        answerC: '4',
        correctAnswer: 'B',
    },
    {
        question: 'Which CSS attribute changes the backgroudn color of a html element?',
        answerA: 'Background-color',
        answerB: 'Add color',
        answerC: 'Backgroundcolor',
        correctAnswer: 'A',
    },
    { question: 'What does CSS stand for?',
        answerA: 'Caught Style Sheet',
        answerB: 'Creative Style Sheet',
        answerC: 'Cascading Style Sheet',
        correctAnswer: 'C',
    }
]

// let initialQuestions = initialQuestionsns
let askedQuestions = [];
let currentQuestion;

const countdownEl = document.getElementById("countdown");
const questionContainerEl = document.getElementById("initial-question");
const quizContainerEl = document.getElementById('quiz-container');
const questionAEl = document.getElementById('questionA');
const questionBEl = document.getElementById('questionB');
const questionCEl = document.getElementById('questionC');
const enterInitialsEl = document.getElementById('enter-initials');
const submitButtonEl = document.getElementById('submit-initials');
const highScoreEl = document.getElementById('high-scores');
const hsEl = document.getElementById('high-score');
const resetEl = document.getElementById("reset");
const startPageEl = document.getElementById('start-page');

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = `0${seconds}`
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time === 0) {
        alert("You've run out of time");
        quizWrapup();
        return;
    }
    time--;
}

var startButton = document.getElementById("startButton");

function handleStart() {
    timerInterval = setInterval(updateCountdown, 1000);
    startPageEl.classList.add("hide")
    quizContainerEl.classList.remove('hide')
    nextQuestion()
}

function finalPage() {
    hsEl.innerHTML = `The current high score, held by ${highscore.initials}, is ${highscore.quizScore}`
    enterInitialsEl.classList.add('hide')
    highScoreEl.classList.remove('hide'); 
}

function handleSubmit() {
    initialInput = document.getElementById('initials').value
    console.log('hi', highscore, initialInput, quizScore);
    if (quizScore > highscore.quizScore ) {
        highscore.initials = initialInput;
        highscore.quizScore = quizScore;
    }
    finalPage();
}

function getAnswers(val) {
    switch (val) {
        case 'A': return questionAEl;
        case 'B': return questionBEl;
        case 'C': return questionCEl;
    }
}

function quizWrapup() {
    clearInterval(timerInterval);
    countdownEl.innerHTML = '0:00';
    quizContainerEl.classList.add('hide');
    enterInitialsEl.classList.remove('hide');
}


function selectAnswer(event) {
    const rightAnswer = getAnswers(currentQuestion.correctAnswer);
    const wrongAnswer = getAnswers(event.target.value);
    rightAnswer.classList.add('correctAnswer'); 
    if (event.target.value !== currentQuestion.correctAnswer) {
        quizScore +=1
    }
    if (event.target.value !== currentQuestion.correctAnswer) {
        time -= 10;
        wrongAnswer.classList.add('incorrectAnswer')
        if (time === 0) {
            alert("You've run out of time");
            quizWrapup();
            return;
        }
    }
    timeout = window.setTimeout(() => clearStatusClass(rightAnswer, wrongAnswer), 500);

}

function clearStatusClass(rightAnswer, wrongAnswer){
    rightAnswer.classList.remove('correctAnswer');
    wrongAnswer.classList.remove('incorrectAnswer');
    if(initialQuestions.length === 0) {
        quizWrapup();
        return;
    }
    nextQuestion()
}

function resetQuiz() {
    time = 90;
    countdownEl.innerHTML = "1:30";
    quizScore = 0;
    initialQuestions = askedQuestions;
    askedQuestions = [];
    highScoreEl.classList.add('hide'); 
    startPageEl.classList.remove('hide');
}


function nextQuestion() {    
    const randomQuestions = Math.floor(Math.random() * initialQuestions.length)
    currentQuestion = initialQuestions[randomQuestions];4
    console.log('qu', questionContainerEl);
    questionContainerEl.innerHTML = currentQuestion.question;
    questionAEl.innerHTML = currentQuestion.answerA;
    questionBEl.innerHTML = currentQuestion.answerB;
    questionCEl.innerHTML = currentQuestion.answerC;
    const ques = initialQuestions.splice(randomQuestions, 1);
    askedQuestions.push(ques[0]);
    console.log('asked', askedQuestions);
}

startButton.addEventListener("click", handleStart);
submitButtonEl.addEventListener("click", handleSubmit);

questionAEl.addEventListener("click", selectAnswer);
questionBEl.addEventListener("click", selectAnswer);
questionCEl.addEventListener("click", selectAnswer);
resetEl.addEventListener("click",resetQuiz);
