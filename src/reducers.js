import * as ACTION_TYPES from './actionTypes';

const initialState = {
    levels: [
        {
            width: 10,
            height: 10,
            mines: 10,
            name: 'Easy'
        },
        {
            width: 16,
            height: 16,
            mines: 40,
            name: 'Medium'
        },
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_LEVEL:
            return {
                ...state,
                settings: {
                    ...state.setttings,
                    currentLevel: action.level,
                },
            };

        case ACTION_TYPES.RESET:
            return {
                ...state,

                board: action.board,
                gameOver: false,
                won: false,
                totalMines: action.mines,
                markedMines: 0,
                started: false,
                elapsedTime: 0,
            };

        case ACTION_TYPES.TOGGLE_MARK:
            if (state.gameOver || state.board[action.i][action.j].revealed) {
                return state;
            }

            state = toggleMark(state, action.i, action.j);
            state = check(state);

            return state;

        case ACTION_TYPES.REVEAL_CELL:
            if (state.gameOver || state.board[action.i][action.j].marked) {
                return state;
            }

            state = reveal(state, action.i, action.j);
            state = check(state);

            return state;

        case ACTION_TYPES.START:
            return {
                ...state,
                started: true,
            };

        case ACTION_TYPES.INCREMENT_TIME:
            if (state.started && !state.gameOver) {
                return {
                    ...state,
                    elapsedTime: state.elapsedTime + 1,
                };
            } else {
                return state;
            }

        default:
            return state;

    }
}

function reveal(state, i, j) {
    if (state.board[i][j].revealed) {
        return state;
    }

    if (state.board[i][j].mine) {
        return {
            ...state,
            gameOver: true,
            board: state.board.map((row, ii) => ii === i ? row.map((cell, jj) => jj === j ? {
                ...cell,
                exploded: true,
                revealed: true,
            } : cell) : row),
        };
    }

    const adjacentMines = countAdjacentMines(state, i, j);

    state = {
        ...state,
        revealedCells: state.revealedCells + 1,
        board: state.board.map((row, ii) => i === ii ? row.map((cell, jj) => j === jj ? {
            ...cell,
            revealed: true,
            adjacentMines,
        } : cell) : row),
    };

    if (adjacentMines === 0) {
        state = revealAdjacentCells(state, i, j);
    }

    return state;
}

function countAdjacentMines(state, i, j) {
    let result = 0;

    for (let ii = i - 1; ii <= i + 1; ii++) {
        for (let jj = j - 1; jj <= j + 1; jj++) {
            if (state.board[ii] && state.board[ii][jj] && state.board[ii][jj].mine) {
                result++;
            }
        }
    }

    return result;
}

function revealAdjacentCells(state, i, j) {
    for (let ii = i - 1; ii <= i + 1; ii++) {
        for (let jj = j - 1; jj <= j + 1; jj++) {
            if (!(i === ii && j === jj) && state.board[ii] && state.board[ii][jj]) {
                state = reveal(state, ii, jj);
            }
        }
    }

    return state;
}

function toggleMark(state, i, j) {
    state = {
        ...state,
        board: state.board.map((row, ii) => ii === i ? row.map((cell, jj) => jj === j ? {
            ...cell,
            marked: !cell.marked,
        } : cell) : row),
        markedMines: state.markedMines + (state.board[i][j].marked ? -1 : 1),
    };
    return state;
}

function check(state) {
    if (state.board.reduce((prev, current) => prev + current.reduce((prev, current) => prev + ((current.revealed || current.marked) ? 0 : 1), 0), 0) === 0) {
        state.gameOver = true;
        state.won = true;
    }
    return state;
}
