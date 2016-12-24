'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import OrderExpressPage from '../components/OrderExpressPage.js';
import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
            <Route path="/" component="div">
              <IndexRoute component={ OrderExpressPage } />
              <Route path="*" component={ PageNotFound } />
            </Route>
        </Router>
        );
}