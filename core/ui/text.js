import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text as TextParent,
    Platform,
} from 'react-native'


import theme from '../theme';

// button
const Text = ({style, children, invert, ...props}) => {
    return (<TextParent style={StyleSheet.flatten([invert ? styles.text_invert : styles.text, style])} {...props}>{children}</TextParent>);
};

Text.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.any,
    invert: PropTypes.any
};


const styles = StyleSheet.create({
    text: {
        color: theme.textInvert,
        fontFamily: theme.font,
        textAlign: Platform.OS === 'ios' ? 'justify' : 'right',
        writingDirection:'rtl',
    },
    text_invert: {
        color: theme.text,
        fontFamily: theme.font,
        textAlign: Platform.OS === 'ios' ? 'justify' : 'right',
        writingDirection:'rtl',
    }
});


export default Text;