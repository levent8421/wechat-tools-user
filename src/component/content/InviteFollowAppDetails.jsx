import React, {Component} from 'react';
import {formatSearch} from '../../router/pathUtils';
import {doDraw, fetchAppInfo} from '../../api/inviteFollowApp';
import './InviteFollowAppDetails.less';
import {mapStateAndActions} from '../../store/storeUtils';
import {normalizePrizes} from '../../util/prizeUtils';
import {asSquare} from '../../util/styleUtils';
import SquareImage from '../common/SquareImage';

const findPrize = (id, prizes) => {
    for (let prize of prizes) {
        if (prize.id === id) {
            return prize;
        }
    }
    return false;
};
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
            activePrize: -1,
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
        doDraw(this.appId).then(res => {
            const {id} = res;
            const {prizesTop, prizesBottom, prizeLeft, prizeRight} = this.state;
            const prizes = prizesTop.concat(prizesBottom, prizeRight, prizeLeft);
            const prize = findPrize(id, prizes);
            const keySeq = [];
            for (let i = 0; i < 16; i++) {
                keySeq.push(i % 8);
            }
            if (prize) {
                for (let i = 0; i <= prize.key; i++) {
                    keySeq.push(i);
                }
            } else {
                keySeq.push(-1);
            }
            this.animationInterval = 50;
            this.animationIndex = 0;
            this.showAnimation(keySeq);
        });
    }

    showAnimation(keySeq) {
        this.animationIndex = this.animationIndex + 1;
        if (this.animationIndex >= keySeq.length) {
            return;
        }
        this.animationInterval = this.animationInterval + 20;
        setTimeout(() => {
            this.setState({
                activePrize: keySeq[this.animationIndex],
            });
            this.showAnimation(keySeq);
        }, this.animationInterval);
    }

    renderPrize(prize) {
        const {activePrize} = this.state;
        const classNames = ['prize'];
        if (activePrize === prize.key) {
            classNames.push('active');
        }
        return (<div className={classNames.join(' ')} key={prize.id} ref={asSquare}>
            <div className="inner">
                <div className="image-wrapper">
                    <SquareImage src={prize.image} alt={prize.name}/>
                </div>
                <p className="name">{prize.name}</p>
            </div>
        </div>);
    }

    render() {
        const _this = this;
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
                                prizesTop.map(prize => _this.renderPrize(prize))
                            }
                        </div>
                        <div className="row middle">
                            {
                                _this.renderPrize(prizeLeft)
                            }
                            <div className="button" onClick={() => _this.draw()} ref={asSquare}>
                                <img src={app.buttonImage} alt="点击抽奖"/>
                            </div>
                            {
                                _this.renderPrize(prizeRight)
                            }
                        </div>
                        <div className="row bottom">
                            {
                                prizesBottom.map(prize => _this.renderPrize(prize))
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
