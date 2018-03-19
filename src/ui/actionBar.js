import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
} from 'react-native'

import theme from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';


const ActionBar = ({name,title, onPress}) => {
    return (
        <View style={styles.actionBar}>
            <View style={styles.actionBar_direct}>

                <StatusBar backgroundColor={theme.primaryDark}/>

                <View style={styles.actionBar_menuHolder}>
                    <TouchableOpacity onPress={onPress}>
                        <Icon name={"menu"} style={styles.actionBar_menuIcon} size={20} color={"#fff"}/>
                    </TouchableOpacity>
                    <Text style={styles.actionBar_title}>{title}</Text>
                </View>
                <Text style={styles.actionBar_titleLeft}>{name}</Text>
            </View>
        </View>
    );
};
ActionBar.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    // action bar
    actionBar: {
        backgroundColor: theme.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBar_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20,
        paddingVertical:10
    },
    actionBar_menuHolder: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    actionBar_title:{
        color: theme.text,
        fontFamily: theme.font,
        fontSize: 16,
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
    actionBar_titleLeft:{
        color: theme.text,
        alignSelf: 'flex-start',
        fontFamily: theme.font,
        textAlign: 'left',
        fontSize: 16
    },
    actionBar_menuIcon:{
        width: 20,
        height: 20,
        paddingTop:3,
        marginLeft:20
    }
});

export default ActionBar;