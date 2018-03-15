import structure from '../structure';

import * as actions from '../actions';

export default function (state = structure.get('app'), payload) {
    switch (payload.type) {
        case actions.APP_SWITCH_LANGUAGE:
            return state.update('lang', (x) => {
                console.log(x);
                return x === 'en' ? 'fa' : 'en';
            });
        default:
            return state;
    }
}