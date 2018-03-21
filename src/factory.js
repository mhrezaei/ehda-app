import React from 'react';

import {Menu, MenuItem} from "./ui/components";

export const createMenuFromRoutes = (routes, state, goTo, title, image) =>{
    let items = [];
    let i = 0;
    for(let key in routes){
        if(routes.hasOwnProperty(key)) {

            const route = routes[key];
            let show = route.hasOwnProperty('hidden');
            if(!show && typeof route.hidden === 'boolean')
                show = route.hidden;
            else if(!show && typeof route.hidden === 'function')
                show = route.hidden(state());

            if(!show) {
                items.push(<MenuItem key={i} title={route.title} icon={route.icon} onPress={() => goTo(key)}/>);
                i++;
            }
        }
    }
    return (<Menu title={title} image={image}>
        {items}
    </Menu>);
};