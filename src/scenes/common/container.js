import React, {Component} from 'react';

import {View} from 'react-native';


export function Container({children}) {
    return (<View style={{flex:1}}>{children}</View>);
}