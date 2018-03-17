
import {fromJS, List} from 'immutable';


import * as actions from '../actions';
import structure from '../structure';

export default function (state = structure.get('nav'), payload) {
	switch (payload.type) {
		case actions.NAV_GOTO_ROUTE:
			return state.merge({location: payload.route, menuOpen: false});
        case actions.NAV_TOGGLE_MENU:
            return state.update('menuOpen', (x) => {
                return !x;
            });
		default:
			return state;
	}
}
