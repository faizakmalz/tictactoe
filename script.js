document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    // Membuat kotak papan permainan
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i;
        square.addEventListener('click', () => handleSquareClick(square));
        board.appendChild(square);
    }

    // Fungsi untuk menangani klik pada kotak
    function handleSquareClick(square) {
        const index = square.dataset.index;
        if (boardState[index] === '' && !gameOver) {
            boardState[index] = currentPlayer;
            square.textContent = currentPlayer;
            checkWin();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    }

    // Fungsi untuk memeriksa kemenangan
    function checkWin() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
            [0, 4, 8], [2, 4, 6] // diagonal
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameOver = true;
                return;
            }
        }

        if (!boardState.includes('')) {
            status.textContent = "It's a draw!";
            gameOver = true;
            return;
        }
    }

    // Fungsi untuk memperbarui status permainan
    function updateStatus() {
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Fungsi untuk mereset permainan
    resetButton.addEventListener('click', () => {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        updateStatus();
        document.querySelectorAll('.square').forEach(square => square.textContent = '');
    });

    // Menampilkan status awal permainan
    updateStatus();
});