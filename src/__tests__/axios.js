import axios, {axiosInstance} from '../config/axios';
import MockAdapter from 'axios-mock-adapter';

import { expect } from 'chai';



describe('Axios HTTP Bridge', () => {
    it('should return data format correctly', (done)=>{
        const expected = {status:200 ,data: ['success']};
        const mock = new MockAdapter(axiosInstance);
        mock.onPost('success').reply(200, ['success']);

        axios('POST','success', {}).then((response)=>{
            expect(response).to.eql(expected);
            done();
        });
    });

    it('should return error data format correctly', (done)=>{

        const expected = {status:404 ,data: ['error']};

        const mock = new MockAdapter(axiosInstance);
        mock.onPost('error').reply(404, ['error']);

        axios('POST','error', {}).then((response)=>{
            expect(response).to.eql(expected);
            done();
        });
    });

});