import { expect } from 'chai';

import {filter, flatten, matchAction, checkCodeMelli} from '../helpers';



describe('CodeMelli', ()=>{
    it('should validate CodeMelli correctly', () => {

        expect(checkCodeMelli('0453637434')).to.equal(true);
    })
});

describe('Filter Function', ()=>{
    it('should filter and map object correctly', () => {

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

describe('Match Action', ()=>{
    it('should filter desired action', ()=> {
        expect(matchAction('AUTH_HELLO_WORLD', ['auth', 'nav'])).to.equal(true);
    });

    it('should fail at irrelevant action', ()=> {
        expect(matchAction('AUTH_HELLO_WORLD', [ 'nav'])).to.equal(false);
    });
});

describe('Flatten Function', () => {
    it('should convert an object to an array', ()=>{
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
});