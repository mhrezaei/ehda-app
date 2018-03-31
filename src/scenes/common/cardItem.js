import React, {Component} from 'react';

import {View, Image, ActivityIndicator, TouchableOpacity} from 'react-native';

import {Theme, File, Helpers} from '../../../core';

import {Navigation, Auth, Ajax} from '../../redux/index';
import Icon from 'react-native-vector-icons/MaterialIcons';


export class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
            retries: 0,
            loading: false
        };
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        const path = 'ehda/' + this.props.name + '/single';
        this.setState({loading: true});
        File.exists(path).then(result => {
            if (result > 0) {
                File.read(path).then(data => {
                    this.setState({
                        image: Helpers.decodeFile(data),
                        loading: false
                    })
                })
            } else {
                this.props.dispatch(Auth.downloadCard(this.props.name, (result) => {
                    if (result) {
                        File.read(path).then(data => {
                            this.setState({
                                image: Helpers.decodeFile(data),
                                loading: false
                            })
                        });
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                }));
            }
        });

    }

    onPress() {
        if (!this.state.image) {
            this.setState({ error: false });
            this.loadCard();
        } else {
            this.props.dispatch(Auth.changePinnedCard(this.props.name));
            this.props.dispatch(Navigation.goTo('myCard'));
        }
    }

    render() {
        return (<TouchableOpacity ref={ref => this.Base = ref} style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#eee'
            }} onPress={this.onPress}>
                {this.state.image ?
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Image style={{
                        flex: 1,

                        height: 200
                    }} resizeMode={'contain'} source={this.state.image}/>
                </View> :
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 20,
                }}>
                    {this.state.loading ?
                        <ActivityIndicator size="large" color={Theme.accent} animating={true}/> :
                        <Icon name={'error'} size={40} color={Theme.red}/>}
                </View>
            }
            </TouchableOpacity>
        );
    }
}