import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import './translation/i18n';

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);

registerServiceWorker();
