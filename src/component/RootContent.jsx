import React, {Component} from 'react';
import {contentRoutes} from '../router/routes';
import {renderRoutes} from 'react-router-config';

class RootContent extends Component {
    render() {
        return (
            <div className="content">
                {
                    renderRoutes(contentRoutes)
                }
            </div>
        );
    }
}

export default RootContent;
