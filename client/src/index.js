import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import ScrollToTop from './components/ScrollToTop';
import { configureStore } from './utils';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'simple-line-icons/css/simple-line-icons.css';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
