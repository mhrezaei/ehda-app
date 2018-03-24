// data
import {AsyncStorage} from 'react-native';
import createSagaMiddleware from 'redux-saga';
import async_root from './sagas';
import configure_store from './store';
import structure from './initialState';
import * as actions from './types';


import * as server_methods from './server/methods';
import * as auth_methods from './auth/methods';

const async_middleware = createSagaMiddleware();


import {timeout, filter} from '../helpers';

function keys_to_save(data = structure) {
    return filter(data, (v, k) => ['app', 'auth', 'nav'].includes(k));
}

async function configStore(upd) {
    const map = await AsyncStorage.getItem('application-state');
    if (!map) {
        await AsyncStorage.setItem('application-state', JSON.stringify(keys_to_save()));
    }

    const persisted_state = JSON.parse(await AsyncStorage.getItem('application-state'));
    const store = configure_store(async_middleware, persisted_state);


    global.language = persisted_state.app.lang;

    store.subscribe(async () => {
        const state = store.getState();
        const payload = state.history.last_action;

        if (payload && (payload.startsWith('AUTH_') || payload.startsWith('APP_')  || payload.startsWith('NAV_'))) {
            let map = JSON.parse(await AsyncStorage.getItem('application-state'));

            global.language = state.app.lang;
            global.token = state.auth.token;

            await AsyncStorage.setItem('application-state', JSON.stringify({...map, ...keys_to_save(state)}));
        }

        if(upd) upd(state);
    });

    async_middleware.run(async_root);
    store.dispatch(auth_methods.requestTokenAsync());

    await timeout(1000);
    return store;
}

export default configStore;

