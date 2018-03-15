import axios from '../../api/axios';

export function request_utc() {
    return new Promise((resolves, rejects)=>{
        setTimeout(()=>{
            resolves({
                status: 200,
                data: 1212
            });
        }, 3000);
    });
}