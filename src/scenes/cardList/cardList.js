import React, {Component} from 'react';
import lodash from 'lodash';
import {View, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator} from 'react-native';
import {Text} from '../../../core/ui/components';

const view_width = Dimensions.get('window').width;
import {bindActionCreators} from 'redux';
import * as auth_methods from '../../data/auth/actions';
import * as nav_methods from '../../data/nav/actions';

import {connect} from 'react-redux';
import {flatten} from "../../../core/helpers";

import {decodeFile} from "../../../core/helpers";
import theme from '../../../core/theme';

import {FileIO} from "../../../core/modules";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null
        };
        this.loadCard = this.loadCard.bind(this);
        this.check = this.check.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.check();
    }


    check() {
        const yOffset = this.props.state.yOffset;
        const frameHeight = this.props.state.frameHeight;
        const itemHeight = this.itemHeight;
        const y = this.props.index * itemHeight;

        const visible = y >= yOffset && y <= yOffset + frameHeight;
        this.setState({
            visible
        });
        if (visible && !this.state.image) {
            this.loadCard();
        }
    }

    componentDidMount(){
        this.check();
    }

    loadCard() {
        const path = 'ehda/' + this.props.name + '/single';
        FileIO.exists(path).then(ex => {
            if (ex > 0) {
                FileIO.read(path).then(data => {
                    this.setState({
                        image: decodeFile(data)
                    });
                });
            } else {
                this.props.auth_methods.downloadCardAsync(this.props.name, () => {
                    this.check();
                }, () => {
                });
            }
        });
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{
                this.props.auth_methods.changePinnedCard(this.props.name);
                this.props.nav_methods.goto('myCard');
            }} onLayout={event => {
                this.itemHeight = event.nativeEvent.layout.height;
            }}>
                {this.state.image ? <View style={styles.imageWrapper}>
                    <Image style={styles.image} resizeMode={'contain'} source={this.state.image}/>
                </View> : <ActivityIndicator size="small" color={theme.accent} style={styles.indicator}/>}
            </TouchableOpacity>
        );
    }
}

class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yOffset: 0,
            frameHeight: 500
        };

        this.data = [];
        for (let i = 0; i < 40; i++) {
            this.data.push({
                key: i
            });
        }
    }

    render() {
        return (<View style={styles.parent}>
            <View style={styles.textDescription}/>
            <FlatList
                data={flatten(this.props.cards)}
                onLayout={event => {
                    this.frameHeight = event.nativeEvent.layout.height;
                    const maxOffset = this.contentHeight - this.frameHeight;
                    if (maxOffset < this.yOffset) {
                        this.yOffset = maxOffset;
                    }
                    this.setState({
                        frameHeight: this.frameHeight
                    });
                }}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.contentHeight = contentHeight;
                    const maxOffset = this.contentHeight - this.frameHeight;
                    if (maxOffset < this.yOffset) {
                        this.yOffset = maxOffset;
                    }
                }}
                onScroll={event => {
                    this.yOffset = event.nativeEvent.contentOffset.y;
                    this.setState({
                        yOffset: this.yOffset
                    });
                }}
                onScrollEndDrag={event => {
                    this.yOffset = event.nativeEvent.contentOffset.y;
                }}
                scrollEventThrottle={1000}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <Item auth_methods={this.props.auth_methods} nav_methods={this.props.nav_methods}  index={index} name={item.key} value={item.value}
                                                     state={this.state}/>}
            />
        </View>);
    }
}


const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#fff'
    },

    textDescription: {
        width: view_width,

    },
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator:{
        paddingVertical: 20,
    },
    image: {
        flex: 1,
        height: 200,
    },
});

export default connect((state) => {
    return {
        cards: state.auth.cards
    };
}, (dispatch) => {
    return {
        auth_methods: bindActionCreators(auth_methods, dispatch),
        nav_methods: bindActionCreators(nav_methods, dispatch),
    };
})(CardList);
