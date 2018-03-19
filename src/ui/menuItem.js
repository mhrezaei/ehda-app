import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'


import theme from '../theme'

import Icon from 'react-native-vector-icons/MaterialIcons';


// menu item
const MenuItem = ({title, icon, onPress}) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItem_direct}>
                <Icon name={icon} style={styles.menuItem_icon} size={20} color={theme.accent}/>
                <Text style={styles.menuItem_text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};
MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onPress: PropTypes.func
};



const styles = StyleSheet.create({
    // menu item
    menuItem: {
        flex: 1
    },
    menuItem_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal:20,
        paddingVertical:10
    },
    menuItem_text: {
        fontFamily: theme.font
    },
    menuItem_icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        paddingTop: 2
    }
});


export default MenuItem;