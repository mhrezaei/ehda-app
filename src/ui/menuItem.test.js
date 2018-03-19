import 'react-native';
import React from 'react';
import MenuItem from './menuItem';

import renderer from 'react-test-renderer';


describe('Menu Item', () => {
    it('should renders correctly', () => {
        const tree = renderer.create(
            <MenuItem title={"Hello"} icon={"menu"} onPress={() => {
                console.log('I am Clickable!')
            }}/>
        );
    })
});
