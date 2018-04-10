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
        "props": {},
        "history": [],
        "routes":{}
    };

    static types = {
        NAVIGATION_GO_TO_PAGE: 'NAVIGATION_GO_TO_PAGE',
        NAVIGATION_GO_PAGE_BACK: 'NAVIGATION_GO_PAGE_BACK',
        NAVIGATION_GO_BACK_PAGE_DONE: 'NAVIGATION_GO_BACK_PAGE_DONE',
        DEFINE_ROUTES: 'DEFINE_ROUTES',
        NAVIGATION_GO_TO_PAGE_DONE: 'NAVIGATION_GO_TO_PAGE_DONE',
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

    static *_goBack(){

        const state = yield select();


        let history = state.navigation.history;
        const obj = history.shift();

        const nextState = {
            ...state,
            navigation: {
                ...state.navigation,
                current: obj.page,
                props: obj.props
            }
        };

        const Routes = nextState.navigation.routes;


        if (Routes.hasOwnProperty(obj.page)) {
            const route = Routes[obj.page];
            if (route.hasOwnProperty('redirect')) {
                const to = route.redirect(nextState);
                if (to) {
                    yield put({
                        type: 'NAVIGATION_GO_BACK_PAGE_DONE',
                        page: to,
                        props: obj.props,
                        history:history
                    });
                    return;
                }


            }

            yield put({
                type: 'NAVIGATION_GO_BACK_PAGE_DONE',
                page: obj.page,
                props: obj.props,
                history:history
            });
        } else {


            yield put({
                type: 'NAVIGATION_GO_BACK_PAGE_DONE',
                page: nextState.navigation.default,
                props: obj.props,
                history:history
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


    static goBack(){
        return {
            type: Navigation.types.NAVIGATION_GO_PAGE_BACK
        };

    }


    //  + sagas
    static sagas() {
        return [
            takeLatest(Navigation.types.NAVIGATION_GO_TO_PAGE, Navigation._goTo),
            takeLatest(Navigation.types.NAVIGATION_GO_PAGE_BACK, Navigation._goBack),
        ];
    }

    static reducer(state = Navigation.initialState, payload){
        switch (payload.type) {

            case Navigation.types.NAVIGATION_GO_BACK_PAGE_DONE:
                return { ...state, current: payload.page, props: payload.props, history: payload.history };
            case Navigation.types.NAVIGATION_GO_TO_PAGE:

                let history = state.history;

                if(history.length > 0){

                    if(history[0].page !== state.current) {
                        history.unshift({
                            page: state.current, props: state.props
                        });
                    }
                }
                else {
                    history.unshift({
                        page: state.current, props: state.props
                    });
                }

                return { ...state, history: history };
            case Navigation.types.NAVIGATION_GO_TO_PAGE_DONE:
                return { ...state, current: payload.page, props: payload.props };
            case Navigation.types.DEFINE_ROUTES:
                return { ...state, routes: payload.routes };
            default:
                return state;
        }
    }
}
