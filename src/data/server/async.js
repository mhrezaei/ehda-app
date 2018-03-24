import {call, put, takeLatest, cancelled, all, select} from 'redux-saga/effects';
import * as actions from '../types';


import * as api from './api';
import * as auth_api from '../auth/api';


import * as methods from './methods';
import * as auth_methods from '../auth/methods';



import {SecurityChamber} from '../../modules';

export function* getProvinceList() {

    const state = yield select();

    try {
        let token = state.auth.token;
        if(new Date().getTime() - state.auth.datetime > 1200000) {
            const tokenReq = yield call(auth_api.getToken, {
                username: SecurityChamber.username,
                password: SecurityChamber.password
            });
            if (tokenReq.status === 200) {
                if (tokenReq.data.status > 0) {
                    token = tokenReq.data.token;
                    yield put(auth_methods.updateToken(token));
                }
            }
        }

        if(state.server.provinceList.length === 0) {
            const provinceListReq = yield call(api.getProvinceList, {token: token});
            if (provinceListReq.status === 200) {
                if (provinceListReq.data.status > 0) {

                    yield put(methods.getProvinceListSuccess(provinceListReq.data.province));
                    return;
                }
            }
        }else {
            yield put(methods.getProvinceListFailed());
        }

        yield put(methods.getProvinceListFailed());
    } catch (error) {
        yield put(methods.getProvinceListFailed());
        yield put({type: actions.SERVER_NO_INTERNET});
    } finally {
        if (yield cancelled()) {
            yield put(methods.getProvinceListFailed());
        }
    }
}

export function* watchGetProvinceList() {
    yield takeLatest(actions.SERVER_GET_PROVINCES_LIST_ASYNC, getProvinceList);
}


export function* getCitiesList(payload) {
    const state = yield select();
    try {
        let token = state.auth.token;

        if(new Date().getTime() - state.auth.datetime > 1200000) {
            const tokenReq = yield call(auth_api.getToken, {
                username: SecurityChamber.username,
                password: SecurityChamber.password
            });
            if (tokenReq.status === 200) {
                if (tokenReq.data.status > 0) {
                    token = tokenReq.data.token;

                    yield put(auth_methods.updateToken(token));
                }
            }
        }
        if(!state.server.citiesList.hasOwnProperty(payload.province)) {
            const citiesListReq = yield call(api.getCitiesList, {token: token, province: payload.province});
            if (citiesListReq.status === 200) {
                if (citiesListReq.data.status > 0) {
                    yield put(methods.getCitiesListSuccess(payload.province, citiesListReq.data.cities));
                    return;
                }
            }
        }else {
            yield put(methods.getCitiesListFailed());
        }
        yield put(methods.getCitiesListFailed());
    } catch (error) {
        yield put(methods.getCitiesListFailed());
        yield put({type: actions.SERVER_NO_INTERNET});

    } finally {
        if (yield cancelled()) {
            yield put(methods.getCitiesListFailed());
        }
    }
}

export function* watchGetCitiesList() {
    yield takeLatest(actions.SERVER_GET_CITIES_LIST_ASYNC, getCitiesList);
}


export default function* () {
    yield all([
        watchGetProvinceList(),
        watchGetCitiesList()
    ]);
}
