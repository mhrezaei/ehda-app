import React, {Component} from 'react';
import {View, StyleSheet, Image, Linking, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import {Button, Translate, Helpers, Attach, Loading, Text, File, Sharing, Theme} from '../../core/index';

import {Dialog, Auth, Ajax} from '../models/index';

import {Container} from "./common/container";
import {ScrollView} from "./common/scrollView";

import Icon from 'react-native-vector-icons/MaterialIcons';


import {requestStoragePermission} from "../android";

const window = Dimensions.get('window');
const viewWidth = Helpers.min(window.width, window.height)-60;
const imageWidth = viewWidth;
const imageHeight =  viewWidth * 1.258823;

class MyCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            failed: false,
            image: null,
        };
        this.LoadCardFromDisk = this.LoadCardFromDisk.bind(this);
        this.onPrintButtonClicked = this.onPrintButtonClicked.bind(this);
        this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this);
        this.onShareButtonClicked = this.onShareButtonClicked.bind(this);
    }

    componentDidMount() {
        const {pinnedCard, cards} = this.props;
        this.LoadCardFromDisk(pinnedCard);

        const last = cards[pinnedCard].saved_at || 0;
        if (Helpers.now() - last > 24 * 60 * 60 * 1000) {
            this.props.dispatch(Auth.downloadCard(pinnedCard, (status) => {
                if (status) {
                    this.LoadCardFromDisk(pinnedCard);
                } else {
                    this.setState({
                        failed: true
                    });
                }
            }));
        }
    }


    LoadCardFromDisk(pinned) {
        File.exists('ehda/' + pinned + '/mini').then((data) => {
            if(data > 0) {
                File.read('ehda/' + pinned + '/mini').then((data) => {
                    this.setState({
                        failed: false,
                        image: Helpers.decodeFile(data)
                    });
                });
            }
        });
    }

    onShareButtonClicked() {
        const {pinnedCard} = this.props;
        const url = 'ehda/' + pinnedCard + '/social';

        this.props.dispatch(Ajax.startLoading([Translate('shareOk'), Translate('shareError')]));

        requestStoragePermission().then((result)=>{
            if(result){
                this.props.dispatch(Ajax.stopLoading(0, ()=>{
                    File.read(url).then((data) => {
                        this.props.dispatch(Dialog.openSharing({
                            uri: data,
                            title: Translate('shareMyBonesTtile'),
                            message: Translate('shareMyBones')
                        }));
                    }).catch(() => {
                    });
                }));
            }else
            {
                this.props.dispatch(Ajax.stopLoading(1, ()=>{}));
            }
        });
    }

    onSaveButtonClicked() {
        const {pinnedCard, cards} = this.props;

        const url = 'ehda/' + pinnedCard + '/social';
        this.props.dispatch(Ajax.startLoading([Translate('shareOk'), Translate('shareError')]));
        requestStoragePermission().then((result)=>{
            if(result){
                this.props.dispatch(Ajax.stopLoading(0, ()=>{
                    File.saveFileToGallery(url);
                }));
            }else
            {
                this.props.dispatch(Ajax.stopLoading(1, ()=>{}));
            }
        });

    }

    onPrintButtonClicked() {
        const {pinnedCard, cards} = this.props;

        const url = cards[pinnedCard].info.ehda_card_print;

        this.props.dispatch(Ajax.startLoading([Translate('printCardDone'), Translate('printCardError')]));

        Linking.canOpenURL(url).then(supported => {
            if (supported) {

                this.props.dispatch(Ajax.stopLoading(0, () => {

                    Linking.openURL(url);
                }));
            } else {

                this.props.dispatch(Ajax.stopLoading(1));
            }
        });
    }


    render() {


        let child = null;

        if(this.state.image){
            child = (<View style={styles.imageContainer}>
                <View style={styles.myImageContainer}>
                <Image style={styles.myImage} resizeMode={'cover'} source={this.state.image}/>
                </View>
            </View>);
        }else {
            child = (<View style={styles.loadingContainer}>
                {!this.state.failed ?
                    <ActivityIndicator size="large" color={Theme.accent} animating={true}/> :
                    <Icon name={'error'} size={40} color={Theme.red}/>}
            </View>);
        }

        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>
                    {child}
                    <TouchableOpacity style={styles.shareContainer} onPress={this.onShareButtonClicked}>
                        <Image source={Sharing.Icons.share} style={styles.shareImage}
                               resizeMode={'contain'}/>
                        <Text>{Translate('share')}</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <Button title={Translate('saveCard')} onPress={this.onSaveButtonClicked}/>
                        <Button title={Translate('printCard')} onPress={this.onPrintButtonClicked}/>
                    </View>
                </ScrollView>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal:20,
    },
    myImageContainer:{
        borderRadius: 5,
        width: imageWidth,
        height: imageHeight,
        ...Theme.shadow,

    },
    myImage: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: 5,
    },

    loadingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },
    shareContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    shareImage: {width: 20, height: 20, marginHorizontal: 10},
    buttonContainer: {flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 20}
});

export default Attach({
    'auth.pinned': (pinned, redux) => {
        return {
            pinnedCard: pinned,
            cards: Helpers.leaf(redux, 'auth.cards')
        }
    },
})(MyCard);