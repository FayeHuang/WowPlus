import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import Main from './components/Main'
import CpuPage from './components/CpuPage'
import MemoryPage from './components/MemoryPage'

import DiskPage from './containers/DiskPage'
import DiskProjectPage from './containers/DiskProjectPage'
import configureStore from './store/configureStore'

import './style/main.css'

const store = configureStore()
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRedirect to="/disk" />
        <Route path="disk" component={DiskPage} />
        <Route path="cpu" component={CpuPage} />
        <Route path="memory" component={MemoryPage} />
        <Route path="disk/:projectID" component={DiskProjectPage} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-app'))