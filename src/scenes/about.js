import React, {Component} from 'react';
import {View, StyleSheet, Image, Linking, TouchableOpacity} from 'react-native';
import {Button, Translate, Helpers, Attach, Loading, Text, FileIO, Theme, Sharing} from '../../core/index';

import {Navigation, Auth, Ajax} from '../redux/index';

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
        if (Helpers.now() - last > 24* 60 * 60 * 1000) {

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

    onShareButtonClicked(){
        const {pinnedCard} = this.props;
        const url = 'ehda/'+pinnedCard+'/social';
        FileIO.read(url).then((data) => {
            this.sharing.show({
                uri: data,
                title: Translate('shareMyBonesTtile'),
                message: Translate('shareMyBones')
            });
        }).catch(()=>{});
    }

    onSaveButtonClicked(){
        const {pinnedCard, cards} = this.props;

        const url = 'ehda/'+pinnedCard+'/social';

        this.props.dispatch(Ajax.startLoading([Translate('saveCardDone'), Translate('saveCardError')]));


        this.props.dispatch(Ajax.stopLoading(0, () => {
            FileIO.saveFileToGallery(url);
        }));

    }

    onPrintButtonClicked(){
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
        FileIO.read('ehda/' + pinned + '/mini').then((data) => {
            this.myCard = Helpers.decodeFile(data);
            this.setState({
                failed: false
            });
            this.forceUpdate();
        }).catch(()=>{

        });
    }

    render() {
        return (
            <Container>
                <ScrollView ref={ref => this.container = ref}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 20,

                        shadowColor: Theme.black,
                        shadowOffset: {
                            width: 3,
                            height: 5
                        },

                        elevation: 3,

                        shadowRadius: 10,
                        shadowOpacity: 0.2
                    }}>
                        <Image style={{
                            flex: 1,
                            height: 300,
                            borderRadius: 5,

                        }}
                               resizeMode={'contain'}
                               source={this.myCard}/>

                    </View>


                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection: 'row-reverse',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                    }}
                    onPress={this.onShareButtonClicked}>

                        <Image source={Sharing.Icons.share} style={{width: 20, height: 20, marginHorizontal: 10}}
                               resizeMode={'contain'}/>

                        <Text>{Translate('share')}</Text>
                    </TouchableOpacity>




                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 20}}>
                        <Button title={Translate('saveCard')} onPress={this.onSaveButtonClicked}/>
                        <Button title={Translate('printCard')} onPress={this.onPrintButtonClicked}/>
                    </View>

                </ScrollView>

                <Sharing ref={ref => this.sharing = ref}/>
            </Container>
        );
    }
}

export default Attach({
    'auth.pinned': (pinned, redux) => {
        return {
            pinnedCard: pinned,
            cards: Helpers.leaf(redux, 'auth.cards')
        }
    },
})(MyCard);