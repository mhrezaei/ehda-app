import {combineReducers} from 'redux';

import server from './server/reducer';
import auth from './auth/reducer';
import nav from './nav/reducer';
import app from './app/reducer';
import history from './history/reducer';

export default combineReducers({
    server,
    auth,
    app,
    nav,
    history
});
