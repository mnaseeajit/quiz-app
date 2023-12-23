
var popup = document.getElementById('topic-page');
var openPopupBtn = document.getElementById('openPopupBtn');
var closePopupBtn = document.getElementById('closePopupBtn');
var startQuizBtn = document.getElementById('startQuiz');
var quizContent = document.querySelector('#quiz-popup');

var prevQuestionBtn = document.querySelectorAll('.prevQuestion');
var nextQuestionBtn = document.querySelectorAll('.nextQuestion');
var skipQuestionBtn = document.querySelectorAll('.skipQuestion');
var submitQuizBtn = document.getElementById('submitQuiz');
var questionContainers = document.querySelectorAll('.questionContainer');
var resultContainer = document.getElementById('resultContainer');
var tagBadgeButton = document.querySelectorAll(".tagBadgeButton");
var closeTag = document.querySelectorAll('.closeTag')

var currentQuestionIndex = 0;
var userAnswers = [];

var quizData = [
    {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "options": ["Harper Lee", "George Orwell", "Jane Austen", "F. Scott Fitzgerald"],
        "answer": 0
    },
    // Add more questions...
    {
        "question": "Which of the three banks will be merged with the other two to create India’s third-largest bank?",
        "options": ["Punjab National Bank",
            "Indian Bank",
            "Bank of Baroda ",
           "Dena Bank"],
        "answer": 1
    },
    {
        "question": "What is the name of the weak zone of the earth’s crust?",
        "options": [" Seismic", 
        "Cosmic",
        "Formic",
         "Anaemic"],
        "answer": 1
    },
    {
        "question": " Where was India’s first national Museum opened?",
        "options": ["Delhi",
       "Hyderabad",
        "Rajasthan",
        "Mumbai"],
        "answer": 4
    },
    {
        "question": " In 2019, Which popular singer was awarded the Bharat Ratna award?",
        "options": ["Lata Mangeshkar",
        "Asha Bhosle",
        "Bhupen Hazarika",
        "Manna Dey "],
        "answer": 3
    },
];

tagBadgeButton.forEach(function(button, index) {
    button.onclick = function() {
        button.style.color = "black";
        button.style.backgroundColor = "#fdd75e";
        closeTag[index].style.display = 'block';
    };
});

// Check if elements are found
if (popup && openPopupBtn && closePopupBtn && startQuizBtn && quizContent &&
    prevQuestionBtn && nextQuestionBtn && skipQuestionBtn && submitQuizBtn &&
    questionContainers && resultContainer) {
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
    for (let i = 0; i < prevQuestionBtn.length; i++) {
        prevQuestionBtn[i].addEventListener('click', function () {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(currentQuestionIndex);
            }
            console.log("previous");
        });
    }

    // Handle "Next" button click
    var nextQuestionBtn = Array.from(document.querySelectorAll('.nextQuestion'));

    for (let i = 0; i < nextQuestionBtn.length; i++) {
        nextQuestionBtn[i].addEventListener('click', function () {
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            }
            if (currentQuestionIndex === quizData.length - 1) {
                submitQuizBtn.style.display = 'block';
            } else {
                submitQuizBtn.style.display = 'none';
            }
            
            console.log("next");
        });
    }
    
  function showResult() {
    var correctAnswers = 0;
    for (let i = 0; i < quizData.length; i++) {
        console.log(`Question ${i + 1}: userAnswer=${userAnswers[i]}, correctAnswer=${quizData[i].answer}`);
        if (userAnswers[i] === quizData[i].answer) {
            correctAnswers++;
        }
    }

    resultContainer.innerHTML = `<p>Your Score: ${correctAnswers} out of ${quizData.length}</p>`;
    quizContent.style.display = 'none';
    resultContainer.style.display = 'block';

    

}


    // Handle "Skip" button click
    for (let i = 0; i < skipQuestionBtn.length; i++) {
        skipQuestionBtn[i].addEventListener('click', function () {
            userAnswers.push(null); // mark the question as skipped
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                // If all questions are skipped, show the result
                showResult();
            }
            console.log("skip");
        });
    }

    function showQuestion(index) {
        var currentQuestion = quizData[index];
    
        // Get all question containers
        var questionContainers = document.querySelectorAll('.questionContainer');
    
        // Loop through each question container and update its content
        questionContainers.forEach((container, i) => {
            container.innerHTML = `
                <p>${currentQuestion.question}</p>
                <ul>
                    ${currentQuestion.options.map((option, j) => `
                        <li>
                            <label>
                                <input type="radio" name="answer" value="${j}" ${userAnswers[index] === j ? 'checked' : ''}>
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            `;
           
            var radioButtons = container.querySelectorAll('input[type="radio"]');
            radioButtons.forEach((radio, j) => {
                radio.addEventListener('change', function () {
                    userAnswers[index] = j; // Update userAnswers when an option is selected
                });
            });
    
        });
    }

    // Handle "Submit Quiz" button click
    submitQuizBtn.onclick = function () {
        // Check if all questions are answered
        if (userAnswers.length === quizData.length) {
            showResult();
    
            // Hide resultContainer after a certain delay (e.g., 5 seconds)
            setTimeout(function () {
                resultContainer.style.display = 'none';
            }, 5000);
        } else {
            alert('Please answer all questions before submitting.');
        }
    }
    

   var questionContainer = document.querySelector('.questionContainer');



     // Function to display a question
   
    
} else {
    console.error("One or more elements not found");
}


