let userClickedPattern = [];
let gamePattern = [];

let buttonColours = ["red","blue","green","yellow"]

var started = false;
let highScore = 0;
var level = 0;

$(document).keydown(function(event) {
    if (!started) {

        $("#level-title").text("Level " + level);

        nextSequence();
        started = true;
    }
});



$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
  
    userClickedPattern.push(userChosenColour);
  
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

  
  });

  $(".goButton").click(function(event){
    if(started === false){ 
      nextSequence(); 
      started = true;
      $(".goButton").hide(); 
    }
  });

  function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        $("body").addClass("game-over")

        playSound("wrong");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Restart to Play Again");
        
        $(".goButton").text("Restart");
        startOver();
    }
}



function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function startOver() {
    if (level > highScore) {
        highScore = level - 1;
        $("#high-score").text("High Score: " + highScore);
    }
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    $(".goButton").show();
}








