

import * as actions from '../types';
import structure from '../initialState';

export default function (state = structure.auth, payload) {
	switch (payload.type) {

        case actions.AUTH_CHECK_CODE_MELLI_SUCCESS:
            return {
                ...state,
                temporary: payload.code_melli
            };
        case actions.AUTH_DOWNLOAD_CARD_SUCCESS:
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [payload.code_melli]: {
                        ...state.cards[payload.code_melli],
                        saved_at: new Date().getTime()
                    }
                }
            };
        case actions.AUTH_REGISTER_SUCCESS:
        case actions.AUTH_GET_CARD_SUCCESS:
            const code_melli = payload.data.ehda_card_details.code_melli;
            return {
                ...state,
                pinned: state.pinned ? state.pinned : code_melli,
                cards: {
                    ...state.cards,
                    [code_melli]: {
                        ...state.cards[code_melli],
                        info: payload.data,
                        updated_at: new Date().getTime()
                    }
                }
            };
        case actions.AUTH_CHANGE_PINNED_CARD:
            return {
                ...state,
                pinned: payload.code_melli,
            };
        case actions.AUTH_REQUEST_TOKEN_SUCCESS:
        case actions.AUTH_UPDATE_TOKEN:
			return {
                ...state,
                token: payload.token,
                datetime: new Date().getTime()
            };
		default:
			return state;
	}
}
