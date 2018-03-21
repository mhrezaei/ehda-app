import structure from '../initialState';

export default function (state = structure.history, payload) {
	return {
	    ...state,
        last_action: payload.type
    };
}
