import React, {Component} from 'react';

import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {min, clamp} from "../../core/helpers";
import splash from '../resources/splash';

const window = Dimensions.get("window");

const size = clamp(min(window.width, window.height)*0.75, 0, 300);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: size,
        height: size
    }
});

export default function (){
    return (<View style={styles.container}>
        <Image resizeMode={'contain'} style={styles.image} source={splash}/>
    </View>);
}
