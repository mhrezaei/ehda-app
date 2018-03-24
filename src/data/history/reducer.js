import structure from '../initialState';
import * as types from '../types';

export default function (state = structure.history, payload) {
    return {
        ...state,
        last_action: payload.type,
        payload: payload,
        last_async: payload.type.substring(payload.type.length - 6) === '_ASYNC' ? payload : state.last_async

    };
}
