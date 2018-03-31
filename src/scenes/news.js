import React, {Component} from 'react';

import {Container} from "./common/container";
import {ScrollView} from "./common/scrollView";



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

                </ScrollView>
            </Container>
        );
    }
}

export default News;