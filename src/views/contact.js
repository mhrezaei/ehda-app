import React, {Component} from 'react';

import {StyleSheet, View, Dimensions, TouchableOpacity,Linking} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Stretch, Theme, Text, Translate, LocalizeNumber} from '../../core';
import PropTypes from 'prop-types';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {NumToEn} from "../../core/i18";

const viewWidth = Dimensions.get('window').width;

const Region = {
    latitude: 35.7522969,
    longitude: 51.4110658,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};
import Communications from 'react-native-communications';

const Row = ({icon, label, link, onPress, address}) => {

    return (<TouchableOpacity style={styles.row} onPress={onPress}>
        <View style={styles.icon}><Icon name={icon} size={30} color={Theme.gray}/></View>
        <View style={styles.rowDirect}>
            <Text style={styles.label}>{label}</Text>
            <Text style={address ? styles.address :styles.link}>{LocalizeNumber(link)}</Text>
        </View>
    </TouchableOpacity>);
};

Row.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    link: PropTypes.string,
    onPress: PropTypes.func,
};


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failed: false
        };
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollView}>

                    <View style={styles.mapContainer}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            region={Region}
                        >
                            <Marker
                                coordinate={Region}
                                title={'Here'}
                            />
                        </MapView>
                    </View>
                    <Row icon={'link'} label={Translate('webAddress')} link={Translate('webAddressTemp')}  onPress={()=>{
                        Linking.openURL(Translate('webAddressTemp'));
                    }}/>
                    <Row icon={'phone'} label={Translate('telephone')} link={Translate('telephoneTemp')} onPress={()=>{
                        Communications.phonecall(NumToEn(Translate('telephoneTemp')), true);
                    }}/>
                    <Row icon={'mail'} label={Translate('email')} link={Translate('emailTemp')} onPress={()=>{
                        Communications.email(Translate('emailTemp'), "", "", "", "");
                    }}/>
                    <Row icon={'place'} label={Translate('address')} address link={Translate('addressTemp')}/>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        justifyContent: 'center',
        paddingBottom: 120
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        ...Theme.shadow
    },
    mapContainer: {
        flex: 1,
        width: viewWidth,
        height: 130,
    },
    row: {
        flex:1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: Theme.border,
        borderBottomWidth: 1,
        paddingVertical: 20,
    },
    icon: {paddingHorizontal: 20},
    rowDirect: {flex:1, paddingLeft: 20, flexDirection: 'column', justifyContent: 'flex-start'},
    label: {textAlign: 'right', color: Theme.grayDark, paddingVertical: 2},
    link: {
        fontSize: 16,
        color: Theme.accentLight,
        paddingVertical: 2
    },
    address: {
        fontSize: 16,
        color: Theme.textInvert,
        paddingVertical: 2
    }

});
export default Contact;