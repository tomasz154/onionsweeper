import * as ACTION_TYPES from './actionTypes';

export function toggleMark(i, j) {
    return {type: ACTION_TYPES.TOGGLE_MARK, i, j};
}

export function revealCell(i, j) {
    return {type: ACTION_TYPES.REVEAL_CELL, i, j};
}
