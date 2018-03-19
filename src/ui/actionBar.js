import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {trans} from '../i18'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image, Platform
} from 'react-native'


import Icon from 'react-native-vector-icons/MaterialIcons';

class Menu extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func,
    };

    render() {
        const {title, onPress} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.container_inner}>
                    <TouchableOpacity onPress={onPress}>
                        <Icon name={"menu"} style={styles.icon} size={20} color={"#fff"}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#55a655',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_inner: {
        flex: 1,
        backgroundColor: '#55a655',
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal:20,
        paddingVertical:10
    },
    title:{
        color: '#fff',
        fontFamily: 'IRANSans',
        fontSize: 16
    },
    icon:{
        width: 20,
        height: 20,
        paddingTop:3,
        marginLeft:20
    }
});


export default Menu;