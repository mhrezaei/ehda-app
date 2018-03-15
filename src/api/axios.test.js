import axios, {axios_instance} from './axios';
import MockAdapter from 'axios-mock-adapter';


describe('AXIOS - Async function', ()=>{
    it('should return data format ', async ()=>{
        expect.assertions(1);

        const mock = new MockAdapter(axios_instance);
        mock.onPost('success').reply(200, ['success']);
        await expect(axios('POST','success', {})).resolves.toEqual({status:200 ,data: ['success']});
    });

    it('should return error format', async ()=>{
        expect.assertions(1);
        const mock = new MockAdapter(axios_instance);
        mock.onPost('error').reply(404, ['error']);
        await expect(axios('POST','error', {})).resolves.toEqual({status:404 ,data: ['error']});
    });
});