import React, {Component} from 'react';
import {dict2arr} from '../util/collectionUtils';
import logo from '../image/logo.webp';
import './Index.less';
import {Button, Card, Flex, InputItem, List, Modal} from 'antd-mobile';
import {formatSearch} from '../util/pathUtils';
import {showToast} from '../util/toastUtils';
import {mapStateAndActions} from '../store/storeUtils';
import {me, mockLogin} from '../api/user';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: [],
            loadingVisible: false,
            mockUserId: 1,
        };
    }

    componentDidMount() {
        const {search} = this.props.location;
        const params = formatSearch(search);
        this.setState({
            params: dict2arr(params),
            loadingVisible: true,
        });
        this.checkSearchParam(params);
    }

    checkSearchParam(params) {
        const token = params.token || this.props.webToken;
        console.log(token);
        if (token) {
            showToast('登录成功');
            this.props.setToken(token);
        }
        this.tryLoadUserInfo(user => {
            this.goNextPath(user, params);
        });
    }

    goNextPath(user, params) {
        this.props.setUserInfo(user, user.merchant);
        const {history} = this.props;
        const {next, msg} = params;
        if (next) {
            history.replace({
                pathname: '/error',
                search: `?msg=${msg}`,
            });
        } else {
            if (user) {
                history.replace({
                    pathname: '/c/',
                });
            } else {
                Modal.alert('未登录',
                    '用户未登录，无法跳转，请关闭页面重试',
                    [
                        {
                            text: '关闭页面',
                            onPress: () => {
                                alert('关闭');
                                this.showLoading(false);
                            },
                        },
                    ]);
            }
        }
    }

    tryLoadUserInfo(callback) {
        const {webToken} = this.props;
        if (webToken) {
            me().then(res => {
                this.showLoading(false);
                callback(res);
            }).catch(() => this.showLoading(false));
        } else {
            callback(false);
        }
    }

    showLoading(show) {
        this.setState({
            loadingVisible: show,
        })
    }

    renderLoadingMask() {
        const {loadingVisible} = this.state;
        if (!loadingVisible) {
            return;
        }
        return (<div className="loading-mask">
            <div className="logo">
                <img src={logo} alt="Loading"/>
                <p>登录中。。。</p>
            </div>
        </div>)
    }

    doMockLogin() {
        const {mockUserId} = this.state;
        mockLogin(mockUserId).then(res => {
            const {user, token} = res;
            this.props.setToken(token, user);
        });
    }

    render() {
        const {params, mockUserId} = this.state;
        const _this = this;
        return (
            <div className="index">
                <div className="IndexInfo">
                    <List renderHeader={() => 'Params'}>
                        {
                            params.map(param => (
                                <List.Item key={param.name} extra={param.value}>{param.name}</List.Item>))
                        }
                    </List>
                </div>
                <Card>
                    <Card.Header title="Test Panel" extra="Mock Login"/>
                    <Card.Body>
                        <Flex>
                            <Flex.Item>
                                <InputItem onChange={text => this.setState({mockUserId: text})} value={mockUserId}/>
                            </Flex.Item>
                            <Flex.Item>
                                <Button type="primary" onClick={() => this.doMockLogin()}>MockLogin</Button>
                            </Flex.Item>
                        </Flex>
                    </Card.Body>
                </Card>
                {_this.renderLoadingMask()}
            </div>
        );
    }
}

export default mapStateAndActions(Index);
