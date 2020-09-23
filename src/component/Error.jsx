import React, {Component} from 'react';
import {formatSearch} from '../util/pathUtils';
import {Button, Result, Modal} from 'antd-mobile';
import {CloseCircleOutlined as ErrorIcon} from '@ant-design/icons';
import './Error.less';

const renderErrorIcon = () => {
    return (<ErrorIcon className="error-icon"/>);
};

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        };
    }

    componentDidMount() {
        const {location} = this.props;
        const params = formatSearch(location.search);
        const {msg} = params;
        this.setState({msg: decodeURIComponent(msg)});
    }

    renderMessage() {
        const {msg} = this.state;
        return (<div>
            <p>{msg}</p>
            <Button type="primary" onClick={() => this.closeWindow()}>关闭页面</Button>
        </div>);
    }

    closeWindow() {
        Modal.alert('关闭页面', '确认关闭页面？', [
            {
                text: '取消'
            },
            {
                text: '关闭',
                onPress: () => {
                    window.close();
                }
            }
        ]);
    }

    render() {
        return (
            <div className="error">
                <Result title="错误" message={this.renderMessage()} img={renderErrorIcon()} className="result"/>
            </div>
        );
    }
}

export default Error;
