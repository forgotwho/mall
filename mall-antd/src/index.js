import React from 'react';
import ReactDOM from 'react-dom';

import getRoutes from './front/routes/routes.js';

ReactDOM.render(
  getRoutes(),
  document.getElementById('root')
);
