
// data
import {AsyncStorage} from 'react-native';

import {fromJS, Set} from 'immutable';
import createSagaMiddleware from 'redux-saga';
import async_root from './src/data/async';
import configure_store from './src/data/store';
import structure from './src/data/structure';
import * as actions from './src/data/actions';


import * as server_methods from './src/data/server/methods';



// apply route middleware
const async_middleware = createSagaMiddleware();

const timeout = ms => new Promise(res => setTimeout(res, ms))

function keys_to_save(data=fromJS(structure)){

    return data.filter(
        (v, k) => {
            return k == 'app' || k == 'auth';
        }
    );
}

async function configStore() {
    const map = await AsyncStorage.getItem('application-state');
    if (!map) {
        await AsyncStorage.setItem('application-state', JSON.stringify( keys_to_save().toJS()) );
    }
    const persisted_state = JSON.parse(await AsyncStorage.getItem('application-state'));
    const store = configure_store(async_middleware, fromJS(persisted_state));


    global.language = persisted_state.app.lang;

    store.subscribe(async () => {
        const state = store.getState();
        const payload = state.getIn(['history', 'last_action']);

        console.log(payload);
        switch (payload) {
            case actions.AUTH_REFRESH_TOKEN_SUCCESS:
                await AsyncStorage.setItem('application-token', state.getIn(['auth', 'token']));
                break;
        }
        if (payload && (payload.startsWith('AUTH_') || payload.startsWith('APP_'))) {
            let map = fromJS(JSON.parse(await AsyncStorage.getItem('application-state')));
            await AsyncStorage.setItem('application-state', JSON.stringify(map.merge(keys_to_save(state)).toJS()));
        }
    });

    async_middleware.run(async_root);
    store.dispatch(server_methods.request_utc_async());

    await timeout(2000);
    return store;
}

export default configStore;

