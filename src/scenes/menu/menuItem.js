import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {StyleSheet, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, Theme} from '../../../core/index';

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

const styles = StyleSheet.create({
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


export {MenuItem};