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
const normalizeImage = img => {
    if (!img) {
        return;
    }
    const {width, height} = img;
    const size = Math.max(width, height);
    img.width = size;
    img.height = size;
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
            activePrize: 1,
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

    draw() {
        setInterval(() => {
            const {activePrize} = this.state;
            this.setState({
                activePrize: (activePrize + 1) % 8
            })
        }, 200);
    }

    renderPrize(prize) {
        const {activePrize} = this.state;
        const classNames = ['prize'];
        if (activePrize === prize.key) {
            classNames.push('active');
        }
        return (<div className={classNames.join(' ')} key={prize.id}>
            <div className="inner">
                <img src={prize.image} alt={prize.name} ref={normalizeImage}/>
                <p className="name">{prize.name}</p>
            </div>
        </div>);
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
                                prizesTop.map(prize => this.renderPrize(prize))
                            }
                        </div>
                        <div className="row middle">
                            {
                                this.renderPrize(prizeLeft)
                            }
                            <div className="button" onClick={() => this.draw()}>
                                <img src={app.buttonImage} alt="点击抽奖"/>
                            </div>
                            {
                                this.renderPrize(prizeRight)
                            }
                        </div>
                        <div className="row bottom">
                            {
                                prizesBottom.map(prize => this.renderPrize(prize))
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
