import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducer from './reducers'

import MinesweeperContainer from './MinesweeperContainer';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeBoard(size, mines) {
    const arr = [];

    for (let i = 0; i < size; i++) {
        arr[i] = [];
        for (let j = 0; j < size; j++) {
            arr[i][j] = {
                mine: false,
                revealed: false,
                marked: false,
                exploded: false,
            };
        }
    }

    for (let i = 0; i < mines;) {
        const cell = arr[getRandomInt(0, size - 1)][getRandomInt(0, size)];
        if (cell.mine) {
            continue;
        }
        cell.mine = true;
        i++;
    }

    return arr;
}

const mines = 10;
const board = makeBoard(10, mines);

const store = createStore(
    reducer, {
        board,
        gameOver: false,
        totalMines: mines,
        markedMines: 0,
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <MinesweeperContainer/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
