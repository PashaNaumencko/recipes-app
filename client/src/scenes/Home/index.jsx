import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Routing from '../../containers/Routing';
import { createBrowserHistory } from 'history';
import { store } from '../../store';

const history = createBrowserHistory();

const Home = () => (
  <Provider store={store}>
    <Router history={history}>
      <Routing />
    </Router>
  </Provider>
);

export default Home;
