import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
} from 'react-native'


import theme from '../theme';

// button
const Text_Exp = ({style, children, invert}) => {
    return (<Text style={[style, invert ? styles.text_invert : styles.text]}>{children}</Text>);
};

Text_Exp.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.object,
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