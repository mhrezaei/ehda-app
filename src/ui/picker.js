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


import moment from 'momentj';
import Icon from 'react-native-vector-icons/MaterialIcons';


import {Button, TextInput, Text} from './components';


class Picker extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['static', 'async']),
        data: PropTypes.array,
        multi: PropTypes.any,
        onChange: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            data: []
        };

        this.show = this.show.bind(this);
    }

    componentDidMount() {
        this.setState({data: this.props.data});
    }


    show(d) {
        if (!Array.isArray(d)) {
            let data = this.state.data;
            for(let i=0;i<data.length;i++){
                data[i].checked = data[i].id === d;
            }
            this.setState({
                show: true,
                data
            });
        }else{
            let data = this.state.data;
            for(let i=0;i<data.length;i++){
                    data[i].checked = d.includes(data[i].id);
            }
            this.setState({
                show: true,
                data
            });

        }
    }

    hide() {
        this.setState({
            show: false
        });
    }


    render() {
        const {type, onChange, multi} = this.props;

        const {data} = this.state;


        return (this.state.show &&
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        {type === 'async' ?
                            <View style={styles.calendar_row}></View>
                            :
                            data.map((x, i) =>
                                <TouchableOpacity key={i} style={styles.menuItem} onPress={() => {
                                    let data = this.state.data;
                                    for (let i = 0; i < data.length; i++) {

                                        if (multi) {
                                            if (data[i].id === x.id) {
                                                data[i].checked = !data[i].checked;
                                            }
                                        } else {
                                            data[i].checked = data[i].id === x.id;
                                        }
                                    }
                                    this.setState({data});

                                }}>
                                    <View style={styles.menuItem_direct}>
                                        {x.checked && <Icon name={'check'} style={styles.menuItem_icon} size={20}/>}
                                        <Text style={styles.menuItem_text}>{x.value}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }

                        <View style={styles.calendar_row_buttons}>
                            <Button title={trans('choose')} onPress={() => {

                                onChange(data.filter(x => x.checked).map(x => x.id));
                                this.hide();

                            }}/>
                            <Button title={trans('cancel')} onPress={() => {
                                this.hide();
                            }}/>
                        </View>
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
        maxHeight: 300,
        backgroundColor: 'rgba(0,0,0,0.5)',


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