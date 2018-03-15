import axios from '../../api/axios';

export function request_utc() {
	//return axios('POST', 'server/time/utc');



    return new Promise((resolves, rejects)=>{
        setTimeout(()=>{
            resolves(1212)
        }, 300);
    });
}
