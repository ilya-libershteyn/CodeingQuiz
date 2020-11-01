const MAX_QUESTIONS = 10;
const MAX_TIME = 1500;
const TIME_PENALTY = 10;

var startBtn = document.querySelector("#start");
var question = document.querySelector("#question");
var qText = document.querySelector("#questionText");
var intro = document.querySelector("#intro");
var answers = document.querySelectorAll("#answer");

var count = 0;

var questions = makeQuiz(MAX_QUESTIONS);

function loadQuestion()
{
    //question.focus();
    var q = questions[count];

    qText.textContent = q.question;
    
    for(var i = 0; i < q.answers.length; i++)
    {
        answers[i].textContent = q.answers[i];
    }

    count++;
}

function loadQuiz(event)
{
    console.log("Entered loadQuiz")
    event.preventDefault();
    intro.classList.add("hide");
    question.classList.remove("hide");
    loadQuestion();
}

startBtn.addEventListener("click", loadQuiz);