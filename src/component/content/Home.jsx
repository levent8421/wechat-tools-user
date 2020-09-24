import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import './Home.less';
import {apps} from '../../api/app';
import {List} from 'antd-mobile';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteFollowApps: [],
        };
    }

    componentDidMount() {
        this.props.setTitle('商户首页');
        this.refreshApps()
    }

    refreshApps() {
        apps().then(res => {
            if (this.tryGoDefaultApp(res)) {
                return;
            }
            const {inviteFollowApps} = res;
            this.setState({inviteFollowApps: inviteFollowApps,})
        });
    }

    tryGoDefaultApp(res) {
        const {inviteFollowApps} = res;
        for (let app of inviteFollowApps) {
            if (app.defaultApp) {
                this.toInviteFollowAppDetails(app);
                return true;
            }
        }
    }

    toInviteFollowAppDetails(app) {
        this.props.history.replace({
            pathname: '/c/invite-follow-app',
            search: `?appId=${app.id}`,
        });
    }

    render() {
        const {merchant, me} = this.props;
        const {inviteFollowApps} = this.state;
        return (
            <div className="home">
                <div className="user">
                    <div className="avatar">
                        <img src={me.wavatar} alt=""/>
                    </div>
                    <div className="name">
                        {me.wnickname}
                    </div>
                </div>
                <div className="merchant">
                    <div className="logo">
                        <img src={merchant.logoPath} alt=""/>
                    </div>
                    <p>{merchant.name}</p>
                </div>
                <List renderHeader={() => '关注抽奖'}>
                    {
                        inviteFollowApps.map(app => (
                            <List.Item
                                key={app.id}
                                arrow="horizontal"
                                extra={app.subtitle}
                                onClick={() => this.toInviteFollowAppDetails(app)}>
                                {app.title}
                            </List.Item>))
                    }
                </List>
            </div>
        );
    }
}

export default mapStateAndActions(Home);
