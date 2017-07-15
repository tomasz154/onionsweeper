import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducer from './reducers'

import MinesweeperContainer from './MinesweeperContainer';
import makeBoard from './makeBoard';
import {reset} from './actions';

const store = createStore(
    reducer, {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const mines = 10;
const board = makeBoard(10, mines);
store.dispatch(reset(board, mines));

ReactDOM.render(
    <Provider store={store}>
        <MinesweeperContainer/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
