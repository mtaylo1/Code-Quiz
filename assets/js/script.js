const quizData = [
    {
        question: "What does CSS stand for?",
        a: "Continous Spread Sheet",
        b: "Creative Style Sheet",
        c: "Cascading Style Sheet",
        d: "Collaborative Style Sheet",
        correct: "c",
    }

    {
        question: "When was the first website made?",
        a: "April 1st 2000",
        b: "March 9th 1997",
        c: "January 16th 1979",
        d: "April 30th 1993",
        correct: "d"
    }

    {
        question: "What does HTML stand for?",
        a: "Hyper Text Marketing Language",
        b: "Hole Textfile Makeup Log",
        c: "Herd Text Makup Log",
        d: "Helping Text Marketing Link",
        correct: "a",
    }

    {
        question: "What doe APIs do",
        a: "Outlines the specifics of software applications, telling components how they should act on an interface.",
        b: "Automatically creates Websites",
        c: "Applies interfaces",
        d: "Mirrors interfaces on other computers",
        correct: "a",
    }

    {
        question: "What is a <div> tag?",
        a: "Divides elements in a page to the bottom",
        b: "Used as a container for HTML elements",
        c: "Directly Injecting Variables",
        d: "Mirrors interfaces on other computers",
        correct: "b",
    }


    {
        question: "#ffff gives you what colour",
        a: "White",
        b: "Brown",
        c: "Black",
        d: "Fuscia",
        correct: "a",
    }

    {
        question: "Flexbox is an example of what",
        a: "CSS 3 web layout model.",
        b: "A CSS element that boxes any element",
        c: "A playable video that varies in size",
        d: "A customizable generator that creates elements based on size",
        correct: "a",
    }
];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.response')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentScore = 0
let overallScore = 0

loadQuiz()

function loadQuiz() {

    const currentQuizData = quizData[currentScore]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.foreach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }

       currentQuiz++

       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
           quiz.innerHTML = `
           <h2>You got ${score}/${quizData.length} questions correctly</h2>

           <button onclick="location.reload()">Reload</button>
           `
       }
    }
})