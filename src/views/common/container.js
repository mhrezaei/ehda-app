/*
    Filename: src/views/common/container.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 4:56 AM

    Description:
        simply a container.

 */

import React, {Component} from 'react';

import {View} from 'react-native';
import PropTypes from 'prop-types';


function Container({children}) {
    return (<View style={{flex:1, zIndex: 0}}>{children}</View>);
}


Container.propTypes = {
    children: PropTypes.any
};

export {Container};