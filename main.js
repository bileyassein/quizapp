const questions = [
    {
        question: `What 2012 dystopian film has the catchphrase "May the odds be ever in your favor"?`,
        options: ["Divergent", "The Hunger Games", "Maze Runner", "The Giver"],
        answer: 1
    },
    {
        question: "How many Harry Potter main films are there?",
        options: [6, 8, 10, 12],
        answer: 1
    },
    {
        question: `Which rom-com features: "You had me at hello"?`,
        options: ["Notting Hill", "Jerry Maguire", "The Notebook", "Pretty Woman"],
        answer: 1
    },
    {
        question: "Who directed Parasite (2019)",
        options: ["Wong Kar-wai", "Hirokazu Kore-eda", "Park Chan-wook", "Bong Joon-ho"],
        answer: 3
    },
    {
        question: `"Life is like a box of chocolates" is from:`,
        options: ["Shawshank Redemption", "Seven Samurai", "Forrest Gump", "Spirited Away"],
        answer: 2
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const formEl = document.getElementById("options-form");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

function loadQuestion() {
    const current = questions[currentIndex];
    questionEl.textContent = current.question;
    formEl.innerHTML = "";
    
    current.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
        formEl.appendChild(label);
    });

    submitBtn.classList.remove("hide");
    nextBtn.classList.add("hide");
}

function submitAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        alert("Please select an option!");
        return;
    }

    const selectedIndex = parseInt(selected.value);
    if (selectedIndex === questions[currentIndex].answer) {
        score++;
    }

    submitBtn.classList.add("hide");
    nextBtn.classList.remove("hide");

    // Highlight correct and incorrect answers
    const inputs = document.querySelectorAll('input[name="option"]');
    inputs.forEach((input, index) => {
        input.disabled = true;
        const label = input.parentElement;
        if (index === questions[currentIndex].answer) {
            label.style.color = "green";
        } else if (index === selectedIndex) {
            label.style.color = "red";
        } else {
            label.style.color = "#999";
        }
    });
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById("question-box").classList.add("hide");
    scoreBox.classList.remove("hide");
    scoreEl.textContent = score;
    totalEl.textContent = questions.length;
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    scoreBox.classList.add("hide");
    document.getElementById("question-box").classList.remove("hide");
    loadQuestion();
}

// Initialize the quiz
loadQuestion();