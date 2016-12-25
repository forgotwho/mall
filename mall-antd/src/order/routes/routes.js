'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import FramePage from '../components/FramePage.js';
import OrderPage from '../components/OrderPage.js';

import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
          <Route path="/" component={FramePage}>
            <IndexRoute component={ OrderPage } />
            <Route path="*" component={ PageNotFound } />
          </Route>
        </Router>
        );
}