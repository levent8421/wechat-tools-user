import React from 'react';
import './App.less';
import {HashRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {rootRoutes} from './router/routes';
import {Provider} from 'react-redux';
import store from './store';

function App() {
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

export default App;
