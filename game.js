var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var hasStarted = false;

$(document).keydown(function(){
    if (!hasStarted) {
        nextSequence();
        hasStarted = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    checkAnswer(level-1);
    playSound(this.id);
    animatePress(this.id);
    
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    $("h1").text("Level: "+ level);
    level++;
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
    gamePattern.push(randomChosenColour);
}

function playSound(colour){
    var sound = new Audio("sounds/"+ colour +".mp3");
    sound.play();
}

function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    var wrongSound = new Audio("sounds/wrong.mp3");
    if (userClickedPattern.length === gamePattern.length) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            setTimeout(function(){
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }else{
            $("h1").text("Game Over! Press any key to restart!");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            startOver();
            wrongSound.play();
            console.log("Wrong");
        }
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    hasStarted = false;
    level = 0;
}