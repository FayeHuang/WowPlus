import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Main from './Main'
import DiskPage from './DiskPage'
import CpuPage from './CpuPage'
import MemoryPage from './MemoryPage'

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