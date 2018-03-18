import React from 'react';

import Menu from "./ui/menu";
import MenuItem from "./ui/menuItem";

export const createMenuFromRoutes = (routes, goTo) =>{
    let items = [];
    let i = 0;
    for(let key in routes){
        const route = routes[key];
        items.push(<MenuItem key={i} title={route.title} icon={route.icon} onPress={()=>goTo(key)}/>);
        i++;
    }

    return (<Menu>
        {items}
    </Menu>)
}