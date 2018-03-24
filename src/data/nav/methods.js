import * as actions from '../types';

export const goto = (page, props={}) => ({
    type: actions.NAV_GOTO_PAGE,
    page,
    props
});
