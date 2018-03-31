import React, {Component} from 'react';
import {View, StyleSheet, Image, Linking, TouchableOpacity, FlatList} from 'react-native';
import {Button, Translate, Helpers, Attach, Loading, Text, FileIO, Theme, Stretch} from '../../core/index';

import {Navigation, Auth, Ajax} from '../redux/index';

import {Container} from "./common/container";
import {CardItem} from "./common/cardItem";


class MyCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _data: [],
            current: 0,
            count: 3,
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Container>
                <Stretch/>
                {this.props.cards &&
                <FlatList
                    data={Helpers.flatten(this.props.cards)}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => <CardItem dispatch={this.props.dispatch}
                                                             index={index}
                                                             name={item.key}
                                                             value={item.value}/>}
                />
                }
            </Container>
        );
    }
}

export default Attach({
    'auth.handle': (handle, redux) => {
        return {
            cards: Helpers.leaf(redux, 'auth.cards')
        }
    }
})(MyCards);