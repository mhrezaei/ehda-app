import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import {Button, Translate, Helpers, Attach, Loading, Text, File, Theme, Stretch} from '../../core/index';

import {Navigation, Auth, Ajax} from '../models/index';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from './common/search';


import {Container} from "./common/container";
import {CardItem} from "./common/cardItem";
import {LocalizeNumber} from "../../core/i18";

const window = Dimensions.get('window');
const viewWidth = Helpers.min(window.width, window.height);


const perPage = 3;

class MyCards extends Component {


    constructor(props) {
        super(props);
        this.state = {
            _data: [],
            page: 1,
            search: null
        };

        this.nextPage = this.nextPage.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    nextPage() {
        this.setState({
            page: this.state.page > this.total_pages - 1 ? this.state.page : this.state.page + 1
        });
    }

    searchChange(text) {
        this.setState({
            search: text
        });
    }

    previousPage() {

        this.setState({
            page: this.state.page < 2 ? this.state.page : this.state.page - 1
        });
    }

    render() {

        const {redux, cards, search, dispatch} = this.props;

        let sorted = Helpers.flatten(this.props.cards).sort((x, y) => {
            return x.value.updated_at < y.value.updated_at;
        });

        if(this.state.search){
            sorted = sorted.filter(item => {
                console.log(item)
                return item.value.info.ehda_card_details.full_name.includes(this.state.search)
            })
        }


        this.total_pages = Math.ceil(Object.keys(sorted).length / perPage);


        const start = (this.state.page - 1) * perPage;
        const items = [];
        sorted.slice(start, start + perPage).map((item, key) => {
            items.push(<CardItem dispatch={this.props.dispatch}
                              key={item.key}
                              name={item.key}
                              value={item.value}/>);
        });


        return (
            <Container>
                <Stretch/>
                <Search value={search.value} dispatch={dispatch} onChangeText={this.searchChange} visible={search.visible}/>
                <View style={styles.navContainer}>

                    <View style={styles.navContainerDirect}>
                        <TouchableOpacity style={styles.navTextContainer} onPress={this.nextPage}>
                            <Icon name={"keyboard-arrow-left"} size={25} color={Theme.gray}/>
                            <Text style={styles.navText}>
                                {Translate('next')}
                            </Text>

                        </TouchableOpacity>
                        <TouchableWithoutFeedback style={styles.navTextContainer}>


                            <Text style={styles.navText}>
                                {LocalizeNumber(this.state.page + ' از ' + this.total_pages)}
                            </Text>

                        </TouchableWithoutFeedback>
                        <TouchableOpacity style={styles.navTextContainer} onPress={this.previousPage}>

                            <Text style={styles.navText}>
                                {Translate('previous')}
                            </Text>
                            <Icon name={"keyboard-arrow-right"} size={25} color={Theme.gray}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.cards &&
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 20,
                        paddingBottom: 120
                    }}
                >
                    {items}

                </ScrollView>
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    navTextContainer: {
        flex: 0.8,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    navText: {
        textAlign: 'center',
        alignSelf: 'center',
    },

    navContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
        alignSelf: 'center',
        paddingBottom: 12,
        zIndex: 2,
        width: window.width,
        backgroundColor: Theme.white,
        ...Theme.shadow
    },
    navContainerDirect: {
        width: viewWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});

export default Attach({
    'dialog.search': (search) => {
        return {
            search: search
        }
    },
    'auth.handle': (handle, redux) => {
        const cards = Helpers.leaf(redux, 'auth.cards', {});
        return {
            cards: cards
        }
    }
})(MyCards);