import React, {Component} from 'react';
import {contentRoutes} from '../router/routes';
import {renderRoutes} from 'react-router-config';
import {Modal, NavBar} from 'antd-mobile';
import {DashOutlined, LeftOutlined} from '@ant-design/icons';
import {mapStateAndActions} from '../store/storeUtils';
import {me} from '../api/user';

class RootContent extends Component {
    back() {
        const {history} = this.props;
        history.goBack();
    }

    componentDidMount() {
        this.tryLoadUserInfo();
    }

    tryLoadUserInfo() {
        const {webToken} = this.props;
        if (!webToken) {
            Modal.alert('登录失败', '登录令牌失效，请关闭页面重新登录！');
            this.props.history.push({pathname: '/error', search: '?msg=登录失败'});
            return;
        }
        me().then(res => {
            this.props.setUserInfo(res, res.merchant);
        });
    }

    renderErrorModal() {
    }

    renderNavBar() {
        const {navBarVisible} = this.props;
        if (!navBarVisible) {
            return;
        }
        const {title} = this.props;
        return (<NavBar mode="light"
                        icon={<LeftOutlined/>}
                        rightContent={<DashOutlined/>}
                        onLeftClick={() => this.back()}>{title}</NavBar>);
    }

    render() {
        const _this = this;
        return (
            <div className="content">
                {
                    _this.renderNavBar()
                }
                {
                    renderRoutes(contentRoutes)
                }
                {
                    _this.renderErrorModal()
                }
            </div>
        );
    }
}

export default mapStateAndActions(RootContent);
