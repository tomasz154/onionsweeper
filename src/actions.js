import * as ACTION_TYPES from './actionTypes';

export function toggleMark(i, j) {
    return (dispatch, getState) => {
        const {started} = getState();
        if (!started) {
            dispatch(start());
        }
        dispatch({type: ACTION_TYPES.TOGGLE_MARK, i, j});
    };
}

export function revealCell(i, j) {
    return (dispatch, getState) => {
        const {started} = getState();
        if (!started) {
            dispatch(start());
        }
        dispatch({type: ACTION_TYPES.REVEAL_CELL, i, j});
    };
}

export function reset(board, mines) {
    return {type: ACTION_TYPES.RESET, board, mines};
}

function start() {
    return (dispatch, getState) => {
        const interval = setInterval(() => {
            const {started, gameOver} = getState();
            if (started && !gameOver) {
                dispatch(incrementTime());
            } else {
                clearInterval(interval);
            }
        }, 1000);

        dispatch({type: ACTION_TYPES.START});
    };
}

function incrementTime() {
    return {type: ACTION_TYPES.INCREMENT_TIME};
}
