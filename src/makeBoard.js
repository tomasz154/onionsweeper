function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function makeBoard(width, height, mines) {
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

    for (let i = 0; i < mines;) {
        const cell = arr[getRandomInt(0, height)][getRandomInt(0, width)];
        if (cell.mine) {
            continue;
        }
        cell.mine = true;
        i++;
    }

    return arr;
}
