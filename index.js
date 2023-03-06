console.log("Hello There!")

let gameIsActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", "", ]

function handleSpacePlayed(clickedSpace, clickedSpaceIdx) {
    gameState[clickedSpaceIdx] = currentPlayer;
    clickedSpace.textContent = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
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
        gameActive = false;
        currentPlayer = ""
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameActive = false;
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
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.space')
        .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll(".space").forEach(cell => cell.addEventListener('click', handleSpaceClick))

let restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener('click', handleRestartGame)