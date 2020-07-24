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

let blackPawnBooleans = pushPawnBooleanArray();
let whitePawnBooleans = pushPawnBooleanArray();

function pushPawnBooleanArray() {
    let pawnBooleanArray = [];
    for (let column = 0; column < 8; column++) {
        pawnBooleanArray.push(false);
    }
    return pawnBooleanArray;
}

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
                highlightSquare(row, targetElement.dataset.column);
                row--;
                if (document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                    highlightSquare(row, targetElement.dataset.column);
                }
            }
            row = Number(targetElement.dataset.row) - 1;
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                highlightSquare(row, column);
            }
            column = Number(targetElement.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                highlightSquare(row, column);
            }
        } else {
            let row = Number(targetElement.dataset.row) + 1;
            if (document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                highlightSquare(row, targetElement.dataset.column);
                row++;
                if (document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                    highlightSquare(row, targetElement.dataset.column);
                }
            }
            row = Number(targetElement.dataset.row) + 1;
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                highlightSquare(row, column);
                column = Number(targetElement.dataset.column) + 1;
                if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                    highlightSquare(row, column);
                }
            }
        }
    } else if (piece == 'Pawn') {
        if (whiteTurn) {
            let row = Number(targetElement.dataset.row) - 1;
            if (document.getElementById(row + '-' + targetElement.dataset.column) != null && document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                highlightSquare(row, targetElement.dataset.column);
            }
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
                highlightSquare(row, column);
            }
            column += 2;
            if ((document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black')) {
                highlightSquare(row, column);
            }
        } else {
            let row = Number(targetElement.dataset.row) + 1;
            if (document.getElementById(row + '-' + targetElement.dataset.column) != null && document.getElementById(row + '-' + targetElement.dataset.column).dataset.piece == 'Empty') {
                highlightSquare(row, targetElement.dataset.column);
            }
            let column = Number(targetElement.dataset.column) - 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                highlightSquare(row, column);
            } else {
                column += 2;
                if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                    highlightSquare(row, column);
                }
            }
        }
    } else if (piece == 'Rook') {
        highlightRookMoves(targetElement);
    } else if (piece == 'Knight') {
        let row = Number(targetElement.dataset.row) - 2;
        let column = Number(targetElement.dataset.column) + 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
        row = Number(targetElement.dataset.row) - 1;
        column = Number(targetElement.dataset.column) + 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
        row = Number(targetElement.dataset.row) + 1;
        column = Number(targetElement.dataset.column) + 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
        row = Number(targetElement.dataset.row) + 2;
        column = Number(targetElement.dataset.column) + 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
        row = Number(targetElement.dataset.row) + 2;
        column = Number(targetElement.dataset.column) - 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
        row = Number(targetElement.dataset.row) + 1;
        column = Number(targetElement.dataset.column) - 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
        row = Number(targetElement.dataset.row) - 1;
        column = Number(targetElement.dataset.column) - 2;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
        row = Number(targetElement.dataset.row) - 2;
        column = Number(targetElement.dataset.column) - 1;
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
        }
    } else if (piece == 'Bishop') {
        highlightBishopMoves(targetElement);
    } else if (piece == 'Queen') {
        highlightRookMoves(targetElement);
        highlightBishopMoves(targetElement);
    } else if (piece == 'King') {
        let row = Number(targetElement.dataset.row) - 1;
        let column = Number(targetElement.dataset.column);
        if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
            highlightSquare(row, column);
            column++;
            if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
                highlightSquare(row, column);
            }
            row++;
            if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
                highlightSquare(row, column);
            }
            row++;
            if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
                highlightSquare(row, column);
            }
            column--;
            if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
                highlightSquare(row, column);
            }
            column--;
            if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
                highlightSquare(row, column);
            }
            row--;
            if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
                highlightSquare(row, column);
            }
            row--;
            if (document.getElementById(row + '-' + column) != null && (document.getElementById(row + '-' + column).dataset.piece == 'Empty' || document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour)) {
                highlightSquare(row, column);
            }
        }
    }
    if (gameStatus == 0) {
        gameStatus = 1;
    }
}

function highlightSquare(row, column) {
    document.getElementById(row + '-' + column).classList.add('highlighted');
    activeSquares.push(document.getElementById(row + '-' + column));
}

function highlightRookMoves(targetElement) {
    let status = true;
    let row;
    let column = Number(targetElement.dataset.column);
    for (row = Number(targetElement.dataset.row) - 1; row >= 0; row--) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
    }
    status = true;
    for (row = Number(targetElement.dataset.row) + 1; row < 8; row++) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
    }
    status = true;
    row = Number(targetElement.dataset.row);
    for (column = Number(targetElement.dataset.column) - 1; column >= 0; column--) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
    }
    status = true;
    for (column = Number(targetElement.dataset.column) + 1; column < 8; column++) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
    }
}

function highlightBishopMoves(targetElement) {
    let row;
    let column;
    let status = true;
    for (row = Number(targetElement.dataset.row) - 1, column = Number(targetElement.dataset.column) + 1; row >= 0, column < 8; row--, column++) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
    }
    status = true;
    for (row = Number(targetElement.dataset.row) + 1, column = Number(targetElement.dataset.column) + 1; row < 8, column < 8; row++, column++) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
    }
    status = true;
    for (row = Number(targetElement.dataset.row) + 1, column = Number(targetElement.dataset.column) - 1; row < 8, column >= 0; row++, column--) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
    }
    status = true;
    for (row = Number(targetElement.dataset.row) - 1, column = Number(targetElement.dataset.column) - 1; row >= 0, column >= 0; row--, column--) {
        if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece == 'Empty' && status) {
            highlightSquare(row, column);
        } else if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.pieceColour != targetElement.dataset.pieceColour && status) {
            highlightSquare(row, column);
            status = false;
        } else {
            status = false;
        }
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
            capturedPieceContainer.innerHTML += targetElement.innerHTML;
        }
        if (targetElement.dataset.piece == 'King') {
            if (whiteTurn) {
                alert('GAME OVER: White has won');
            } else {
                alert('GAME OVER: Black has won');
            }
            location.reload();
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
        activeSquares = [];
        for (let i = 0; i < squareElements.length; i++) {
            squareElements[i].classList.remove('highlighted', 'selected');
        }
        checkForPawnPromotion();
        gameStatus = 3;
        checkForCheck(targetElement);
        pieceToMove = undefined;
        whiteTurn = !whiteTurn;
        if (whiteTurn) {
            turnDisplay.innerHTML = 'White';
        } else {
            turnDisplay.innerHTML = 'Black';
        }
        gameStatus = 0;
    }
}

function checkForPawnPromotion() {
    let row = 0;
    for (let column = 0; column < 8; column++) {
        if (document.getElementById(row + '-' + column).dataset.piece == 'Pawn' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
            pawnPromotion('white', row, column);
        }
    }
    row = 7;
    for (let column = 0; column < 8; column++) {
        if (document.getElementById(row + '-' + column).dataset.piece == 'Pawn' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
            pawnPromotion('black', row, column);
        }
    }
}

function pawnPromotion(colour, row, column) {
    let newPiece = prompt('Choose a piece (queen, bishop, or rook) to promote this pawn to:', 'queen');
    newPiece = newPiece.toLowerCase();
    newPiece = newPiece.trim();
    if (newPiece != 'queen' && newPiece != 'bishop' && newPiece != 'rook') {
        alert('Invalid piece name.');
        pawnPromotion(colour, row, column);
    } else {
        document.getElementById(row + '-' + column).dataset.piece = newPiece;
        delete document.getElementById(row + '-' + column).dataset.number;
        document.getElementById(row + '-' + column).innerHTML = '<img src="media/' + colour + newPiece + '.png"></img>';
    }
}

function checkForCheck(targetElement) {
    highlightPossibleMoves(targetElement, targetElement.dataset.piece);
    pieceToMove = undefined;
    if (activeSquares.length > 0) {
        for (let i = 0; i < activeSquares.length; i++) {
            if (activeSquares[i].dataset.piece == 'King' && activeSquares[i].dataset.piece != targetElement.dataset.pieceColour) {
                // if (checkForCheckmate()) {
                //     alert('CHECKMATE');
                // } else {
                alert('CHECK');
                // }
            }
        }
    }
    activeSquares = [];
    for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].classList.remove('highlighted', 'selected');
    }
    pieceToMove = undefined;
}

while (gameStatus == 3) {
    for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].classList.remove('highlighted', 'selected');
    }
    pieceToMove = undefined;
}