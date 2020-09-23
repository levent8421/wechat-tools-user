import React, {Component} from 'react';
import {me} from '../../api/user';
import {Button} from 'antd-mobile/lib/index';
import {mapStateAndActions} from '../../store/storeUtils';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.setTitle('hello');
    }

    refresh() {
        me().then(res => {
            this.props.setUserInfo(res, res.merchant);
        });
    }

    render() {
        const {merchant, me} = this.props;
        return (
            <div className="home">
                <p>{me.wnickname}</p>
                <p>{merchant.name}</p>
                <Button type="primary" onClick={() => this.refresh()}>hello</Button>
            </div>
        );
    }
}

export default mapStateAndActions(Home);
