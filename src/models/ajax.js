/*
    Filename: src/models/ajax.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 3:43 AM

    Description:
        Ajax data model for redux. used to display loadings on ajax calls,
        describe progress screens and other async operations which follows.

    Issues:
        [x] spread data model was make it really hard to  manage store, i make it simpler and unified.
 */


import {NetInfo} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {Helpers} from '../../core';

export default class Ajax {
    // uncomment this if you want to make it available offline,
    // saved states will keep their data from last operation.
    // save = true;


    // each data model has an initial state, you must
    static initialState = {
        "ajax": 0,
        "internet": true,
        "status": 0,
        // see core/ui/loading.js for usage
        "progress": {
            "loading": false,
            "phase": 0,
            "messages": [],
            "status": 0,
        }
    };

    // each data model has action types, describe your actions here,
    // then write reducers or async handlers for them. purpose of writing
    // unique action types is to prevent data conflict an easily debug the application.

    static types = {
        AJAX_CONNECTION_ERROR: 'AJAX_CONNECTION_ERROR',
        AJAX_START_LOADING: 'AJAX_START_LOADING',
        AJAX_STOP_LOADING: 'AJAX_STOP_LOADING',
        AJAX_CHANGE_PHASE: 'AJAX_CHANGE_PHASE',
        AJAX_LOADING_DONE: 'AJAX_LOADING_DONE',
    };
    // call that shows if connection to servers are closed.
    static connectionFailed(status) {
        return {
            type: Ajax.types.AJAX_CONNECTION_ERROR,
            internet: false,
            status: status
        };
    }

    // check if device is connected to internet
    static async _checkConnection(){
        return await NetInfo.isConnected
    }



    // start an async loading, messages will pass into progress to be displayed on view for each operation
    // messages are an array, containing state description of an operation [String, String, ...]
    // then we call stopLoading(index) to show desired message after operation succeed.
    // see core/ui/loading.js for usage
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
    // close the progress which described above, with delay
    static * _closeLoadingWithDelay(payload){
        yield Helpers.timeout(500);
        yield put({
            type: Ajax.types.AJAX_CHANGE_PHASE,
            phase: 1
        });
        yield Helpers.timeout(1400);

        yield put({
            type: Ajax.types.AJAX_LOADING_DONE
        });

        if(payload.callback)
            yield call(payload.callback)

    }

    // data model may have sagas, which describes model async operations using Javascript generators.
    static sagas(){
        return [
            // watch for stop call from user, then call a generator to handle that operations
            takeLatest(Ajax.types.AJAX_STOP_LOADING, Ajax._closeLoadingWithDelay)
        ]
    }


    // each model must have an reducer
    static reducer(state = Ajax.initialState, payload) {
        const type = payload.type.toString();

        // count async operations that are performing on background
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
        // check if we have connection errors and return new state on change
        if (payload.type === Ajax.types.AJAX_CONNECTION_ERROR) {
            return {
                ...state,
                internet: payload.internet,
                status: payload.status
            };
        }

        // oh we have an async loading operation
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
        // then here is the stop call
        if (payload.type === Ajax.types.AJAX_STOP_LOADING) {
            return {
                ...state,
                progress: {
                    ...state.progress,
                    status: payload.status
                }
            };
        }
        // we use this to locally change the state of loading operation, see core/ui/loading.js for usage.
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