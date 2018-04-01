/*
    Filename: src/models/navigation.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:45 AM

    Description: navigation and routing storage.
 */


export default class Navigation {
    static save = true;

    static initialState = {
        "current": 'myCard',
        "default": 'myCard',
        "props": null
    };

    static types = {
        NAVIGATION_GO_TO_PAGE: 'NAVIGATION_GO_TO_PAGE'
    };

    static goTo(page, props=null){
        return {
            type: Navigation.types.NAVIGATION_GO_TO_PAGE,
            page: page,
            props: props
        };

    }

    static reducer(state = Navigation.initialState, payload){
        switch (payload.type) {
            case Navigation.types.NAVIGATION_GO_TO_PAGE:
                return { ...state, current: payload.page, props: payload.props };
            default:
                return state;
        }
    }
}