import React, {Component} from 'react';
import {formatSearch} from '../../router/pathUtils';
import {fetchAppInfo} from '../../api/inviteFollowApp';
import './InviteFollowAppDetails.less';

class InviteFollowAppDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: {},
            prizes: [],
        };
    }

    componentDidMount() {
        const {search} = this.props.location;
        const params = formatSearch(search);
        const {appId} = params;
        this.appId = appId;
        this.refreshAppInfo();
    }

    refreshAppInfo() {
        fetchAppInfo(this.appId).then(res => {
            this.setState({
                app: res,
                prizes: res.prizes,
            });
        });
    }

    render() {
        const {app, prizes} = this.state;
        return (
            <div className="invite-follow-app" style={{backgroundColor: app.themeColor}}>
                <div className="banner">
                    <img src={app.bannerImage} alt={app.title}/>
                </div>
                <div className="draw-panel">
                    <div className="title">
                        {app.title}
                    </div>
                    <div className="subtitle">
                        {app.subtitle}
                    </div>
                    <div className="prizes">
                        {prizes.length}
                    </div>
                    <div className="footer">
                        {app.footerText}
                    </div>
                </div>
            </div>
        );
    }
}

export default InviteFollowAppDetails;