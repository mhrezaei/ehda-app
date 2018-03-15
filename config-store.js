
// data
import {AsyncStorage} from 'react-native';

import {fromJS} from 'immutable';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import lang from './src/app/lang';
import async_root from './src/data/async';
import configure_store from './src/data/store';
import structure from './src/data/structure';
import * as actions from './src/data/actions';
import * as server_methods from './src/data/server/methods';
import {Provider, connect} from 'react-redux';



// apply route middleware
const route_middleware = routerMiddleware();
const async_middleware = createSagaMiddleware();

const timeout = ms => new Promise(res => setTimeout(res, ms))


async function configStore(){
    const data = JSON.parse(await AsyncStorage.getItem('application-state'));

    if (!data && structure.has('auth')) {
        await AsyncStorage.setItem('application-state', JSON.stringify({auth: structure.get('auth').toJS()}));
    }

    const persisted_state = JSON.parse(await AsyncStorage.getItem('application-state'));

    const store = configure_store(route_middleware, async_middleware, fromJS(persisted_state));

    store.subscribe(async () => {
        const state = store.getState();
        const payload = state.getIn(['app', 'last_action']);
        switch (payload) {
            case actions.AUTH_REFRESH_TOKEN_SUCCESS:
                await AsyncStorage.setItem('application-token', state.getIn(['auth', 'token']));
                break;
        }
        if (payload && payload.startsWith('AUTH')) {
            await AsyncStorage.setItem('application-state', JSON.stringify({auth: state.get('auth').toJS()}));
        }
    });

    async_middleware.run(async_root);
    store.dispatch(server_methods.request_utc_async());

    await timeout(2000);

    return store;
}

export default configStore;

