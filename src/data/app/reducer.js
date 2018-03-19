import structure from '../structure';

import * as actions from '../actions';

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