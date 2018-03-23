import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'


import theme from '../theme'

import {localize_number, trans} from "../i18";

import lodash from 'lodash';


import moment from 'momentj';
import Icon from 'react-native-vector-icons/MaterialIcons';


import {Button, TextInput, Text} from './components';


class Picker extends Component {
    static propTypes = {
        data: PropTypes.array,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            selected: null,
        };

        this.show = this.show.bind(this);
    }

    componentDidMount() {
        this.setState({data: this.props.data});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    show(d) {
        this.setState({
            show: true,
            selected: d
        });
    }

    hide() {
        this.setState({
            show: false
        });
    }

    render() {
        const {onChange, data} = this.props;
        const {selected} = this.state;


        return (this.state.show &&
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        {
                            data.map((x, i) =>
                                <TouchableOpacity key={i} style={styles.menuItem} onPress={() => {
                                    onChange(x.id);
                                    this.setState({selected: x.id});
                                    this.hide();
                                }}>
                                    <View style={styles.menuItem_direct}>
                                        {x.id === selected &&
                                        <Icon name={'check'} style={styles.menuItem_icon} size={20}/>}
                                        <Text style={styles.menuItem_text}>{x.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        <TouchableOpacity style={styles.menuItem} onPress={() => {
                            onChange(null);
                            this.setState({selected: null});
                            this.hide();
                        }}>
                            <View style={styles.menuItem_direct}>
                                <Text style={styles.menuItem_text}>{trans('cancel')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


            </View>
        );
    }
};


const styles = StyleSheet.create({
    content: {
        padding: 20,
        backgroundColor: '#fff'
    },
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999

    },
    calendar_row_buttons: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuItem: {
        flex: 1,
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1
    },
    menuItem_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuItem_text: {
        fontFamily: theme.font
    },
    menuItem_icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        paddingTop: 2
    }
});


export default Picker;