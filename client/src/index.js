import React from 'react';
import ReactDOM from 'react-dom';
import './App.sass';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
