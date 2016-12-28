'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import FramePage from '../components/FramePage.js';

import LoginPage from '../components/LoginPage.js';
import OrderPage from '../components/OrderPage.js';

import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
          <Route path="/" component="div">
            <IndexRoute component={ OrderPage } />
            <Route path="login" component={ LoginPage } />
            <Route path="*" component={ PageNotFound } />
          </Route>
        </Router>
        );
}