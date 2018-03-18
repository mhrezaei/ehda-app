import structure from '../structure';

import * as actions from '../actions';

export default function (state = structure.get('nav'), payload) {
    switch (payload.type) {
        case actions.NAV_GOTO_PAGE:
            return state.merge({"current": payload.page});
        default:
            return state;
    }
}