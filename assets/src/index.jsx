import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Map from './Map'
import Form from './Form'
import MapExplore from './MapExplore'
import MapStore from './MapStore'


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

ReactDOM.render((

  <Router history={browserHistory}>
    <Route path="/" component={Form} />
    <Route path="/map" component={Map} />
    <Route path="/map/explore" component={MapExplore} />
    <Route path="/map/store" component={MapStore} />
  </Router>
), document.getElementById('react-app'))