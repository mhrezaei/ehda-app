import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {timeout, keysToSave, matchAction} from './helpers';


export async function ConfigStore(Store) {

    let initialState = {};
    let offlineKeys = [];
    let collectReducers = {};
    let collectSagas = [];

    Object.keys(Store).map((kw) => {
        const value = Store[kw];
        const key = kw.toLowerCase();
        if (value.hasOwnProperty('initialState')) {
            if (value.save) {
                offlineKeys.push(key);
            }

            initialState = {
                ...initialState,
                [key]: value.initialState
            };
        }
        if (value.hasOwnProperty('reducer')) {
            collectReducers = {
                ...collectReducers,
                [key]: value.reducer
            };
        }
        if (value.hasOwnProperty('sagas')) {
            value.sagas().map(saga => collectSagas.push(saga));
        }
    });


    function* rootSagas() {
        yield all(collectSagas);
    }

    const reducers = combineReducers(collectReducers);


    const sagaMiddleware = createSagaMiddleware();

    const map = await AsyncStorage.getItem('application-state');
    if (!map) await AsyncStorage.setItem('application-state', JSON.stringify(keysToSave(offlineKeys, initialState)));
    const persisted_state = JSON.parse(await AsyncStorage.getItem('application-state'));

    const stateX = {...initialState, ...persisted_state};


    const store = createStore(reducers, stateX, applyMiddleware(sagaMiddleware));

    store.subscribe(async () => {
        const state = store.getState();
        const action = state.history.lastAction;


        if (matchAction(action, ['navigation'])) {
            console.log(state.navigation);
        }

        if (matchAction(action, offlineKeys)) {

            let map = JSON.parse(await AsyncStorage.getItem('application-state'));
            await AsyncStorage.setItem('application-state', JSON.stringify({...map, ...keysToSave(offlineKeys, state)}));

        }
    });

    sagaMiddleware.run(rootSagas);

    await timeout(1000);

    return {store, state: stateX};
}