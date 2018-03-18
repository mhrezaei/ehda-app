import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {trans} from '../i18'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'

class Menu extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };

    render() {
        let {children} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../aryan.png')} style={styles.profilePicture}/>
                    <Text style={styles.profileName}>{trans('somebody')}</Text>
                </View>
                <View style={styles.container_inner}>
                    {children}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    container_inner: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
    },
    controlText: {
        color: '#626262',
    },
    header: {
        flex: 1,
        paddingHorizontal:20,
        paddingTop: 20,
        paddingBottom: 10,
        flexDirection: 'column',
        backgroundColor: '#419148',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignSelf: 'flex-end',

    },
    profileName: {
        paddingTop: 10,
        alignSelf: 'flex-end',
        textAlign: 'right',
        direction: 'rtl',
        fontFamily: 'IRANSans'
    }
});


export default Menu;