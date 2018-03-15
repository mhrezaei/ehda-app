import {call, put, takeLatest, cancelled, all} from 'redux-saga/effects';
import * as actions from '../actions';


import * as api from './api';
import * as methods from './methods';


export function* auth_signin_user(payload) {
	try {
		const token_res = yield call(api.signin_user, payload.user);
		if (token_res.status === 200) {
			const token = token_res.data.token;
			yield put(methods.refresh_token_success(token));
			yield put(methods.signin_user_success(token_res.data.user));
		}
	} catch (error) {
		yield put(methods.signin_user_failed());
	} finally {
		if (yield cancelled()) {
			yield put(methods.signin_user_failed("Request cancelled."));
		}
	}
}

export function* watch_auth_signin_user() {
	yield takeLatest(actions.AUTH_SIGNIN_USER_ASYNC, auth_signin_user);
}



export default function* () {
	yield all([
        watch_auth_signin_user()
	]);
}
