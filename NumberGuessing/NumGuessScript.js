const userAnswer = document.getElementById("userGuess");
const guessButton = document.getElementById("guessButton");
const upperBound = document.getElementById("upperNum");
const lowerBound = document.getElementById("lowerNum");
const result = document.getElementById("result");
const playAgainButton = document.getElementById("playAgainButton")
const remainingGuessRight = document.getElementById("rightToGuess");
let answer = -1, guessCount = 5;
remainingGuessRight.textContent = "Remaining Right to Guess : " + guessCount;

guessButton.onclick = function () {
    if (lowerBound.value != "" && upperBound.value != "") {
        if (Number(lowerBound.value) < Number(upperBound.value)) {
            if (answer == -1)
                answer = pickRandomNumber(Number(lowerBound.value), Number(upperBound.value));

            if (userAnswer.value != "") {
                result.textContent = "Your Guess : " + userAnswer.value;
                gameFlow();
            }
            else {
                result.textContent = "Guess area is given empty!"
            }

        }
        else {
            result.textContent = "Lower bound should be less than upper bound!"
            answer == -1;
        }
    }
    else {
        result.textContent = "Bounds are given empty!"
    }
}

playAgainButton.onclick = function () {
    result.style.color = "black";
    switchButtons(false)
    result.textContent = "";
    userAnswer.value = "";
    answer = -1;
    changeRemainingGuessRight(5 - guessCount)
}

function gameFlow() {
    if (Number(userAnswer.value) > answer) {
        result.innerHTML += "<br>Your guess is too high.";
        changeRemainingGuessRight(-1);
    }
    else if (Number(userAnswer.value) < answer) {
        result.innerHTML += "<br>Your guess is too low.";
        changeRemainingGuessRight(-1);
    }
    else {
        checkGameOver();
    }
}

function gameOver(isOver) {
    playAgainButton.disabled = !isOver;
    guessButton.disabled = isOver;
    if (isOver) {
        result.style.color = "red";
        result.innerHTML = "<br>You are out of right to guess.<br>True Answer : " + answer;
    }
}

function pickRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function changeRemainingGuessRight(change) {
    guessCount += change;
    remainingGuessRight.textContent = "Remaining Right to Guess : " + guessCount;
    checkGameOver();
}

function checkGameOver() {
    if (Number(userAnswer.value) == answer) {
        result.style.color = "green";
        result.innerHTML += "<br>You win! <br>True Answer : " + answer;
        switchButtons(true)
    }
    else if (guessCount == 0) {
        result.style.color = "red";
        result.innerHTML = "<br>You are out of right to guess.<br>True Answer : " + answer;
        switchButtons(true)
    }
}

function switchButtons(gameOver) {
    playAgainButton.disabled = !gameOver;
    guessButton.disabled = gameOver;
}