import * as actions from '../actions';

export const goto = (page) => ({
    type: actions.NAV_GOTO_PAGE,
    page
});
