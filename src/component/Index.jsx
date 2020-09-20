import React, {Component} from 'react';
import {formatSearch} from '../router/pathUtils';
import {dict2arr} from '../util/collectionUtils';
import logo from '../image/logo.webp';
import './Index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: []
        };
    }

    componentDidMount() {
        const {search} = this.props.location;
        const params = formatSearch(search);
        this.setState({
            params: dict2arr(params),
        });
    }

    render() {
        return (
            <div className="index">
                <div className="logo">
                    <img src={logo} alt="Loading"/>
                    <p>Loading</p>
                </div>
            </div>
        );
    }
}

export default Index;
