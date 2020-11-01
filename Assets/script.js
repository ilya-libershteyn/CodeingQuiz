const MAX_QUESTIONS = 10;
const MAX_TIME = 1500;
const TIME_PENALTY = 10;

var startBtn = document.querySelector("#start");
var reStartBtn = document.querySelector("#restart");
var questionEl = document.querySelector("#question");
var qTextEl = document.querySelector("#questionText");
var introEl = document.querySelector("#intro");
var answersElList = document.querySelectorAll("#answer");
var gradeEl = document.querySelector("#grade");
var nextBtn = document.querySelector("#next");
var scoreEl = document.querySelector("#score");
var resultEl = document.querySelector("#result");
var finalScoreEl = document.querySelector("#final_score");
var initialsEl = document.querySelector("#initials");

var count = 0;
var points = 0;
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
        if(answersElList[i].classList.contains("hide"))
        {
            answersElList[i].classList.remove("hide");
        }
        answersElList[i].textContent = question.answers[i];
        
        if(question.answers[i] === question.correct)
        {
            answersElList[i].classList.add("correct");
        }

        answersElList[i].addEventListener("click", checkAnswer);
    }

    
    while(i < answersElList.length)
    {
        answersElList[i].classList.add("hide");
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
        points++;
        
    }
    else
    {
        answer.setAttribute("style", "background: #ff0000");
        gradeEl.textContent = "Incorrect!";
    }

    scoreEl.textContent = points;
    if(nextBtn.classList.contains("hide"))
    {
        nextBtn.classList.remove("hide");
    }
}

function loadNextQuestion(event)
{
    answer.setAttribute("style", "background: -internal-light-dark");
    
    if(count < MAX_QUESTIONS)
    {
        loadQuestion();
    }
    else
    {
        loadResult();
    }
}

function loadResult()
{
    event.preventDefault();

    questionEl.classList.add("hide");
    resultEl.classList.remove("hide");

    finalScoreEl.textContent = points;
}

function loadStart()
{
    event.preventDefault();

    resultEl.classList.add("hide");
    introEl.classList.remove("hide");
}

function record(event)
{
    var player = {
        name: initialsEl.value,
        score: points 
    };

    localStorage.setItem("player", JSON.stringify(player));
}

startBtn.addEventListener("click", loadQuiz);
reStartBtn.addEventListener("click", loadStart)''
nextBtn.addEventListener("click", loadNextQuestion);
//answersElList.addEventListener("click", checkAnswer);