export default class App {
    static save = true;

    static initialState = {
        "lang": 'fa'
    };

    static types = {
        APP_SWITCH_LANGUAGE: 'APP_SWITCH_LANGUAGE'
    };


    static switchLanguage(page, props={}){
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