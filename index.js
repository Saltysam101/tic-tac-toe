console.log("Hello There!")

const gameDialogue = document.getElementById("game-dialogue");

let gameIsActive = true;

let currentPlayer = "X";
let prevPlayer = [];


let gameState = ["", "", "", "", "", "", "", "", "", ]

function handleSpacePlayed(clickedSpace, clickedSpaceIdx) {
    gameState[clickedSpaceIdx] = currentPlayer;
    clickedSpace.textContent = currentPlayer;
}


function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
        prevPlayer.push(currentPlayer);
        return gameDialogue.innerText = `It is player's ${currentPlayer} turn!`
}

function handleResultValidation() {

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        gameIsActive = false;
        gameDialogue.innerText = `Player ${prevPlayer.slice(-1)} won!`
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameActive = false;
        gameDialogue.innerText = "It was a draw!";
        return;
    }

    handlePlayerChange()
}

function handleSpaceClick(clickedSpaceEvent) {
    const clickedSpace = clickedSpaceEvent.target;

    let clickedSpaceIdx = parseInt(clickedSpace.getAttribute('data-cell-index'))

    if (gameState[clickedSpaceIdx] !== "" || !gameIsActive) {
        return
    } else {
        handleSpacePlayed(clickedSpace, clickedSpaceIdx);
        handleResultValidation();
    }
}

function handleRestartGame() {
    gameIsActive = true;
    currentPlayer = "X";
    gameDialogue.innerText = `Let's Play!`;
    gameState = ["", "", "", "", "", "", "", "", ""];
    prevPlayer = [];
    document.querySelectorAll('.space')
        .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll(".space").forEach(cell => cell.addEventListener('click', handleSpaceClick))

let restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener('click', handleRestartGame)