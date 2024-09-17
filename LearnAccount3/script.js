const questions = [
	{
		question: "What is the print function in Python?",
		options: ["A function to get user input", "A function to display output", "A function to calculate mathematical expressions", "A function to store data"],
		answer: 1
	},
	{
		question: "Which of the following is a valid Python variable name?",
		options: ["1variable", "variable1", "variable-1", "variable 1"],
		answer: 1
	},
	{
		question: "What is the purpose of the `def` keyword in Python?",
		options: ["To define a variable", "To define a function", "To define a class", "To define a module"],
		answer: 1
	},
	{
		question: "What is the difference between `break` and `continue` in Python?",
		options: ["`break` exits the loop, `continue` skips to the next iteration", "`break` skips to the next iteration, `continue` exits the loop", "`break` is used in `if` statements, `continue` is used in loops", "`break` is used in loops, `continue` is used in `if` statements"],
		answer: 0
	},
	{
		question: "What is the purpose of the `len()` function in Python?",
		options: ["To get the length of a string", "To get the length of a list", "To get the length of a dictionary", "All of the above"],
		answer: 3
	},
	{
		question: "What is the difference between `list` and `tuple` in Python?",
		options: ["`list` is mutable, `tuple` is immutable", "`list` is immutable, `tuple` is mutable", "`list` is used for numbers, `tuple` is used for strings", "`list` is used for strings, `tuple` is used for numbers"],
		answer: 0
	},
	{
		question: "What is the purpose of the `if` statement in Python?",
		options: ["To define a function", "To define a variable", "To control the flow of the program", "To define a class"],
		answer: 2
	},
	{
		question: "What is the purpose of the `for` loop in Python?",
		options: ["To define a function", "To define a variable", "To control the flow of the program", "To iterate over a sequence"],
		answer: 3
	},
	{
		question: "What is the purpose of the `class` keyword in Python?",
		options: ["To define a function", "To define a variable", "To define a module", "To define a class"],
		answer: 3
	},
	{
		question: "What is the purpose of the `try`-`except` block in Python?",
		options: ["To control the flow of the program", "To define a function", "To handle errors", "To define a class"],
		answer: 2
	},
	{
		question: "What is the purpose of the `import` statement in Python?",
		options: ["To define a function", "To define a variable", "To import a module", "To define a class"],
		answer: 2
	},
	{
		question: "What is the difference between `==` and `is` in Python?",
		options: ["`==` checks for equality, `is` checks for identity", "`==` checks for identity, `is` checks for equality", "`==` is used for numbers, `is` is used for strings", "`==` is used for strings, `is` is used for numbers"],
		answer: 0
	},
	{
		question: "What is the purpose of the `self` parameter in Python?",
		options: ["To refer to the current instance of the class", "To refer to the class itself", "To refer to the module", "To refer to the function"],
		answer: 0
	},
	{
		question: "What is the purpose of the `__init__` method in Python?",
		options: ["To initialize the class", "To initialize the instance", "To define a function", "To define a variable"],
		answer: 1
	},
	// Add remaining 19 questions here
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const progressBar = document.getElementById("progress-bar");
const resultContainer = document.getElementById("result-container");
const mark = document.getElementById("mark");
const resultOutcome = document.getElementById("result-outcome");

renderQuestion();

nextButton.addEventListener("click", () => {
	if (currentQuestion < questions.length - 1) {
		currentQuestion++;
		renderQuestion();
		updateProgressBar();
	} else {
		nextButton.disabled = true;
		submitButton.style.display = "block";
	}
});

submitButton.addEventListener("click", () => {
	submitButton.style.display = "none";
	resultContainer.style.display = "block";
	resultContainer.innerHTML = `You scored ${score} out of ${questions.length}`;
});

function renderQuestion() {
	const question = questions[currentQuestion];
	questionContainer.innerHTML = `
		<h2>${question.question}</h2>
		<ul>
			${question.options.map((option, index) => `
				<li>
					<input type="radio" id="option-${index}" name="option" />
					<label for="option-${index}">${option}</label>
				</li>
			`).join("")}
		</ul>
	`;

	const options = questionContainer.querySelectorAll("input[type='radio']");
	options.forEach((option, index) => {
		option.addEventListener("change", () => {
			if (index === question.answer) {
				score++;
                mark.innerHTML = score;
                // resultContainer.style.setProperty('color', 'green');
                // resultOutcome.innerHTML = "That's correct!"

			}
			nextButton.disabled = false;
		});
	});
}

function updateProgressBar() {
	const progress = ((currentQuestion + 1) / questions.length) * 100;
	progressBar.style.width = `${progress}%`;
}