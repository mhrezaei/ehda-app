import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ActivityIndicator,
} from 'react-native'

import Text from './text';
import Theme from '../theme';
import {Translate} from "../i18";
import Icon from 'react-native-vector-icons/MaterialIcons';

// button
const Loading = ({progress = false}) => {
    return (progress.loading ?
        <View style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.88)',
            zIndex: 9999,
        }}>
            {
                progress.phase === 0 ?
                <View style={{
                    padding: 20,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <ActivityIndicator size={0} color={Theme.accent}/>
                    <Text style={{
                        padding: 20,
                        fontSize: 20,
                        textAlign: 'right'
                    }}>{Translate('pleaseWait')}</Text>
                </View>
                    :
                    <View style={{
                        padding: 20,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        {progress.status === 0 ? <Icon name={'done'} size={40} color={Theme.green}/> : <Icon name={'error'} size={40} color={Theme.red}/>}
                        <Text style={{
                            padding: 20,
                            fontSize: 20,
                            textAlign: 'right'
                        }}>{progress.messages[progress.status]}</Text>
                    </View>
            }
        </View>: <View/>);
};

Loading.propTypes = {
    progress: PropTypes.object
};

export default Loading;