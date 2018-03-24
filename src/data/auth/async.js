import {call, put, takeLatest, cancelled, all, select} from 'redux-saga/effects';
import * as actions from '../types';


import * as api from './api';


import * as methods from './methods';

import {AsyncStorage} from 'react-native';


import {SecurityChamber} from '../../modules';

export function* requestToken() {

	try {

        let token = '';


        console.log(SecurityChamber.username);

        const tokenReq = yield call(api.getToken, {
            username: SecurityChamber.username,
            password: SecurityChamber.password
        });
        if (tokenReq.status === 200) {
            if (tokenReq.data.status > 0) {
                token = tokenReq.data.token;
                yield put(methods.requestTokenSuccess(token));
                return;
            }
        }



        yield put(methods.requestTokenFailed());
	} catch (error) {
        yield put(methods.requestTokenFailed());
        yield put({type: actions.SERVER_NO_INTERNET});
	} finally {
		if (yield cancelled()) {
			yield put(methods.requestTokenFailed());
		}
	}
}

export function* watchRequestToken() {
	yield takeLatest(actions.AUTH_REQUEST_TOKEN_ASYNC, requestToken);
}




export function* checkSSN(payload) {

    const state = yield select();
    try {

        let token = state.auth.token;

        if(new Date().getTime() - state.auth.datetime > 1200000) {
            const tokenReq = yield call(api.getToken, {
                username: SecurityChamber.username,
                password: SecurityChamber.password
            });
            if (tokenReq.status === 200) {
                if (tokenReq.data.status > 0) {
                    token = tokenReq.data.token;
                    yield put(methods.updateToken(token));

                }
            }
        }

        const codeMelliReq = yield call(api.checkSSN, {token: token, code_melli: payload.code_melli});
        if(codeMelliReq.status === 200) {
            if (codeMelliReq.data.status > 0) {
                yield put(methods.checkCodeMelliSuccess(payload.code_melli));
                yield call(payload.success);
                return;
            }
        }

        yield put(methods.checkCodeMelliFailed());
        yield call(payload.failed, codeMelliReq.data.status);
    } catch (error) {
        yield put(methods.checkCodeMelliFailed());
        yield call(payload.failed);
        yield put({type: actions.SERVER_NO_INTERNET});
    } finally {
        if (yield cancelled()) {
            yield put(methods.checkCodeMelliFailed());
            yield call(payload.failed);
        }
    }
}

export function* watchCheckSSN() {
    yield takeLatest(actions.AUTH_CHECK_CODE_MELLI_ASYNC, checkSSN);
}




export function* getCard(payload) {

    const state = yield select();
    try {

        let token = state.auth.token;

        if(new Date().getTime() - state.auth.datetime > 1200000) {
            const tokenReq = yield call(api.getToken, {
                username: SecurityChamber.username,
                password: SecurityChamber.password
            });
            if (tokenReq.status === 200) {
                if (tokenReq.data.status > 0) {
                    token = tokenReq.data.token;
                    yield put(methods.updateToken(token));

                }
            }
        }
        const cardReq = yield call(api.getCard, {token: token, code_melli: payload.code_melli, tel_mobile: payload.tel_mobile, birth_date: payload.birth_date});
        if(cardReq.status === 200) {
            if (cardReq.data.status > 0) {
                yield put(methods.getCardSuccess(cardReq.data));
                yield call(payload.success);
                return;
            }
        }

        yield put(methods.getCardFailed());
        yield call(payload.failed, cardReq.data.status);
    } catch (error) {
        yield put(methods.getCardFailed());
        yield call(payload.failed);
        yield put({type: actions.SERVER_NO_INTERNET});
    } finally {
        if (yield cancelled()) {
            yield put(methods.getCardFailed());
            yield call(payload.failed);
        }
    }
}

export function* watchGetCard() {
    yield takeLatest(actions.AUTH_GET_CARD_ASYNC, getCard);
}




export default function* () {
	yield all([
        watchCheckSSN(),
        watchRequestToken(),
        watchGetCard(),
	]);
}
