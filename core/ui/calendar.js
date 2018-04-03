import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Keyboard,
    Animated
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import theme from '../theme'

import {LocalizeNumber, Translate} from "../i18";

import {Helpers, Jalali} from '../index';


import moment from 'momentj';
import Icon from 'react-native-vector-icons/MaterialIcons';


import Text from './text';
import Button from './button';
import Data from "../../src/models/data";


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
            show: false,

            translateY: new Animated.Value(-1)

        };

        this.renderDay = this.renderDay.bind(this);
        this.renderDisable = this.renderDisable.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);


    }

    show(date) {

        Keyboard.dismiss();

        this.state.translateY.setValue(-2);
        Animated.timing(
            this.state.translateY,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();


        let dt = {year: 1380, month: 1, day: 1};
        if(date){
            const d = Jalali.fromPhp(date);
            dt = {year: d.jy, month: d.jm, day: d.jd};
        }

        const jm = Jalali.now();
        this.today = {year: jm.jy, month: jm.jm, day: jm.jd};

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

        this.state.translateY.setValue(0);
        Animated.timing(
            this.state.translateY,
            {
                toValue: -1,
                duration: 500,
            }
        ).start(()=>{

            this.setState({
                show: false
            });
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
                  style={bl || td ? styles.calendar_dayTextSelected : styles.calendar_dayText}>{LocalizeNumber(date.current)}</Text>
        </TouchableOpacity>);
    }

    renderDisable(i) {
        return (<TouchableOpacity key={i} style={styles.calendar_dayStyleOther}>
            <Text allowFontScaling={false} style={styles.calendar_dayText}>{' '}</Text>
        </TouchableOpacity>);
    }



    render() {
        const {year, month, day} = this.state;

        const startDayOfMonth = convertWeek(Jalali.startDayOfMonth(year, month));
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

        const weeks = Translate('weeksShort');
        const months = Translate('calendar');
        return (this.state.show &&
            <Animated.View style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',

                zIndex: 999,
                opacity: this.state.translateY.interpolate({
                    inputRange: [-1, 0],
                    outputRange: [0, 1]
                })
            }}>
                <KeyboardAwareScrollView>
                    <Animated.View style={{
                        padding: 20,
                        backgroundColor: '#fff',
                        transform: [{
                            translateY: this.state.translateY.interpolate({
                                inputRange: [-1, 0],
                                outputRange: [-600, 0]
                            })
                        }]
                    }}>
                        <View style={styles.calendar_row_nav}>
                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                let {year} = this.state;
                                year--;
                                if(year < 1300)
                                    year = this.today.year;
                                this.setState({year});
                            }}>
                                <Icon name={"fast-forward"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                let {month} = this.state;
                                month--;
                                if(month < 1)
                                    month = monthLength;
                                this.setState({month});
                            }}>
                                <Icon name={"skip-next"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                const jm = Jalali.now();
                                this.setState({year: jm.jy, month: jm.jm, day: jm.jd});
                            }}>
                                <Text>{months[month] + ' ' + LocalizeNumber(year)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                let {month} = this.state;
                                month++;
                                if(month > monthLength)
                                    month = 1;
                                this.setState({month});
                            }}>
                                <Icon name={"skip-previous"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                let {year} = this.state;
                                year++;
                                if(year > this.today.year)
                                    year = 1300;
                                this.setState({year});
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
                            <Button title={Translate('choose')} onPress={() => {
                                const {sy, sm, sd} = this.state;

                                if (this.props.onChange)
                                    this.props.onChange(Jalali.toPhp(sy, sm, sd));


                                this.hide();

                            }}/>
                            <Button title={Translate('cancel')} onPress={() => {
                                this.hide();
                            }}/>
                        </View>
                    </Animated.View>
                </KeyboardAwareScrollView>
            </Animated.View>
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
        flex: 1,
        width: 30,
        height: 30,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.background,
        alignSelf: 'center',
        margin: 5,
        alignItems: 'center',
        alignContent: 'center'
    },

    calendar_dayStyleSelected: {

        flex: 1,
        width: 30,
        height: 30,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.red,
        alignSelf: 'center',
        margin: 5,
        alignItems: 'center',
        alignContent: 'center'
    },
    calendar_dayStyle: {
        flex: 1,
        width: 30,
        height: 30,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.backgroundDark,
        alignSelf: 'center',
        margin: 5,
        alignItems: 'center',
        alignContent: 'center'
    },
    calendar_dayStyleIcon: {
        flex: 1,
        width: 30,
        height: 30,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.backgroundDark,
        alignSelf: 'center',
        margin: 5,
        alignItems: 'center',
        alignContent: 'center'
    },
    calendar_dayStyleToday: {
        flex: 1,
        width: 30,
        height: 30,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.accent,
        alignSelf: 'center',
        margin: 5,
        alignItems: 'center',
        alignContent: 'center'
    },
    calendar_dayText: {
        textAlign: 'center',
        color: theme.textInvert,
        alignSelf: 'center'

    },
    calendar_dayTextSelected: {
        textAlign: 'center',
        color: theme.text,
        alignSelf: 'center'
    }
});


export default Calendar;