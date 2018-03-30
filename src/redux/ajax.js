import {NetInfo} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {Helpers} from '../../core';

export default class Ajax {
    static initialState = {
        "ajax": 0,
        "internet": true,
        "status": 0,
        "progress": {
            "loading": false,
            "phase": 0,
            "messages": [],
            "status": 0,
        }
    };

    static types = {
        AJAX_CONNECTION_ERROR: 'AJAX_CONNECTION_ERROR',
        AJAX_START_LOADING: 'AJAX_START_LOADING',
        AJAX_STOP_LOADING: 'AJAX_STOP_LOADING',
        AJAX_CHANGE_PHASE: 'AJAX_CHANGE_PHASE',
        AJAX_LOADING_DONE: 'AJAX_LOADING_DONE',
    };

    static startLoading(messages){
        return {
            type: Ajax.types.AJAX_START_LOADING,
            messages: messages
        }
    }
    static stopLoading(status, callback){
        return {
            type: Ajax.types.AJAX_STOP_LOADING,
            status: status,
            callback: callback
        }
    }

    static connectionFailed(status) {
        return {
            type: Ajax.types.AJAX_CONNECTION_ERROR,
            internet: false,
            status: status
        };
    }

    static async _checkConnection(){
        return await NetInfo.isConnected
    }

    static * _closeWithDelay(payload){


        yield Helpers.timeout(500);
        yield put({
            type: Ajax.types.AJAX_CHANGE_PHASE,
            phase: 1
        });
        yield Helpers.timeout(2500);

        yield put({
            type: Ajax.types.AJAX_LOADING_DONE
        });

        if(payload.callback)
            yield call(payload.callback)

    }
    static sagas(){
        return [
            takeLatest(Ajax.types.AJAX_STOP_LOADING, Ajax._closeWithDelay)
        ]
    }
    static reducer(state = Ajax.initialState, payload) {
        const type = payload.type.toString();
        if (type.substring(type.length - 6) === '_ASYNC') {
            return {
                ...state,
                ajax: state.ajax + 1,
                internet: true
            };
        }
        if (type.substring(type.length - 8) === '_SUCCESS' || type.substring(type.length - 7) === '_FAILED') {
            return {
                ...state,
                ajax: state.ajax - 1
            };
        }
        if (payload.type === Ajax.types.AJAX_CONNECTION_ERROR) {
            return {
                ...state,
                internet: payload.internet,
                status: payload.status
            };
        }

        if (payload.type === Ajax.types.AJAX_START_LOADING) {
            return {
                ...state,
                progress: {
                    ...state.progress,
                    loading: true,
                    phase: 0,
                    messages: payload.messages
                }
            };
        }



        if (payload.type === Ajax.types.AJAX_STOP_LOADING) {
            return {
                ...state,
                progress: {
                    ...state.progress,
                    status: payload.status
                }
            };
        }

        if (payload.type === Ajax.types.AJAX_CHANGE_PHASE) {
            return {
                ...state,
                progress: {
                    ...state.progress,
                    phase: payload.phase
                }
            };
        }
        if (payload.type === Ajax.types.AJAX_LOADING_DONE) {
            return {
                ...state,
                progress: {
                    loading: false,
                    phase: 0,
                    messages: null,
                    status: 0
                }
            };
        }
        return state;
    }
}