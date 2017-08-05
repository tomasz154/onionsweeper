import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducer from './reducers'

import MinesweeperContainer from './MinesweeperContainer';
import makeBoard from './makeBoard';
import {reset} from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const mines = 90;
const board = makeBoard(20, mines);
store.dispatch(reset(board, mines));

ReactDOM.render(
    <Provider store={store}>
        <MinesweeperContainer/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
