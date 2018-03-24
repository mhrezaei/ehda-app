import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';


import {Button, TextInput, Text} from '../../ui/components';

import theme from "../../theme";

import {decodeImage} from "../../factory";

const view_width = Dimensions.get('window').width;


import moment from 'momentj';


import {FileIO} from "../../modules";

class MyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: null
        };
        this.myCard = null;
        this.load = this.load.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const pinned = this.props.pinned;
        const pinnedNew = nextProps.pinned;

        if (pinned !== pinnedNew) {
            this.load(pinnedNew);
        }

    }

    componentDidMount() {
        this.load(this.props.pinned);
    }


    load(pinned) {
        FileIO.read('ehda/' + pinned + '/mini').then((data) => {
            this.myCard = decodeImage(data);
            this.forceUpdate();
        });
    }
    render() {
        const {cards, pinned} = this.props;
        return (
            <View style={styles.container_up}>
            <ScrollView contentContainerStyle={styles.parent}>
                <View style={styles.container}>

                    <View style={styles.textDescription}/>

                    <Text>{trans('updatedAt', {date: moment().to(cards[pinned].updated_at)})}</Text>
                    <Text>{trans('savedAt', {date: moment().to(cards[pinned].saved_at)})}</Text>

                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} resizeMode={'contain'} source={this.myCard}/>
                    </View>

                </View>
            </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        paddingBottom:60
    },
    container_up: {
        flex: 1,
    },

    textDescription: {
        paddingHorizontal: 13,
        width: view_width,

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingTop: 26,
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    image: {
        flex: 1,
        height: 300,
    },
});

MyCard.defaultProps = {
    pinned: null
};

export default connect((state) => {
    return {
        pinned: state.auth.pinned,
        cards: state.auth.cards
    };
}, (dispatch) => {
    return {
        app_methods: bindActionCreators(app_methods, dispatch)
    };
})(MyCard);
