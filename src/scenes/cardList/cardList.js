import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {Text } from '../../ui/components';


class CardList extends Component {
    render(){
        return (<View>
            <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
            />
        </View>);
    }
}

export default CardList;