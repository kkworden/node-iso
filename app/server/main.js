// Entry point of the entire application

// Import middlewares
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';

// Import react modules
import React from 'react';
import Router from 'react-router';

import routes from '../shared/routes.react';

///--------------///

let app = express();

app.use('/__res__/bower', express.static('dist/bower'));
app.use('/__res__/client', express.static('dist/client'));
app.use('/__res__/shared', express.static('dist/shared'));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/__proc__/server', function(req, res) {
	res.render('server');
});

app.get('*', function(req, res) {
	Router.run(routes, req.path, function(Handler, state) {
		var main = React.renderToString(<Handler />);

		res.render('index', { mainContent: main });
	});
});

app.listen(3000);
