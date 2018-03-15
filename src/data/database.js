import {combineReducers} from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import server from './server/reducer';
import auth from './auth/reducer';
import app from './app/reducer';

export default combineReducers({
    router : routerReducer,
    server,
    auth,
    app

});
