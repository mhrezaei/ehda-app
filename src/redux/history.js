export default class History {
    static initialState = {
        "lastAction": null,
        "lastAsync": null,
        "payload": null
    };

    static reducer(state = History.initialState, payload){
        return {
            ...state,
            lastAction: payload.type,
            payload: payload,
            lastAsync: payload.type.substring(payload.type.length - 6) === '_ASYNC' ? payload : state.lastAsync

        };
    }
}
