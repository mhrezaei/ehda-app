import {call, put, takeLatest, cancelled, all} from 'redux-saga/effects';
import * as actions from '../types';

import * as api from './api';
import * as methods from './methods';


export function* request_utc() {

	try {
		const result = yield call(api.request_utc);

		if (result.status === 200) {
			yield put(methods.request_utc_success(result.data.time));
		}
	} catch (error) {

		yield put(methods.request_utc_failed());
	} finally {
		if (yield cancelled()) {
			yield put(methods.request_utc_failed());
		}
	}
}

export function* watch_request_utc() {
	yield takeLatest(actions.SERVER_REQUEST_UTC_ASYNC, request_utc);
}


export default function* () {
	yield all([
		watch_request_utc()
	]);
}
