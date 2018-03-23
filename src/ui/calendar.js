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


const view_width = Dimensions.get('window').width;
const view_height = Dimensions.get('window').height;


const convertWeek = (g) => {
    let o = g + 1;
    if (o === 7) o = 0;
    return o;
};


const monthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];


class Calendar extends Component {
    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        const jm = moment();
        this.today = {year: jm.jYear(), month: jm.jMonth(), day: jm.jDate()};

        this.state = {
            year: this.today.year,
            month: this.today.month,
            day: this.today.day,

            sy: this.today.year,
            sm: this.today.month,
            sd: this.today.day,

            show: false

        };

        this.renderDay = this.renderDay.bind(this);
        this.renderDisable = this.renderDisable.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);


    }

    show(date) {


        let dt = {year: 1380, month: 1, day: 1};
        if(date){
            const d = moment.unix(date);
            dt = {year: d.jYear(), month: d.jMonth(), day: d.jDate()};
        }

        const jm = moment();
        this.today = {year: jm.jYear(), month: jm.jMonth(), day: jm.jDate()};

        this.setState({
            year: dt.year,
            month: dt.month,
            day: dt.day,

            sy: dt.year,
            sm: dt.month,
            sd: dt.day,

            show: true
        });
    }

    hide() {
        this.setState({
            show: false
        });
    }

    onPress(date) {
        this.setState({
            sy: date.year,
            sm: date.month,
            sd: date.current,
        });

    }

    renderDay(i, date) {
        const {sy, sm, sd} = this.state;

        const bl = date.year === sy && date.month === sm && date.current === sd;
        const td = date.year === this.today.year && date.month === this.today.month && date.current === this.today.day;

        return (<TouchableOpacity key={i}
                                  style={bl ? styles.calendar_dayStyleSelected : (td ? styles.calendar_dayStyleToday : styles.calendar_dayStyle)}
                                  onPress={() => this.onPress(date)}>
            <Text allowFontScaling={false}
                  style={bl || td ? styles.calendar_dayTextSelected : styles.calendar_dayText}>{localize_number(date.current)}</Text>
        </TouchableOpacity>);
    }

    renderDisable(i) {
        return (<TouchableOpacity key={i} style={styles.calendar_dayStyleOther}>
            <Text allowFontScaling={false} style={styles.calendar_dayText}>{' '}</Text>
        </TouchableOpacity>);
    }

    render() {
        const {year, month, day} = this.state;

        const date = moment(year + '/' + (month + 1) + '/' + day, 'jYYYY/jM/jD');

        const startDayOfMonth = convertWeek(date.startOf('jmonth').weekday());
        const monthLength = month < 11 ? monthLengths[month] : (((year - 1395) % 4 === 0) ? 30 : 29);

        let cache = [];
        let row = [];
        for (let i = 1; i <= 35; i++) {
            const current = i - 1 - startDayOfMonth;

            const offset = -35 + monthLength + startDayOfMonth;

            if (offset > 0 && current < 0) {
                const d = current + 1 + startDayOfMonth + monthLength - offset;
                if (d <= monthLength)
                    cache.push(this.renderDay(i, {year, month, day, current: d}));
                else
                    cache.push(this.renderDisable(i));

            } else {
                const d = current + 1;
                if (d > 0 && d <= monthLength)
                    cache.push(this.renderDay(i, {year, month, day, current: d}));
                else
                    cache.push(this.renderDisable(i));
            }
            if (i % 7 === 0) {
                row.push(<View key={i} style={styles.calendar_row}>
                    {cache}
                </View>);
                cache = [];
            }
        }
        const weeks = trans('weeksShort');
        const months = trans('calendar');
        return (this.state.show &&
            <View style={styles.calendar}>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.calendar_row_nav}>
                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                const jm = moment(year + '/' + (month + 1) + '/' + day, 'jYYYY/jM/jD').subtract(1, 'jyear');
                                this.setState({year: jm.jYear(), month: jm.jMonth(), day: jm.jDate()});
                            }}>
                                <Icon name={"fast-forward"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                const jm = moment(year + '/' + (month + 1) + '/' + day, 'jYYYY/jM/jD').subtract(1, 'jmonth');
                                this.setState({year: jm.jYear(), month: jm.jMonth(), day: jm.jDate()});
                            }}>
                                <Icon name={"skip-next"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                const jm = moment();
                                this.setState({year: jm.jYear(), month: jm.jMonth(), day: jm.jDate()});
                            }}>
                                <Text>{months[month] + ' ' + localize_number(year)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                const jm = moment(year + '/' + (month + 1) + '/' + day, 'jYYYY/jM/jD').add(1, 'jmonth');
                                this.setState({year: jm.jYear(), month: jm.jMonth(), day: jm.jDate()});
                            }}>
                                <Icon name={"skip-previous"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                const jm = moment(year + '/' + (month + 1) + '/' + day, 'jYYYY/jM/jD').add(1, 'jyear');
                                this.setState({year: jm.jYear(), month: jm.jMonth(), day: jm.jDate()});
                            }}>
                                <Icon name={"fast-rewind"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.calendar_row}>
                            {weeks.map((x, i) => <TouchableOpacity key={i} style={styles.calendar_dayStyleOther}>
                                <Text allowFontScaling={false} style={styles.calendar_dayText}>{x}</Text>
                            </TouchableOpacity>)}
                        </View>
                        {row}
                        <View style={styles.calendar_row_buttons}>
                            <Button title={trans('choose')} onPress={() => {
                                const {sy, sm, sd} = this.state;
                                if (this.props.onChange)
                                    this.props.onChange({year: sy, month: sm, day: sd});
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

Calendar.propTypes = {};


const styles = StyleSheet.create({
    content: {
        padding: 20,
        backgroundColor: '#fff'
    },
    calendar: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999

    },
    calendar_row: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },

    calendar_row_nav: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    calendar_row_buttons: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    calendar_dayStyleOther: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: theme.background,
        alignSelf: 'flex-end',
        margin: 5,
        paddingTop: 7,
    },

    calendar_dayStyleSelected: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: theme.red,
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
    calendar_dayStyleIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: theme.backgroundDark,
        alignSelf: 'flex-end',
        margin: 5,
        paddingLeft: 5,
        paddingTop: 6,
    },
    calendar_dayStyleToday: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: theme.accent,

        alignSelf: 'flex-end',
        margin: 5,
        paddingTop: 7,
    },
    calendar_dayText: {
        textAlign: 'center',
        color: theme.textInvert

    },
    calendar_dayTextSelected: {
        textAlign: 'center',
        color: theme.text
    }
});


export default Calendar;