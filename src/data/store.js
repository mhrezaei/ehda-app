import {createStore, applyMiddleware} from 'redux';
import database from './database';


export default function root(route, saga, initial_state) {
    return createStore(
        database,
        initial_state,
        applyMiddleware(route, saga)
    );
}
