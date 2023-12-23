const popup = document.querySelector(".popup");
const startButton = document.querySelector(".button-start");
function togglePopup() {
  if (popup.style.display === "none") {
    popup.style.display = "flex";
  } else {
    popup.style.display = "none";
  }
}

function highlightSelectedCategories() {
  var options = document.querySelectorAll(".option");

  options.forEach(function (option) {
    option.addEventListener("click", function () {
      option.classList.toggle("selected");
      selectedOptions = document.querySelectorAll(".option.selected").length;
      if (selectedOptions >= 5) {
        startButton.style.display = "flex";
      }
    });
  });
}

let currentQuestionIndex = 0;
let totalMarks = 0;
let quizData;
function startQuiz() {
    togglePopup();
  quizData = [
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        "Harper Lee",
        "George Orwell",
        "Jane Austen",
        "F. Scott Fitzgerald",
      ],
      correctAnswer: "Harper Lee",
    },
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 0
    },
  ];
  currentQuestionIndex = 0;
  totalMarks = 0;
  displayQuestion(quizData[currentQuestionIndex]);
}

function displayQuestion(questionData) {
const hideMain=document.querySelector(".hide");
hideMain.style.display="none";


const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = '';
    quizContainer.style.display="flex";


const questionElement = document.createElement('h2');
    questionElement.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
    quizContainer.appendChild(questionElement);

    const optionsList = document.createElement('div');
    optionsList.classList.add("options-container");
    questionData.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.classList.add("option1");
        optionElement.addEventListener('click', () => selectOption(optionIndex, questionData.correctAnswer));
        optionsList.appendChild(optionElement);
    });
   document.body.appendChild(optionsList);
    document.getElementById('nextButton').style.display = 'block';
    // Hide the "Previous" button for the first question
    document.getElementById('prevButton').style.display = 'block';
}



function selectOption(selectedOptionIndex, correctOptionIndex) {
    const options = document.querySelectorAll('.option1');
    
    options.forEach((option, index) => {
        if (index === selectedOptionIndex) {
            // Add a CSS class to highlight the selected option
            option.classList.add('selected-option');

            // Check if the selected option is correct
            if (selectedOptionIndex === correctOptionIndex) {
                // Increment totalMarks if the selected option is correct
                totalMarks += 10;
            }
        } else {
            // Remove the CSS class from other options
            option.classList.remove('selected-option');
        }
    });

    // Show the "Next" button for the current question
    document.getElementById('nextButton').style.display = 'block';
    // Show the "Previous" button after the first question
    if (currentQuestionIndex > 0) {
        document.getElementById('prevButton').style.display = 'block';
    }
    // Show the "Skip" button for the current question
    document.getElementById('skipButton').style.display = 'block';
}
function nextQuestion() {
    // Move to the next question or display the result
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion(quizData[currentQuestionIndex]);
    } else {
        displayResult();
    }
}

function prevQuestion() {
    // Move to the previous question
    currentQuestionIndex--;
    displayQuestion(quizData[currentQuestionIndex]);
    // Hide the "Previous" button for the first question
    if (currentQuestionIndex === 0) {
        document.getElementById('prevButton').style.display = 'none';
    }
}

function skipQuestion() {
    // Skip the current question and move to the next
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion(quizData[currentQuestionIndex]);
    } else {
        displayResult();
    }
}

function displayResult() {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block';

    const totalMarksElement = document.getElementById('totalMarks');
    totalMarksElement.textContent = totalMarks;

    // Hide the navigation buttons after displaying the result
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('skipButton').style.display = 'none';
}