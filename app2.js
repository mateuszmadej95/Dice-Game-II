let scores, roundScore, activePlayer, winning;
let newWinning = document.querySelector("#points");

winning = 100;

init();

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice '</em>';

document.querySelector(".btn-roll").addEventListener("click", function () {
    // 1. random number
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display result
    let diceDOM = document.querySelector(".dice");
    diceDOM.src = "dice-" + dice + ".png";

    let dice2DOM = document.querySelector(".dice2");
    dice2DOM.src = "dice-" + dice2 + ".png";

    // 3. update the round score if the rolled number is NOT 1
    if (dice !== 1 && dice2 !== 1) {
        // add score
        roundScore += dice + dice2;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        document.querySelector(".dice").style.display = "block";
        document.querySelector(".dice2").style.display = "block";
        //   } else if (lastDice === 6 && dice === 6) {
        //     // roll 2x6
        //     resetUI();
        //     document.querySelector("#score-" + activePlayer).textContent = 0;
    } else {
        // next player
        resetUI();
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    // 1. add current score to global score
    scores[activePlayer] += roundScore;

    // 2. update the ui
    document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];

    // 3. check if player won the game
    if (scores[activePlayer] >= winning) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
        document
            .querySelector(".player-" + activePlayer + "-panel")
            .classList.add("winner");
        document
            .querySelector(".player-" + activePlayer + "-panel")
            .classList.remove("active");
        document.querySelector(".btn-hold").disabled = true;
        document.querySelector(".btn-roll").disabled = true;
        newWinning.disabled = true;
    } else {
        resetUI();
    }
});

function resetUI() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    setTimeout(function () {
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
    }, 800);
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    let player1 = document.querySelector("#name-0");
    let player2 = document.querySelector("#name-1");

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    player1.textContent = "Player1";
    player2.textContent = "Player2";
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector("#pointsBtn").disabled = false;
    newWinning.textContent = '';
    winning = 100;
    newWinning.disabled = false;
    document.querySelector(".btn-hold").disabled = false;
    document.querySelector(".btn-roll").disabled = false;
}

// change the rules

document.querySelector("#pointsBtn").addEventListener("click", function () {
    winning = newWinning.value;
    document.querySelector("#pointsBtn").disabled = true;
    newWinning.style.border = 'none';
});