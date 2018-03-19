import 'react-native';
import React from 'react';
import Text from './text';

import renderer from 'react-test-renderer';


describe('Text', () => {
    it('should renders correctly', () => {
        const tree = renderer.create(
            <Text>Im a TEXT</Text>
        );
    });
});
