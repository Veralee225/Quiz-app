const startButton = document.getElementById('start-btn')
const header = document.querySelector('h1')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById ('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const score = document.querySelector('.score')
let counter = document.querySelector('.counter')
let points = 0
let currentQuestion = 1

let shuffledQuestions, currentQuestionIndex 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', getNextQuestion)

function getNextQuestion(){
    currentQuestionIndex++
    setNextQuestion()
}

//Functions & Calling of Functions
function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    header.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextButton.classList.remove('hide')
    setNextQuestion()
}


function setNextQuestion() {
    resetState()
    console.log('test')
    showQuestion(shuffledQuestions[currentQuestionIndex])
    if(shuffledQuestions.length <= currentQuestionIndex + 1){
        nextButton.classList.add('hide')
        showResults()
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.option
        button.classList.add('btn')
        if (answer.correct) {
           button.dataset.correct = answer.correct 
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
    counter.innerText = `Q: ${(currentQuestionIndex + 1)} /5 `
}

function resetState() {
    console.log('enter')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        console.log('done')
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    selectedButton.classList.add('wrong')
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.disabled = true
    })
    if (correct) {
        points += 1;
        score.textContent = `Correct answer: ${points}`;
        if (points > 1) {
            score.textContent = `Correct answers: ${points}`;
        } 
    } 
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.remove('wrong')
        element.classList.add('correct')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const showResults = () => {
    questionContainerElement.innerHTML = "";
    let comment
    if(points > 3){
        comment = "Let's see what you can do"
    } else {
        comment = ""
    }
    const markup = `
    <div class="final">
            <h1>Thanks for playing!</h1>
            <h2>
            Your score is: ${points}
            </h2>
            <h3> ${comment}</h3>
            <button id="restart" class="start-btn btn">
                Restart
            </button>
            </div>
    `;
    questionContainerElement.insertAdjacentHTML('afterbegin', markup);
    
    document.getElementById('restart').addEventListener('click', () => {
        window.location.reload(); 
    }); 
   
}

const questions = [
    {
        question: 'Who is the greatest artist of all time',
        answers: [
            { option: 'Pablo Picasso', correct: false },
            {option: 'Leonardo Da Vinci', correct: true },
            {option: 'Michelango', correct: false },
            {option: 'Vincent Van Gosh', correct: false },
        ]
    },




    {   
        question: `When was the first olympics?`,
        answers:  [
            {option: '1912', correct: false},
            {option: '1890', correct: false},
            {option: '1896', correct: true},
            {option: '1921', correct: false} 
        ]
        
    },


    
    { 
        "question":"`When did the Aba women riot take place?`,
         answers: [  
            {option: "1929", correct: true},
            {option: "1932", correct: false},
            {option: "1928", correct: false},
            {option: "1965",  correct: false},
        ]  


    },

{
       "question": When was Lagos state founded?",
        answers: [
             {options: "June 1967", correct: false},
             {options: "April 1983", correct: false},
             {options: "May 1967", correct: true},
             {options: "September 1960", correct: false},
        ]
   },
    

    { 
        question: "Which Queen Of England Was Known As Bloody Mary?", 

        answers: [  
            {option: "Queen Elizabeth I", correct: false},
            {option: "Mary I", correct: true},
            {option: "Queen Cathrine Parr", correct: false},
            {option: "Mary IV",  correct: false}
        ]  

  },


    { 
        question: "Who was the first democratic president in Nigeria?",

        answers: [  
            {option: "Olusegun Obasanjo", correct: false},
            {option: "Sani Abacha", correct: false},
            {option: "Shehu Shagari", correct: true},
            {option: "Ernest Shonekan",  correct: false}
        ]  
    }
];
