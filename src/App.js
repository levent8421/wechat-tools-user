import React, {Component} from 'react';
import './App.less';
import {HashRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {rootRoutes} from './router/routes';
import {Provider} from 'react-redux';
import store from './store';

const showConsoleMsg = () => {
    console.log('%cLoad success!\r\n%cWechatTools%cPoweredBy:%clevent8421',
        'color:#1F8FE6',
        'font-size:100px;color:#1F8FE6;font-weight:bold',
        'color:#F80',
        'color:#1F8FE6');
};

class App extends Component {
    componentDidMount() {
        showConsoleMsg();
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        {
                            renderRoutes(rootRoutes)
                        }
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
