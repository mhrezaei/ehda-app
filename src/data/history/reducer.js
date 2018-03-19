import structure from '../structure';

export default function (state = structure.history, payload) {
	return {
	    ...state,
        last_action: payload.type
    };
}
