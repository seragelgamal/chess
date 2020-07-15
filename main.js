let boardContainer = document.getElementById('board');

// 0 - empty
// 1 - pawn
// 2 - rook
// 3 - knight
// 4 - bishop
// 5 - queen
// 6 - king

let boardArray = [ [2, 3, 4, 6, 5, 4, 3, 2],
                   [1, 1, 1, 1, 1, 1, 1, 1],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [1, 1, 1, 1, 1, 1, 1, 1],
                   [2, 3, 4, 6, 5, 4, 3, 2] ];

for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
        let whiteSquare = document.createElement('div');
        if (boardArray[row][column] == 1) {
            whiteSquare.innerHTML += '<img src="media/whitePawn.png"></img>';
        } else if (boardArray[row][column] == 2) {
            whiteSquare.innerHTML += '<img src="media/whiteRook.png"></img>';
        } else if (boardArray[row][column] == 3) {
            whiteSquare.innerHTML += '<img src="media/whiteKnight.png"></img>';
        } else if (boardArray[row][column] == 4) {
            whiteSquare.innerHTML += '<img src="media/whiteBishop.png"></img>';
        } else if (boardArray[row][column] == 5) {
            whiteSquare.innerHTML += '<img src="media/whiteQueen.png"></img>';
        } else if (boardArray[row][column] == 6) {
            whiteSquare.innerHTML += '<img src="media/whiteKing.png"></img>';
        }
        whiteSquare.classList.add('white');
        whiteSquare.id = row + '-' + column;
        whiteSquare.dataset.row = row;
        whiteSquare.dataset.column = column;
        boardContainer.append(whiteSquare);

        // column++;
        
        let blackSquare = document.createElement('div');
        if (boardArray[row][column] == 1) {
            blackSquare.innerHTML += '<img src="media/blackPawn.png"></img>';
        } else if (boardArray[row][column] == 2) {
            blackSquare.innerHTML += '<img src="media/blackRook.png"></img>';
        } else if (boardArray[row][column] == 3) {
            blackSquare.innerHTML += '<img src="media/blackKnight.png"></img>';
        } else if (boardArray[row][column] == 4) {
            blackSquare.innerHTML += '<img src="media/blackBishop.png"></img>';
        } else if (boardArray[row][column] == 5) {
            blackSquare.innerHTML += '<img src="media/blackQueen.png"></img>';
        } else if (boardArray[row][column] == 6) {
            blackSquare.innerHTML += '<img src="media/blackKing.png"></img>';
        }
        blackSquare.classList.add('black');
        blackSquare.id = row + '-' + column;
        blackSquare.dataset.row = row;
        blackSquare.dataset.column = column;
        
        boardContainer.append(blackSquare);
    }
}