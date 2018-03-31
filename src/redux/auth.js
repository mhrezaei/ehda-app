import {call, put, takeLatest, cancelled, all, select} from 'redux-saga/effects';
import {now, encodeImage} from "../../core/helpers";
import * as api from '../config/api';
import {FileIO, SecurityChamber} from "../../core";


import Ajax from './ajax';

const tokenTimeout = 1200000;

class Auth {
    static save = true;

    static initialState = {
        "token": null,
        "lastRefresh": 0,
        "pinned": null,
        "handle": 0,
        "cards": {}
    };

    static types = {
        AUTH_SEARCH_CARD_SUCCESS: 'AUTH_SEARCH_CARD_SUCCESS',
        AUTH_SEARCH_CARD_FAILED: 'AUTH_SEARCH_CARD_FAILED',
        AUTH_SEARCH_CARD_ASYNC: 'AUTH_SEARCH_CARD_ASYNC',

        AUTH_GET_CARD_SUCCESS: 'AUTH_GET_CARD_SUCCESS',
        AUTH_GET_CARD_FAILED: 'AUTH_GET_CARD_FAILED',
        AUTH_GET_CARD_ASYNC: 'AUTH_GET_CARD_ASYNC',

        AUTH_GET_TOKEN_ASYNC: 'AUTH_GET_TOKEN_ASYNC',
        AUTH_GET_TOKEN_SUCCESS: 'AUTH_GET_TOKEN_SUCCESS',
        AUTH_GET_TOKEN_FAILED: 'AUTH_GET_TOKEN_FAILED',

        AUTH_REGISTER_CARD_ASYNC: 'AUTH_REGISTER_CARD_ASYNC',
        AUTH_REGISTER_CARD_SUCCESS: 'AUTH_REGISTER_CARD_SUCCESS',
        AUTH_REGISTER_CARD_FAILED: 'AUTH_REGISTER_CARD_FAILED',

        AUTH_DOWNLOAD_CARD_ASYNC: 'AUTH_DOWNLOAD_CARD_ASYNC',
        AUTH_DOWNLOAD_CARD_SUCCESS: 'AUTH_DOWNLOAD_CARD_SUCCESS',
        AUTH_DOWNLOAD_CARD_FAILED: 'AUTH_DOWNLOAD_CARD_FAILED',

        AUTH_UPDATE_TOKEN: 'AUTH_UPDATE_TOKEN',
        AUTH_CHANGE_PINNED_CARD: 'AUTH_CHANGE_PINNED_CARD',
    };

    static searchCard(codeMelli, callback) {
        return {
            type: Auth.types.AUTH_SEARCH_CARD_ASYNC,
            callback: callback,
            codeMelli: codeMelli
        };
    }

    static getCard(form, callback){
        return {
            type: Auth.types.AUTH_GET_CARD_ASYNC,
            callback: callback,
            form: form
        };
    }

    static registerCard(form, callback){
        return {
            type: Auth.types.AUTH_REGISTER_CARD_ASYNC,
            callback: callback,
            form: form
        };
    }

    static downloadCard(codeMelli, callback) {
        return {
            type: Auth.types.AUTH_DOWNLOAD_CARD_ASYNC,
            callback: callback,
            codeMelli: codeMelli
        };
    }

    static getToken() {
        return {
            type: Auth.types.AUTH_GET_TOKEN_ASYNC
        };
    }

    static updateToken(token) {
        return {
            type: Auth.types.AUTH_UPDATE_TOKEN,
            token: token
        };
    }

    static changePinnedCard(codeMelli) {
        return {
            type: Auth.types.AUTH_CHANGE_PINNED_CARD,
            codeMelli: codeMelli
        };
    }


    static *_checkToken() {
        const state = yield select();
        let token = state.auth.token;
        if (now() - state.auth.lastRefresh > tokenTimeout) {
            const tokenReq = yield call(api.getToken, {
                username: SecurityChamber.username,
                password: SecurityChamber.password
            });
            if (tokenReq.status === 200 && tokenReq.data.status > 0) {
                token = tokenReq.data.token;
                yield put(Auth.updateToken(token));
            }
        }
        return token;
    }

    static *_getToken(payload) {

        try {

            if (!(yield Ajax._checkConnection())) {
                yield put({
                    type: Auth.types.AUTH_GET_TOKEN_FAILED
                });
                yield put(Ajax.connectionFailed(0));
                return;
            }

            let token = yield Auth._checkToken();
            if (token) {
                yield put({
                    type: Auth.types.AUTH_GET_TOKEN_SUCCESS,
                    token: token
                });
                return;
            }

            yield put({
                type: Auth.types.AUTH_GET_TOKEN_FAILED
            });
        } catch (error) {
            yield put({
                type: Auth.types.AUTH_GET_TOKEN_FAILED
            });

            yield put(Ajax.connectionFailed(1));
        } finally {
            if (yield cancelled()) {
                yield put({
                    type: Auth.types.AUTH_GET_TOKEN_FAILED
                });
            }
        }
    }

    static *_searchCard(payload) {
        try {

            if (!(yield Ajax._checkConnection())) {
                yield put({
                    type: Auth.types.AUTH_SEARCH_CARD_FAILED
                });
                yield put(Ajax.connectionFailed(0));
                yield call(payload.callback, false, -99);
                return;
            }

            let token = yield Auth._checkToken();

            const req = yield call(api.searchCard, {token: token, code_melli: payload.codeMelli});
            if (req.status === 200 && req.data.status > 0) {
                yield put({
                    type: Auth.types.AUTH_SEARCH_CARD_SUCCESS
                });
                yield call(payload.callback, true, payload.codeMelli);
                return;
            }

            yield put({
                type: Auth.types.AUTH_SEARCH_CARD_FAILED
            });
            yield call(payload.callback, false, req.data.status);

        } catch (error) {
            yield put({
                type: Auth.types.AUTH_SEARCH_CARD_FAILED
            });
            yield call(payload.callback, false, -99);
            yield put(Ajax.connectionFailed(1));
        } finally {
            if (yield cancelled()) {
                yield put({
                    type: Auth.types.AUTH_SEARCH_CARD_FAILED
                });
                yield call(payload.callback, false, -99);
            }
        }
    }

    static *_getCard(payload) {
        try {

            if (!(yield Ajax._checkConnection())) {
                yield put({
                    type: Auth.types.AUTH_GET_CARD_FAILED
                });
                yield put(Ajax.connectionFailed(0));
                yield call(payload.callback, false, -99);
                return;
            }

            let token = yield Auth._checkToken();

            const req = yield call(api.getCard, {token: token, ...payload.form});
            if (req.status === 200 && req.data.status > 0) {
                yield put({
                    type: Auth.types.AUTH_GET_CARD_SUCCESS,
                    data: req.data
                });
                yield call(payload.callback, true, req.data);
                return;
            }

            yield put({
                type: Auth.types.AUTH_GET_CARD_FAILED
            });
            yield call(payload.callback, false, req.data.status);

        } catch (error) {
            yield put({
                type: Auth.types.AUTH_GET_CARD_FAILED
            });
            yield call(payload.callback, false, -99);
            yield put(Ajax.connectionFailed(1));
        } finally {
            if (yield cancelled()) {
                yield put({
                    type: Auth.types.AUTH_GET_CARD_FAILED
                });
                yield call(payload.callback, false, -99);
            }
        }
    }

    static *_registerCard(payload) {
        try {

            if (!(yield Ajax._checkConnection())) {
                yield put({
                    type: Auth.types.AUTH_REGISTER_CARD_FAILED
                });
                yield put(Ajax.connectionFailed(0));
                yield call(payload.callback, false, -99);
                return;
            }

            let token = yield Auth._checkToken();

            const req = yield call(api.registerCard, {token: token, ...payload.form});
            if (req.status === 200 && req.data.status > 0) {
                yield put({
                    type: Auth.types.AUTH_REGISTER_CARD_SUCCESS,
                    data: req.data
                });
                yield call(payload.callback, true, req.data);
                return;
            }

            yield put({
                type: Auth.types.AUTH_REGISTER_CARD_FAILED
            });
            yield call(payload.callback, false, req.data.status);

        } catch (error) {
            yield put({
                type: Auth.types.AUTH_REGISTER_CARD_FAILED
            });
            yield call(payload.callback, false, -99);
            yield put(Ajax.connectionFailed(1));
        } finally {
            if (yield cancelled()) {
                yield put({
                    type: Auth.types.AUTH_REGISTER_CARD_FAILED
                });
                yield call(payload.callback, false, -99);
            }
        }
    }


    static *_downloadCard(payload) {

        const state = yield select();
        try {
            if (!(yield Ajax._checkConnection())) {
                yield put({
                    type: Auth.types.AUTH_DOWNLOAD_CARD_FAILED
                });
                yield put(Ajax.connectionFailed(0));
                yield call(payload.callback, false);
                return;
            }
            const data = state.auth.cards[payload.codeMelli].info;
            const code_melli = payload.codeMelli;

            const mini = yield api.download({url: data['ehda_card_mini']});
            yield FileIO.save('ehda/' + code_melli + '/mini', encodeImage(mini));

            const single = yield api.download({url: data['ehda_card_single']});
            yield FileIO.save('ehda/' + code_melli + '/single', encodeImage(single));

            const social = yield api.download({url: data['ehda_card_social']});
            yield FileIO.save('ehda/' + code_melli + '/social', encodeImage(social));

            yield put({
                type: Auth.types.AUTH_DOWNLOAD_CARD_SUCCESS,
                codeMelli: payload.codeMelli
            });
            yield call(payload.callback, true);

        } catch (error) {
            yield put({
                type: Auth.types.AUTH_DOWNLOAD_CARD_FAILED
            });
            yield call(payload.callback, false);
            yield put(Ajax.connectionFailed(1));
        } finally {
            if (yield cancelled()) {
                yield put({
                    type: Auth.types.AUTH_DOWNLOAD_CARD_FAILED
                });
                yield call(payload.callback, false);
            }
        }
    }

    static sagas() {
        return [
            takeLatest(Auth.types.AUTH_GET_TOKEN_ASYNC, Auth._getToken),
            takeLatest(Auth.types.AUTH_SEARCH_CARD_ASYNC, Auth._searchCard),
            takeLatest(Auth.types.AUTH_GET_CARD_ASYNC, Auth._getCard),
            takeLatest(Auth.types.AUTH_REGISTER_CARD_ASYNC, Auth._registerCard),
            takeLatest(Auth.types.AUTH_DOWNLOAD_CARD_ASYNC, Auth._downloadCard),
        ];
    }

    static reducer(state = Auth.initialState, payload) {
        switch (payload.type) {
            case Auth.types.AUTH_DOWNLOAD_CARD_SUCCESS:
                return {
                    ...state,
                    cards: {
                        ...state.cards,
                        [payload.codeMelli]: {
                            ...state.cards[payload.codeMelli],
                            saved_at: now()
                        }
                    }
                };
            case Auth.types.AUTH_REGISTER_CARD_SUCCESS:
            case Auth.types.AUTH_GET_CARD_SUCCESS:
                const codeMelli = payload.data.ehda_card_details.code_melli;
                return {
                    ...state,
                    pinned: codeMelli,
                    handle: state.handle+1,
                    cards: {
                        ...state.cards,
                        [codeMelli]: {
                            ...state.cards[codeMelli],
                            info: payload.data,
                            updated_at: now()
                        }
                    }
                };
            case Auth.types.AUTH_CHANGE_PINNED_CARD:
                return {
                    ...state,
                    pinned: payload.codeMelli,
                };
            case Auth.types.AUTH_GET_TOKEN_SUCCESS:
            case Auth.types.AUTH_UPDATE_TOKEN:
                return {
                    ...state,
                    token: payload.token,
                    datetime: now()
                };
            default:
                return state;
        }
    }
}

export default Auth;