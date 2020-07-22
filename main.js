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

let blackPawnBooleans = [];
for (let column = 0; column < 8; column++) {
    blackPawnBooleans.push(false);
}

let whitePawnBooleans = [];
for (let column = 0; column < 8; column++) {
    whitePawnBooleans.push(false);
}

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

let whiteTurn = true;
let gameStatus = 0;

let activeSquares = [];
let pieceToMove;

let squareElements = document.querySelectorAll('.white, .brown');

for (let i = 0; i < squareElements.length; i++) {
    squareElements[i].addEventListener('click', clickHandler);
}

let turnDisplay = document.getElementById('turn');
let capturedPieceContainer = document.getElementById('capturedPieces');

function highlightPossibleMoves(targetElement, piece) {
    if (piece == 'unmovedPawn') {
        if (whiteTurn) {
            let row = Number(targetElement.dataset.row) - 1;
            if (document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + targetElement.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + targetElement.dataset.column));
                row--;
                if (document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                    document.getElementById(row + '-' + targetElement.dataset.column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + targetElement.dataset.column));
                }
            }
            row = Number(targetElement.dataset.row) - 1;
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
            column = Number(targetElement.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
        } else {
            let row = Number(targetElement.dataset.row) + 1;
            if (document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + targetElement.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + targetElement.dataset.column));
                row++;
                if (document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                    document.getElementById(row + '-' + targetElement.dataset.column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + targetElement.dataset.column));
                }
            }
            row = Number(targetElement.dataset.row) + 1;
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
            column = Number(targetElement.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
        }
        gameStatus = 1;
    } else if (piece == 'Pawn') {
        if (whiteTurn) {
            let row = Number(targetElement.dataset.row) - 1;
            if (document.getElementById(row + '-' + targetElement.dataset.column) != null && document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + targetElement.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + targetElement.dataset.column));
            }
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
            column += 2;
            if ((document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black')) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            }
        } else {
            let row = Number(targetElement.dataset.row) + 1;
            if (document.getElementById(row + '-' + targetElement.dataset.column) != null && document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                document.getElementById(row + '-' + targetElement.dataset.column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + targetElement.dataset.column));
            }
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else {
                column += 2;
                if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                    document.getElementById(row + '-' + column).classList.add('highlighted');
                    activeSquares.push(document.getElementById(row + '-' + column));
                }
            }
        }
        gameStatus = 1;
    } else if (piece == 'Rook') {
        let status = true;
        let row;
        let column = Number(targetElement.dataset.column);
        for (row = Number(targetElement.dataset.row) - 1; row >= 0; row--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) + 1; row < 8; row++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        row = Number(targetElement.dataset.row);
        for (column = Number(targetElement.dataset.column) - 1; column >= 0; column--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (column = Number(targetElement.dataset.column) + 1; column < 8; column++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        gameStatus = 1;
    } else if (piece == 'Knight') {
        let row = Number(targetElement.dataset.row) - 2;
        let column = Number(targetElement.dataset.column) + 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(targetElement.dataset.row) - 1;
        column = Number(targetElement.dataset.column) + 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(targetElement.dataset.row) + 1;
        column = Number(targetElement.dataset.column) + 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(targetElement.dataset.row) + 2;
        column = Number(targetElement.dataset.column) + 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(targetElement.dataset.row) + 2;
        column = Number(targetElement.dataset.column) - 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(targetElement.dataset.row) + 1;
        column = Number(targetElement.dataset.column) - 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(targetElement.dataset.row) - 1;
        column = Number(targetElement.dataset.column) - 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row = Number(targetElement.dataset.row) - 2;
        column = Number(targetElement.dataset.column) - 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        gameStatus = 1;
    } else if (piece == 'Bishop') {
        let row;
        let column;
        let status = true;
        for (row = Number(targetElement.dataset.row) - 1, column = Number(targetElement.dataset.column) + 1; row >= 0, column < 8; row--, column++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) + 1, column = Number(targetElement.dataset.column) + 1; row < 8, column < 8; row++, column++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) + 1, column = Number(targetElement.dataset.column) - 1; row < 8, column >= 0; row++, column--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) - 1, column = Number(targetElement.dataset.column) - 1; row >= 0, column >= 0; row--, column--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        gameStatus = 1;
    } else if (piece == 'Queen') {
        let status = true;
        let row;
        let column = Number(targetElement.dataset.column);
        for (row = Number(targetElement.dataset.row) - 1; row >= 0; row--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) + 1; row < 8; row++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        row = Number(targetElement.dataset.row);
        for (column = Number(targetElement.dataset.column) - 1; column >= 0; column--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (column = Number(targetElement.dataset.column) + 1; column < 8; column++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) - 1, column = Number(targetElement.dataset.column) + 1; row >= 0, column < 8; row--, column++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) + 1, column = Number(targetElement.dataset.column) + 1; row < 8, column < 8; row++, column++) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) + 1, column = Number(targetElement.dataset.column) - 1; row < 8, column >= 0; row++, column--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        status = true;
        for (row = Number(targetElement.dataset.row) - 1, column = Number(targetElement.dataset.column) - 1; row >= 0, column >= 0; row--, column--) {
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
            } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
                document.getElementById(row + '-' + column).classList.add('highlighted');
                activeSquares.push(document.getElementById(row + '-' + column));
                status = false;
            } else {
                status = false;
            }
        }
        gameStatus = 1;
    } else if (piece == 'King') {
        let row = Number(targetElement.dataset.row) - 1;
        let column = Number(targetElement.dataset.column);
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        column++;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row++;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row++;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        column--;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        column--;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row--;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        row--;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            document.getElementById(row + '-' + column).classList.add('highlighted');
            activeSquares.push(document.getElementById(row + '-' + column));
        }
        gameStatus = 1;
    }
}

function clickHandler(event) {
    let targetElement;
    if (event.target.tagName == 'IMG') {
        targetElement = event.target.parentNode;
    } else {
        targetElement = event.target;
    }
    if (gameStatus == 0 && whiteTurn) {
        if (targetElement.dataset.piece == 'Pawn' && targetElement.dataset.pieceColour == 'white' && !whitePawnBooleans[targetElement.dataset.number]) {
            pieceToMove = targetElement;
            targetElement.classList.add('selected');
            highlightPossibleMoves(targetElement, 'unmoved' + targetElement.dataset.piece);
        } else if (targetElement.dataset.pieceColour == 'white') {
            pieceToMove = targetElement;
            targetElement.classList.add('selected');
            highlightPossibleMoves(targetElement, targetElement.dataset.piece);
        }
    } else if (gameStatus == 0 && !whiteTurn) {
        if (targetElement.dataset.piece == 'Pawn' && targetElement.dataset.pieceColour == 'black' && !blackPawnBooleans[targetElement.dataset.number]) {
            pieceToMove = targetElement;
            targetElement.classList.add('selected');
            highlightPossibleMoves(targetElement, 'unmoved' + targetElement.dataset.piece);
        } else if (targetElement.dataset.pieceColour == 'black') {
            pieceToMove = targetElement;
            targetElement.classList.add('selected');
            highlightPossibleMoves(targetElement, targetElement.dataset.piece);
        }
    } else if (gameStatus == 1) {
        if (!activeSquares.includes(targetElement)) {
            for (let i = 0; i < squareElements.length; i++) {
                squareElements[i].classList.remove('highlighted', 'selected');
            }
            activeSquares = [];
            gameStatus = 0;
        } else {
            gameStatus = 2;
            clickHandler(event);
        }
    } else if (gameStatus == 2) {
        if (targetElement.dataset.piece != 'Empty' && targetElement.dataset.pieceColour != pieceToMove.dataset.pieceColour) {
            capturedPieceContainer.innerHTML += targetElement.innerHTML + '<br>';
        }
        if (pieceToMove.dataset.piece == 'Pawn') {
            if (pieceToMove.dataset.pieceColour == 'white') {
                whitePawnBooleans[pieceToMove.dataset.number] = true;
            } else {
                blackPawnBooleans[pieceToMove.dataset.number] = true;
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
        if (whiteTurn) {
            turnDisplay.innerHTML = 'White';
        } else {
            turnDisplay.innerHTML = 'Black';
        }
        gameStatus = 0;
        activeSquares = [];
        pieceToMove = undefined;
        for (let i = 0; i < squareElements.length; i++) {
            squareElements[i].classList.remove('highlighted', 'selected');
        }
    }
}