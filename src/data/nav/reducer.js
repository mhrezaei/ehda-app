import structure from '../initialState';

import * as actions from '../types';

export default function (state = structure.nav, payload) {
    switch (payload.type) {
        case actions.NAV_GOTO_PAGE:
            return { ...state, current: payload.page, props: payload.props };
        default:
            return state;
    }
}