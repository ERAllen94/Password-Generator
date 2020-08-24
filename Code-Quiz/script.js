
const startingMinutes = 10;
let time = startingMinutes * 60;
let timeout;
let initialInput;
const highscore = {
    initials: '',
    quizScore: 0
};
let quizScore = 0;

const initialQuestions = [
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
        correctAnswer: 'B',
        
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
        question: 'This is a new question',
        answerA: 'A',
        answerB: 'B',
        answerC: 'C',
        correctAnswer: 'A',
    },
    { question: 'This is a new question',
        answerA: 'A',
        answerB: 'B',
        answerC: 'C',
        correctAnswer: 'C',
    }
]

const remainingQuestions = initialQuestions;
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

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = `0${seconds}`
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
}

var startButton = document.getElementById("startButton");

function handleStart() {
    setInterval(updateCountdown, 1000);
    startButton.classList.add("hide")
    quizContainerEl.classList.remove('hide')
    nextQuestion()
}

function finalPage() {
    highScoreEl.innerHTML = `The current high score, held by ${highscore.initials}, is ${highscore.quizScore}`
    enterInitialsEl.classList.add('hide')
    highScoreEl.classList.remove('hide');
}

function handleSubmit() {
    console.log('hi', highScoreEl)
    initialInput = document.getElementById('initials').value
    if (quizScore < highscore.quizScore ) {
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
    quizContainerEl.classList.add('hide')
    enterInitialsEl.classList.remove('hide');
}


function selectAnswer(event) {
    const rightAnswer = getAnswers(currentQuestion.correctAnswer);
    const wrongAnswer = getAnswers(event.target.value);
    console.log('answers', rightAnswer, wrongAnswer);  
        rightAnswer.classList.add('correctAnswer'); 
    if (event.target.value !== currentQuestion.correctAnswer) {
        quizScore +=1
        console.log('hehe. loser. The answer was', currentQuestion.correctAnswer);
        wrongAnswer.classList.add('incorrectAnswer')
    }
    timeout = window.setTimeout(() => clearStatusClass(rightAnswer, wrongAnswer), 500);

}

function clearStatusClass(rightAnswer, wrongAnswer){
    rightAnswer.classList.remove('correctAnswer');
    wrongAnswer.classList.remove('incorrectAnswer');
    if(remainingQuestions.length === 0) {
        console.log('this should go to the end screen');
        quizWrapup();
        return;
    }
    nextQuestion()
}


function nextQuestion() {    const randomQuestions = Math.floor(Math.random() * initialQuestions.length)
    currentQuestion = remainingQuestions[randomQuestions]
    questionContainerEl.innerHTML = currentQuestion.question;
    questionAEl.innerHTML = currentQuestion.answerA;
    questionBEl.innerHTML = currentQuestion.answerB;
    questionCEl.innerHTML = currentQuestion.answerC;
    remainingQuestions.splice(randomQuestions, 1)
}

startButton.addEventListener("click", handleStart);
submitButtonEl.addEventListener("click", handleSubmit);

questionAEl.addEventListener("click", selectAnswer);
questionBEl.addEventListener("click", selectAnswer);
questionCEl.addEventListener("click", selectAnswer);

