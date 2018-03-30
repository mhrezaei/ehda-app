import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {StyleSheet, View, ScrollView, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, Theme} from '../../core';

import splashMenu from '../resources/splashMenu';

import {Navigation} from '../redux';

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
        direction: 'rtl',
        color: Theme.text
    },
    menuItem: {
        flex: 1,
        borderBottomColor: Theme.border,
        borderBottomWidth: 1
    },
    menuItem_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuItem_icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        paddingTop: 2
    }
});

const MenuItem = ({title, icon, onPress}) => {
    return (<TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItem_direct}>
            <Icon name={icon} style={styles.menuItem_icon} size={20} color={Theme.accent}/>
            <Text>{title}</Text>
        </View>
    </TouchableOpacity>);
};


MenuItem.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func
};


const Menu = ({title, redux, dispatch, onPress, routes}) => {

    return (
        <ScrollView style={styles.menu}>
            <View style={styles.menu_header}>
                <Image style={styles.menu_logoImage} resizeMode={'contain'} source={splashMenu}/>
                {title && <Text style={styles.menu_title}>{title}</Text>}
            </View>
            <View style={styles.menu_direct}>
                {Object.keys(routes).map((key, i) => {
                    const route = routes[key];
                    let visible = !route.hasOwnProperty('visibility');

                    if (visible === false) {
                        if (route.visibility instanceof Boolean)
                            visible = route.visibility;
                        else if (route.visibility instanceof Function)
                            visible = route.visibility(redux);
                    }


                    if(visible) {
                        return (<MenuItem key={i} title={route.title} icon={route.icon} onPress={() => {
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
    dispatch: PropTypes.func,
    onPress: PropTypes.func,
    redux: PropTypes.object,
    routes: PropTypes.object.isRequired
};


export {Menu};