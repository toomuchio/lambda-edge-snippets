//Event hook: Viewer request
//Scheme is not exposed by event object unfortunately... So it's set to https.

'use strict';

var REDIRECT_MAP = new Map([
	['/index.php', '/'],
	['/testing.php', '/testing'],
  ['/hello/world.php', 'hello/world'],
]);

const FORWARD_SCHEME = "https://";

exports.handler = function handler(event, context, callback) {
	const { request } = event.Records[0].cf;
	const { uri } = request;
	const host = request.headers.host[0].value;
	const forward_uri = REDIRECT_MAP.get(uri);

	if (forward_uri) {
		const response = {
			headers: {
				'location': [{
					key: 'Location',
					value: FORWARD_SCHEME + host + forward_uri
				 }]
			},
			status: '301',
			statusDescription: 'Moved Permanently'
		};
		callback(null, response);
		return;
	}

	callback(null, request);
};
