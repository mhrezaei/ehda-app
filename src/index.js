import React from 'react';

import Router from './router';

import Login from './pages/login';
import GetCard from './pages/getCard';



export default () =>{
    return <Router components={{
        login: {
            title: "Login",
            layout: Login,
        },
        getCard: {
            title: "My Card",
            layout: GetCard,
        }
    }} defaultRoute={"login"}/>
};

