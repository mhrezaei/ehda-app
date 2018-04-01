/*
    Filename: src/redux/history.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:45 AM

    Description: saves application history and async payloads.
 */

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
