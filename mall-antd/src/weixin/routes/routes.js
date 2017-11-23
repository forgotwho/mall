'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import OrderExpressPage from '../components/OrderExpressPage.js';
import OrderExpressPage2 from '../components/OrderExpressPage2.js';
import OrderExpressPage3 from '../components/OrderExpressPage3.js';
import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
            <Route path="/" component="div">
              <IndexRoute component={ OrderExpressPage3 } />
              <Route path="*" component={ PageNotFound } />
            </Route>
        </Router>
        );
}