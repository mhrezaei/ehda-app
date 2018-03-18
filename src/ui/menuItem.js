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
        title: PropTypes.string,
        icon: PropTypes.string,
        onPress: PropTypes.func,
    };

    render() {
        let {title, icon, onPress} = this.props;
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.container_inner} onPress={onPress}>
                    <Text style={styles.text}>{title}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_inner: {
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