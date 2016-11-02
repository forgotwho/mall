import React from 'react';
import ReactDOM from 'react-dom';

import getRoutes from './routes/routes.js';

ReactDOM.render(
  getRoutes(),
  document.getElementById('root')
);
