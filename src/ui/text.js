import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
} from 'react-native'


import theme from '../theme';

// button
const Text_Exp = ({style, children, invert, ...props}) => {
    return (<Text style={StyleSheet.flatten([invert ? styles.text_invert : styles.text, style])} {...props}>{children}</Text>);
};

Text_Exp.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.any,
    invert: PropTypes.any
};


const styles = StyleSheet.create({
    text: {
        color: theme.textInvert,
        fontFamily: theme.font
    },
    text_invert: {
        color: theme.text,
        fontFamily: theme.font
    }
});


export default Text_Exp;