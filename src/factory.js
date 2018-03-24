import React from 'react';

import {Buffer} from 'buffer';
import {Menu, MenuItem} from "./ui/components";

export const createMenuFromRoutes = (routes, state, goTo, title, image) =>{
    let items = [];
    let i = 0;
    for(let key in routes){
        if(routes.hasOwnProperty(key)) {

            const route = routes[key];
            let show = !route.hasOwnProperty('visibility');

            if(!show && typeof route.visibility === 'boolean')
                show = route.visibility;
            else if(!show && typeof route.visibility === 'function')
                show = route.visibility(state);

            if(show) {
                items.push(<MenuItem key={i} title={route.title} icon={route.icon} onPress={() => goTo(key)}/>);
                i++;
            }
        }
    }
    return (<Menu title={title} image={image}>
        {items}
    </Menu>);
};

export function encodeImage (response) {
    return 'data:'+response.headers['content-type'] + ';base64,'+ new Buffer(response.data, 'binary').toString('base64');
}
export function decodeImage (base64) {
    return {uri: base64}
}