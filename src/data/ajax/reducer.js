import * as types from '../types';
import initialState from '../initialState';

function actionTypeEndsInAsync(type) {
    return type.substring(type.length - 6) === '_ASYNC';

}

function actionTypeEndsInFailed(type) {
    return type.substring(type.length - 7) === '_FAILED';

}

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === '_SUCCESS';

}

export default function ajaxStatusReducer(state = initialState.ajax, action) {
    if (actionTypeEndsInAsync(action.type))
        return {...state, ajax: state.ajax + 1, internet: true};

    if (actionTypeEndsInSuccess(action.type) || actionTypeEndsInFailed(action.type))
        return {...state, ajax: state.ajax - 1};

    if(action.type === types.SERVER_NO_INTERNET)
        return {...state, internet: false};

    return state;
}