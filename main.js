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
        if () {}
        let whiteSquare = document.createElement('div');
        whiteSquare.classList.add('white');
        whiteSquare.id = row + '-' + column;
        whiteSquare.dataset.row = row;
        whiteSquare.dataset.column = column;
        
    }
}