import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'


import theme from '../theme';

import Icon from 'react-native-vector-icons/MaterialIcons';




// button
const Button = ({title, style, icon, onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.button_direct}>
                {icon && <Icon name={icon} style={StyleSheet.flatten([style, styles.button_icon])} size={20} color={theme.text}/> }
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
        flex: 1,marginTop: 10,
        backgroundColor: theme.accent,
        borderRadius: 5,
    },
    button_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    button_text: {
        color: theme.text,
        fontFamily: theme.font,
        textAlign: 'center'
    },
    button_icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        paddingTop: 2
    },
});

export default Button;