function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function makeBoard(width, height) {
    const arr = [];

    for (let i = 0; i < height; i++) {
        arr[i] = [];
        for (let j = 0; j < width; j++) {
            arr[i][j] = {
                mine: false,
                revealed: false,
                marked: false,
                exploded: false,
            };
        }
    }

    return arr;
}

export function initializeBoard(width, height, mines, i1, j1) {
    const board = [];

    for (let k = 0; k < mines;) {
        let i = getRandomInt(0, height);
        let j = getRandomInt(0, width);
        if (isSameOrAdjacent(i, j, i1, j1) || board.find(cell => cell.i === i && cell.j === j)) {
            continue;
        }
        board.push({i, j});

        k++;
    }

    return board;
}

function isSameOrAdjacent(i1, j1, i2, j2) {
    return Math.abs(i1 - i2) <= 1 && Math.abs(j1 - j2) <= 1;
}
