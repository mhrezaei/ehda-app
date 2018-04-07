import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Dimensions
} from 'react-native'


import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import Theme from '../theme'

import {LocalizeNumber, Translate} from "../i18";

import {Helpers, Jalali} from '../index';


import Icon from 'react-native-vector-icons/MaterialIcons';


import Text from './text';


const convertWeek = (g) => {
    let o = g + 1;
    if (o === 7) o = 0;
    return o;
};


const monthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];


import {min, clamp} from "../../core/helpers";

const window = Dimensions.get("window");

const size = min(window.width, window.height);

class Calendar extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        visible: PropTypes.bool,
        value: PropTypes.number
    };

    constructor(props) {
        super(props);

        const jm = Jalali.now();
        this.today = {year: jm.jy, month: jm.jm, day: jm.jd};


        this.state = {
            year: this.today.year,
            month: this.today.month,
            day: this.today.day,

            sy: this.today.year,
            sm: this.today.month,
            sd: this.today.day,
            show: false,

            view: 0,
            translateY: new Animated.Value(-2)

        };

        this.renderDay = this.renderDay.bind(this);
        this.renderDisable = this.renderDisable.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.renderCalendar = this.renderCalendar.bind(this);
        this.renderMonthPicker = this.renderMonthPicker.bind(this);


    }

    componentWillMount() {
        const data = [];
        const current = this.today.year;

        for (let i = 1; i < 100; i++) {
            data.push({
                id: current - i,
                title: LocalizeNumber(current - i)
            });
        }
        this.years = data;
        this.weeks = Translate('weeksShort');
        this.months = Translate('calendar');

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible){
            this.show(nextProps.value);
        }else{
           this.hide();
        }

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
        if (date) {
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
            view: 0,

            show: true
        });

        this.forceUpdate();
    }

    hide() {
        this.state.translateY.setValue(0);
        Animated.timing(
            this.state.translateY,
            {
                toValue: -1,
                duration: 500,
            }
        ).start(() => {

            const {sy,sm,sd} = this.state;

            if (this.props.onChange)
                this.props.onChange(Jalali.toPhp(sy, sm, sd));

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


        console.log(date);

        if (this.props.onChange)
            this.props.onChange(Jalali.toPhp(date.year, date.month, date.current));

        if(this.props.hide)
            this.props.hide();
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

    shouldComponentUpdate() {
        return this.state.show;
    }

    renderMonthPicker() {


        let cache = [];
        let rows = [];

        for (let i = 0; i < 12; i++) {
            cache.push(<TouchableOpacity key={i} style={styles.monthItemContainer} onPress={() => {
                this.setState({month: i + 1, view: 0});
            }}>
                <View style={styles.monthItem}>
                    <Text style={styles.monthItemText}>{this.months[i]}</Text>
                </View>
            </TouchableOpacity>);


            if ((i + 1) % 3 === 0) {
                rows.push(<View key={i} style={styles.monthRow}>
                    {cache}
                </View>);
                cache = [];
            }

        }


        return (<Animated.View style={{
            padding: 20,
            backgroundColor: '#fff',
            alignSelf: 'center',
            width: size,
            transform: [{
                translateY: this.state.translateY.interpolate({
                    inputRange: [-1, 0],
                    outputRange: [-600, 0]
                })
            }]
        }}>
            {rows}
        </Animated.View>);
    }

    renderPicker() {


        return (<Animated.View style={{
            padding: 20,
            backgroundColor: '#fff',
            width: size,

            alignSelf: 'center',
            transform: [{
                translateY: this.state.translateY.interpolate({
                    inputRange: [-1, 0],
                    outputRange: [-600, 0]
                })
            }]
        }}>
            {
                this.years.map((x, i) =>
                    <TouchableOpacity key={i} style={styles.menuItem} onPress={() => {
                        this.setState({year: x.id, view: 2});
                    }}>
                        <View style={styles.menuItem_direct}>
                            <Text style={styles.menuItem_text}>{x.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            <TouchableOpacity style={{
                flex: 1
            }} onPress={() => {
                this.setState({view: 0});
            }}>
                <View style={styles.menuItem_direct}>
                    <Text style={styles.menuItem_textReturn}>{Translate('cancel')}</Text>
                </View>
            </TouchableOpacity>

        </Animated.View>);
    }

    renderCalendar() {
        const {year, month, day} = this.state;

        const startDayOfMonth = convertWeek(Jalali.startDayOfMonth(year, month));
        const monthLength = month < 11 ? monthLengths[month - 1] : (((year - 1395) % 4 === 0) ? 30 : 29);

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

        return (<Animated.View style={{
            padding: 20,
            backgroundColor: '#fff',
            width: size,
            alignSelf: 'center',
            transform: [{
                translateY: this.state.translateY.interpolate({
                    inputRange: [-1, 0],
                    outputRange: [-600, 0]
                })
            }]
        }}>

            <View style={styles.calendar_row_nav}>

                <TouchableOpacity style={styles.headerButtonContainer} onPress={() => {
                    this.setState({view: 1})
                }}>
                    <Text style={styles.headerButton}>{LocalizeNumber(year)}</Text>
                    <Icon name={'arrow-drop-down'} size={30} color={Theme.gray}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerButtonContainer} onPress={() => {
                    this.setState({view: 2})
                }}>
                    <Text style={styles.headerButton}>{this.months[month - 1]}</Text>
                    <Icon name={'arrow-drop-down'} size={30} color={Theme.gray}/>
                </TouchableOpacity>

            </View>
            <View style={styles.calendar_row}>
                {this.weeks.map((x, i) => <TouchableOpacity key={i} style={styles.calendar_dayStyleOther}>
                    <Text allowFontScaling={false} style={styles.calendar_dayText}>{x}</Text>
                </TouchableOpacity>)}
            </View>
            {row}
        </Animated.View>);
    }

    render() {
        const {view} = this.state;

        let child = null;


        switch (view) {
            case 0:
                child = this.renderCalendar();
                break;
            case 1:
                child = this.renderPicker();
                break;
            case 2:
                child = this.renderMonthPicker();
                break;
        }
        return (this.state.show &&
            <TouchableWithoutFeedback onPress={() => {
                if (view !== 0) {
                    this.setState({view: 0});
                } else {

                    if(this.props.hide)
                        this.props.hide();
                }
            }}>
                <Animated.View style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 999,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    opacity: this.state.translateY.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [0, 1]
                    })
                }}>

                    <KeyboardAwareScrollView>
                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            {child}
                        </TouchableWithoutFeedback>
                    </KeyboardAwareScrollView>

                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
};

Calendar.propTypes = {};


const dayStyleCommon = {
    flex: 1,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 2,
    alignItems: 'center',
    alignContent: 'center',

    paddingVertical: 6
};

const dayStyleTextCommon = {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
};

const styles = StyleSheet.create({
    content: {
        padding: 10,
        backgroundColor: '#fff'
    },
    monthRow: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignContent: 'center'
    },
    monthItemContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignContent: 'center'
    },
    monthItem: {
        paddingHorizontal: 0,
        paddingVertical: 20,
    },
    monthItemText: {
        fontSize: 20
    },

    menuItem: {
        flex: 1,
        borderBottomColor: Theme.border,
        borderBottomWidth: 1
    },
    menuItem_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },

    menuItem_text: {
        fontSize: 20,
        textAlign: 'center'
    },
    menuItem_textReturn: {color: Theme.gray, fontSize: 20},
    headerButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    headerButton: {
        fontSize: 20
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
        justifyContent: 'center',
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
        ...dayStyleCommon,
        backgroundColor: Theme.background
    },

    calendar_dayStyleSelected: {
        ...dayStyleCommon,
        backgroundColor: Theme.red
    },
    calendar_dayStyle: {
        ...dayStyleCommon,
        backgroundColor: Theme.backgroundDark,
    },
    calendar_dayStyleToday: {
        ...dayStyleCommon,
        backgroundColor: Theme.accent,
    },
    calendar_dayText: {
        ...dayStyleTextCommon,
        color: Theme.textInvert,

    },
    calendar_dayTextSelected: {
        ...dayStyleTextCommon,
        color: Theme.text,
    }
});


export default Calendar;


/*
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
                                let {year, month} = this.state;
                                month--;
                                if(month < 1) {
                                    month = 12;
                                    year--;
                                    if(year < 1300)
                                        year = this.today.year;
                                }


                                this.setState({year, month});
                            }}>
                                <Icon name={"skip-next"} size={20} color={theme.textInvert}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                const jm = Jalali.now();
                                this.setState({year: jm.jy, month: jm.jm, day: jm.jd});
                            }}>
                                <Text>{months[month-1] + ' ' + LocalizeNumber(year)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.calendar_dayStyleIcon} onPress={() => {
                                let {year, month} = this.state;
                                month++;
                                if(month > 12) {
                                    month = 1;
                                    year++;
                                    if(year > this.today.year)
                                        year = 1300;
                                }


                                this.setState({year, month});
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

 */