
export function request_card(payload) {
    return new Promise((resolves, rejects)=>{
        setTimeout(()=>{
            resolves({
                status: 200,
                data: {
                    user: {
                        email: payload.email,
                        access: 'guest'
                    },
                    token: (Math.random()*999999+1000000).toFixed().toString()
                }
            });
        }, 200);
    });
}
