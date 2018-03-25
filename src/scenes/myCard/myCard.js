import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';


import {trans} from '../../i18'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app_methods from '../../data/app/methods';
import * as auth_methods from '../../data/auth/methods';


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
        const last = this.props.cards[this.props.pinned].saved_at || 0;
        if(new Date().getTime() - last  > 60*60*1000){
            this.props.auth_methods.downloadCardAsync(this.props.pinned, ()=>{
                this.load(this.props.pinned);
            }, ()=>{});
        }
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

                    <Text>{trans('savedAt', {date: moment().to(cards[pinned].saved_at)})}</Text>

                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} resizeMode={'contain'} source={this.myCard}/>
                    </View>

                    <View style={styles.wrapper}>
                        <Button title={trans('saveCard')} icon={"save"}/>
                        <Button title={trans('printCard')} icon={"print"}/>
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

    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
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
        app_methods: bindActionCreators(app_methods, dispatch),
        auth_methods: bindActionCreators(auth_methods, dispatch),
    };
})(MyCard);
