import React, {Component} from 'react';
import {View, StyleSheet, Image, Linking, TouchableOpacity} from 'react-native';
import {Button, Translate, Helpers, Attach, Loading, Text, File, Sharing} from '../../core/index';

import {Dialog, Auth, Ajax} from '../models/index';

import {Container} from "./common/container";
import {ScrollView} from "./common/scrollView";

class MyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failed: false
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

            this.props.dispatch(Ajax.startLoading([Translate('downloadCardDone'), Translate('downloadCardError')]));

            this.props.dispatch(Auth.downloadCard(pinnedCard, (status) => {
                if (status) {
                    this.props.dispatch(Ajax.stopLoading(0, () => {

                        this.LoadCardFromDisk(pinnedCard);
                    }));
                } else {
                    this.props.dispatch(Ajax.stopLoading(1, () => {

                        this.setState({
                            failed: true
                        });
                    }));
                }
            }));
        }
    }

    onShareButtonClicked() {
        const {pinnedCard} = this.props;
        const url = 'ehda/' + pinnedCard + '/social';
        File.read(url).then((data) => {
            this.props.dispatch(Dialog.openSharing({
                uri: data,
                title: Translate('shareMyBonesTtile'),
                message: Translate('shareMyBones')
            }));
        }).catch(() => {
        });
    }

    onSaveButtonClicked() {
        const {pinnedCard, cards} = this.props;

        const url = 'ehda/' + pinnedCard + '/social';

        this.props.dispatch(Ajax.startLoading([Translate('saveCardDone'), Translate('saveCardError')]));


        this.props.dispatch(Ajax.stopLoading(0, () => {
            File.saveFileToGallery(url);
        }));

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

    LoadCardFromDisk(pinned) {
        File.read('ehda/' + pinned + '/mini').then((data) => {
            this.myCard = Helpers.decodeFile(data);
            this.setState({
                failed: false
            });
            this.forceUpdate();
        }).catch(() => {

        });
    }

    render() {
        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.myImage} resizeMode={'contain'} source={this.myCard}/>
                    </View>

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
    },
    myImage: {
        flex: 1,
        height: 300,
        borderRadius: 5,
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