import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

import { Provider } from 'react-redux';
import { AppStore } from 'store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
