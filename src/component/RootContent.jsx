import React, {Component} from 'react';
import {contentRoutes} from '../router/routes';
import {renderRoutes} from 'react-router-config';
import {NavBar} from 'antd-mobile';
import {DashOutlined, LeftOutlined} from '@ant-design/icons';
import {mapStateAndActions} from '../store/storeUtils';

class RootContent extends Component {
    back() {
        const {history} = this.props;
        history.goBack();
    }

    render() {
        const {title} = this.props;
        return (
            <div className="content">
                <NavBar mode="light"
                        icon={<LeftOutlined/>}
                        rightContent={<DashOutlined/>}
                        onLeftClick={() => this.back()}>{title}</NavBar>
                {
                    renderRoutes(contentRoutes)
                }
            </div>
        );
    }
}

export default mapStateAndActions(RootContent);
