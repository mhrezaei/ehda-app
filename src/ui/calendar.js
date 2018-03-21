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

import {localize_number} from "../i18";


import moment from 'momentj';


import {Button, TextInput, Text} from './components';


const view_width = Dimensions.get('window').width;





class Calendar extends Component {
    constructor(props) {
        super(props);
        const date = moment();
        this.state = {
            year: date.jYear(),
            month: date.jMonth(),
            day: date.jDate(),
        };

        this.renderDay = this.renderDay.bind(this);
        this.renderDisable = this.renderDisable.bind(this);
    }

    renderDay(day) {
        return (<TouchableOpacity key={i} style={styles.calendar_dayStyle}>
            <Text allowFontScaling={false} style={styles.calendar_dayText}>{localize_number(day)}</Text>
        </TouchableOpacity>);
    }

    renderDisable() {
        return (<TouchableOpacity key={i} style={styles.calendar_dayOther}>
            <Text allowFontScaling={false} style={styles.calendar_dayText}>{' '}</Text>
        </TouchableOpacity>);
    }

    render() {
        const date = moment('1395/12/2', 'jYYYY/jM/jD');

        const startDayOfMonth = date.startOf('jmonth').jWeekDay();
        const monthLength = date.jDaysInMonth();

        let cache = [];
        let row = [];
        for (let i = 1; i <= 35; i++) {
            const current = i - 1 - startDayOfMonth;

            const offset = -35 + monthLength + startDayOfMonth;

            if (offset > 0 && current < 0) {
                const d = current + 1 + startDayOfMonth + monthLength - offset;
                if (d <= monthLength)
                    cache.push(this.renderDay(year,month, d));
                else
                    cache.push(this.renderDisable());

            } else {
                const d = current + 1;
                if (d > 0 && d <= monthLength)
                    cache.push(this.renderDay(d));
                else
                    cache.push(this.renderDisable());
            }
            if (i % 7 === 0) {
                row.push(<View key={i} style={styles.calendar_row}>
                    {cache}
                </View>);
                cache = [];
            }
        }
        return (
            <View style={styles.calendar}>
                {row}
            </View>
        );
    }
};

Calendar.propTypes = {};


const styles = StyleSheet.create({
    calendar: {
        backgroundColor: theme.background,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        borderColor: '#ccc',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        padding: 20

    },
    calendar_row: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    calendar_dayOther: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: theme.background,
        alignSelf: 'flex-end',
        margin: 5,
        paddingTop: 7,
    },
    calendar_dayStyle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: theme.backgroundDark,

        alignSelf: 'flex-end',
        margin: 5,
        paddingTop: 7,
    },
    calendar_dayText: {
        fontFamily: theme.font,
        textAlign: 'center',
        borderRadius: 20,
        color: theme.white,
    }
});


export default Calendar;