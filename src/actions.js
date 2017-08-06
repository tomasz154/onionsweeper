import * as ACTION_TYPES from './actionTypes';
import makeBoard from './makeBoard'

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

export function newGame() {
    return (dispatch, getState) => {
        const level = getState().settings.currentLevel;
        const levels = getState().levels;
        const settings = levels[level];

        const board = makeBoard(settings.width, settings.height, settings.mines);
        dispatch(reset(board, settings.mines));
    };
}

function reset(board, mines) {
    return {type: ACTION_TYPES.RESET, board, mines};
}

export function setSettings(level) {
    return {type: ACTION_TYPES.SET_SETTINGS, level};
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
