import structure from '../structure';

export default function (state = structure.get('app'), payload) {
	return state.updateIn(['last_action'], x => payload.type );
}
