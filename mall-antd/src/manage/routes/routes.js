'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import FramePage from '../components/FramePage.js';
import TagPage from '../components/TagPage.js';
import ProductPage from '../components/ProductPage.js';

import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
            <Route path="/" component={FramePage}>
              <IndexRoute component={ ProductPage } />
              <Route path="tag" component="div">
					       <IndexRoute component={ TagPage } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="product" component="div">
					       <IndexRoute component={ ProductPage } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="*" component={ PageNotFound } />
            </Route>
        </Router>
        );
}