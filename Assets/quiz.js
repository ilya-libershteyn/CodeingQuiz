// Store questions as objects with a question property storing the question, 
// answers property storing an array of answers, 
// and a correct property storing the correct answer
class Question 
{
    constructor(question, answers, correct) 
    {
        this.question = question,
        this.answers = answers,
        this.correct = correct;
    }

   isCorrect = (answer) => 
   {
        if(answer === this.correct)
        {
            return true;
        }
        return false;
   }
}

// Questions begin here
var q1 = new Question(
    "If you type '3>2>1 === false;' in the console window, what result will you get?",
    [true, false],
    true);

var q2 = new Question(
    "JavaScript is a ___-side programming language.",
    ["Client", "Server", "Both", "None"],
    "Both");

var q3 = new Question(
    "Which of the following will write the message \“Hello world!\” in an alert box?",
    ["alertBox(\"Hello world!\");", "alert(Hello world!);", 
    "msgAlert(\"Hello world!\");", "alert(\"Hello world!\");"],
    "alert(\"Hello world!\");");

var q4 = new Question(
    "How do you find the minimum of x and y using JavaScript?",
    ["min(x,y);", "Math.min(x,y);", "Math.min(xy);", "min(xy);"],
    "Math.min(x,y)");

var q5 = new Question(
    "Which of the following statements will throw an error? ",
    ["var fun = function bar( ){ }", "var fun = function bar{ }", "function fun( ){ }"],
    "var fun = function bar{ }");

var q6 = new Question(
    "Which JavaScript label catches all the values, except for the ones specified?",
    ["catch", "label", "try", "default"],
    "default");

var q7 = new Question(
    "Which are the correct \"if\" statements to execute certain code if “x” is equal to 2?",
    ["if(x 2)", "if(x = 2)", "if(x == 2)", "if(x != 2 )"],
    "if(x == 2)");

var q8 = new Question(
    "What will the code return?\n Boolean(3<7)",
    ["true", "false", "NaN", "SyntaxError"],
    "true");

var q9 = new Question(
    "Which is the correct JavaScript syntax to change the HTML content given below?\n"
    + "<p id=\"test\">Hello World!</p>",
    ["document.getElementById(\“test\”).innerHTML = \“Hello DataFlair!\”", 
    "document.getElementsById(\“test\”).innerHTML = \“Hello DataFlair!\”; ", 
    "document.getElementById(test).innerHTML = \“Hello DataFlair!\”; ",
    "document.getElementByTagName(\“p\”)[0].innerHTML = \“Hello DataFlair!\”;"],
    "document.getElementById(\“test\”).innerHTML = \“Hello DataFlair!\”e");

var q10 = new Question(
    "Determine the result - String(\"Hello\") === \"Hello\";",
    ["true", "false", "ReferenceError", "SyntaxError"],
    "true");

var q11 = new Question(
    "What is the correct JavaScript syntax to print “DataFlair” in the console?",
    ["print(\“DataFlair\”);", "console.print(\“DataFlair\”);",
    "log.console(\“DataFlair\”);", "console.log(\“DataFlair\”);"],
    "console.log(\“DataFlair\”);");

var q12 = new Question(
    "Which of the given options is an incorrect variable name",
    ["javascript", "_javascript", "$javascript", "-javascript"],
    "-javascript");

var q13 = new Question(
    "What is the syntax of a \"for\" statement in JavaScript?",
    ["for(increment; condition; initialization)",
    "for(initialization, condition, increment)",
    "for(condition; initialization; increment)",
    "for(initialization; condition; increment)"],
    "for(initialization; condition; increment)"); 

var q14 = new Question(
    "Which of the following statements will show a message as well as ask for user input in a popup?",
    ["alert", "prompt", "confirm", "message"],
    "prompt"); 

var q15 = new Question(
    "Which of the following is an event listener in JavaScript?",
    ["onclick", "blur", "click", "Click()"],
    "click"); 
// Array to store questions
var questionList = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14];

// Create a quiz from the list
function makeQuiz(size)
{
    if(size < 1 || size > questionList.length)
    {
        size = 10;
    }

    var quiz;

    for(var i = 0; i < size;)
    {
        // Select a random question from questionList
        var index = Math.floor((Math.random() * questionList.length))
         
        // Check if question has not been selected yet, 
        // push to quiz and increment i if it hasn't
        if(quiz.items.indexOf(questionList[index]) === -1)
         {
             quiz.push(questionList[index]);
             i++;
         }
    }

    return quiz
}