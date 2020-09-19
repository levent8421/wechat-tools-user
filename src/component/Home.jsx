import React, {Component} from 'react';
import {me} from '../api/user';
import {Button} from 'antd-mobile';

class Home extends Component {
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
