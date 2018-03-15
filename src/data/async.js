import { all } from 'redux-saga/effects';

import auth_async from './auth/async';
import server_async from './server/async';

export default function* () {
    yield all([
        auth_async(),
        server_async()
    ]);
}
