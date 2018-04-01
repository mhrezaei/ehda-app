/*
    Filename: src/redux/app.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:33 AM

    Description: App data model.
 */



export default class App {
    static save = true;

    static initialState = {
        "lang": 'fa'
    };

    static types = {
        APP_SWITCH_LANGUAGE: 'APP_SWITCH_LANGUAGE'
    };


    // used tp switch app locale.
    static switchLanguage(page){
        return {
            type: App.types.APP_SWITCH_LANGUAGE
        };

    }

    static reducer(state = App.initialState, payload){
        switch (payload.type) {
            case App.types.APP_SWITCH_LANGUAGE:
                return {
                    ...state,
                    lang: state.lang === 'en' ? 'fa' : 'en'
                };
            default:
                return state;
        }
    }
}