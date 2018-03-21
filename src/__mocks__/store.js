import {createStore, applyMiddleware} from 'redux';
import saga from 'redux-saga';
import reducers from '../data/reducers';
import initialState from '../data/initialState';

export default createStore(
    reducers,
    initialState,
    applyMiddleware(saga)
);