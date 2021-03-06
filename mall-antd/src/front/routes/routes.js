'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import FramePage from '../components/FramePage.js';
import HomePage from '../components/HomePage.js';
import ProductPage from '../components/ProductPage.js';
import SearchProduct from '../components/SearchProduct.js';
import AboutUs from '../components/AboutUs.js';
import ContactUs from '../components/ContactUs.js';
import ProductDetail from '../components/ProductDetail.js';

import PageNotFound from '../components/PageNotFound.js';

export default function() {
    return (
        <Router history={ hashHistory }>
            <Route path="/" component="div">
              <IndexRoute component={ HomePage } />
              <Route path="product" component="div">
					       <IndexRoute component={ ProductPage } />
				         <Route path="detail/:id" component={ ProductDetail } />
				         <Route path="tag/:name" component={ ProductPage } />
				         <Route path="search" component={ ProductPage } />
					       <Route path="*" component={ PageNotFound } />
              </Route>
              <Route path="about" component={AboutUs}/>
              <Route path="contact" component={ContactUs}/>
              <Route path="*" component={ PageNotFound } />
            </Route>
        </Router>
        );
}