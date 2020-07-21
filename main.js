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

let blackPawns = [];
for (let column = 0; column < 8; column++) {
    blackPawns.push({
        row: 1,
        column: column,
        moved: false
    });
}

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

let whitePawns = [];
for (let column = 0; column < 8; column++) {
    whitePawns.push({
        row: 6,
        column: column,
        moved: false
    });
}

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

let capturedPieceContainer = document.getElementById('capturedPieces');

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
        } else if (event.target.dataset.pieceColour == 'black') {
            highlightPossibleMoves(event, event.target.dataset.piece);
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
                gameStatus = 1;
                row--;
                if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                    document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                    gameStatus = 1;
                }
            }
            row = Number(event.target.dataset.row) - 1;
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                gameStatus = 1;
            }
            column = Number(event.target.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                gameStatus = 1;
            }
        } else if (piece == 'Pawn') {
            let row = Number(event.target.dataset.row) - 1;
            if (document.getElementById(row + '-' + event.target.dataset.column) != null && document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                gameStatus = 1;
            }
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                gameStatus = 1;
            } else {
                column += 2;
                if ((document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black')) {
                    document.getElementById(row + '-' + column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + column));
                    gameStatus = 1;
                }
            }
        }
        pieceToMove = event.target;
    } else {
        if (piece == 'unmovedPawn') {
            let row = Number(event.target.dataset.row) + 1;
            if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                gameStatus = 1;
                row++;
                if (document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                    document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                    gameStatus = 1;
                }
            }
            row = Number(event.target.dataset.row) + 1;
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                gameStatus = 1;
            }
            column = Number(event.target.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                gameStatus = 1;
            }
        } else if (piece == 'Pawn') {
            let row = Number(event.target.dataset.row) + 1;
            if (document.getElementById(row + '-' + event.target.dataset.column) != null && document.getElementById(row + '-' + event.target.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + event.target.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + event.target.dataset.column));
                gameStatus = 1;
            }
            let column = Number(event.target.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                gameStatus = 1;
            } else {
                column += 2;
                if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                    document.getElementById(row + '-' + column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + column));
                    gameStatus = 1;
                }
            }
        }
        pieceToMove = event.target;
    }
    if (piece == 'Rook') {
        let status = true;
        let row;
        let column = Number(event.target.dataset.column);
        for (row = Number(event.target.dataset.row) - 1; row >= 0; row--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(event.target.dataset.row) + 1; row < 8; row++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        row = Number(event.target.dataset.row);
        for (column = Number(event.target.dataset.column) - 1; column >= 0; column--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (column = Number(event.target.dataset.column) + 1; column < 8; column++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        pieceToMove = event.target;
        gameStatus = 1;
    } else if (piece == 'Knight') {
        let row = Number(event.target.dataset.row) - 2;
        let column = Number(event.target.dataset.column) + 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(event.target.dataset.row) - 1;
        column = Number(event.target.dataset.column) + 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(event.target.dataset.row) + 1;
        column = Number(event.target.dataset.column) + 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(event.target.dataset.row) + 2;
        column = Number(event.target.dataset.column) + 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(event.target.dataset.row) + 2;
        column = Number(event.target.dataset.column) - 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(event.target.dataset.row) - 1;
        column = Number(event.target.dataset.column) - 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(event.target.dataset.row) - 2;
        column = Number(event.target.dataset.column) - 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != event.target.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        gameStatus = 1;
    }
}

function clickHandler(event) {
    if (gameStatus == 1) {
        let targetElement;
        if (event.target.tagName == 'IMG') {
            targetElement = event.target.parentNode;
        } else {
            targetElement = event.target;
        }
        if (gameStatus == 1 && activeSquares.includes(targetElement)) {
            if (targetElement.dataset.piece != 'Empty' && targetElement.dataset.pieceColour != pieceToMove.dataset.pieceColour) {
                capturedPieceContainer.innerHTML += targetElement.innerHTML + '<br>';
            }
            if (pieceToMove.dataset.piece == 'Pawn') {
                if (pieceToMove.dataset.pieceColour == 'white') {
                    whitePawns[pieceToMove.dataset.number].moved = true;
                    whitePawns[pieceToMove.dataset.number].row = Number(targetElement.dataset.row);
                    whitePawns[pieceToMove.dataset.number].column = Number(targetElement.dataset.column);
                } else {
                    blackPawns[pieceToMove.dataset.number].moved = true;
                    blackPawns[pieceToMove.dataset.number].row = Number(targetElement.dataset.row);
                    blackPawns[pieceToMove.dataset.number].column = Number(targetElement.dataset.column);
                }
            }
            targetElement.dataset.piece = pieceToMove.dataset.piece;
            targetElement.dataset.pieceColour = pieceToMove.dataset.pieceColour;
            targetElement.innerHTML = pieceToMove.innerHTML;
            if (pieceToMove.dataset.number != undefined) {
                targetElement.dataset.number = pieceToMove.dataset.number;
            }
            pieceToMove.dataset.piece = 'Empty';
            pieceToMove.dataset.pieceColour = undefined;
            pieceToMove.innerHTML = '';
            whiteTurn = !whiteTurn;
            gameStatus = 0;
            activeSquares = [];
            pieceToMove = undefined;

            for (let i = 0; i < squareElements.length; i++) {
                squareElements[i].classList.remove('highlighted');
            }
            mouseEnterHandler(event);
        }
    }



}