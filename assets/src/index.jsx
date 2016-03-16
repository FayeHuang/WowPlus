<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router'

import Main from './Main'
import DiskPage from './DiskPage'
import CpuPage from './CpuPage'
import MemoryPage from './MemoryPage'

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
=======
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello.jsx';

ReactDOM.render(<Hello />, document.getElementById('react-app'))
>>>>>>> 6924c2c723d98b16a447fa3bd6b38af6b670dffb
