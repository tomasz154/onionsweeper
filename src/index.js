import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducer from './reducers'

import MinesweeperContainer from './MinesweeperContainer';
import {newGame, setSettings} from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(setSettings(10, 10, 10));
store.dispatch(newGame());

ReactDOM.render(
    <Provider store={store}>
        <MinesweeperContainer/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
