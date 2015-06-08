// Entry point of the entire application
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import React from 'react';
import path from 'path';

import {App} from '../client/app.react';

let app = express();

app.use('/__res__/bower', express.static('dist/bower'));
app.use('/__res__/client', express.static('dist/client'));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index.ejs', {
		reactContent: React.renderToString(<App />)
	});
});

app.listen(3000);
