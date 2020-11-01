const MAX_QUESTIONS = 10;
const MAX_TIME = 25;
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
var recordBtn = document.querySelector("#record");
var highScoreBtn = document.querySelector("#high_scores");
var returnBtn = document.querySelector("#return");
var scoreListEl = document.querySelector("#list");
var timeEl = document.querySelector("#time");

var count = 0;
var points = 0;
var question;
var questions = makeQuiz(MAX_QUESTIONS);
console.log(questions)
var answer;
var curr = introEl;
var time;
var remainingTime;

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
        i++;
    }

    count++;
    console.log(count);
    curr = questionEl;
}

function loadQuiz(event)
{
    clearInterval(time);
    startTimer();
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
        remainingTime = remainingTime - 120;
    }

    scoreEl.textContent = points;
    if(nextBtn.classList.contains("hide"))
    {
        nextBtn.classList.remove("hide");
    }
}

function loadNextQuestion(event)
{
    event.preventDefault();

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

function loadResult(event)
{
    questionEl.classList.add("hide");
    resultEl.classList.remove("hide");

    finalScoreEl.textContent = points;

    curr = resultEl;
}

function loadStart(event)
{
    event.preventDefault();

    resultEl.classList.add("hide");
    introEl.classList.remove("hide");

    curr = introEl;
}

function record(event)
{
    var player = {
        'name': initialsEl.value,
        'score': points 
    };

    let players = JSON.parse(localStorage.getItem("players")) || [];

    players.push(player);

    players = players.sort((a, b) =>
    {
        if(a.score != b.score)
        {
            return b.score - a.score;
        }
    });

    localStorage.setItem("players", JSON.stringify(players));

    event.target.textContent = "Recorded!";
}

function viewHighScores(event)
{
    event.preventDefault();

    highScoreBtn.classList.add("hide");
    returnBtn.classList.remove("hide");

    let players = JSON.parse(localStorage.getItem('players'));
    console.log(players);

    for(key in players)
    {
        let player = players[key];
        console.log(player)
        var entry = document.createElement("li");
        entry.textContent = player.name + "   Score: " + player.score;
        //entry.textContent = player;

        scoreListEl.appendChild(entry);
    }

    curr.classList.add("hide");
    scoreListEl.classList.remove("hide");
}

function returnToPrevious(event)
{
    event.preventDefault();

    returnBtn.classList.add("hide");
    highScoreBtn.classList.remove("hide");
    scoreListEl.classList.add("hide");
    curr.classList.remove("hide");
}

function startTimer()
{
    remainingTime = MAX_TIME * 60

    time = setInterval(function ()
    {
       remainingTime--;
       
       if(remainingTime < 0)
       {
           clearInterval(time);
           loadResult();
       }
       else
       {
           var minute = Math.floor(remainingTime / 60).toString();
           var second = (remainingTime % 60).toString();
           timeEl.textContent = minute.toString() + ":" + second.toString();
       }
    }, 1000);
}

startBtn.addEventListener("click", loadQuiz);
reStartBtn.addEventListener("click", loadStart);
nextBtn.addEventListener("click", loadNextQuestion);
recordBtn.addEventListener("click", record);
highScoreBtn.addEventListener("click", viewHighScores);
returnBtn.addEventListener("click", returnToPrevious);