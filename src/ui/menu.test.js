import 'react-native';
import React from 'react';
import Menu from './menu';

import renderer from 'react-test-renderer';


describe('Menu', () => {
    it('should renders correctly', () => {
        const tree = renderer.create(
            <Menu title={"Awesome Action Bar"} image={null}>
                {null}
            </Menu>
        );
    })
});
