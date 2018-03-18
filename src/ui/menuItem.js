import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {trans} from '../i18'

import Icon from 'react-native-vector-icons';


import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

class MenuItem extends Component {
    static propTypes = {
        title: PropTypes.string.required,
        icon: PropTypes.string,
        onPress: PropTypes.func,
    };

    render() {
        let {title, icon, onPress} = this.props;
        return (
            <TouchableHighlight style={styles.container} underlayColor="#929292" onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        padding: 10,
    },
    text: {
        fontFamily: 'IRANSans'
    }
});


export default MenuItem;