import {createStore, applyMiddleware} from 'redux';
import database from './reducers';


export default function root(saga, initial_state) {
    return createStore(
        database,
        initial_state,
        applyMiddleware(saga)
    );
}
