'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import HomePage from '../components/HomePage.js';
import ProductList from '../components/ProductList.js';
import ProductDetail from '../components/ProductDetail.js';
import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
            <Route path="/" component="div">
              <IndexRoute component={ HomePage } />
              <Route path="product" component="div">
					       <IndexRoute component={ ProductList } />
				         <Route path="detail/:id" component={ ProductDetail } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="*" component={ PageNotFound } />
            </Route>
        </Router>
        );
}