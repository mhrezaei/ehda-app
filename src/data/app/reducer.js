import structure from '../initialState';

import * as actions from '../types';

export default function (state = structure.app, payload) {
    switch (payload.type) {
        case actions.APP_SWITCH_LANGUAGE:
            return {
                ...state,
                lang: state.lang === 'en' ? 'fa' : 'en'
            };
        default:
            return state;
    }
}