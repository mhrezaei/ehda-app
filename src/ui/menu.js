import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native'


import theme from '../theme'

// menu
const Menu = ({title, image, children}) => {
    return (
        <ScrollView style={styles.menu}>
            <View style={styles.menu_header}>
                <Image style={styles.menu_logoImage} source={image} />
                <Text style={styles.menu_title}>{title}</Text>
            </View>
            <View style={styles.menu_direct}>
                {children}
            </View>
        </ScrollView>);
};
Menu.propTypes = {
    title: PropTypes.string.isRequired,
    image: Image.propTypes.source,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: theme.background,

        borderLeftColor: '#d8d8d8',
        borderLeftWidth: 1
    },
    menu_direct: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
    },
    menu_header: {
        flex: 1,
        paddingHorizontal:20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        alignContent: 'flex-end',
        backgroundColor: theme.primary,
    },
    menu_logoImage: {
        flex: 1,
        alignSelf: 'center',
        resizeMode: 'center'
    },
    menu_title: {
        alignSelf: 'flex-end',
        fontSize: 16,
        textAlign: 'right',
        direction: 'rtl',
        fontFamily: theme.font,
        color: theme.text
    },
});


export default Menu;