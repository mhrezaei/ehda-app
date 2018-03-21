import {call, put, takeLatest, cancelled, all} from 'redux-saga/effects';
import * as actions from '../types';


import * as api from './api';


import * as methods from './methods';

import {AsyncStorage} from 'react-native';


export function* checkSSN(payload) {

	try {
		const tokenReq = yield call(api.getToken, {username: 'odeviceapi', password: '123456789'});
		if(tokenReq.status === 200){
		    if(tokenReq.data.status > 0){
                const token = tokenReq.data.token;

                yield put(methods.updateToken(token));
                yield AsyncStorage.setItem('application-token', token);
                const codeMelliReq = yield call(api.checkSSN, {token: token, code_melli: payload.code_melli});


                if(codeMelliReq.status === 200) {
                    if (codeMelliReq.data.status > 0) {

                        yield put(methods.checkCodeMelliSuccess(payload.code_melli));
                        yield call(payload.success);
                        return;
                    }
                }

            }
        }
        yield put(methods.checkCodeMelliFailed());
		yield call(payload.failed);
	} catch (error) {
		yield put(methods.checkCodeMelliFailed());
        yield call(payload.failed);
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



export default function* () {
	yield all([
        watchCheckSSN()
	]);
}
