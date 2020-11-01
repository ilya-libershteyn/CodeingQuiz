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

// Array to store questions
var quiz = [q1];