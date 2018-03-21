import structure from '../initialState';

import * as actions from '../types';

export default function (state = structure.cards, payload) {
    switch (payload.type) {
        default:
            return state;
    }
}