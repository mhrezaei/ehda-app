import * as actions from '../types';

export const goto = (page) => ({
    type: actions.NAV_GOTO_PAGE,
    page
});
