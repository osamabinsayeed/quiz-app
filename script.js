const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Bacteria", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Human", correct: false },
        ]
    },
    {
        question: "Which is the biggest continent in the world?",
        answers: [
            { text: "Dhaka", correct: false },
            { text: "Narayanganj", correct: false },
            { text: "India", correct: false },
            { text: "Asia", correct: true },
        ]
    },
    {
        question: "Who first stepped on the moon?",
        answers: [
            { text: "Neil Armstrong", correct: true },
            { text: "You", correct: false },
            { text: "Modiji", correct: false },
            { text: "Nobody", correct: false },
        ]
    },
    {
        question: "What is the chemical formula of water?",
        answers: [
            { text: "water", correct: false },
            { text: "H₂O", correct: true },
            { text: "O₃", correct: false },
            { text: "H₂SO₄", correct: true },
        ]
    },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;

    }
    else {
        selectedbtn.classList.add("incorrect");
    }
    //checks every ans. green colors only the correct and disables buttons
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})


startQuiz();