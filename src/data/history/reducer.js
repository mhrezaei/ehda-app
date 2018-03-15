import structure from '../structure';

export default function (state = structure.get('history'), payload) {
	return state.updateIn(['last_action'], x => payload.type );
}
