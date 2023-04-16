import React from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import App from './App'
import Settings from './components/Settings'

const Routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={App}/>
		</Switch>
	</Router>
)

export default Routes
