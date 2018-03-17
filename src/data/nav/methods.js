import * as actions from '../actions';

export const goto = (route) => ({
	type: actions.NAV_GOTO_ROUTE,
    route
});
export const toggleMenu = () => ({
	type: actions.NAV_TOGGLE_MENU
});
