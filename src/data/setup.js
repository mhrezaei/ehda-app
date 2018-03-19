// data
import {AsyncStorage} from 'react-native';
import createSagaMiddleware from 'redux-saga';
import async_root from './async';
import configure_store from './store';
import structure from './structure';
import * as actions from './actions';


import * as server_methods from './server/methods';

const async_middleware = createSagaMiddleware();


export const filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key], key))
        .reduce((res, key) => (res[key] = obj[key], res), {});


const timeout = ms => new Promise(res => setTimeout(res, ms));

function keys_to_save(data = structure) {
    return filter(data, (v, k) => ['app', 'auth'].includes(k));
}

async function configStore() {
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

        switch (payload) {
            case actions.AUTH_REFRESH_TOKEN_SUCCESS:
                await AsyncStorage.setItem('application-token', state.auth.token);
                break;
        }
        if (payload && (payload.startsWith('AUTH_') || payload.startsWith('APP_'))) {
            let map = JSON.parse(await AsyncStorage.getItem('application-state'));
            await AsyncStorage.setItem('application-state', JSON.stringify(map.merge(keys_to_save(state))));
        }
    });

    async_middleware.run(async_root);
    store.dispatch(server_methods.request_utc_async());

    await timeout(1000);
    return store;
}

export default configStore;

