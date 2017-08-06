function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function makeBoard(width, height, mines) {
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

export function initializeBoard(width, height, mines) {
    const board = [];

    for (let i = 0; i < mines;) {
        let x = getRandomInt(0, height);
        let y = getRandomInt(0, width);
        if (board.find(cell => cell.x === x && cell.y === y)) {
            continue;
        }
        board.push({x, y});

        i++;
    }

    return board;
}
