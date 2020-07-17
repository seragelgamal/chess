// INITIALIZATION

let boardContainer = document.getElementById('board');

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

let numberLegend = ['Empty', 'Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King'];

let blackPawns = [{
    row: 1,
    column: 0,
    moved: false
}, {
    row: 1,
    column: 1,
    moved: false
}, {
    row: 1,
    column: 2,
    moved: false
}, {
    row: 1,
    column: 2,
    moved: false
}, {
    row: 1,
    column: 4,
    moved: false
}, {
    row: 1,
    column: 5,
    moved: false
}, {
    row: 1,
    column: 6,
    moved: false
}, {
    row: 1,
    column: 7,
    moved: false
}];
let blackRooks = [{
    row: 0,
    column: 0
}, {
    row: 0,
    column: 7
}];
let blackKnights = [{
    row: 0,
    column: 1
}, {
    row: 0,
    column: 6
}];
let blackBishops = [{
    row: 0,
    column: 2
}, {
    row: 0,
    column: 5
}];
let blackQueen = {
    row: 0,
    column: 3
};
let blackKing = {
    row: 0,
    column: 4
};

let whitePawns = [{
    row: 6,
    column: 0,
    moved: false
}, {
    row: 6,
    column: 1,
    moved: false
}, {
    row: 6,
    column: 2,
    moved: false
}, {
    row: 6,
    column: 2,
    moved: false
}, {
    row: 6,
    column: 4,
    moved: false
}, {
    row: 6,
    column: 5,
    moved: false
}, {
    row: 6,
    column: 6,
    moved: false
}, {
    row: 6,
    column: 7,
    moved: false
}];
let whiteRooks = [{
    row: 7,
    column: 0
}, {
    row: 7,
    column: 7
}];
let whiteKnights = [{
    row: 7,
    column: 1
}, {
    row: 7,
    column: 6
}];
let whiteBishops = [{
    row: 7,
    column: 2
}, {
    row: 7,
    column: 5
}];
let whiteQueen = {
    row: 7,
    column: 3
};
let whiteKing = {
    row: 7,
    column: 4
};

for (let row = 0; row < 8; row++) {
    for (let square = 0; square < 8; square++) {
        let whiteSquare = document.createElement('div');
        whiteSquare.classList.add('white');
        whiteSquare.id = row + '-' + square;
        whiteSquare.dataset.row = row;
        whiteSquare.dataset.column = square;
        whiteSquare.dataset.piece = numberLegend[boardArray[row][square]];
        boardContainer.append(whiteSquare);

        square++;

        let brownSquare = document.createElement('div');
        brownSquare.classList.add('brown');
        brownSquare.id = row + '-' + square;
        brownSquare.dataset.row = row;
        brownSquare.dataset.column = square;
        brownSquare.dataset.piece = numberLegend[boardArray[row][square]];
        boardContainer.append(brownSquare);
    }
    row++;
    for (let square = 0; square < 8; square++) {
        let brownSquare = document.createElement('div');
        brownSquare.classList.add('brown');
        brownSquare.id = row + '-' + square;
        brownSquare.dataset.row = row;
        brownSquare.dataset.column = square;
        brownSquare.dataset.piece = numberLegend[boardArray[row][square]];
        boardContainer.append(brownSquare);

        square++;

        let whiteSquare = document.createElement('div');
        whiteSquare.classList.add('white');
        whiteSquare.id = row + '-' + square;
        whiteSquare.dataset.row = row;
        whiteSquare.dataset.column = square;
        whiteSquare.dataset.piece = numberLegend[boardArray[row][square]];
        boardContainer.append(whiteSquare);
    }
}

for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 8; column++) {
        document.getElementById(row + '-' + column).innerHTML += '<img src="media/black' + numberLegend[boardArray[row][column]] + '.png"></img>';
        document.getElementById(row + '-' + column).dataset.pieceColour = 'black';
        if (row == 1) {
            document.getElementById(row + '-' + column).dataset.number = column;
        }
    }
}
for (let row = 6; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
        document.getElementById(row + '-' + column).innerHTML += '<img src="media/white' + numberLegend[boardArray[row][column]] + '.png"></img>';
        document.getElementById(row + '-' + column).dataset.pieceColour = 'white';
        if (row == 6) {
            document.getElementById(row + '-' + column).dataset.number = column;
        }
    }
}

document.getElementById('0-0').dataset.number = 0;
document.getElementById('0-7').dataset.number = 1;
document.getElementById('0-1').dataset.number = 0;
document.getElementById('0-6').dataset.number = 1;
document.getElementById('0-2').dataset.number = 0;
document.getElementById('0-5').dataset.number = 1;

document.getElementById('7-0').dataset.number = 0;
document.getElementById('7-7').dataset.number = 1;
document.getElementById('7-1').dataset.number = 0;
document.getElementById('7-6').dataset.number = 1;
document.getElementById('7-2').dataset.number = 0;
document.getElementById('7-5').dataset.number = 1;

let whiteTurn = true;
let gameStatus = 0;

let activeSquares = [];
let pieceToMove;

let squareElements = document.querySelectorAll('.white, .brown');

for (let i = 0; i < squareElements.length; i++) {
    squareElements[i].addEventListener('mouseenter', mouseEnterHandler);
    squareElements[i].addEventListener('click', clickHandler);
}

function mouseEnterHandler(event) {
    if (gameStatus == 0 && whiteTurn) {
        if (event.target.dataset.piece == 'Pawn' && event.target.dataset.pieceColour == 'white' && !whitePawns[event.target.dataset.number].moved) {
            pieceToMove = event.target;
            highlightPossibleMoves(event, 'unmoved' + event.target.dataset.piece);
        } else if (event.target.dataset.pieceColour == 'white') {
            highlightPossibleMoves(event, event.target.dataset.piece);
        }
    } else if (gameStatus == 0 && !whiteTurn) {
        if (event.target.dataset.piece == 'Pawn' && event.target.dataset.pieceColour == 'black' && !blackPawns[event.target.dataset.number].moved) {
            pieceToMove = event.target;
            highlightPossibleMoves(event, 'unmoved' + event.target.dataset.piece);
        }
    } else if (gameStatus == 1) {
        if (!activeSquares.includes(event.target)) {
            for (let i = 0; i < squareElements.length; i++) {
                squareElements[i].classList.remove('highlighted');
            }
            activeSquares = [];
            gameStatus = 0;
            mouseEnterHandler(event);
        }
    }
}

function highlightPossibleMoves(event, piece) {
    if (whiteTurn) {
        if (piece == 'unmovedPawn') {
            let row = Number(event.target.dataset.row) - 1;
            if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                row--;
                if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                    document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                }
            }
            row = Number(event.target.dataset.row) - 1;
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
            column = Number(event.target.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
        } else if (piece == 'Pawn') {
            let row = Number(event.target.dataset.row) - 1;
            if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
            }
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else {
                column = Number(event.target.dataset.column) + 1;
                if ((document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black')) {
                    document.getElementById(row + '-' + column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + column));
                }
            }
        }
    } else {
        if (piece == 'unmovedPawn') {
            let row = Number(event.target.dataset.row) + 1;
            if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                row++;
                if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                    document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                }
            }
            row = Number(event.target.dataset.row) + 1;
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
            column = Number(event.target.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
        } else if (piece == 'Pawn') {
            let row = Number(event.target.dataset.row) + 1;
            if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
            }
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else {
                column = Number(event.target.dataset.column) + 1;
                if ((document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white')) {
                    document.getElementById(row + '-' + column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + column));
                }
            }
        }
    }
    gameStatus = 1;
}

function clickHandler(event) {
    if (gameStatus == 1 && activeSquares.includes(event.target)) {
        if (pieceToMove.dataset.piece == 'Pawn') {
            if (pieceToMove.dataset.pieceColour == 'white' && !whitePawns[pieceToMove.dataset.number].moved) {
                whitePawns[pieceToMove.dataset.number].moved = true;
            } else if (!blackPawns[pieceToMove.dataset.number].moved) {
                blackPawns[pieceToMove.dataset.number].moved = true;
            }
        }
        event.target.dataset.piece = pieceToMove.dataset.piece;
        event.target.dataset.pieceColour = pieceToMove.dataset.pieceColour;
        event.target.innerHTML = pieceToMove.innerHTML;
        if (pieceToMove.dataset.number != undefined) {
            event.target.dataset.number = pieceToMove.dataset.number;
        }
        pieceToMove.dataset.piece = 'Empty';
        pieceToMove.dataset.pieceColour = undefined;
        pieceToMove.innerHTML = '';
        whiteTurn = !whiteTurn;
        gameStatus = 0;
        activeSquares = [];

        for (let i = 0; i < squareElements.length; i++) {
            squareElements[i].classList.remove('highlighted');
        }
    }
}