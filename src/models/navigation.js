/*
    Filename: src/models/navigation.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:45 AM

    Description: navigation and routing storage.
 */

import {select, put, takeLatest} from 'redux-saga/effects';


export default class Navigation {

    static initialState = {
        "current": 'myCard',
        "default": 'searchCard',
        "props": null
    };

    static types = {
        NAVIGATION_GO_TO_PAGE: 'NAVIGATION_GO_TO_PAGE',
        DEFINE_ROUTES: 'DEFINE_ROUTES',
        NAVIGATION_GO_TO_PAGE_DONE: 'NAVIGATION_GO_TO_PAGE_DONE'
    };

    static *_goTo(payload){

        const state = yield select();

        const nextState = {
            ...state,
            navigation: {
                ...state.navigation,
                current: payload.page,
                props: payload.props
            }
        };
        const Routes = nextState.navigation.routes;



        if (Routes.hasOwnProperty(payload.page)) {
            const route = Routes[payload.page];
            if (route.hasOwnProperty('redirect')) {
                const to = route.redirect(nextState);
                if (to) {
                    yield put({
                        type: 'NAVIGATION_GO_TO_PAGE_DONE',
                        page: to,
                        props: payload.props
                    });
                    return;
                }


            }

            yield put({
                type: 'NAVIGATION_GO_TO_PAGE_DONE',
                page: payload.page,
                props: payload.props
            });
        } else {


            yield put({
                type: 'NAVIGATION_GO_TO_PAGE_DONE',
                page: nextState.navigation.default,
                props: payload.props
            });
        }

    }



    static defineRoutes(routes){
        return {
            type: Navigation.types.DEFINE_ROUTES,
            routes: routes
        };

    }
    static goTo(page, props=null){
        return {
            type: Navigation.types.NAVIGATION_GO_TO_PAGE,
            page: page,
            props: props
        };

    }


    //  + sagas
    static sagas() {
        return [
            takeLatest(Navigation.types.NAVIGATION_GO_TO_PAGE, Navigation._goTo),
        ];
    }

    static reducer(state = Navigation.initialState, payload){
        switch (payload.type) {
            case Navigation.types.NAVIGATION_GO_TO_PAGE_DONE:
                return { ...state, current: payload.page, props: payload.props };
            case Navigation.types.DEFINE_ROUTES:
                return { ...state, routes: payload.routes };
            default:
                return state;
        }
    }
}
