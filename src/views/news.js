import React, {Component} from 'react';

import {TouchableOpacity, StyleSheet, Image, View} from 'react-native';

import {Container} from "./common/container";
import {ScrollView} from "./common/scrollView";
import {Theme, Text, Dispatcher} from '../../core'

import temp from './temp.jpg';
import temp1 from './temp1.jpg';
import temp2 from './temp2.jpg';
import temp3 from './temp3.jpg';
import temp4 from './temp4.jpg';
import Navigation from "../models/navigation";


const images = [temp, temp1, temp2, temp3, temp4];
const texts = [
    'همراه تیمى از ورزشکاران جوان با مربی‌گری آقای خویشوند و با همکاری انجمن اهدای عضو ایرانیان به انجام حرکات نمایشی ',
    'در جلسه‌ای با حضور معاونان وزیر بهداشت و اعضای هیئت‌مدیره انجمن اهدای عضو ایرانیان در خصوص عملیاتی شدن مفاد تفاهم‌نام',
    'این جلسه مصوب شد کمیته‌های راهبردی جهت عملیاتی شدن طرح‌های پیشنهادی انجمن در ۴ مقوله ثبت ورود اطلاعات',
    'گفتنی است؛ این جلسه با حضور معاونان وزیر بهداشت از جمله دکتر ایازی معاون امور اجتماعی، دکتر ملک‌زاده معاون تحقیقات',
    'اهدای عضو ایرانیان ازجمله دکتر نوبخت حقیقی (رئیس هیئت‌مدیره)، دکتر نجفی‌زاده (مدیرعامل)، دکتر برومند.'
];


const titles = [
    'همراه تیمى از ورزشکاران',
    ' معاونان وزیر',
    ' ثبت ورود اطلاعات',
    'گفتنی است؛ این جلسه',
    'اهدای عضو ایرانیان'
];

const Row = ({image, title, text, onPress}) => {

    return (<TouchableOpacity style={styles.row} onPress={onPress}>
        <Image source={image} style={styles.rowImage} resizeMode={'cover'}/>
        <View style={styles.newContainer}>
            <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>{title}</Text>
            <Text style={styles.text} ellipsizeMode={'tail'} numberOfLines={2}>{text}</Text>
        </View>
    </TouchableOpacity>);
};


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failed: false
        };
    }


    render() {
        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>
                    {images.map((k, i) => {
                        return (<Row title={titles[i]} image={k} key={i} text={texts[i]} onPress={()=>{
                            this.props.dispatch(Navigation.goTo('newsPage'));
                        }}/>)
                    })}
                </ScrollView>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    rowImage: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    newContainer: {
        flex: 1.5,
        height: 80,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        alignItems: 'flex-end',
    },

    title: {
        fontSize: 18,
    },
    text: {
        fontSize: 14,
        paddingHorizontal: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 120,
        backgroundColor: Theme.white,
        borderBottomColor: Theme.border,
        borderBottomWidth: 1,
        overflow: 'hidden',
        paddingVertical: 20,
        marginBottom: 10
    }

});

export default Dispatcher(News);