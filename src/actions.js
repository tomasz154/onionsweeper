import * as ACTION_TYPES from './actionTypes';
import {initializeBoard, makeBoard} from './makeBoard'
import settingsStorage from './settingsStorage'

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
        const {initialized, started} = getState();
        if (!initialized) {
            dispatch(initialize(i, j));
        }
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

        const board = makeBoard(settings.width, settings.height);
        dispatch(reset(board, settings.mines));
    };
}

function reset(board, mines) {
    return {type: ACTION_TYPES.RESET, board, mines};
}

export function setLevel(level) {
    return (dispatch, getState) => {
        settingsStorage.setLevel(level);
        dispatch(doSetLevel(level));
    }
}

function doSetLevel(level) {
    return {type: ACTION_TYPES.SET_LEVEL, level};
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

function initialize(i, j) {
    return (dispatch, getState) => {
        const level = getState().settings.currentLevel;
        const levels = getState().levels;
        const {width, height, mines} = levels[level];

        dispatch(placeMines(initializeBoard(width, height, mines, i, j)));
    };
}

function placeMines(mines) {
    return {type: ACTION_TYPES.PLACE_MINES, mines};
}

function incrementTime() {
    return {type: ACTION_TYPES.INCREMENT_TIME};
}
