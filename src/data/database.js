import {combineReducers} from 'redux-immutable';

import server from './server/reducer';
import auth from './auth/reducer';
import app from './app/reducer';
import history from './history/reducer';

export default combineReducers({
    server,
    auth,
    app,
    history
});
