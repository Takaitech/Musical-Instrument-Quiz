
// create starting variables for questionNumber & score
let questionNumber=0;
let score=0;

//Generate the question page html 
function generateQuestionPage() {
//if questionNumber is less than the length of the STORE array return the question html
  if (questionNumber < STORE.length) {
    return `<div 
            class="question${questionNumber}"> 
              <audio controls autoplay id="audioControls>
                <source id="audioControls" src="${STORE[questionNumber].instrument}">
              </audio>
            </div>
            <div>
              <form class="answers">
                <fieldset>
                  <label  class="instruments">
                    <input type="radio" id="radiobutton" name="instrument" value=${STORE[questionNumber].answerNames[0]} required />
                    <img src="${STORE[questionNumber].answerIcons[0]}" alt"${STORE[questionNumber].alt}">
                    <div class="name">${STORE[questionNumber].answerNames[0]}</div>
                  </label>
                  <label class="instruments">
                    <input type="radio" id="radiobutton" name="instrument"  value=${STORE[questionNumber].answerNames[1]} />
                    <img src="${STORE[questionNumber].answerIcons[1]}" alt"${STORE[questionNumber].alt}">
                    <div>${STORE[questionNumber].answerNames[1]}</div>
                  </label>
                  <div class="row-2">
                    <label class="instruments">
                      <input type="radio"  id="radiobutton" name="instrument" value=${STORE[questionNumber].answerNames[2]} />
                      <img src="${STORE[questionNumber].answerIcons[2]}" alt"${STORE[questionNumber].alt}">
                      <div>${STORE[questionNumber].answerNames[2]}</div>
                    </label>
                    <label  class="instruments">
                      <input type="radio"id="radiobutton"
                      name="instrument"  value=${STORE[questionNumber].answerNames[3]} />
                      <img src="${STORE[questionNumber].answerIcons[3]}" alt"${STORE[questionNumber].alt}">
                      <div>${STORE[questionNumber].answerNames[3]}</div>
                    </label>
                  </div>
                </fieldset>
                <div class=submitButton>
                <button type="submit" class="submitAnswer">Submit</button>
                </div>
              </form> 
            </div>
            `;
    } else {
      generateQuizResults();
      restartQuiz();
      $(".questionNumber").text(10);
  }
}

//Function to render question page to DOM 
function renderQuestion() {
  $(".questionPage").html(generateQuestionPage());
}

//Create event listener for start button
//When the start button is clicked hide start quiz from DOM & render the question page.
function quizStart() {
  $(".startQuiz").on("click", ".startButton", function(event){
    renderQuestion();
    $(".startQuiz").css("display","none");
    $(".questionPage").css("display","block");
    $("#instrument").css("visibility","visible");
    $("#score").css("visibility","visible");
    $(".credits").css("display","none");
    submitAnswer();
  });
}

//add 1 to instrument number(questionNumber) after each question page
function addToQuestionNumber() {
  questionNumber++;
  $(".questionNumber").text(questionNumber+1);
}

//increase score by 1 if correctt
function addToScore() {
  score++;
  $(".score").text(score);
}


//create event listener for when submitAnswer button is clicked
//compare answer that was checked when submitted with the correct answer
//if equal run answerIsCorrect()
//if unequal run answerIsWrong()
function submitAnswer () {
  $(".submitAnswer").on('click',function(event){
    event.preventDefault();
    let userAnswer= $('input[name=instrument]:checked').val();
    let correctAnswer= `${STORE[questionNumber].correctAnswer}`;
    if (userAnswer === correctAnswer) {
      answerIsCorrect();
    } else if (userAnswer !== correctAnswer){
      answerIsWrong();
    }
  });
}

//call the corresponding answer feedback function

//add to the score value
function answerIsCorrect() {
  correctAnswerFeedback();
  nextQuestion();
  addToScore();
}

function answerIsWrong() {
  wrongAnswerFeedback();
  nextQuestion();
}

  //render feedback pages with randomly generated responses
function correctAnswerFeedback() {
  const responses = ["Fantastic Job!","You have a great ear!","Your Doing Great!","Are you a composer?"];
  let randomResponse = responses[Math.floor
  (Math.random()*responses.length)];
    $(".questionPage").html(`
    <div class="feedback">
      <p>${randomResponse}</p>
      <img src="${STORE[questionNumber].correctAnswerIcon}" alt"${STORE[questionNumber].alt}">
      <p> You got it correct!<br>The answer was ${STORE[questionNumber].correctAnswer}!</p>
      <button type="button" class="nextInstrument"> Next Instrument
      </button>
    </div>`);
}

function wrongAnswerFeedback() {
  const responses = ["Maybe next time!","Nice Try!","You can do better than that!"];
  let randomResponse = responses[Math.floor(Math.random()*responses.length)];
  $(".questionPage").html(`
    <div class="feedback">
      <p>${randomResponse}</p>
      <img src="${STORE[questionNumber].correctAnswerIcon}" alt"${STORE[questionNumber].alt}">
      <p> You got it wrong!<br>The answer was ${STORE[questionNumber].correctAnswer}!</p>
      <button type="button" class="nextInstrument"> Next Instrument
      </button>
    </div>`);
}


// Event listener for next question
// Render next question page
// Repeat back to feedback page
function nextQuestion() { 
  $(".nextInstrument").on("click", function(event){
    addToQuestionNumber();
    renderQuestion();
    submitAnswer();
  });
}

// Generate quiz results
// Render results for final page 

function generateQuizResults() {
  $(".questionPage").html(`<div class="quizResults">
              <p class="response"></p>
              <p> You Scored a ${score} out of 10!</p>
              <button type="button" class="restartQuiz">Restart Quiz</button>
            </div>`);
  if (score > 9) {
    $(".response").html("Fantastic job, you got them all correct! Your ears are gold!");
  } else if (score <= 9 && score > 5)  {
    $(".response").html("Great Job! You almost got them all! Better luck on the next round!");
  } else {
    $(".response").html("'Twas a great effort! Take some time to brush up on your instruments and give it another go!");
  }
}

//create event listener for restart quiz
//set score and questionNumber back to 0  
function restartQuiz() {
  $(".restartQuiz").on("click", function(event){
    $('.questionNumber').text(1);
    $(".score").text(0);
    questionNumber = 0;
    score = 0;
    renderQuestion();
    submitAnswer ();
  });
}

//event listener for audio test button
function audioTest(){
$(".soundTest").on("click", function (event){
  var audio = $("#testSound")[0];
  audio.play();
});
}


//implement event listener to continue quiz on next level. (coming soon)

//run challenge funtions
function createQuiz() {
  audioTest();
  quizStart();
  nextQuestion();
}


$(createQuiz);

