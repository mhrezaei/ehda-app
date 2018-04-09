/*
    Filename: src/models/app.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:33 AM

    Description: App data model.
 */



export default class Dialog {
    static initialState = {
        "sharing": {
            "visible": false,
            "value": null,
        },
        "calendar": {
            "visible": false,
            "value": null,
            "action": null
        },
        "search": {
            "visible": false,
            "value": null,
        }
    };

    static types = {
        DIALOG_SHOW_CALENDAR: 'DIALOG_SHOW_CALENDAR',
        DIALOG_HIDE_CALENDAR: 'DIALOG_HIDE_CALENDAR',
        DIALOG_SHOW_SHARING: 'DIALOG_SHOW_SHARING',
        DIALOG_HIDE_SHARING: 'DIALOG_HIDE_SHARING',

        DIALOG_OPEN_SEARCH: 'DIALOG_OPEN_SEARCH',
        DIALOG_CLOSE_SEARCH: 'DIALOG_CLOSE_SEARCH',
        DIALOG_SEARCH_CHANGE: 'DIALOG_SEARCH_CHANGE'
    };

    static openCalendar(value, action){
        return {
            type: Dialog.types.DIALOG_SHOW_CALENDAR,
            value: value,
            action: action
        }
    }


    static closeCalendar(){
        return {
            type: Dialog.types.DIALOG_HIDE_CALENDAR
        }
    }

    static openSharing(value){
        return {
            type: Dialog.types.DIALOG_SHOW_SHARING,
            value: value
        }
    }


    static closeSharing(){
        return {
            type: Dialog.types.DIALOG_HIDE_SHARING
        }
    }




    static openSearch(value){
        return {
            type: Dialog.types.DIALOG_OPEN_SEARCH,
            value: value
        }
    }


    static updateSearch(value){
        return {
            type: Dialog.types.DIALOG_OPEN_SEARCH,
            value: value
        }
    }


    static closeSearch(){
        return {
            type: Dialog.types.DIALOG_CLOSE_SEARCH
        }
    }


    static reducer(state = Dialog.initialState, payload){
        switch (payload.type) {
            case Dialog.types.DIALOG_SHOW_CALENDAR:
                return {
                    ...state,
                    calendar: {
                        ...state.calendar,
                        visible: true,
                        value: payload.value,
                        action: payload.action,
                    }
                };

            case Dialog.types.DIALOG_HIDE_CALENDAR:
                return {
                    ...state,
                    calendar: {
                        ...state.calendar,
                        visible: false,
                        value: null,
                        action: null,
                    }
                };
            case Dialog.types.DIALOG_SHOW_SHARING:
                return {
                    ...state,
                    sharing: {
                        ...state.sharing,
                        visible: true,
                        value: payload.value,
                    }
                };

            case Dialog.types.DIALOG_HIDE_SHARING:
                return {
                    ...state,
                    sharing: {
                        ...state.sharing,
                        visible: false,
                        value: null,

                    }
                };


            case Dialog.types.DIALOG_OPEN_SEARCH:
                return {
                    ...state,
                    search: {
                        ...state.search,
                        visible: true,
                        value: payload.value,
                    }
                };

            case Dialog.types.DIALOG_SEARCH_CHANGE:
                return {
                    ...state,
                    search: {
                        ...state.search,
                        value: payload.value,
                    }
                };

            case Dialog.types.DIALOG_CLOSE_SEARCH:
                return {
                    ...state,
                    search: {
                        ...state.search,
                        visible: false,
                        value: null,

                    }
                };
            default:
                return state;
        }
    }
}