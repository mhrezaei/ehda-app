import { expect } from 'chai';

import * as actions from '../data/types';
import * as methods from '../data/app/methods';
import reducer from '../data/app/reducer';

describe('data/app', () => {
    it('should change language correctly', () => {

        expect(reducer({lang: 'en'}, methods.switch_language())).to.deep.equal({lang: 'fa'});

    });


});