import { expect } from 'chai';

import {filter, flatten} from '../helpers';

describe('helpers', () => {
    it('flat object to array', ()=>{
        const temp = {
            name: {
                attr1: 'hello1',
                attr2: 'hello2'
            },
            hello: {
                attr1: 'hello1',
                attr2: 'hello2'
            }
        };

        const flatted = [
            {
                key: 'name',
                value: {
                    attr1: 'hello1',
                    attr2: 'hello2'
                }
            },
            {
                key: 'hello',
                value: {
                    attr1: 'hello1',
                    attr2: 'hello2'
                }
            },
        ];

        expect(flatten(temp)).to.deep.equal(flatted);


    });
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