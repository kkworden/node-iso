import React from 'react';
import Router from 'react-router';

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

import {App} from '../client/app.react';
import {Faq} from '../client/home/faq.react';
import {Home} from '../client/home/home.react';

///--------------///

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="faq" handler={Faq} />
		<DefaultRoute name="home" handler={Home} />
	</Route>
);

export default routes;
