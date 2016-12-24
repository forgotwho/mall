'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import FramePage from '../components/FramePage.js';
import TagPage from '../components/TagPage.js';
import BannerPage from '../components/BannerPage.js';
import ProductPage from '../components/ProductPage.js';
import OrderPage from '../components/OrderPage.js';

import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
            <Route path="/" component={FramePage}>
              <IndexRoute component={ TagPage } />
              <Route path="tag" component="div">
					       <IndexRoute component={ TagPage } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="banner" component="div">
					       <IndexRoute component={ BannerPage } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="product" component="div">
					       <IndexRoute component={ ProductPage } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="order" component="div">
					       <IndexRoute component={ OrderPage } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="*" component={ PageNotFound } />
            </Route>
        </Router>
        );
}