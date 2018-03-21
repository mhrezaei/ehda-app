import { expect } from 'chai';

import {filter} from '../helpers';

describe('helpers', () => {
    it('filter object should filter and map object correctly', () => {

        const temp = {
            name: {
                attr1: 'hello1',
                attr2: 'hello2'
            },
            hello: {
                attr1: 'hello1',
                attr2: 'hello2'
            },
            test: {
                attr1: 'hello1',
                attr2: 'hello2'
            },
            docs: {
                name: 'test',
                family: 'ok'
            }
        };

        const filtered = {
            hello: {
                attr1: 'hello1',
                attr2: 'hello2'
            },
            docs: {
                name: 'test',
                family: 'ok'
            }
        };

        expect(filter(temp, (v, k) => ['hello', 'docs'].includes(k))).to.deep.equal(filtered);
    })
});