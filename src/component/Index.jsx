import React, {Component} from 'react';
import {dict2arr} from '../util/collectionUtils';
import logo from '../image/logo.webp';
import './Index.less';
import {List, Modal} from 'antd-mobile';
import {formatSearch} from '../util/pathUtils';
import {showToast} from '../util/toastUtils';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: [],
            loadingVisible: false,
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
        const {token, next, msg} = params;
        if (token) {
            showToast('登录成功');
        }
        const {history} = this.props;
        if (next) {
            history.push({
                pathname: '/error',
                search: `?msg=${msg}`,
            });
        } else {
            if (token) {
                history.push({
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
                            },
                        },
                    ]);
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

    render() {
        const {params} = this.state;
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
                {this.renderLoadingMask()}
            </div>
        );
    }
}

export default Index;
