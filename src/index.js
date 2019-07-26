import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import ModalSwitch from './ModalSwitch';

import './styles/global.css';

ReactDOM.render(
  <Router>
    <div>
      <div className="content">
        <Route component={ModalSwitch} />
      </div>
    </div>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
