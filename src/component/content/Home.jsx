import React from 'react';
import {me} from '../../api/user';
import {Button} from 'antd-mobile/lib/index';
import BaseComponent from '../BaseComponent';

class Home extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        me().then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={() => this.refresh()}>hello</Button>
            </div>
        );
    }
}

export default Home;
