/*
    Filename: src/scenes/menu/menu.js
    Author: Aryan Alikhani
    Last Edit: April 1 2018, 5:07 AM

    Description:
        Sidebar menu, generate view from src/routes.js

 */

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {StyleSheet, View, ScrollView, Image} from 'react-native';


import {MenuItem} from "./menuItem";

import {Text, Theme} from '../../../core/index';

import splashMenu from '../../resources/splashMenu';

import {Navigation} from '../../models/index';


const Menu = ({title, redux, dispatch, onPress, routes, current}) => {
    return (
        <ScrollView style={styles.menu}>
            <View style={styles.menu_header}>
                <Image style={styles.menu_logoImage} resizeMode={'contain'} source={splashMenu}/>
                {title && <Text style={styles.menu_title}>{title}</Text>}
            </View>
            <View style={styles.menu_direct}>
                {Object.keys(routes).map((key, i) => {

                    const route = routes[key];

                    // check if route must be visible
                    let visible = !route.hasOwnProperty('visibility');

                    // if still have visibility attribute then
                    if (visible === false) {
                        // check if it's boolean
                        if (route.visibility instanceof Boolean)
                            visible = route.visibility;
                        // check if it's a function
                        else if (route.visibility instanceof Function)
                            visible = route.visibility(redux);
                    }


                    // if it's visible then return it's child
                    if(visible) {
                        return (<MenuItem key={'menuItem:'+i} current={current === key} title={route.title} icon={route.icon} onPress={() => {
                            dispatch(Navigation.goTo(key));
                            onPress(key);
                        }}/>);
                    }
                })}
            </View>
        </ScrollView>
    );
};


Menu.propTypes = {
    title: PropTypes.string,
    current: PropTypes.string,
    dispatch: PropTypes.func,
    onPress: PropTypes.func,
    redux: PropTypes.object,
    routes: PropTypes.object.isRequired
};


const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: Theme.background,
        borderLeftColor: Theme.border,
        borderLeftWidth: 1
    },
    menu_direct: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
    },
    menu_header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        alignContent: 'flex-end',
        justifyContent: 'center',
        backgroundColor: Theme.primary,

        shadowColor: Theme.black,
        shadowOffset: {
            width: 0,
            height: 1
        },

        shadowRadius: 3,
        shadowOpacity: 0.3,
        elevation: 2
    },
    menu_logoImage: {
        flex: 1,
        alignSelf: 'center',
        height: 100,
        width: 100,
    },
    menu_title: {
        alignSelf: 'flex-end',
        fontSize: 16,
        textAlign: 'right',
        writingDirection: 'rtl',
        color: Theme.white
    }
});


export {Menu};