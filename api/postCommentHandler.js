const querystring = require('querystring');
const axios = require('axios');
const API_URL = 'https://staging-api.teachstarter.com/v1/comment';

module.exports = function(req, res, next) {
	/*let body = '';

	req.on('data', data => {
		body += data;
	});

	req.on('end', () => {
		req.body = querystring.parse(body) || {};
		console.log('req', req);
		//next();
	});

	res.statusCode = 200;
	res.end('done');*/

	if (req.method == 'POST') {
		//For receiving POST requests
		var body = '';
		req.on('data', function(data) {
			body += data;
		});
		req.on('end', function() {
			var params = querystring.parse(body) || {};

			try {
				const response = axios.post(API_URL, params, {
					headers: req.headers,
				});

				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(response);
			} catch (error) {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(error);
				return false;
			}
		});
	} else {
		//For receiving GET requests
		console.log(req.originalUrl);
		var url = req.originalUrl || '';
		//ECHO url for example
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ url: url }));
		return false;
	}
};
/*const bodyParser = require('body-parser');
const app = require('express')();

module.exports = { path: '/fn/comment', handler: app };

app.use(bodyParser.json());
app.post('https://staging-api.teachstarter.com/v1/comment', (req, res) => {
	res.json(req.body);
});*/
/*
const querystring = require('querystring');

export default {
	path: '/fn/comment',
	handler(req, res, next) {
		let body = '';

		req.on('data', data => {
			body += data;
		});

		req.on('end', () => {
			req.body = querystring.parse(body) || {};
			next();
		});

		res.end(body);
	},
};

*/
/*
const app = require('express');
const bodyParser = require('body-parser');

module.exports = { path: '/fn/comment', handler: app };

app.use(bodyParser.json());

app.use(function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.write('you posted:\n');
	res.end(JSON.stringify(req.body, null, 2));
});
*/
