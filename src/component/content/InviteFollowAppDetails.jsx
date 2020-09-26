import React, {Component} from 'react';
import {formatSearch} from '../../router/pathUtils';
import {fetchAppInfo} from '../../api/inviteFollowApp';
import './InviteFollowAppDetails.less';
import {mapStateAndActions} from '../../store/storeUtils';
import {normalizePrizes} from '../../util/prizeUtils';

const onImageClick = (img) => {
    const {url} = img;
    if (url) {
        console.error('暂不支持跳转', url);
    }
};

class InviteFollowAppDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: {},
            prizesTop: [],
            prizeLeft: {},
            prizeRight: {},
            prizesBottom: [],
        };
    }

    componentDidMount() {
        this.props.showNavBar(false);
        const {search} = this.props.location;
        const params = formatSearch(search);
        const {appId} = params;
        this.appId = appId;
        this.refreshAppInfo();
    }

    refreshAppInfo() {
        fetchAppInfo(this.appId).then(res => {
            const {prizes} = res;
            const groupedPrizes = normalizePrizes(prizes);
            this.setState({
                app: res,
                ...groupedPrizes,
            });
        });
    }


    render() {
        const {app, prizesTop, prizeLeft, prizeRight, prizesBottom} = this.state;
        const images = app.images || [];
        return (
            <div className="invite-follow-app" style={{backgroundColor: app.themeColor}}>
                <div className="banner">
                    <img src={app.bannerImage} alt={app.title}/>
                </div>
                <div className="draw-panel">
                    <div className="title">
                        <span>{app.title}</span>
                    </div>
                    <div className="subtitle">
                        {app.subtitle}
                    </div>
                    <div className="prizes">
                        <div className="row top">
                            {
                                prizesTop.map(prize => (<div className="prize" key={prize.id}>{prize.name}</div>))
                            }
                        </div>
                        <div className="row middle">
                            <div className="prize">
                                {prizeLeft.name}
                            </div>
                            <div className="button">
                                抽奖按钮
                            </div>
                            <div className="prize">
                                {prizeRight.name}
                            </div>
                        </div>
                        <div className="row bottom">
                            {
                                prizesBottom.map(prize => (<div className="prize" key={prize.id}>{prize.name}</div>))
                            }
                        </div>
                    </div>
                    <div className="footer">
                        <span>{app.footerText}</span>
                    </div>
                </div>
                <div className="images">
                    {
                        images.map((img, index) => (
                            <img key={index} alt={img.url} src={img.image} onClick={() => onImageClick(img)}/>))
                    }
                </div>
                <div className="rules-text">
                    <div className="title"><span>~~~</span><b>规则说明</b><span>~~~</span></div>
                    <div className="content">
                        <pre>
                        {app.rulesText}
                        </pre>
                    </div>
                </div>
                <div className="footer">
                    <p>Power by Levent8421!</p>
                </div>
            </div>
        );
    }
}

export default mapStateAndActions(InviteFollowAppDetails);