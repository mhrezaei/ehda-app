import {fromJS} from 'immutable';


export default fromJS({
    history: {
        last_action: null
    },
    app: {
        lang: 'fa'
    },
    nav: {
        menuOpen: false
    },
    auth: {
        token: null,
        user: null,
        datetime: null
    },
    server: {
        request_utc_at: null,
        request_utc_done_at: null,
        requested_utc: null,
        utc_offset: null,
        last_successful_update: null,
        force_update: false
    }
});