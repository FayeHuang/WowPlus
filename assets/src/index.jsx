import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Map from './Map'
import Form from './Form'



ReactDOM.render((

  <Router history={browserHistory}>
    <Route path="/" component={Form} />
     <Route path="/map" component={Map} />
  </Router>
), document.getElementById('react-app'))