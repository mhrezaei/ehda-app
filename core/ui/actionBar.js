import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    StatusBar,
    ActivityIndicator
} from 'react-native'

import theme from '../theme'
import Icon from 'react-native-vector-icons/MaterialIcons';


const ActionBar = ({name, loading, title, onPress}) => {
    return (
        <View style={{
            backgroundColor: Platform.OS === 'ios' ? theme.primaryDark : theme.primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: Platform.OS === 'ios' ? 22 : 0
        }}>
            <View  style={
                {
                    flex: 1,
                    backgroundColor: theme.primary,
                    flexDirection: 'row-reverse',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    paddingHorizontal:20,
                    paddingVertical:15,

                    shadowColor: theme.black,
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },

                    shadowRadius: 3,
                    shadowOpacity: 0.3,
                    elevation: 1
                }
            }>

                <StatusBar backgroundColor={theme.primaryDark}/>

                <View style={styles.actionBar_menuHolder}>

                    <TouchableOpacity style={styles.actionBar_menuIcon} onPress={onPress}>
                        <Icon name={"menu"} size={25} color={"#fff"}/>
                    </TouchableOpacity>
                    {loading ? <ActivityIndicator size="small" color={theme.text} style={styles.actionBar_indicator}/> : <View style={styles.actionBar_indicator}/>}
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
    onPress: PropTypes.func,
    loading: PropTypes.any
};

const styles = StyleSheet.create({
    actionBar_indicator:{
        paddingHorizontal: 10,
    },
    actionBar_menuHolder: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
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
        alignSelf: 'center',
        fontFamily: theme.font,
        textAlign: 'left',
        fontSize: 16
    },
    actionBar_menuIcon:{
        alignSelf: 'center',
    }
});

export default ActionBar;