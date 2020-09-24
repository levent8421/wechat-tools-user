import React, {Component} from 'react';
import {dict2arr} from '../util/collectionUtils';
import logo from '../image/logo.webp';
import './Index.less';
import {Button, Card, Flex, InputItem, List, Toast} from 'antd-mobile';
import {formatSearch} from '../util/pathUtils';
import {showToast} from '../util/toastUtils';
import {mapStateAndActions} from '../store/storeUtils';
import {mockLogin} from '../api/user';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: [],
            loadingVisible: true,
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
        if (token) {
            showToast('登录成功');
            this.props.setToken(token);
            this.showLoading(false);
        }
        this.goNextPath(params);
    }

    goNextPath(params) {
        const {next, msg, debug} = params;
        const {history, webToken} = this.props;
        if (next) {
            history.replace({
                pathname: next,
                search: `?msg=${msg}`,
            });
        } else {
            if (debug) {
                Toast.show('调试模式', 3, false);
                this.showLoading(false);
                return;
            }
            if (webToken) {
                history.push({pathname: '/c/'});
            } else {
                history.push({pathname: '/error', search: '?msg=登录失败，无法跳转'});
            }
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
