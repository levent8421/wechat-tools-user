import React from 'react';
import './App.sass';
import {HashRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {rootRoutes} from './router/routes';

function App() {
    return (
        <Router>
            <div className="App">
                {
                    renderRoutes(rootRoutes)
                }
            </div>
        </Router>
    );
}

export default App;
