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

let numberLegend = ['', 'Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King'];

let blackPieces = {
    pawn1: {
        row: 1,
        column: 0,
        moved: false
    },
    pawn2: {
        row: 1,
        column: 1,
        moved: false
    },
    pawn3: {
        row: 1,
        column: 2,
        moved: false
    },
    pawn4: {
        row: 1,
        column: 3,
        moved: false
    },
    pawn5: {
        row: 1,
        column: 4,
        moved: false
    },
    pawn6: {
        row: 1,
        column: 5,
        moved: false
    },
    pawn7: {
        row: 1,
        column: 6,
        moved: false
    },
    pawn8: {
        row: 1,
        column: 7,
        moved: false
    },
    rook1: {
        row: 0,
        column: 0
    },
    rook2: {
        row: 0,
        column: 7
    },
    knight1: {
        row: 0,
        column: 1
    },
    knight2: {
        row: 0,
        column: 6
    },
    bishop1: {
        row: 0,
        column: 2
    },
    bishop2: {
        row: 0,
        column: 5
    },
    queen: {
        row: 0,
        column: 3
    },
    king: {
        row: 0,
        column: 4
    }
}

let whitePieces = {
    pawn1: {
        row: 6,
        column: 0,
        moved: false
    },
    pawn2: {
        row: 6,
        column: 1,
        moved: false
    },
    pawn3: {
        row: 6,
        column: 2,
        moved: false
    },
    pawn4: {
        row: 6,
        column: 3,
        moved: false
    },
    pawn5: {
        row: 6,
        column: 4,
        moved: false
    },
    pawn6: {
        row: 6,
        column: 5,
        moved: false
    },
    pawn7: {
        row: 6,
        column: 6,
        moved: false
    },
    pawn8: {
        row: 6,
        column: 7,
        moved: false
    },
    rook1: {
        row: 7,
        column: 0
    },
    rook2: {
        row: 7,
        column: 7
    },
    knight1: {
        row: 7,
        column: 1
    },
    knight2: {
        row: 7,
        column: 6
    },
    bishop1: {
        row: 7,
        column: 2
    },
    bishop2: {
        row: 7,
        column: 5
    },
    queen: {
        row: 7,
        column: 3
    },
    king: {
        row: 7,
        column: 4
    }
}

for (let row = 0; row < 8; row++) {
    for (let square = 0; square < 8; square++) {
        let whiteSquare = document.createElement('div');
        whiteSquare.classList.add('white');
        whiteSquare.id = row + '-' + square;
        whiteSquare.dataset.row = row;
        whiteSquare.dataset.column = square;
        whiteSquare.dataset.piece = 'white' + numberLegend[boardArray[row][square]];
        boardContainer.append(whiteSquare);

        square++;

        let brownSquare = document.createElement('div');
        brownSquare.classList.add('brown');
        brownSquare.id = row + '-' + square;
        brownSquare.dataset.row = row;
        brownSquare.dataset.column = square;
        brownSquare.dataset.piece = 'black' + numberLegend[boardArray[row][square]];
        boardContainer.append(brownSquare);
    }
    row++;
    for (let square = 0; square < 8; square++) {
        let brownSquare = document.createElement('div');
        brownSquare.classList.add('brown');
        brownSquare.id = row + '-' + square;
        brownSquare.dataset.row = row;
        brownSquare.dataset.column = square;
        brownSquare.dataset.piece = 'black' + numberLegend[boardArray[row][square]];
        boardContainer.append(brownSquare);

        square++;

        let whiteSquare = document.createElement('div');
        whiteSquare.classList.add('white');
        whiteSquare.id = row + '-' + square;
        whiteSquare.dataset.row = row;
        whiteSquare.dataset.column = square;
        whiteSquare.dataset.piece = 'white' + numberLegend[boardArray[row][square]];
        boardContainer.append(whiteSquare);
    }
}

for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 8; column++) {
        if (numberLegend[boardArray[row][column]] != 0) {
            document.getElementById(row + '-' + column).innerHTML += '<img src="media/black' + numberLegend[boardArray[row][column]] + '.png"></img>';
        }
    }
}
for (let row = 6; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
        if (numberLegend[boardArray[row][column]] != 0) {
            document.getElementById(row + '-' + column).innerHTML += '<img src="media/white' + numberLegend[boardArray[row][column]] + '.png"></img>';
        }
    }
}

let whiteTurn = true;

let squareElements = document.querySelectorAll('.white, .brown');

for (let i = 0; i < squareElements.length; i++) {
    squareElements[i].addEventListener('mouseenter', mouseEnterHandler);
    squareElements[i].addEventListener('mouseleave', mouseLeaveHandler);
}

function mouseEnterHandler(e) {
    // console.log(e.target);
    if (whiteTurn) {
        if (e.target.dataset.piece == 'Pawn' && (!whitePieces.this.moved)) {

        } 
    } else {

    }
}

function mouseLeaveHandler(e) {
    // console.log(e);
}