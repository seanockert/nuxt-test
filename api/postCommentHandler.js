const querystring = require('querystring');
const axios = require('axios');
const API_URL = 'https://staging-api.teachstarter.com/v1/comment';

// Submit POST data to API
async function submitRequest(params, headers) {
	return await axios.post(API_URL, params, {
		headers: headers,
	});
}

module.exports = function(req, res, next) {
	if (req.method == 'POST') {
		// For receiving POST requests
		let body = '';
		req.on('data', function(data) {
			body += data;
		});

		req.on('end', function() {
			const params = querystring.parse(body) || {};

			if (params.id) {
				//const response = submitRequest(params, req.headers);

				axios
					.post(API_URL, params, {
						headers: req.headers,
					})
					.then(response => {
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.write(JSON.stringify(response.data));
						res.end();
					})
					.catch(error => {
						// Handle Error Here
						console.error(error);
						res.writeHead(400, { 'Content-Type': 'application/json' });
						res.write(error);
						res.end();
					});
			} else {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end('Missing post ID');
			}

			/*try {
				const response = axios.post(API_URL, params, {
					headers: req.headers,
				});

				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(response);
			} catch (error) {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(error);
				return false;
			}*/
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

	req.on('error', function(err) {
		// This prints the error message and stack trace to `stderr`.
		console.error(err.stack);
	});
};
