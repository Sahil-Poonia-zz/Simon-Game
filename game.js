var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var i = 0;
var level = 0;
$("h1").click(function() {
  i++;
  if (i === 1) {
    nextSequence();
  }
});
$(document).keydown(function() {
  i++;
  if (i === 1) {
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).addClass("jqueryActive");
  setTimeout(function() {
    $("." + randomChosenColour).removeClass("jqueryActive");
  }, 200);
  playSound(randomChosenColour);
}

$("button").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function playSound(name) {
  switch (name) {
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    default:
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
  }
}

function startOver() {
   level = 0;
   gamePattern = [];
   i = 0;
}
