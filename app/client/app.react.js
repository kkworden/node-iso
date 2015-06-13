import React from 'react';
import Router from 'react-router';

import {NavBar} from './components/navbar.react';

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

export class App extends React.Component
{
	render() {
		return (
			<div>
				<NavBar />

				<div className="container">
					<RouteHandler />
				</div>
			</div>
		);
	}
}
