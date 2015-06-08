import React from 'react';
import Router from 'react-router';

import {Faq} from './home/faq.react';
import {Home} from './home/home.react';
import {App} from './app.react';

import routes from './routes';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.body);
});
