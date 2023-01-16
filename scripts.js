const squares = document.querySelectorAll('.square');
const statusDisplay = document.getElementById("status")
let currentTurn = 0;

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (isSquareEmpty(square)) {
            square.classList.remove("hover-o");
            square.classList.remove("hover-x");

            addSymbolToSquare(square);
            const winState = getWinState();
            currentTurn++;
            updateDisplay(winState);

            if (winState != false) startGame();
        }
    });

    square.addEventListener('mouseover', () => {
        if (!square.classList.contains("x") && !square.classList.contains("o")) {
            if (currentTurn % 2 == 0) square.classList.add("hover-o");
            else square.classList.add("hover-x");
        }
    });

    square.addEventListener("mouseout", () => {
        square.classList.remove("hover-o");
        square.classList.remove("hover-x");

    })
});

function isSquareEmpty(square) {
   if (square.classList.contains("o") || square.classList.contains("x")) return false;
   return true
}

function addSymbolToSquare(square) {
   if (currentTurn % 2 == 0) {
       square.classList.add("o");
    } else {
        square.classList.add("x");
    }
}

function updateDisplay(winState) {
    if (winState == "o") statusDisplay.innerHTML = "O Wins!";
    else if (winState == "x") statusDisplay.innerHTML = "X Wins!";
    else if (winState == "tie") statusDisplay.innerHTML = "Tie!";
    else {
        if (currentTurn % 2 == 0) statusDisplay.innerHTML = "Turn: O";
        else statusDisplay.innerHTML = "Turn: X";
    }
}

function getWinState() {
    const squaresArray = Array.from(squares);
    let winningClass;

    if (currentTurn % 2 == 0) {
        winningClass = "o";
    } else {
        winningClass = "x";
    }

    // Horizontal 
    for (let i = 0; i < 7; i += 3) {
        if (squaresArray[i].classList.contains(winningClass) && squaresArray[i+1].classList.contains(winningClass) && squaresArray[i+2].classList.contains(winningClass)) {
            return winningClass;
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (squaresArray[i].classList.contains(winningClass) && squaresArray[i + 3].classList.contains(winningClass) && squaresArray[i + 6].classList.contains(winningClass)) {
            return winningClass;
        }
    }

    // Major diagonal
    if (squaresArray[0].classList.contains(winningClass) && squaresArray[4].classList.contains(winningClass) && squaresArray[8].classList.contains(winningClass)) {
        return winningClass;    
    }

    // Minor diagonal
    if (squaresArray[2].classList.contains(winningClass) && squaresArray[4].classList.contains(winningClass) && squaresArray[6].classList.contains(winningClass)) {
        return winningClass;
    }

    // Tie
    for (let i = 0; i < 9; i++) {
        if (!squaresArray[i].classList.contains("o") && !squaresArray[i].classList.contains("x")) return false;
    }
    
    return "tie";
}

function startGame() {
    squares.forEach(square => {
        if (square.classList.contains("o")) square.classList.remove("o");
        if (square.classList.contains("x")) square.classList.remove("x");
        currentTurn = 0;
    });
}

startGame();