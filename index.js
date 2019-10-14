//quiz questions
const questions= [
    //key 0 skip
    {
        question: 'skip',
        answers:[
            'skip'
        ],
        correctAnswer: 'skip'
    },

    //question 1
    {
        question: 'When did the United States declare independence?',
        answers:[
            'July 4, 1776',
            'July 4, 1775',
            'July 3, 1777',
            'July 4, 1783'
        ],
        correctAnswer: 'July 4, 1776'
    },

    //question 2
    {
        question: 'Who was part of the Committee of Five that drafted the Declaration of Independence?',
        answers:[
            'John Adams, Thomas Jefferson, Benjamin Franklin, George Washington, James Madison',
            'Roger Sherman, Benjamin Franklin, John Hancock, John Jay, George Washington',
            'Thomas Jefferson, John Adams, Roger Sherman, Robert Livingston, Benjamin Franklin',
            'Benjamin Franklin, Thomas Paine, John Jay, Thomas Jefferson, James Madison'
        ],
        correctAnswer: 'Thomas Jefferson, John Adams, Roger Sherman, Robert Livingston, Benjamin Franklin'
    },

    //question 3
    {
        question: 'How many presidents of the United States are there?',
        answers:[
            '44',
            '48',
            '45',
            '46'
        ],
        correctAnswer: '45'
    },

    //question 4
    {
        question: 'When was the U.S Marine Corps created?',
        answers:[
            'September 18, 1947',
            'July 4, 1775',
            'October 13, 1777',
            'November 10, 1775'
        ],
        correctAnswer: 'November 10, 1775'
    },

    //question 5
    {
        question: 'Which U.S. President is in the wrestling hall of fame?',
        answers:[
            'Teddy Roosevelt',
            'George Washington',
            'Abraham Lincoln',
            'Warren Harding'
        ],
        correctAnswer: 'Abraham Lincoln'
    }

]


//set global vars for question counter
let score = 0;
let questionNum= 1;

//score counter
function scoreCount(){
    score++;
    $('.score').text(score);
    console.log(`Score counter cycled score should be showing ${score}`);
}

//question counter
function questionCount(){
    questionNum++;
    $('.questionCounter').text(questionNum);
    console.log(`Question count cycled, should be showing ${questionNum}`);
}

// reset counter and score
function resetCounter() {
    score = 0;
    questionNum = 1;
    $('.score').text(0);
    $('.questionCounter').text(0);
    console.log('reset counter processed');
}

// Start button on click
function quizStrt(){
    console.log(`Quiz initiated questionNum = ${questionNum}`);
    $('.quizContainer').on('click','.startButton',function(e){
        $('.questionCounter').text(`${1}`);
        $('.interrogationBox').show();
        $('.quizBox').hide();
        $('.questionBox').hide();
        $('.interrogationBox').prepend(printQuestions());
    })
}

// print question
function printQuestions(){

    if(questionNum < questions.length){
        console.log(`questionNum is showing ${questionNum} at printQuestion function, print successful`);
        return createNewAmend(questionNum);

    }else{
        $('.questionCounter').text(5);
        $('.interrogationBox').hide(); //removed .box
        finalScore();
        console.log('Final Score Processed');
    }
}

//amending the HTML
function createNewAmend(questionList) {
    let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${questions[questionList].question}</legend>
    </fieldset>
  </form>`)
    console.log(`Should be pulling question array key ${questionList}, which should be equal to ${questionNum}`);
    console.log(`QuestionNum is showing as ${questionNum} at createNewAmend while amending HTML`);

    let fieldSelector = $(formMaker).find('fieldset');

    questions[questionList].answers.forEach(function (answerMoney, answerList) {
        $(`<label class="possAnswers" for="${answerList}">
        <input class="radio" type="radio" id="${answerList}" value="${answerMoney}" name="answer" required>
        <span>${answerMoney}</span>
      </label>
      `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
    console.log(`HTML amendment working and questionNum is on ${questionNum}`);
}

//submit answer to question
function submitAnswer() {
    $('.quizContainer').on('submit', function(e){
        e.preventDefault();
        $('.interrogationBox').hide();
        $('.answerBox').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = questions[questionNum].correctAnswer;
        if (answer === correct) {
            correctAnswer();
            console.log(`submitAnswer function working and moving onto the correctAnswer function, questionNum showing ${questionNum}`);
        } else {
            wrongAnswer();
            console.log(`submitAnswer function working and moving onto the wrongAnswer function, questionNum showing ${questionNum}`);
        }
    });
}

//displays correct answer
function correctAnswer(){
    $('.answerBox').html(
        `<h3 class="answerHead">Getting more American by the minute!</h3>
      <p class="answerPar">Now go shotgun that keg and click next.</p>
      <button type="button" class="buttonNext button">Next</button>
    <img class="rightWrongImg" src="images/correct.jpg">`
    );
    scoreCount();
    console.log(`Question number is showing as ${questionNum} at correctAnswer, correct answer function processed`);
}


//displays wrong answer
function wrongAnswer(){
    $('.answerBox').html(
        `<h3 class="answerHead">FAILURE. Are you sure your not a commie?</h3>
    <p class="answerPar">It's actually:</p>
    <p class="answerCorrect">${questions[questionNum].correctAnswer}</p>
    <button type="button" class="buttonNext button">Next</button>
    <img class="rightWrongImg" src="images/wrong.jpg">`
    );
    console.log(`Question number is showing as ${questionNum} at wrongAnswer, Wrong answer function processed`);
}


// goes to next question
function next(){
    $('.quizContainer').on('click','.buttonNext', function(e){
        $('.answerBox').hide();
        $('.interrogationBox').show();
        questionCount();
        $('.interrogationBox form').replaceWith(printQuestions());
        console.log('Next (question) function processed and should be on question ' + questionNum);
    });
}


// Final Score
function finalScore() {
   console.log('running Final score');

    $('.questionBox').show();

    const perfect = [
        'Well it appears you are a Real American after all. '
    ];

    const good = [
        'Brush up on your history, your a boarder line treasonist.',
    ];

    const sucky = [
        'Two words. Treasonist Commie.'
    ];

    if (score >= 5) {
        array = perfect;
        console.log('Pulling perfect score array');

    } else if (score < 3 && score >= 4) {
        array = good;
        console.log('pulling mediocre array');
    } else {
        array = sucky;
        console.log('Pulling sucky score array');
    }

    return $('.questionBox').html(
        `<h3>${array[0]}</h3>
        <h3>Your score is ${score} / 5</h3>
        <button type="submit" class="resetButton button">Restart</button>`)

}


//resetting the quiz when reset clicked
function doItAgain() {
    $('.questionBox').on('click', '.resetButton', function(e){
        e.preventDefault();
        resetCounter();
        $('.quizBox').show();
        console.log(`Quiz reset, questionNum should be 1 and it is showing as ${questionNum}`);
    });
}

function startQuiz(){
    quizStrt();
    printQuestions();
    submitAnswer();
    next();
    doItAgain();
    finalScore();
    console.log(`questionNum starting as ${questionNum}`);
    $('.questionBox').hide();
    $('.interrogationBox').hide();
    $('.answerBox').hide();
}

startQuiz();