const MAX_QUESTIONS = 10;
const MAX_TIME = 1500;
const TIME_PENALTY = 10;

var startBtn = document.querySelector("#start");
var questionEl = document.querySelector("#question");
var qTextEl = document.querySelector("#questionText");
var introEl = document.querySelector("#intro");
var answersElList = document.querySelectorAll("#answer");
var gradeEl = document.querySelector("#grade");
var nextBtn = document.querySelector("#next");
var scoreEl = document.querySelector("#score");

var count = 0;
var score = 0;
var question;
var questions = makeQuiz(MAX_QUESTIONS);
var answer;

function loadQuestion()
{
    if(!nextBtn.classList.contains("hide"))
    {
        nextBtn.classList.add("hide");
    }

    question = questions[count];

    qTextEl.textContent = question.question;
    
    for(var i = 0; i < question.answers.length; i++)
    {
        answersElList[i].textContent = question.answers[i];
        
        if(question.answers[i] === question.correct)
        {
            answersElList[i].classList.add("correct");
        }

        answersElList[i].addEventListener("click", checkAnswer);
    }

    count++;
}

function loadQuiz(event)
{
    console.log("Entered loadQuiz")
    event.preventDefault();
    intro.classList.add("hide");
    questionEl.classList.remove("hide");
    loadQuestion(event);
}

function checkAnswer(event)
{
    event.preventDefault();

    answer = event.target;

    if(answer.classList.contains("correct"))
    {
        answer.setAttribute("style", "background: #08f26e");
        gradeEl.textContent = "Correct!";
        score++;
        
    }
    else
    {
        answer.setAttribute("style", "background: #ff0000");
        gradeEl.textContent = "Incorrect!";
    }

    scoreEl.textContent = score;
    if(nextBtn.classList.contains("hide"))
    {
        nextBtn.classList.remove("hide");
    }
}

function loadNextQuestion(event)
{
    answer.setAttribute("style", "background: -internal-light-dark");
    loadQuestion();
}

startBtn.addEventListener("click", loadQuiz);
nextBtn.addEventListener("click", loadNextQuestion);
//answersElList.addEventListener("click", checkAnswer);