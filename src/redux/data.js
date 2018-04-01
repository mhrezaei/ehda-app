/*
    Filename: src/redux/data.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:43 AM

    Description: data storage.
 */


import {call, put, takeLatest, cancelled} from 'redux-saga/effects';

import Auth from './auth';
import Ajax from './ajax';

import * as api from '../config/api';


export default class Data {
    static initialState = {
        "provinces": {
            "handle": null,
            "list": []
        },
        "cities": {
            "handle": null,
            "list": []
        }
    };

    static types = {
        DATA_GET_PROVINCE_ASYNC: 'DATA_GET_PROVINCE_ASYNC',
        DATA_GET_PROVINCE_SUCCESS: 'DATA_GET_PROVINCE_SUCCESS',
        DATA_GET_PROVINCE_FAILED: 'DATA_GET_PROVINCE_FAILED',

        DATA_GET_CITIES_ASYNC: 'DATA_GET_CITIES_ASYNC',
        DATA_GET_CITIES_SUCCESS: 'DATA_GET_CITIES_SUCCESS',
        DATA_GET_CITIES_FAILED: 'DATA_GET_CITIES_FAILED'
    };

    // methods

    static getProvince() {
        return {
          type: Data.types.DATA_GET_PROVINCE_ASYNC
        };
    };

    static getCities(province) {
        return {
            type: Data.types.DATA_GET_CITIES_ASYNC,
            province: province
        };
    }



    // async


    static *_getProvince() {
        try {


            if (!(yield Ajax._checkConnection())) {
                yield put({
                    type: Data.types.DATA_GET_PROVINCE_FAILED
                });
                yield put(Ajax.connectionFailed(0));
                return;
            }
            let token = yield Auth._checkToken();


            const req = yield call(api.getProvince, {token: token});
            if (req.status === 200 && req.data.status > 0) {

                yield put({
                    type: Data.types.DATA_GET_PROVINCE_SUCCESS,
                    provinces: req.data.province
                });
                return;
            }

            yield put({
                type: Data.types.DATA_GET_PROVINCE_FAILED
            });

        } catch (error) {
            yield put({
                type: Data.types.DATA_GET_PROVINCE_FAILED
            });
            yield put(Ajax.connectionFailed(1));
        } finally {
            if (yield cancelled()) {
                yield put({
                    type: Data.types.DATA_GET_PROVINCE_FAILED
                });
            }
        }
    }



    static *_getCities(payload) {
        try {

            if (!(yield Ajax._checkConnection())) {
                yield put({
                    type: Data.types.DATA_GET_CITIES_FAILED
                });
                yield put(Ajax.connectionFailed(0));
                return;
            }

            let token = yield Auth._checkToken();

            const req = yield call(api.getCities, {token: token, province: payload.province});
            if (req.status === 200 && req.data.status > 0) {
                yield put({
                    type: Data.types.DATA_GET_CITIES_SUCCESS,
                    province: payload.province,
                    cities: req.data.cities
                });
                return;
            }

            yield put({
                type: Data.types.DATA_GET_CITIES_FAILED
            });

        } catch (error) {
            yield put({
                type: Data.types.DATA_GET_CITIES_FAILED
            });
            yield put(Ajax.connectionFailed(1));
        } finally {
            if (yield cancelled()) {
                yield put({
                    type: Data.types.DATA_GET_CITIES_FAILED
                });
            }
        }
    }


    // sagas

    static sagas() {
        return [
            takeLatest(Data.types.DATA_GET_PROVINCE_ASYNC, Data._getProvince),
            takeLatest(Data.types.DATA_GET_CITIES_ASYNC, Data._getCities)
        ];
    }

    // reducers

    static reducer(state = Data.initialState, payload) {
        switch (payload.type) {
            case Data.types.DATA_GET_PROVINCE_SUCCESS:
                return {
                    ...state,
                    provinces: {
                        handle: true,
                        list: payload.provinces
                    }
                };
            case Data.types.DATA_GET_CITIES_SUCCESS:
                return {
                    ...state,
                    cities: {
                        handle: payload.province,
                        list: payload.cities
                    }
                };
            default:
                return state;
        }
    }
}