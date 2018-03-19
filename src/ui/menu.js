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



import splash_src from '../../res/ehda-logo-small.png';


// <Image source={require('../../aryan.png')} style={styles.profilePicture}/>

class Menu extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    };

    render() {
        let {children} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.logo_image} source={splash_src} />
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
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        alignContent: 'flex-end',
        backgroundColor: '#55a655',
    },
    logo_image: {
        flex: 1,
        alignSelf: 'center',
        resizeMode: 'center'
    },
    profileName: {
        alignSelf: 'flex-end',
        fontSize: 16,
        textAlign: 'right',
        direction: 'rtl',
        fontFamily: 'IRANSans',
        color: 'white'
    }
});


export default Menu;