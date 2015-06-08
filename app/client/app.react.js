import React from 'react';
import Router from 'react-router';

import routes from './routes';

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

export class App extends React.Component
{
	render() {
		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li><Link to="app">Home</Link></li>
							<li><Link to="faq">FAQ</Link></li>
						</ul>
					</div>
				</nav>

				<RouteHandler />
			</div>
		);
	}
}
