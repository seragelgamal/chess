// Chess Game
// Serag Elgamal
// 7/27/2020

// INITIALIZATION

// declare variable for master board div element
let boardContainer = document.getElementById('board');

// board array
// 0 - empty
// 1 - pawn
// 2 - rook
// 3 - knight
// 4 - bishop
// 5 - queen
// 6 - king
let boardArray = [
    [2, 3, 4, 5, 6, 4, 3, 2],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 3, 4, 5, 6, 4, 3, 2]
];

// legend for board array
let numberLegend = ['Empty', 'Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King'];

// set up 2 arrays of booleans for testing whether pawns have moved yet
let blackPawnBooleans = pushPawnBooleanArray();
let whitePawnBooleans = pushPawnBooleanArray();

function pushPawnBooleanArray() {
    let pawnBooleanArray = [];
    for (let column = 0; column < 8; column++) {
        pawnBooleanArray.push(false);
    }
    return pawnBooleanArray;
}

// set up board
for (let row = 0; row < 8; row++) {
    for (let square = 0; square < 8; square++) {
        createSquare('white', row, square);
        square++;
        createSquare('brown', row, square);
    }
    row++;
    for (let square = 0; square < 8; square++) {
        createSquare('brown', row, square);
        square++;
        createSquare('white', row, square);
    }
}

function createSquare(colour, row, square) {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add(colour);
    gridSquare.id = row + '-' + square;
    gridSquare.dataset.row = row;
    gridSquare.dataset.column = square;
    gridSquare.dataset.piece = numberLegend[boardArray[row][square]];
    boardContainer.append(gridSquare);
}

// place pieces on board
for (let row = 0; row < 2; row++) {
    placePieces('black', row);
}
for (let row = 6; row < 8; row++) {
    placePieces('white', row);
}

function placePieces(colour, row) {
    for (let column = 0; column < 8; column++) {
        document.getElementById(row + '-' + column).innerHTML += '<img src="media/' + colour + numberLegend[boardArray[row][column]] + '.png"></img>';
        document.getElementById(row + '-' + column).dataset.pieceColour = colour;
        if (row == 1 || row == 6) {
            document.getElementById(row + '-' + column).dataset.number = column;
        }
    }
}

// add a click event to all the grid squares
let squareElements = document.querySelectorAll('.white, .brown');
for (let i = 0; i < squareElements.length; i++) {
    squareElements[i].addEventListener('click', clickHandler);
}

// store references to the turn display and captured piece display for future use
let turnDisplay = document.getElementById('turn');
let capturedPieceContainer = document.getElementById('capturedPieces');

// add reset function to reset button
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    location.reload();
});

// all game logic is found in functions.js