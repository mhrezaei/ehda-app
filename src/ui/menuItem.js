import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {trans} from '../i18'

import Icon from 'react-native-vector-icons/MaterialIcons';


import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity
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

            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={styles.container_inner}>
                    <Icon name={icon} style={styles.icon} size={20} color={"#4f8ef7"}/>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
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
        paddingHorizontal:20,
        paddingVertical:10
    },
    icon:{
        width: 20,
        height: 20,
        marginLeft:10
    },
    text: {
        fontFamily: 'IRANSans'
    }
});


export default MenuItem;