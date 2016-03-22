import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Main from './components/Main'
import DiskPage from './components/DiskPage'
import CpuPage from './components/CpuPage'
import MemoryPage from './components/MemoryPage'

import './style/main.css'

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRedirect to="/disk" />
			<Route path="disk" component={DiskPage} />
			<Route path="cpu" component={CpuPage} />
			<Route path="memory" component={MemoryPage} />
		</Route>
	</Router>
), document.getElementById('react-app'))