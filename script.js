document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartButton = document.querySelector('.restart');

    let currentPlayer = 'X';
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameBoard[clickedCellIndex] !== "" || !gameActive)
            return;

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winPatterns.length; i++) {
            const winPattern = winPatterns[i];
            let a = gameBoard[winPattern[0]];
            let b = gameBoard[winPattern[1]];
            let c = gameBoard[winPattern[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        let roundDraw = !gameBoard.includes("");
        if (roundDraw) {
            status.textContent = "Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }

    function handleRestartGame() {
        currentPlayer = 'X';
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});
