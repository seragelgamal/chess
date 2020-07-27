// Chess Game
// Serag Elgamal
// 7/27/2020

// GAME LOGIC

// set global game variables
let whiteTurn = true;
let gameStatus = 0;
let activeSquares = [];
let pieceToMove;

// click event handler
function clickHandler(event) {
    // make sure the code focuses on the actual div, not the piece if there is one
    let targetElement;
    if (event.target.tagName == 'IMG') {
        targetElement = event.target.parentNode;
    } else {
        targetElement = event.target;
    }


    if (gameStatus == 0 && whiteTurn) {
        // if game status is 0 (no piece selected) and a click is detected then highlight the moves for the piece that's clicked
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
        // if game status is 1 (a piece has been selected and its moves are currently highlighted) and a click is detected then move the piece to the clicked square if applicable
        if (!activeSquares.includes(targetElement)) {
            // if the clicked square is invalid, clear all highlighted moves and deselect the piece
            for (let i = 0; i < squareElements.length; i++) {
                squareElements[i].classList.remove('highlighted', 'selected');
            }
            activeSquares = [];
            gameStatus = 0;
        } else {
            // if the piece is valid, set the game status to 2 (green light to move the piece) and run another click handler to move the piece
            gameStatus = 2;
            clickHandler(event);
        }
    } else if (gameStatus == 2) {
        // if game status is 2 (green light to move the piece) then move the piece
        if (targetElement.dataset.piece != 'Empty' && targetElement.dataset.pieceColour != pieceToMove.dataset.pieceColour) {
            // if there's another different-coloured piece on the square that the selected piece is trying to move to, capture it
            capturedPieceContainer.innerHTML += targetElement.innerHTML;
        }
        if (targetElement.dataset.piece == 'King') {
            // if a king has been captured, announce the win and reset the game
            if (whiteTurn) {
                alert('GAME OVER: White has won');
            } else {
                alert('GAME OVER: Black has won');
            }
            location.reload();
        }
        if (pieceToMove.dataset.piece == 'Pawn') {
            // if a pawn is being moved, make sure its value in its respective boolean array is set to true
            if (pieceToMove.dataset.pieceColour == 'white') {
                whitePawnBooleans[pieceToMove.dataset.number] = true;
            } else {
                blackPawnBooleans[pieceToMove.dataset.number] = true;
            }
        }
        // move the piece
        targetElement.dataset.piece = pieceToMove.dataset.piece;
        targetElement.dataset.pieceColour = pieceToMove.dataset.pieceColour;
        targetElement.innerHTML = pieceToMove.innerHTML;
        if (pieceToMove.dataset.number != undefined) {
            targetElement.dataset.number = pieceToMove.dataset.number;
        }
        pieceToMove.dataset.piece = 'Empty';
        pieceToMove.dataset.pieceColour = undefined;
        pieceToMove.innerHTML = '';
        // clear the highlighted squares (essential for the game to check for checks)
        activeSquares = [];
        for (let i = 0; i < squareElements.length; i++) {
            squareElements[i].classList.remove('highlighted', 'selected');
        }
        // check if any pawns are eligible for promotion
        checkForPawnPromotion();
        // set game status to 3 (essential for the game to check for checks)
        gameStatus = 3;
        // check for a check
        checkForCheck(targetElement);
        // get the game ready for next turn
        pieceToMove = undefined;
        whiteTurn = !whiteTurn;
        if (whiteTurn) {
            turnDisplay.innerHTML = 'White';
        } else {
            turnDisplay.innerHTML = 'Black';
        }
        // set game status back to 0 (no piece selected)
        gameStatus = 0;
    }
}

function highlightPossibleMoves(targetElement, piece) {
    // highlight the possible moves based on which piece was selected
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
            }
            column = Number(targetElement.dataset.column) + 1;
            if (document.getElementById(row + '-' + column) != null && document.getElementById(row + '-' + column).dataset.piece != 'Empty' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
                highlightSquare(row, column);
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
        }
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
    // if the game status is 0 (no piece selected), set it to 1 (piece selected and moves highlighted)
    // (this function is also invoked during the process of checking for checks, where the game status is 3. so if the function was programmed to set the game status to 1 unconditionally, problems would occur)
    if (gameStatus == 0) {
        gameStatus = 1;
    }
}

// basic function for highlighting a square w/ a given row and column. even though it's only 2 lines, it's invoked a LOT so makes the code much cleaner and shorter
function highlightSquare(row, column) {
    document.getElementById(row + '-' + column).classList.add('highlighted');
    activeSquares.push(document.getElementById(row + '-' + column));
}

// because a queen's movement is a combination of a rook and a bishop, functions have been made for the highlighting of their moves so that when highlighting a queen's possible moves, the program can simply call both funtions
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

// checks if any pawns are eligible for promotion
function checkForPawnPromotion() {
    // check for any pawns in the top-most row, make sure they're white, and initiate the pawn promotion
    let row = 0;
    for (let column = 0; column < 8; column++) {
        if (document.getElementById(row + '-' + column).dataset.piece == 'Pawn' && document.getElementById(row + '-' + column).dataset.pieceColour == 'white') {
            pawnPromotion('white', row, column);
        }
    }
    // check for any pawns in the bottom row, make sure they're black, and initiate the pawn promotion
    row = 7;
    for (let column = 0; column < 8; column++) {
        if (document.getElementById(row + '-' + column).dataset.piece == 'Pawn' && document.getElementById(row + '-' + column).dataset.pieceColour == 'black') {
            pawnPromotion('black', row, column);
        }
    }
}

function pawnPromotion(colour, row, column) {
    // ask the player what piece he wants to promote the pawn to
    let newPiece = prompt('Choose a piece (queen, bishop, or rook) to promote this pawn to:', 'queen');
    newPiece = newPiece.toLowerCase();
    newPiece = newPiece.trim();
    // repeat the process if it's an invalid piece
    if (newPiece != 'queen' && newPiece != 'bishop' && newPiece != 'rook') {
        alert('Invalid piece name.');
        pawnPromotion(colour, row, column);
    } else {
        // if it's a valid piece, promote the pawn
        document.getElementById(row + '-' + column).dataset.piece = newPiece;
        delete document.getElementById(row + '-' + column).dataset.number;
        document.getElementById(row + '-' + column).innerHTML = '<img src="media/' + colour + newPiece + '.png"></img>';
    }
}

// if the game status is 3 (checking for a check), don't allow any squares to be highlighted
// this will come in handy when checking for a check
while (gameStatus == 3) {
    for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].classList.remove('highlighted', 'selected');
    }
    pieceToMove = undefined;
}

// checks if the opposing side's king is in check (LIMITED FUNCTIONALITY)
function checkForCheck(targetElement) {
    // find the new possible moves of the piece that has just been moved
    // the pieces won't actually be highlighted because the game status is 3, so all of this is done in the background
    highlightPossibleMoves(targetElement, targetElement.dataset.piece);
    // see if any of the possible moves include a king and announce a check if true
    if (activeSquares.length > 0) {
        for (let i = 0; i < activeSquares.length; i++) {
            if (activeSquares[i].dataset.piece == 'King' && activeSquares[i].dataset.piece != targetElement.dataset.pieceColour) {
                alert('CHECK');
            }
        }
    }
    // clear the global variables used in the highlightPossibleMoves() function, because it is used in the process of checking for a check
    activeSquares = [];
    for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].classList.remove('highlighted', 'selected');
    }
    pieceToMove = undefined;
}