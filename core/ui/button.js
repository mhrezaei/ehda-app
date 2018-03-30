import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native'


import Theme from '../theme';

import Icon from 'react-native-vector-icons/MaterialIcons';




// button
const Button = ({title, style, icon, onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.button_direct}>
                {icon && <Icon name={icon} style={StyleSheet.flatten([style, styles.button_icon])} size={20} color={Theme.text}/> }
                <Text style={styles.button_text}>{title}</Text>
            </View>
        </TouchableOpacity>);
};
Button.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func
};


const styles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 5,
        backgroundColor: Theme.accent,
        borderRadius: 4,
        shadowColor: Theme.black,
        shadowOffset: {
            width: 0,
            height: 1
        },

        shadowRadius: 3,
        shadowOpacity: 0.3,
        elevation: 2

    },
    button_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal: 10,
        justifyContent:'center',
        paddingVertical: Platform.select({ios:10, android: 5})
    },
    button_text: {
        color: Theme.text,
        fontFamily: Theme.font,
        textAlign: 'center',
        fontSize: 14,
    },
    button_icon: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
});

export default Button;