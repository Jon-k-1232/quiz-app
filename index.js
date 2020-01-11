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


//amending the HTML
function createNewAmend(questionNum) {
    let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${questions[questionNum].question}</legend>
    </fieldset>
  </form>`)
    console.log(`Should be pulling question array key ${questionNum}, which should be equal to ${questionNum}`);
    console.log(`QuestionNum is showing as ${questionNum} at createNewAmend while amending HTML`);

    let fieldSelector = $(formMaker).find('fieldset');

    questions[questionNum].answers.forEach(function (answerMoney, answerList) {
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


// print question
function printQuestions(){

    if(questionNum < questions.length){
        console.log(`questionNum is showing ${questionNum} at printQuestion function, print successful`);
        return createNewAmend(questionNum);

    }else{
        $('.questionCounter').text(5);
        $('.interrogationBox').hide();
        finalScore();
        console.log('Final Score Processed');
    }
}

// Start button on click
function quizStrt(){
    console.log(`Quiz initiated questionNum = ${questionNum}`);
    $('.quizContainer').on('click','.startButton',function(e){
        $('.questionCounter').text(`${questionNum}`);
        $('.interrogationBox').show();
        $('.quizBox').hide();
        $('.questionBox').hide();
        $('.interrogationBox').prepend(printQuestions());
    })
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
        `<h3 class="answerHead">Well butter my butt and call me a biscuit! You might be a REAL American!</h3>
      <p class="answerPar">Now go shotgun that keg and get a move on!</p>
      <button type="button" class="buttonNext button">Next</button>
    <img class="rightWrongImg" src="images/correct.jpg" alt="Marine Corps Iwo Jima flag raising monument in Washington D.C. at night with fireworks in background">`
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
    <img class="rightWrongImg" src="images/wrong.jpg" alt="Quote from John Adams, 'You will never know how much it has cost my generation to preserve your freedom. I hope you will make a good use of it.'">`
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
        "Well I s'wanee! You a real American! "
    ];

    const good = [
        "I reckon' your a borderline treasonist. Tread lightly.",
    ];

    const sucky = [
        'Im gonna cut your tail! You a darn commie!'
    ];

    if (score >= 5) {
        array = perfect;
        console.log('Pulling perfect score array');

    } else if (score >= 3 && score <= 4) {
        array = good;
        console.log('pulling mediocre array');
    } else {
        array = sucky;
        console.log('Pulling sucky score array');
    }

    return $('.questionBox').html(
        `<h3 class="really">${array[0]}</h3>
        <p class="reallyPar">Your score is ${score} / 5</p>
        <button type="submit" class="resetButton button">Restart</button>`)
}


//resetting the quiz when reset clicked
function doItAgain() {
    $('.questionBox').on('click', '.resetButton', function(e){
        e.preventDefault();
        resetCounter();
        $('.quizBox').show();
        $('.questionBox').hide();
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
    $('.otBox').hide();
    $('.questionBox').hide();
    $('.interrogationBox').hide();
    $('.answerBox').hide();
}

startQuiz();