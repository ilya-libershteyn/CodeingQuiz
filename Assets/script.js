const MAX_QUESTIONS = 10;       // maximum number of questions
const MAX_TIME = 25;            // maximum time in minutes
const TIME_PENALTY = 120;       // penalty for incorrect answers

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
var questions = makeQuiz(MAX_QUESTIONS);    // creating a quiz from the master list of questions in quiz.js
console.log(questions)
var answer;
var curr = introEl;     // pointer to the current page being displayed
var time;
var remainingTime;

// Function to load a question
function loadQuestion()
{
    // hiding the Next button and result if user comes in from previous question
    if(!nextBtn.classList.contains("hide"))
    {
        nextBtn.classList.add("hide");
    }

    gradeEl.textContent = "";

    question = questions[count];

    // display question text
    qTextEl.textContent = question.question;
    
    // display answers, up to four
    for(var i = 0; i < question.answers.length; i++)
    {
        if(answersElList[i].classList.contains("hide"))
        {
            answersElList[i].classList.remove("hide");
        }
        answersElList[i].textContent = question.answers[i];
        
        if(question.answers[i] === question.correct)
        {
            // Mark correct answer from list
            answersElList[i].classList.add("correct");
        }

        answersElList[i].addEventListener("click", checkAnswer);
    }

    // if question has less than four answers, hide the remaining elements
    while(i < answersElList.length)
    {
        answersElList[i].classList.add("hide");
        i++;
    }

    count++;
    console.log(count);
    curr = questionEl;
}

// Start the quiz
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

// Check if selected answer was correct
function checkAnswer(event)
{
    event.preventDefault();

    answer = event.target;

    if(answer.classList.contains("correct"))
    {
        // Color the correct answer green
        answer.setAttribute("style", "background: #08f26e");
        gradeEl.textContent = "Correct!";
        points++;
        
    }
    else
    {   
        // Incorrect answers are colored red
        answer.setAttribute("style", "background: #ff0000");
        gradeEl.textContent = "Incorrect!";
        remainingTime = remainingTime - 120;    // Penalty for incorrect answers
    }

    scoreEl.textContent = points;

    // Reveal the button to the next question
    if(nextBtn.classList.contains("hide"))
    {
        nextBtn.classList.remove("hide");
    }
}

// Handler function for the Next button
function loadNextQuestion(event)
{
    event.preventDefault();

    // Revert the selected button back to default color
    answer.setAttribute("style", "background: -internal-light-dark");
    
    if(count < MAX_QUESTIONS && remainingTime > 0)
    {
        loadQuestion();
    }
    else
    {
        // Enter here when we've run out of questions or time
        loadResult();
    }
}

// Loads the end page
function loadResult(event)
{
    questionEl.classList.add("hide");
    resultEl.classList.remove("hide");

    finalScoreEl.textContent = points;

    curr = resultEl;
}

// Function to restart quiz from very beginning
function loadStart(event)
{
    event.preventDefault();

    resultEl.classList.add("hide");
    introEl.classList.remove("hide");

    curr = introEl;
}

// Function to record user's high score
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

// Handler function to view high scores list
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

        scoreListEl.appendChild(entry);
    }

    curr.classList.add("hide");
    scoreListEl.classList.remove("hide");
}

// Handler function for exiting the high score list
function returnToPrevious(event)
{
    event.preventDefault();

    returnBtn.classList.add("hide");
    highScoreBtn.classList.remove("hide");
    scoreListEl.classList.add("hide");
    curr.classList.remove("hide");
}

// Function to start the timer
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