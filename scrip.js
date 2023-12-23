

// var popup = document.getElementById('topic-page'); // Adjusted the ID to match the HTML
// var openPopupBtn = document.getElementById('openPopupBtn');
// var closePopupBtn = document.getElementById('closePopupBtn');

// // Check if elements are found
// if (popup && openPopupBtn && closePopupBtn) {
//     // Open the modal
//     openPopupBtn.onclick = function() {
//         popup.style.display = 'block';
//     }

//     // Close the modal when the close button is clicked
//     closePopupBtn.onclick = function() {
//         popup.style.display = 'none';
//     }

//     // Close the modal if the user clicks outside of it
//     window.onclick = function(event) {
//         if (event.target === popup) {
//             popup.style.display = 'none';
//         }
//     }
// } else {
//     console.error("One or more elements not found");
// }

// const startQuiz = document.getElementById("startQuiz");
// const quizContent = document.querySelector('.quiz-content');

// startQuiz.onclick = function(){
//     console.log("something")
//     popup.style.display = 'none'
//      quizContent.style.display = 'block';
// }







var popup = document.getElementById('topic-page');
var openPopupBtn = document.getElementById('openPopupBtn');
var closePopupBtn = document.getElementById('closePopupBtn');
var startQuizBtn = document.getElementById('startQuiz');
var quizContent = document.querySelector('#quiz-popup');

var prevQuestionBtn = document.getElementsByClassName('prevQuestion');
var nextQuestionBtn = document.getElementsByClassName('nextQuestion');
var skipQuestionBtn = document.getElementsByClassName('skipQuestion');
var submitQuizBtn = document.getElementById('submitQuiz');
var questionContainer = document.getElementsByClassName('questionContainer');
var resultContainer = document.getElementById('resultContainer');

var currentQuestionIndex = 0;
var userAnswers = [];

var quizData = [
    {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "options": ["Harper Lee", "George Orwell", "Jane Austen", "F. Scott Fitzgerald"],
        "answer": "Harper Lee"
    },
    // Add more questions...
];

// Check if elements are found
if (popup && openPopupBtn && closePopupBtn && startQuizBtn && quizContent &&
    prevQuestionBtn && nextQuestionBtn && skipQuestionBtn && submitQuizBtn &&
    questionContainer && resultContainer) {
    // Open the modal
    openPopupBtn.onclick = function () {
        popup.style.display = 'block';
    }

    // Close the modal when the close button is clicked
    closePopupBtn.onclick = function () {
        popup.style.display = 'none';
    }

    // Close the modal if the user clicks outside of it
    window.onclick = function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    }

    // Start the quiz when the "Start Quiz" button is clicked
    startQuizBtn.onclick = function () {
        popup.style.display = 'none';
        showQuestion(currentQuestionIndex);
        quizContent.style.display = 'block';
    }

    // Handle "Previous" button click
    prevQuestionBtn.onclick = function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
        console.log("previous");
    }

    // Handle "Next" button click
    nextQuestionBtn.onclick = function () {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
        console.log("next");
    }

    // Handle "Skip" button click
    skipQuestionBtn.onclick = function () {
        userAnswers.push(null); // mark the question as skipped
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            // If all questions are skipped, show the result
            showResult();
        }
        console.log("skip");
    }

    // Handle "Submit Quiz" button click
    submitQuizBtn.onclick = function () {
        // Check if all questions are answered
        if (userAnswers.length === quizData.length) {
            showResult();
        } else {
            alert('Please answer all questions before submitting.');
        }
    }

    // Function to display a question
    function showQuestion(index) {
        var currentQuestion = quizData[index];
        questionContainer.innerHTML = `
            <p>${currentQuestion.question}</p>
            <ul>
                ${currentQuestion.options.map((option, i) => `
                    <li>
                        <label>
                            <input type="radio" name="answer" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}>
                            ${option}
                        </label>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    // Function to display quiz result
    function showResult() {
        var correctAnswers = 0;
        for (let i = 0; i < quizData.length; i++) {
            if (userAnswers[i] === quizData[i].answer) {
                correctAnswers++;
            }
        }

        resultContainer.innerHTML = `<p>Your Score: ${correctAnswers} out of ${quizData.length}</p>`;
        quizContent.style.display = 'none';
        resultContainer.style.display = 'block';
    }
} else {
    console.error("One or more elements not found");
}
